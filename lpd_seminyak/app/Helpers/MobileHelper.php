<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MobileHelper {

	public static function Change_Password($imei, $pass) {
		$new = "";
		$ins = DB::update('update gmob_nasabah set pass_crypto=? where imei_code=?', 
			array($pass, $imei));				
		$query = DB::select('select * from gmob_nasabah where imei_code=?',
			array($imei));
		foreach ($query as $querys){
			$new = $querys->pass_crypto;
		}

		return $new;
	}

	public static function Change_PIN($imei, $pin) {
		$new = "";
		$ins = DB::update('update gmob_nasabah set pin_crypto=? where imei_code=?', 
			array($pin, $imei));				
		$query = DB::select('select * from gmob_nasabah where imei_code=?',
			array($imei));
		foreach ($query as $querys){
			$new = $querys->pin_crypto;
		}

		return $new;
	}

	public static function Check_Password($id, $user, $pswd) {
		$query = DB::select('select * from gmob_nasabah where noid=?',  array($id));
		$pas = "";
		$usr = "";
		$sts = "";
		$status = "X";
		foreach ($query as $querys){
			$sts = $querys->status;
			$usr = $querys->username;
			$pas = $querys->pass_crypto;
		}
		if ( $sts == "B"){
			$status = $sts;
		}else{
			if ($user == $usr && $pswd == $pas){
				$status = $sts;
			}
		}
		return $status;
	}

	public static function Update_Status($status, $noid) {
		$ins = DB::update('update gmob_nasabah set status=? where noid=?', 
			array($status, $noid));				
		return $ins;
	}

	public static function SaveResponseLog($response){

		$date = Carbon::now('Asia/Jakarta')->addDay(0)->addHour(-14);
		$info = 'Laravel Info ['.$date.'] Response:'.$response;
		Log::useDailyFiles(storage_path().'/logs/Response.log');
		Log::info($info);			

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
	
	public static function Check_Register($name, $pass, $imei, $scramble) {
		$query = DB::select('select * from gmob_nasabah where username=? and pass_crypto=?',
			array($name, $pass));
		$statusrek = "X";
		foreach ($query as $querys){
			$_REQUEST['attributes']['nasabah'] = $querys->nama;
			$_REQUEST['attributes']['norek'] = $querys->norek;
			$_REQUEST['attributes']['noid'] = $querys->noid;
			$_REQUEST['attributes']['pin'] = $querys->pin_crypto;
			$statusrek = $querys->status;
		}
		if ($statusrek == "R"){
			$ins = DB::update('update gmob_nasabah set status=?, 
				imei_code=?, scramble_code=? where noid=?', 
				array('A', $imei, $scramble, $_REQUEST['attributes']['noid']));				
		}
		return $statusrek;
	}

	public static function Check_OTP($id, $otp) {
		$query = DB::select('select * from gmob_nasabah where noid=?',
			array($id));
		$statusrek = "X";
		$code = "";
		foreach ($query as $querys){
			$_REQUEST['attributes']['nasabah'] = $querys->nama;
			$_REQUEST['attributes']['norek'] = $querys->norek;
			$_REQUEST['attributes']['noid'] = $querys->noid;
			$_REQUEST['attributes']['pin'] = $querys->pin_crypto;
			$_REQUEST['attributes']['phone'] = $querys->phone;
			$statusrek = $querys->status_reg;
			$code = $querys->otp;
		}
		if ($code != $otp){
			$statusrek = "Wrong";
		}
		return $statusrek;
	}

	public static function Check_Login() {
		$status = "X";
		$query = DB::select('select * from gmob_nasabah where noid=?',
			array($_REQUEST['attributes']['noid']));
		foreach ($query as $querys){
			$status = $querys->status;
		}
		return $status;
	}

	public static function Check_UserAccess($noid, $pswd) {
		$query = DB::select('select * from gmob_nasabah where noid=? and pass_crypto=?',  array($noid, $pswd));
		$statusrek = "X";
		foreach ($query as $querys){
			$statusrek = $querys->status;
		}
		if ($statusrek != "R"){
			$_REQUEST['attributes']['rc'] = "91";
			$_REQUEST['attributes']['message'] = self::Ins_MobileLog($_REQUEST['attributes']['prefix'], $_REQUEST['attributes']['subfix'], 
			$noid, "", "", "", $pswd, 0, $_REQUEST['attributes']['rc']);

		}
		return $statusrek;
	}

	public static function Update_Password($noid, $user, $pswd, $code) {
		$otp = "";
		$_REQUEST['attributes']['message'] = 'Reset akses login belum terkonfirmasi.';
		$query = DB::select('select * from gmob_nasabah where noid=?',
			array($noid));
		foreach ($query as $querys){
			$otp = $querys->otp;
		}
		if ($otp == $code){
			$_REQUEST['attributes']['message'] = 'Data berhasil diupdate.';
			$ins = DB::update('update gmob_nasabah set
				username=?,pass_crypto=?,otp=? where noid=?', 
				array($user,$pswd,'',$noid));				
		}

		return $otp;
	}

	public static function Update_Unique($imei, $key) {
		$ins = DB::update('update gmob_nasabah set unique_key=? where 
			imei_code=?', array($key,$imei));				
		return true;
	}

	//Smartindo-SNAP
	public static function Gio_GetServerDate() {

		$tgl = date("Y-m-d H:i:s");
		return $tgl;
	}

	public static function Gio_GetPeriode() {

		$query = DB::select('select left(left(CONVERT(datetimeoffset, getdate(), 19),19),7) as periode');
		$per = "";
		foreach ($query as $querys){
			$per = $querys->periode;
		}
		return $per;
	}

	public static function Gio_GetNoReferensi() {
		$periode = self::Gio_GetPeriode();
		$noref = "";
		$query = DB::select('select * from gmob_counter where periode=?', array($periode));
		if ($query){
			$ins = DB::update('update gmob_counter set counter=counter+?', array(1));				
		}else{
			for ( $i=1; $i<100; $i++){
				$prefix = substr(uniqid(rand(), FALSE), 0, 8);
			}
			$ins = DB::update('insert into gmob_counter (periode,prefix,counter) values (?,?,?)', array($periode,$prefix,1));				
		}
		$query2 = DB::select('select * from gmob_counter where periode=?', array($periode));
		foreach ($query2 as $querys){
			$prefix = $querys->prefix;
			$no = $querys->counter;
		}
		$noref = 'KT' . $prefix . $no;
		return $noref;
	}

	public static function Get_ReffNo($prefix, $date, $postfix) {

		$sdate = substr(str_replace('-','',$date),0,8) . substr(str_replace(':','',$date),-6);
		$refno = $prefix ."-". str_replace(' ','',$sdate) .'-'. $postfix;
		return $refno;
	}

	public static function Get_ResponseDesc($no) {
		$query = DB::select('select * from gmob_responcode where resp_code = ?', array($no));
		$resp = "";
		foreach ($query as $querys){
			$resp = $querys->resp_desc;
		}
		return $resp;
	
	}
		
	public static function Ins_MobileLog($date, $norek, $data){

		$query = DB::update('insert into gmob_log (log_date,norek,data)
			values (?,?,?)', array($date, $norek, $data));	
		return $query;
	}


	public static function Get_SetupBank() {
		$query = DB::select('select * from gcore_bankcode order by bank_code');
		$resp = "";
		foreach ($query as $querys){
			//$resp .= '['. $querys->bank_code .'#'. $querys->bank_name .']';
			$resp .= $querys->bank_code .'-'. $querys->bank_name .'#';
		}
		return $resp;
	
	}

	public static function Get_BankList() {
		$query = DB::select('select * from gcore_bankcode order by bank_code');
		$bank = "";
		foreach ($query as $querys){
			$bank .= $querys->bank_code .'-'. $querys->bank_name  .'#';
		}
		return $bank;
	}

	public static function Get_PPOBProduct() {
		$query = DB::select('select * from gppob_product');
		$product = "";
		foreach ($query as $querys){
			$product .= trim($querys->type) .';'. trim($querys->code) .';'. $querys->name .';'. 
				$querys->nominal .';'. $querys->admin .'#';
		}
		return $product;
	}

	public static function Get_AppDisplay() {
		$query = DB::select('select * from gmob_display');
		$display = "";
		foreach ($query as $querys){
			$display .= $querys->java_class .';'. $querys->class_function .';'. 
				$querys->document_part .';'. $querys->variable_label .';'. 
				$querys->variable_key .';'. $querys->idx .'#';
		}
		return $display;
	}
	
	public static function checkTimestamp($timestamp){
		try {
			$pattern_date ='[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])';
			$pattern_time = 'T(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]';
			$pattern_zone = 'Z(-[0-1][0-9]:(0|3)0|\+[0-1][0-9]:(0|3|4)(0|5))';
			$pattern = '/^'.$pattern_date.$pattern_time.$pattern_zone.'$/i';
			$check_timestamp = preg_match($pattern,$timestamp);
			if (!$check_timestamp) {
				return [
					"status"    => "fail",
					"message"   => "Timestamp Invalid."
				];
			}
			return [
				"status"    => "success",
				"message"   => "Timestamp Valid."
			];
		} catch (\Exception $e) {
			return [
				"status"    => "fail",
				"message"   => "Some Error Occurs."
			];
		}
	}
		
	public static function Gio_Decode($data){

		//$value = substr($data, 0, strlen($data)-3);
		$pointer = substr($data, 0, 9);
		$points = substr($pointer, -4);
		$start = substr($points, 0, 2);
		$end = substr($points, -2);
		$s = ord(substr($start,0,1)) - 64;
		$e = ord(substr($end,0,1)) - 96;
		$st = $s.substr($start,-1);
		$en = $e.substr($end,-1);
		$pass = env("PASS_KEY");
		$key = substr($pass, intval($st), intval($en));
		$ori = str_replace($pointer, '', $data);
		$ori = str_replace($key, '', $ori);
		//$ori = $ori . substr($data, -3);
		return base64_decode($ori);

	}

	public static function getToken($token, $imei) {

		$url = "http://giosoftech.com/lpdseminyak/public/api/host-seminyak/getToken";

		//hash_code -> harus ada
		$data = array(
    		"token" => $token,	
			"imei_code" => $imei,
    		"hash_code" => "",	
    	);		
    	$data_string = json_encode($data);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json')
		);
		$output = curl_exec($ch);
		$result = json_decode($output, true);
		curl_close($ch);
		return $result;
	}

	public static function ATM_GetToken($accNo, $dateTime) {
		$token = "invalid";
		$query = DB::select('select top 1 * from gmob_token where account_no=? 
			and status=? and date_time<? order by id desc', 
			array($accNo, 'open', $dateTime));
		foreach ($query as $querys){
			$token = $querys->token;
		}
		return $token;
	}

	public static function ATM_ValidToken($accNo, $token) {
		$status = "closed";
		$query = DB::select('select * from gmob_token where account_no=? 
			and token=?', 
			array($accNo, $token));
		foreach ($query as $querys){
			$status = $querys->status;
		}
		return $status;
	}

	public static function Gio_GetSaldoTab($norek) {
		$query = DB::select('select sum(credit-debit) as Saldo from gtb_folio where linker=?', array($norek));
		$sisa = 0;
		foreach ($query as $querys){
			$sisa = $querys->Saldo;
		}
		return $sisa;
	}

	public static function Gio_InsertIntoFolio($dbc, $linker, $mutasiDate, 
		$transCode, $debit, $credit, $saldo, $billNo, $userID, $entryTime, 
		$transNo, $remark, $debitVal, $dateTime){

		$query = "insert into gtb_folio (linker, mutasi_date, group_code, 
			trans_code,amount, bill_no,userid, entry_time, debit, credit, 
			remark, trans_no,saldo,debit_val,cash_val, merchant_code) values
			(:linker, :mutasi_date, :group_code, :trans_code, :amount,
			:bill_no, :userid, :entry_time, :debit, :credit, :remark,
			:trans_no, :saldo, :debit_val, :cash_val, :merchant_code)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':linker', $linker);
		$stmt->bindValue(':mutasi_date', $mutasiDate);
		$stmt->bindValue(':group_code', 'A1');
		$stmt->bindValue(':trans_code', $transCode);
		$stmt->bindValue(':amount', $debit+$credit);
		$stmt->bindValue(':bill_no', $billNo);
		$stmt->bindValue(':userid', $userID);
		$stmt->bindValue(':entry_time', $entryTime);
		$stmt->bindValue(':debit', $debit);
		$stmt->bindValue(':credit', $credit);
		$stmt->bindValue(':remark', $remark);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->bindValue(':saldo', $saldo);
		$stmt->bindValue(':debit_val', $debitVal);
		$stmt->bindValue(':cash_val', 'F');
		$stmt->bindValue(':merchant_code', $dateTime);
		$stmt->execute();

		return $stmt;
	}

	public static function Gio_InsertIntoMutasi($dbc, $linker, $mutasiDate,
		$amount, $saldo, $billNo, $userID, $entryTime, $transNo, 
		$destName, $accNo, $modulCode, $refNo, $debit, $description, $dateTime){

		$query = "insert into gak_mutasi (mutasi_date, modul_code, 
			account_no, group_code, linker, remark, amount, saldo,
			debit_val, cash_val, bill_no, userid, entry_time, remark2, 
			trans_no, trans_status, trans_datetime) values
			(:mutasi_date, :modul_code, :account_no, :group_code, :linker, 
			:remark, :amount, :saldo, :debit_val, :cash_val, :bill_no, 
			:userid, :entry_time, :remark2, :trans_no, :trans_status, :trans_datetime)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':mutasi_date', $mutasiDate);
		$stmt->bindValue(':modul_code', $modulCode);
		$stmt->bindValue(':account_no', $accNo);
		$stmt->bindValue(':group_code', 'A1');
		$stmt->bindValue(':linker', $linker);
		$stmt->bindValue(':remark', $destName);
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':saldo', $saldo);
		$stmt->bindValue(':debit_val', $debit);
		$stmt->bindValue(':cash_val', 'T');
		$stmt->bindValue(':bill_no', $billNo);
		$stmt->bindValue(':userid', $userID);
		$stmt->bindValue(':entry_time', $entryTime);
		$stmt->bindValue(':remark2', $description);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->bindValue(':trans_status', '00');
		$stmt->bindValue(':trans_datetime', $dateTime);
		$stmt->execute();
		return $stmt;

	}

	public static function Gio_DeleteFolio($dbc, $transID, $dateTime){

		$status = false;
		$transNo = "";
		$query = "delete gtb_folio where merchant_code = :merchant_code and 
			trans_no = :trans_no";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':merchant_code', $dateTime);
		$stmt->bindValue(':trans_no', $transID);
		$stmt->execute();

		$query = DB::select('select * from gtb_folio where merchant_code=?
			and trans_no=?', array($dateTime, $transID));
		foreach ($query as $querys){
			$transNo = $querys->trans_no;
		}

		if ($transNo == ""){
			$status = true;
		}
		return $status;
	}

	public static function Gio_DeleteMutasi($dbc, $transID, $dateTime){

		$status = false;
		$transNo = "";
		$query = "delete gak_mutasi where trans_datetime = :trans_datetime and 
			trans_no = :trans_no";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':trans_datetime', $dateTime);
		$stmt->bindValue(':trans_no', $transID);
		$stmt->execute();

		$query = DB::select('select * from gak_mutasi where trans_datetime=?
			and trans_no=?', array($dateTime, $transID));
		foreach ($query as $querys){
			$transNo = $querys->trans_no;
		}

		if ($transNo == ""){
			$status = true;
		}
		return $status;

	}

	public static function Gio_GetAuditDate() {

		$logStatus = "";
		$auditDate = "";
		$query = DB::select('select * from gum_config');
		foreach ($query as $querys){
			$auditDate = $querys->audit_date;
		}
		$query = DB::select('select * from gak_bookstatus where mutasi_date=?', array($auditDate));
		foreach ($query as $querys){
			$nextDate = $querys->next_date;
			$logStatus = $querys->status;
		}
		if ($logStatus == "Wait"){
			$auditDate = $nextDate;
		}
		return $auditDate;
	}

}