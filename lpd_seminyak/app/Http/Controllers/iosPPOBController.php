<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use app\Helpers\TabunganHelper;
use app\Helpers\MBankingHelper;
use app\Helpers\iosHelper;
use app\Helpers\iosTransferHelper;

class iosPPOBController extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckAccess', ['only' => 
		['Check', 'Request']]);
		
	}

	public function Check(){

		if ($_POST['status'] != "00"){
			return response()->json(
				[
					"status"  => $_POST['status'],
					"message" => $_POST['message'],
				]);
		}

		$accNo = iosHelper::Gio_Decrypt($_GET['customer_acc']);
		$product = explode(" ", $_GET['product_name']);
		$nominal = str_replace(".", "", $product[1]);
		$admin = 2000;
		$salmin = env('SALDO_MIN');
		$fee = 0;
		$deposit = TabunganHelper::Gio_GetDepositPPOB();

		try {
			$status = "X";
			$saldo = 0;
			$totalTrans = TabunganHelper::Gio_GetTotalTrans($accNo);
			$query = DB::select('select * from vwNasabahFolio where linker=?', array($accNo));
			foreach ($query as $querys){
				$status = $querys->status;
				$saldo = $querys->saldo;
			}
			if ($status != "A") { 
				$rc = "01";
				$msg = "Rekening tidak aktif.";
			}else if ( $saldo - intval($nominal) - $admin < $salmin ){
				$rc = "04";
				$msg = "Saldo tidak cukup";
			}else if ( $totalTrans + intval($nominal) > env('MAX_TRANSFER') ){
				$rc = "26";
				$msg = "Total transaksi hari ini melebihi limit.";
			}else if ( $deposit < intval($nominal) ){
				$rc = "05";
				$msg = "Deposit PPOB tidak cukup.";
			}else{
				$rc = "00";
				$msg = "Sukses";
			}
			return response()->json(
			[
				"status"   	=> $rc,
				"message"   => $msg,
				"fee"   	=> $fee,
			]);
		}catch (\exception $e) {
			$aResponse = array(
					"status"  => "69",
					"message" => "Timeout",
				);
			return response()->json($aResponse);
		}
	
	}	

	public function Request(){

		if ($_POST['status'] != "00"){
			return response()->json(
				[
					"status"  => $_POST['status'],
					"message" => $_POST['message'],
				]);
		}
    
		$accNo = iosHelper::Gio_Decrypt($_GET['customer_acc']);
		$accName = iosHelper::Gio_Decrypt($_GET['customer_name']);
		$idpel = iosHelper::Gio_Decrypt($_GET['id_pelanggan']);	
		$proType = iosHelper::Gio_Decrypt($_GET['product_type']);
		$aType = explode("<>", $proType);
		$jenis = $aType[0];
		$hashCode = $aType[1];
		$produk = iosHelper::Gio_Decrypt($_GET['product_code']);
		$namaProduk = $_GET['product_name'];
		$nominal = $_GET['amount'];
		$method = iosHelper::Gio_Decrypt($_GET['method']);
		$refNo = $GLOBALS['reference'];
		$salmin = 50000;
		$admin = 2000;
		$fee = 0;
		$tagihan = 0;
		$periode = "";
		$phone = "";

		$code = "#{".$accNo."}[".$accName."]<".$idpel.">(".$jenis.")^".$produk."^#";
		$checkHash = hash("sha256", $code);			
		if ($hashCode != $checkHash){
			return response()->json(
				[
					"status"   	=> "61",
					"message"   => "Transaksi tidak dapat diproses.",
					]);		
		}
		
		$deposit = iosHelper::Gio_GetDepositPPOB();
		if ($jenis == "PLN-PREPAID"){
			$kode = explode("-", $produk);
			$produk = $kode[0];
			$nominal = $kode[1];
		}

		try {

			$status = "X";
			$saldo = 0;
			$trsCode = "PPOB" . date("ymdHis") . substr(uniqid(rand(), FALSE), -4);		
			$totalTrans = iosTransferHelper::Gio_GetTotalTrans($accNo);
			$query = DB::select('select * from vwNasabahFolio where linker=?', array($accNo));
			foreach ($query as $querys){
				$status = $querys->status;
				$saldo = $querys->saldo;
			}
		
			if ($status != "A") { 
				$rc = "01";
				$msg = "Rekening tidak aktif.";
			}else if ( $saldo - intval($nominal) - $admin < $salmin ){
				$rc = "04";
				$msg = "Saldo tidak cukup";
			}else if ( $totalTrans + intval($nominal) > env('MAX_TRANSFER') ){
				$rc = "26";
				$msg = "Total transaksi hari ini melebihi limit.";
			}else{
				$rc = "00";
				$msg = "Sukses";
			}

			if ($rc != "00"){	
				return response()->json(
					[
						"status"  => $rc,
						"message" => $msg,
					]);
			}

			$tgl = date("Y-m-d H:i:s");
			if ($rc == "00" && $method == "bayar"){					
				$data = array(
					$trsCode, $idpel, $tgl, $accNo, $produk, $namaProduk,
					intval($nominal)+$admin+$fee, $admin+$fee, $accName, 
					$refNo
				);				
				iosHelper::Gio_InsTransaksiPPOB($data);
			}

			$respon = self::requestFastPay($method, $produk, $idpel, 
				$refNo, $nominal, $jenis, $periode, $phone);	
			$result = json_decode($respon, true);
			$rc = $result['rc'];
			$msg = $result['status'];
	
			if ($rc == "00" || $rc == "68"){	
				$remark = self::Set_RemarkBS($jenis, $respon);
				$aResponse = array(
					"status"  => $rc,
					"message" => $msg,
					"tagihan"    => $result['tagihan'],
					"admin"    => $result['adm'],
					"fee"    => $fee,
					"remark"    => $remark,
					"trans_date" => $tgl,
				);
				return response()->json($aResponse);
			}else{
				if ($method == "bayar"){	
					iosHelper::Gio_DeleteTransaksiPPOB($accNo, $trsCode); 
				}
				return response()->json(
				[
					"status"  => $rc,
					"message" => $msg,
				]);
				
			}
		}catch (\exception $e) {
			$aResponse = array(
					"status"  => "69",
					"message" => "Timeout",
				);
			return response()->json($aResponse);
		}
	
	}	

	public static function Set_RemarkBS($jenis, $respon){
		$result = json_decode($respon, true);
		$remark = $result['idpel'] ."<>". $_GET['product_name'];
		if (substr($jenis,0,3) == "PLN"){
			$remark = $result['nama'] ."<>". $_GET['product_name'] ."<>". 
				"Tarif daya : ".$result['tarif_daya'];
		}else if ($jenis == "PDAM"){
			$remark = $result['nama'] ."<>". $_GET['product_name'] ."<>".
				"Periode : " .$result['blth'] ."<>".
				"Meter : " .$result['st_meter'];
		}else if ($jenis == "BPJS"){
			$remark = $result['nama'] ."<>". $_GET['product_name'] ."<>".
				"Periode : " .$result['blth'] ." bulan<>".
				"Jml peserta : " .$result['jml_kel'] ." orang";
		}else if ($jenis == "HPPASCA"){
			$remark = $result['nama'] ."<>". $result['idpel'];
		}else if ($jenis == "TELKOM"){
			$remark = $result['nama'] ."<>". $_GET['product_name'] ."<>". 
				"Periode : ".$result['blth'];
		}
		return $remark;
	}

	public static function Set_RemarkIAK($jenis, $respon){
		$result = json_decode($respon, true);
		$remark = "<>";
		if (substr($jenis,0,5) == "PAKET"){
			$remark = $result['customer_id'] ."<>". $_GET['product_name'];
		}else if ($jenis == "BPJS"){
			$GLOBALS['tagihan_ppob'] = $result['nominal'];
			$GLOBALS['admin_ppob'] = $result['admin'];
			$remark = $result['tr_name'] ."<>". $_GET['product_name'] ."<>".
				"Periode : " .$result['period'] ." bulan<>".
				"Jml peserta : " .$result['desc']['jumlah_peserta'] ." orang";
		}
		return $remark;
	}

	public static function requestFastPay($method, $produk, $idpel, $ref, 
		$nominal, $jenis, $periode, $phone){

		$user = env('PPOB_USER');
		$pin  = env('PPOB_PIN');

    	$json = '{"method":"' .$method. '","uid":"' .$user. '","pin":"' .$pin. '","produk":"' .$produk. '","idpel":"' .$idpel. '","ref1":"' .$ref. '"}';

    	if( $jenis == "PLN-PREPAID") {  // untuk token listrik
			$json = '{"method":"' .$method. '","uid":"' .$user. '","pin":"' .$pin. '","produk":"' .$produk. '","idpel":"' .$idpel. '","ref1":"' .$ref. 
				'","nominal":"' .$nominal. '"}';
		}

		// untuk BPJS
		if($produk == "ASRBPJSKS"){
    	    if ($method == "bayar"){
            	$json = '{"method":"' .$method. '","uid":"' .env('PPOB_USER'). '","pin":"' .env('PPOB_PIN'). '","produk":"' .$produk. '","idpel":"' .$idpel. '","ref1":"' .$ref. 
            	    '","periode":"' .$periode. '","hp":"' .$phone.   '"}';
    	    }else{
            	$json = '{"method":"' .$method. '","uid":"' .env('PPOB_USER'). '","pin":"' .env('PPOB_PIN'). '","produk":"' .$produk. '","idpel":"' .$idpel. '","ref1":"' .$ref. 
            	    '","periode":"' .$periode. '"}';
            	$json = '{"method":"' .$method. '","uid":"' .env('PPOB_USER'). '","pin":"' .env('PPOB_PIN'). '","produk":"' .$produk. '","idpel":"' .$idpel. '","ref1":"' .$ref. '"}';
    	    }
    	}

		$_REQUEST['attributes']['http_request'] = $json;
        $url = "https://rajabiller.fastpay.co.id/transaksi/api_json.php";
    	$ch  = curl_init();
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    	curl_setopt($ch, CURLOPT_URL, $url);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	$output = curl_exec($ch);
    	curl_close($ch);
    	return $output;
    	
	}

	public static function prepaidIAK($method, $produk, $idpel, $ref, 
		$nominal, $jenis, $periode, $phone){

		$username = "082340657770";
		$apikey = "6686241637d304bc"; //Development
		//$apikey = "4326247d4b1e596eUb3T"; //Production
		$signature = md5($username.$apikey.$ref);

		$json = '{
			"username":"'.$username.'",
			"ref_id":"'.$ref.'",
			"customer_id":"' .$idpel. '",
			"product_code":"' .$produk. '",
			"sign":"'.$signature.'"
		}';
		
		$_REQUEST['attributes']['http_request'] = $json;
        $url = "https://prepaid.iak.id/api/top-up";
        $url = "https://prepaid.iak.dev/api/top-up";

    	$ch  = curl_init();
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    	curl_setopt($ch, CURLOPT_URL, $url);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	$output = curl_exec($ch);
    	curl_close($ch);
		$result = json_decode($output, true);
		$output = json_encode($result['data']);
    	return $output;
    	
	}

	public static function postpaidIAK($method, $produk, $idpel, $ref, 
		$nominal, $jenis, $periode, $phone){

		$username = "082340657770";
		$apikey = "6686241637d304bc"; //Development
		//$apikey = "4326247d4b1e596eUb3T"; //Production
		$signature = md5($username.$apikey.$ref);
	
		$json = '{
			"commands":"'.$method.'",
			"username":"'.$username.'",
			"ref_id":"'.$ref.'",
			"hp":"' .$idpel. '",
			"code":"' .$produk. '",
			"month":"' .$periode. '",
			"sign":"'.$signature.'"
		}';
		
		$_REQUEST['attributes']['http_request'] = $json;
        $url = "https://mobilepulsa.net/api/v1/bill/check";
        $url = "https://testpostpaid.mobilepulsa.net/api/v1/bill/check";

    	$ch  = curl_init();
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    	curl_setopt($ch, CURLOPT_URL, $url);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	$output = curl_exec($ch);
    	curl_close($ch);
		$result = json_decode($output, true);
		$output = json_encode($result['data']);
    	return $output;
    	
	}

	public function Callback(Request $request){
		$_GET = json_decode($request->getContent(), true);
		try {
			return response()->json(
			[
				"status"   	=> "99",
				"message"   => $_GET['rc'],
			]);
		}catch (\exception $e) {
			$aResponse = array(
					"status"  => "69",
					"message" => "Timeout",
				);
			return response()->json($aResponse);
		}
	
	}	

}