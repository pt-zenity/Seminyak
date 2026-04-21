<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosHelper;
use app\Helpers\iosTransferHelper;

class iosTransferLPDCtrl extends Controller
{
	
	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckAccess', ['only' => 
		['Check', 'Inquiry', 'Posting']]);
		
	}
	
	public function Check(){
		if ($_POST['status'] != "00"){
			return response()->json(
				[
					"status"  => $_POST['status'],
					"message" => $_POST['message'],
				]);
		}

		try {

			$tonorek = iosHelper::Gio_Decrypt($_GET['account_no']);	
			$modul = iosHelper::GetModulCode($tonorek);
			$status = iosHelper::Gio_GetStatusRekening($tonorek, $modul);
			if ($status) { 
				return response()->json(
					[
						"status"    => "00",
						"message"   => "Sukses inquiry",
						"product_type"    => $_REQUEST['attributes']['jenis'],
						"customer_name"   => $_REQUEST['attributes']['nasabah'],
					]);
			}else{
				return response()->json(
					[
						"status"    => "01",
						"message" => "Tabungan tidak aktif",
					]);
			}								
		}catch (\exception $e) {
			return response()->json(
			[
				"status"  => "68",
				"message" => "Time-out",
			]);
		}
	}

	public function Inquiry(){
		if ($_POST['status'] != "00"){
			return response()->json(
				[
					"status"  => $_POST['status'],
					"message" => $_POST['message'],
				]);
		}

		try {
	
			$norek_from = iosHelper::Gio_Decrypt($_GET['from_acc']);
			$norek_to = iosHelper::Gio_Decrypt($_GET['to_acc']);	
			$nominal = iosHelper::Gio_Decrypt($_GET['amount']);	
			$name_from = iosHelper::Gio_Decrypt($_GET['from_name']);
			$name_to = iosHelper::Gio_Decrypt($_GET['to_name']);

			$ket = iosHelper::Gio_Decrypt($_GET['remark']);	
			$aKet = explode("<>", $ket);
			$remark = $aKet[0];
			$hashCode = $aKet[1];

			$code = "{".$nominal."*".$norek_from."^".$norek_to."%".$name_from."#".$name_to."@".env('BPD_HASHCODE')."}";
			$checkHash = hash("sha256", $code);			
			if ($hashCode != $checkHash){
				return response()->json(
					[
						"status"   	=> "62",
						"message"   => "Transaksi tidak dapat diproses.",
						]);		
			}
			
			$rc = self::VerifikasiData($norek_from, $norek_to, $nominal);
			$rcs = $rc;
			if ($rc == "00"){ 
				$rcs = "81"; 
				$_REQUEST['attributes']['respon_msg'] = "Sukses Inquiry";
			}		
			iosTransferHelper::Gio_InsTransferARLog($norek_from, $name_from, 
				$norek_to, $name_to, $nominal, 
				$GLOBALS['reference'],
				$rcs, $_REQUEST['attributes']['respon_msg']);	
			return response()->json(
				[
					"status"  => $rc,
					"message" => $_REQUEST['attributes']['respon_msg'],
				]);
	
		}catch (\exception $e) {
			return response()->json(
				[
					"status"  => "68",
					"message" => "Timeout",
				]);
		}
	
	}

	public function Posting(){
		if ($_POST['status'] != "00"){
			return response()->json(
				[
					"status"  => $_POST['status'],
					"message" => $_POST['message'],
				]);
		}
	
		try {

			$norek_from = iosHelper::Gio_Decrypt($_GET['from_acc']);
			$norek_to = iosHelper::Gio_Decrypt($_GET['to_acc']);	
			$nominal = iosHelper::Gio_Decrypt($_GET['amount']);	
			$name_from = iosHelper::Gio_Decrypt($_GET['from_name']);
			$name_to = iosHelper::Gio_Decrypt($_GET['to_name']);

			$ket = iosHelper::Gio_Decrypt($_GET['remark']);	
			$aKet = explode("<>", $ket);
			$remark = $aKet[0];
			$hashCode = $aKet[1];

			$code = "{".$nominal."*".$norek_from."^".$norek_to."%".$name_from."#".$name_to."@".env('BPD_HASHCODE')."}";
			$checkHash = hash("sha256", $code);			
			if ($hashCode != $checkHash){
				return response()->json(
					[
						"status"   	=> "63",
						"message"   => "Transaksi tidak dapat diproses.",
						]);		
			}

			$refExist = iosHelper::Gio_GetRefNoExist($GLOBALS['reference'], $norek_to, '81');
			if ($refExist == false){
				return response()->json(
					[
						"status"  => "31",
						"message" => "No. referensi tidak ditemukan.",
					]);
			}

			$refDuplicate = iosHelper::Gio_GetRefNoExist($GLOBALS['reference'], $norek_to, '00');
			if ($refDuplicate){
				return response()->json(
					[
						"status"  => "32",
						"message" => "No. referensi duplikat.",
					]);
			}

			$tglTrans = date("Y-m-d H:i:s");
			$rc = self::VerifikasiData($norek_from, $norek_to, $nominal);
			if ( $rc == "00" ) {	
				$data = array(
					$tglTrans,$norek_from,$name_from,$norek_to,$name_to, 
					$nominal, 0, $_REQUEST['attributes']['respon_saldo'], 
					$remark, $GLOBALS['reference']
				);						
				$result = iosTransferHelper::Ins_TransferAR($data, $GLOBALS['reference']);
				if ($result == 2) {
					$aResponse = array(
						"status" => $rc,
						"message" => $_REQUEST['attributes']['respon_msg'],
						"transfer_date" => $tglTrans,
						"balance" => $_REQUEST['attributes']['respon_saldo']-$nominal,
					);  
				}else if ($result == 3){
					$aResponse = array(
						"status"    => "23",
						"message"   => "No. Referensi duplikat."
					);		
				}else{
					$aResponse = array(
						"status"    => "24",
						"message"   => "Transaksi tidak dapat diproses."
					);		
				}
			}else{
				$aResponse = array(
					"status"    => $rc,
					"message"   => $_REQUEST['attributes']['respon_msg']
				);		
			}
			return response()->json($aResponse);	
		}catch (\exception $e) {
			return response()->json(
				[
					"status"  => "68",
					"message" => "Timeout",
				]);
			}
	}

	public function VerifikasiData($norek_from, $norek_to, $nominal){
	
		$modul = iosHelper::GetModulCode($norek_to);
		$rc = "00";

		$valStatus = iosHelper::Gio_GetStatusRekening($norek_to, $modul);	
		$totalTrans = iosTransferHelper::Gio_GetTotalTrans($norek_from);
		$_REQUEST['attributes']['respon_saldo'] = iosTransferHelper::Gio_GetSaldoTabungan($norek_from);
		if( $valStatus) {
			if($_REQUEST['attributes']['respon_saldo']-env("SALDO_MIN") < $nominal){
				$rc = "04";
			}else if( $nominal < env('MIN_TRANSFER')) {
				$rc = "25";
			}else if( $nominal > env('MAX_TRANSFER')) {
				$rc = "26";
			}else if( $totalTrans+$nominal > env('MAX_TRANSFER')) {
				$rc = "26";
			}
		}else{
			$rc = "01";
		}
		$_REQUEST['attributes']['respon_msg'] = iosHelper::Get_ResponseDesc($rc);
		return $rc;
	}
		
}