<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosTransferHelper;

class iosHelper {

	public static function Gio_InsertRefPPOB($tgl, $norek, $idpel, 
		$produk, $reff){
		$query = DB::update('insert into gppob_inquiry (trans_date, norek,
			idpel, produk, reference) values (?,?,?,?,?)', 
			array($tgl, $norek, $idpel, $produk, $reff));
		return;
	}

	public static function Gio_GetRefPPOB($tgl, $norek, $idpel, $produk){

		$reff= 0;
		$query = DB::select('select * from gppob_inquiry where trans_date=?
			and norek=? and idpel=? and produk=?', 
			array($tgl, $norek, $idpel, $produk));
		foreach ($query as $querys){
			$reff = $querys->reference;
		}
		return $reff;

	}

	public static function Gio_CheckToken($clientID){

		$current = date("Y-m-d H:i:s");
		$start = date('Y-m-d H:i:s.000',strtotime('-3 minutes',strtotime($current)));
		$token = "x";
		$query = DB::select('select * from gmob_token where account_no=? and 
			start_time>? and status=?', array($clientID, $start, "open"));
		foreach ($query as $querys){
			$token = $querys->token;
		}
		return $token;

	}

	public static function Gio_InsertRequest($ip, $url, $data){
		$query = DB::update('insert into gmob_request (no_ip, request_url,
			client_id, time_stamp, request_data) values (?,?,?,?,?)', 
			array($ip, $url, $GLOBALS["client_id"], $GLOBALS["timestamp"], $data));
		return;

	}

	public static function Get_DaftarRek($noid, $jenis) {
		$folio = "";
		$saldo = "";
		if ($jenis == 'Tabungan'){
			$query = DB::select('select * from gmob_rekening where 
				noid=? and produk<>? order by id', 
				array($noid, 'Pinjaman'));
		}else{
			$query = DB::select('select * from gmob_rekening where 
				noid=? and produk=? order by id', 
				array($noid, 'Pinjaman'));
		}
		foreach ($query as $querys){
			$norek = $querys->notab;
			$nama = trim($querys->nama);
			$produk = $querys->produk;
			if ($produk == "Tabungan"){
				$saldo = iosTransferHelper::Gio_GetSaldoTabungan($norek);
			}else{
				$saldo = iosTransferHelper::Gio_GetSaldoTabPlus($norek);
			}
			$folio .= $norek .'<>'. $nama .'<>'. $saldo .'<>'. $produk .'{#}';
		}

		return $folio;

	}

	public static function Get_FolioTabungan($norek, $start, $end) {
		$folio = "";
		$query = DB::select('select Fol.debit_val as debval,
			debit,credit,Fol.remark,left(CONVERT(datetimeoffset, trans_date, 19),10) as tgltrans,
			Kode.remark as keter, Kode.trans_code as kdtrans,
			Fol.trans_code as dekre, Fol.trans_no, Fol.bill_no
			from gtb_folio Fol, gum_kdtrs Kode
			where linker=? and Fol.trans_code=Kode.trans_code
			and trans_date>=? and left(CONVERT(datetimeoffset, trans_date, 19),10)<=?
			order by trans_date, bill_no', 
			array($norek, $start, $end));
		foreach ($query as $querys){
			$keterangan = trim($querys->keter);
			$rem = trim($querys->remark);
			if ($rem != ""){
				$keterangan = trim($querys->remark);
			}
			$trsno = trim($querys->trans_no);
			if ($trsno == ""){
				$trsno = $querys->bill_no;
			}
			/*
            $data = array(
                "trans_date" => $querys->tgltrans,
                "trans_no" => $trsno,
                "debit" => $querys->debit,
                "credit" => $querys->credit,
                "remark" => $keterangan,
            );
            array_push($folio, $data);
			*/
			$folio .= $querys->tgltrans .'<>'. $trsno .'<>'. $querys->debit 
				.'<>'. $querys->credit .'<>'. $keterangan .'{#}';

            
		}

		return $folio;

	}

	public static function Gio_CreateKeyAndIv($clientID, $timeStamp){

		$times = explode(":", substr($timeStamp, -8));
		$keyBytes = hash_hmac("sha512", $clientID, $timeStamp, true);
		$keyLen = strlen($keyBytes);
		$key = base64_encode(substr($keyBytes, $times[0], 32));
		$iv = base64_encode(substr($keyBytes, (intval(($keyLen+$times[1])/2))-16, 16));
		$cs = base64_encode(substr($keyBytes, (intval(($keyLen+$times[2])/3))-8, 8));	
		return [$key, $iv, $cs];

	}

	public static function Gio_GetKeyAndIv($imei) {
		$key = "";
		$iv = "";
		$cs = "";
		$query = DB::select('select * from gmob_nasabah where imei_code=?',
			array($imei));
		foreach ($query as $querys){
			$key = $querys->aes_key;
			$iv = $querys->aes_iv;
			$cs = $querys->aes_cs;
		}
		return [$key, $iv, $cs];
	}

	public static function Gio_Encrypt($plainText) {

		$key = base64_decode($GLOBALS['aes_key']);
		$iv = base64_decode($GLOBALS['aes_iv']);

        $ciphertext = openssl_encrypt($plainText, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
        $encryptedData = base64_encode($ciphertext);

        return $encryptedData;

	}

	public static function Gio_Decrypt($encryptedText) {

		$key = base64_decode($GLOBALS['aes_key']);
		$iv = base64_decode($GLOBALS['aes_iv']);

		$encryptedData = base64_decode($encryptedText);
        $plaintext = openssl_decrypt($encryptedData, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);

        return $plaintext;
	
	}	

	public static function Gio_DecryptDID($id) {

		$fix = self::Get_EndFix($id);
		$col = substr($id, 7, 6);
		$col1 = (intval(substr($col, 0, 1))*10) +ord(substr($col, 1, 1))-64;
		$col2 = 100 + (intval(substr($col, 2, 1))*10) +ord(substr($col, 3, 1))-64;
		$col3 = 100 + (intval(substr($col, 4, 1))*10) +ord(substr($col, 5, 1))-64;
		$len = substr($id, 16, 4);
		$len1 = ord(substr($len, 0, 1))-64;
		$len2 = ord(substr($len, 1, 1))-64;
		$len3 = substr($len, -2);
		$idd = substr($id, $col1, $len1).substr($id, $col2, $len2).substr($id, $col3, $len3);
		$decID = base64_decode($idd.$fix);
		$clientID = explode("|", $decID);
        return $clientID[1];
	
	}	

	public static function Get_EndFix($id){
		$end = "";
		if (substr($id, -2) == "=="){
			$end = "==";
		}else{
			if (substr($id, -1) == "="){ $end = "=";}
		}
		return $end;
	}

	public static function Gio_GetStatusRekening($norek, $modul) {
		$tabel = "gt" .$modul. "_nasabah";
		$query = DB::select('select nasabah from ' .$tabel. 
			' where linker=? and status=?',array($norek, 'A'));
		foreach ($query as $querys){
			$_REQUEST['attributes']['nasabah'] = trim($querys->nasabah);
		}
		return $query;

	}

	public static function Check_StatusRekening($norek, $modul) {
		$status = "";
		$query = DB::select('select * from gt' .$modul. '_nasabah where linker = ?', array($norek));
		foreach ($query as $querys){
			$status = $querys->status;
		}
		return $status;

	}

	public static function Gio_GetRefNoExist($transNo, $toNorek, $rc) {
		$query = DB::select('select * from gmob_transferlog where 
			trans_no=? and to_norek=? and rc=?',
			array($transNo, $toNorek, $rc));
		return $query;

	}

	public static function GetModulCode($norek){
		$mdl = "b";
		$_REQUEST['attributes']['jenis'] = 'Tabungan';
		if( substr($norek,0,2) == '10' || substr($norek,0,2) == '11'){
		  $mdl = "e";
		  $_REQUEST['attributes']['jenis'] = 'Sibarda';
		}else if( substr($norek,0,2) == '33' || substr($norek,0,2) == '34' ){
			$mdl = "D";
			$_REQUEST['attributes']['jenis'] = 'Deposito';
		}
		return $mdl;
	}

	public static function Get_ResponseDesc($no) {
		$query = DB::select('select * from gmob_responcode where resp_code = ?', array($no));
		$resp = "";
		foreach ($query as $querys){
			$resp = $querys->resp_desc;
		}
		return $resp;
	
	}

	public static function Get_FolioRekeningTabPlus($norek, $start, $end, $modul) {
		$folio = "";
		$tabel  = 'gt' .$modul. '_folio';
		$sdebit  = 'gt' .$modul. '_folio.debit_val as debval';
		$query = DB::select('select debit,credit,trans_code,trans_no,bill_no,
			left(CONVERT(datetimeoffset, trans_date, 19),10) 
			as tgltrans,' .$sdebit. ' from ' .$tabel. ' where linker=? 
			and mutasi_date>=? and mutasi_date<=? 
			order by mutasi_date,bill_no', array($norek,$start,$end));
		foreach ($query as $querys){
			$amount = $querys->credit + $querys->debit;
			if ($querys->trans_code == "01"){
				$remark = "Setor Tunai";
			}elseif ($querys->trans_code == "02"){
				$remark = "Tarik Tunai";
			}elseif ($querys->trans_code == "05"){
				$remark = "Bunga Tabungan";
			}
			$trsno = trim($querys->trans_no);
			if ($trsno == ""){
				$trsno = $querys->bill_no;
			}
			$folio .= '[' . $querys->tgltrans .'#'. $querys->debval .'#'. $trsno .'#'. $amount .'#'. $remark .']';
		}

		return $folio;

	}

	public static function checkClientIP() {
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';
		return $ipaddress;
	}

	public static function Gio_CheckImei($imei) {

		$query = DB::select('select * from gmob_nasabah where 
			imei_code=?', array($imei));
		return $query;
	
	}

	public static function Get_DaftarMutasi($noid) {
		$folio = "";
		$query = DB::select('select * from gmob_rekening where 
			noid=? order by id', array($noid));
		foreach ($query as $querys){
			$norek = $querys->notab;
			$nama = trim($querys->nama);
			$produk = $querys->produk;
			$status = $querys->status;
			if ($produk == "Tabungan"){
				$folio .= self::Get_MutasiTabungan($norek, $nama);
			}else if ($produk == "Takamas"){
				$folio .= self::Get_MutasiTakamas($norek, $nama);
			}
		}
		return $folio;
	}

	public static function Get_MutasiTabungan($norek, $nasabah) {
		$data = "";
		$query = DB::select('select top 10
			debit,credit,Fol.remark,left(CONVERT(datetimeoffset, trans_date, 19),10) as tgltrans,
			Kode.remark as keter, Kode.trans_code as kdtrans,
			Fol.trans_code as dekre, Fol.trans_no, Fol.bill_no
			from gtb_folio Fol, gum_kdtrs Kode
			where linker=? and Fol.trans_code=Kode.trans_code
			order by trans_date desc', array($norek));
		foreach ($query as $querys){
			$amount = $querys->credit + $querys->debit;
			$keterangan = trim($querys->keter);
			$rem = trim($querys->remark);
			if ($rem != ""){
				$keterangan = trim($querys->remark);
			}
			$trsno = trim($querys->trans_no);
			if ($trsno == ""){
				$trsno = $querys->bill_no;
			}
			$data .= $norek .'<>'. $nasabah .'<>'. $querys->tgltrans 
				.'<>'. $trsno .'<>'. $amount
				.'<>'. $keterangan .'{#}';            
		}
		return $data;
	}

	public static function Get_MutasiTakamas($norek, $nasabah) {
		$data = "";
		$query = DB::select('select top 10 debit,credit,trans_code,trans_no,bill_no,
			left(CONVERT(datetimeoffset, trans_date, 19),10) 
			as tgltrans from gte_folio where linker=? 
			order by mutasi_date desc', array($norek));
		foreach ($query as $querys){
			$amount = $querys->credit + $querys->debit;
			if ($querys->trans_code == "01"){
				$remark = "Setor Tunai";
			}elseif ($querys->trans_code == "02"){
				$remark = "Tarik Tunai";
			}elseif ($querys->trans_code == "05"){
				$remark = "Bunga Tabungan";
			}
			$trsno = trim($querys->trans_no);
			if ($trsno == ""){
				$trsno = $querys->bill_no;
			}
			$data .= $norek .'<>'. $nasabah .'<>'. $querys->tgltrans 
				.'<>'. $trsno .'<>'. $amount
				.'<>'. $remark .'{#}';            
		}
		return $data;
	}

	public static function Gio_GetConfig() {
		$_REQUEST['attributes']['max_transfer'] = 0;
		$query = DB::select('select *,left(CONVERT(datetimeoffset, getdate(), 19),10)as trans_date from gum_config');
		foreach ($query as $querys){
			$_REQUEST['attributes']['audit_date'] = substr($querys->audit_date,0,10);
			$_REQUEST['attributes']['trans_date'] = $querys->trans_date;
		}

		$query = DB::select('select * from gmob_nasabah where imei_code=?', array($GLOBALS['client_id']));
		foreach ($query as $querys){
			$_REQUEST['attributes']['max_transfer'] = $querys->max_transfer;			
		}

		return $query;
	}

	public static function Get_BankList() {
		$query = DB::select('select * from gcore_bankcode order by bank_code');
		$bank = "";
		foreach ($query as $querys){
			$bank .= trim($querys->bank_code) .'<>'. trim($querys->bank_name)  .'{#}';
		}
		return $bank;
	}

	public static function Get_PPOBProduct() {
		$query = DB::select('select * from gppob_produk order by type, idx');
		$product = "";
		foreach ($query as $querys){
			$product .= trim($querys->type) .'<>'. trim($querys->code) 
				.'<>'. $querys->name .'{#}';
		}
		return $product;
	}

	public static function Gio_GetDepositPPOB() {
		$saldo = 0;
		$query = DB::select('select sum(debit-credit) as Saldo 
			from gppob_transaction');
		foreach ($query as $querys){
			$saldo = $querys->Saldo;
		}
		return $saldo;
	}

	public static function Check_StatusTabungan($norek) {
		$status = "";
		$query = DB::select('select * from GTb_Nasabah where linker = ?', array($norek));
		foreach ($query as $querys){
			$status = $querys->status;
		}
		return $status;

	}

	public static function Gio_InsTransaksiPPOB($data){
		$query = DB::update('insert into gmob_payment (trans_code,
			trans_number,trans_date,norek,product_code,product_name,
			nominal,admin,customer,ref_no) 
			values (?,?,?,?,?,?,?,?,?,?)', $data);
		return $query;
	}

	public static function Gio_SetParam(){
		$param = array(
			'nasabah' => "", 'norek' => "", 'noid' => "", 'pin' => "", 
			'aes_key' => "", 'aes_iv' => "", 'aes_cs' => "",
			'client_id' => "", 'timestamp' => "", 'partner_id' => "",
			'jenis' => "", 'respon_saldo' => 0, 'msg_saldo' => "",
			'reference' => "", 'respon_msg' => "", 'transfer_cost' => 0,
			'audit_date' => "", 'trans_date' => "", 'max_transfer' => 0,
			'version' => "", 'tagihan_ppob' => 0, 'admin_ppob' => 0
		);
		return $param;
	}
}