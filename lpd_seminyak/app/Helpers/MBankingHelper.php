<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class MBankingHelper {

	public static function checkAccess($request) {
		$serviceCode = "21";
		$strCommand = "";
		$bolRegister = false;
		$path = "tabungan";
		$cari = "access";
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$path = $cari;
		}
		$cari = "transfer-lpd";
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$path = $cari;
		}
		$cari = "register";
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$bolRegister = true;
		}

		$data_string = $request->getContent();
		$json = json_decode($data_string, true);
		$noip = self::checkClientIP();

		try {

			$_REQUEST['attributes'] = self::SetParam();	
			Session::put('serviceCode', $serviceCode);
			$customerID = self::Gio_Decrypt($json['customer_id']);
			if ($bolRegister){
				$namepass = explode('{&}', $customerID);
				$username = $namepass[0];
				$password = $namepass[1];
				$password = md5($password);
				$scramble = self::Gio_GetScrambleCode($username, $password);
				$_REQUEST['attributes']['username'] = $username;
				$_REQUEST['attributes']['password'] = $password;
				$_REQUEST['attributes']['scramble_code'] = $scramble;	
			}else{
				$_REQUEST['attributes']['noid'] = $customerID;
			}

			$timeStamp = $request->header('X-TIMESTAMP');
			$signature = $request->header('X-SIGNATURE');
			$partnerID = $request->header('X-PARTNER-ID');
			$externalID = $request->header('X-EXTERNAL-ID');
			$deviceID = $request->header('X-DEVICE-ID');
			$accessToken = str_replace("Bearer ", "", $request->header('Authorization'));
			$checkToken = self::Gio_CheckToken($accessToken);

			$partnerID = self::Gio_Decode($partnerID, $timeStamp);
			$exTime = $externalID .'&&'. $timeStamp;
			$deviceID = self::Gio_Decode($deviceID, $timeStamp);

			Session::put('partnerID', $partnerID);
			$_REQUEST['attributes']['partnerID'] = $partnerID;
			$_REQUEST['attributes']['externalID'] = $externalID;

			$strToSign = $partnerID. "|" .$accessToken;
			$signHash = base64_encode(hash_hmac("sha512", $strToSign, 
				env("CLIENT_SECRET")));	

			Session::put('strToSign', $strToSign);

			$whiteList = env('BPD_WHITE_LIST').env('GIO_WHITE_LIST');
			if(preg_match("/$noip/i", $whiteList)) {
				$seek = "sukses";
			}else{
				$seek = "not-ip";
			}
					
			if ($signHash != $signature){
				$seek = "invalid-signature";
			}else if( $checkToken == 0 ){
				$seek = "invalid-token";
			}else if( $exTime != $deviceID ){
				$seek = "invalid-format";
			}
			
			self::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			$aResponse = array(
				"Code"   			=> $rc,
				"Description" 		=> $_REQUEST['attributes']['resp_msg']
			);
			//self::Gio_InsRequestLog($request, json_encode($aResponse), $path);
			return $aResponse;

		} catch (\Exception $e) {
			$seek = "not-error";
			self::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			$aResponse = array(
				"Code"   			=> $rc,
				"Description" 		=> $_REQUEST['attributes']['resp_msg']
			);
			//self::Gio_InsResponseLog(json_encode($aResponse), $path);
			return $aResponse;
		}
	}

	public static function SetParam(){
		$param = array(
			'nasabah' => "", 'status' => "", 'saldo' => 0, 'rc' => "", 
			'message' => "", 'prefix' => "", 'subfix' => "", 'norek' => "", 
			'noid' => "", 'pin' => "", 'phone' => "", 'http_request' => "",
			'username' => "", 'password' => "", 'scramble_code' => "",
			'partnerID' => "", 'externalID' => "", 'msg_saldo' => "",
			'msg_rc' => "", 'nama_to' => "", 'respon_saldo' => 0,
			'http_code' => "", 'resp_msg' => ""
		);
		return $param;
	}

	public static function checkTransferAB($request) {
		$serviceCode = "21";
		$strCommand = "";
		$path = "transfer-bank";
		$data_string = $request->getContent();
		$json = json_decode($data_string, true);
		$noip = self::checkClientIP();

		try {
			Session::put('serviceCode', $serviceCode);
			$username = $json['username'];
			$password = $json['password'];

			$timeStamp = $request->header('X-TIMESTAMP');
			$signature = $request->header('X-SIGNATURE');
			$partnerID = $request->header('X-PARTNER-ID');
			$externalID = $request->header('X-EXTERNAL-ID');
			$channelID = $request->header('CHANNEL-ID');
			$accessToken = str_replace("Bearer ", "", $request->header('Authorization'));
			$checkToken = self::Gio_CheckToken($accessToken);

			Session::put('token', $accessToken);
			Session::put('partnerID', $partnerID);
			Session::put('externalID', $externalID);
			Session::put('timeStamp', $timeStamp);
			Session::put('channelID', $channelID);

			$join = "username:" .$username ."#password:". $password;
			$body = hash("sha256", $join);
			$strToSign = $partnerID. "#" .$accessToken. "#" .$body. "#" .$timeStamp;
			$signHash = base64_encode(hash_hmac("sha512", $strToSign, 
				env("CLIENT_SECRET"), true));	

			$whiteList = env('BPD_WHITE_LIST').env('GIO_WHITE_LIST');
			if(preg_match("/$noip/i", $whiteList)) {
				$seek = "sukses";
			}else{
				$seek = "not-ip";
			}
				
			if ($signHash != $signature){
				$seek = "invalid-signature";
			}else if( $checkToken == 0 ){
				$seek = "invalid-token";
			}
			
			self::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			$aResponse = array(
				"Code"   			=> $rc,
				"Description" 		=> $_REQUEST['attributes']['resp_msg']
			);
			//self::Gio_InsRequestLog($request, json_encode($aResponse), $path);
			return $aResponse;

		} catch (\Exception $e) {
			$seek = "not-error";
			self::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			$aResponse = array(
				"Code"   			=> $rc,
				"Description" 		=> $_REQUEST['attributes']['resp_msg']
			);
			//self::Gio_InsResponseLog(json_encode($aResponse), $path);
			return $aResponse;
		}
	}

	public static function checkHeader($request){

		$serviceCode = "24";
		$cari = "payment";
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$serviceCode = "25";
		}			
		$respCode = "200".$serviceCode."00";
		$respMsg = "Success";

		$_GET = json_decode($request->getContent(), true);
		$pesan = "";
		if ($request->has('partnerServiceId') == false) { $pesan = "partnerServiceId"; }
		if ($request->has('customerNo') == false) { $pesan = "customerNo"; }
		if ($request->has('virtualAccountNo') == false) { $pesan = "virtualAccountNo"; }
		if ($serviceCode == "24") {
			if ($request->has('inquiryRequestId') == false) { $pesan = "inquiryRequestId"; }
			if ($request->has('amount.value') == false) { $pesan = "amount.value"; }
			if ($request->has('amount.currency') == false) { $pesan = "amount.currency"; }
		}
		if ($serviceCode == "25") {
			if ($request->has('paymentRequestId') == false) { $pesan = "paymentRequestId"; }
			if ($request->has('paidAmount.value') == false) { $pesan = "paidAmount.value"; }
			if ($request->has('paidAmount.currency') == false) { $pesan = "padiAmount.currency"; }
		}

		if ( $pesan != ""){
			$respCode = "400" .$serviceCode. "02";
			$respMsg = "Missing Mandatory Field {" .$pesan. "}";
		}

		$pesan = "";
		if ( (trim($_GET['partnerServiceId']) != env("BPD_PREFIX_DEV")) || (strcmp($_GET['partnerServiceId'], str_pad(env("BPD_PREFIX"), 8, " ", STR_PAD_LEFT)) > 0) ){
			$pesan = "{partnerServiceId}";
		}else if( strlen($_GET['virtualAccountNo']) != 15 ){
			$pesan = "{virtualAccountNo}";
		}

		if ( $pesan != ""){
			$respCode = "400" .$serviceCode. "02";
			$respMsg = "Missing Mandatory Field {" .$pesan. "}";
		}

		return [
			"Code"   			=> $respCode,
			"Description" 		=> $respMsg
		];
	}	

	public static function Gio_PostTransferVA($norek, $virtualNo, $amount,
		$refNo, $sourceNo, $description, $accName){
		
		$auditDate = self::Gio_GetAuditDate();
		$saldo = self::Gio_GetSaldoTabungan($norek);
		$tgl = date("Y-m-d H:i:s");
		$time = date("H:i:s");
		$billNo = date("dHis");
		$dateTime = date("YmdHis");
		$code = $refNo;
		$userID = "Core-H2H";
		$saldo = $saldo + $amount;
		if ($sourceNo != ""){
			$remark = substr($sourceNo .'-'. $description, 0, 50);
		}else{
			$remark = 'Transfer-In Ref :'. $refNo;
		}
		$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();
		
		$folio = self::Gio_InsertIntoFolio($dbc, $norek, $auditDate, $amount, $saldo, 
			$billNo, $userID, $time, $code, $remark);
		//Kredit Tabungan
		$accNo = "2.10.02";
		$mutasiDb = self::Gio_InsertIntoMutasi($dbc, $norek,$auditDate,$amount,$saldo, 
			$billNo, $userID, $time, $code, $accName, $accNo, "T", $refNo, 
			"F", $remark);
		//Debet Tabungan
		$accNo = "1.20.01";
		$mutasiKr = self::Gio_InsertIntoMutasi($dbc, $norek,$auditDate,$amount,$saldo, 
			$billNo, $userID, $time, $code, $accName, $accNo, "A", $refNo, 
			"T", $remark);

		if ($folio && $mutasiDb && $mutasiKr){
			$status = "00";
			self::Gio_InsertIntoCoreTransfer($dbc, $code, $norek, 
				$virtualNo, $amount, $dateTime, $refNo, $accName,
				$sourceNo, $description);
		}else{
			$status = "01";
			self::Gio_DeleteFolio($dbc, $norek, $auditDate, $code);
			self::Gio_DeleteMutasi($dbc, $norek, $auditDate, $code);
		}
		return $status;
	}

	public static function Gio_InsertIntoFolio($dbc, $linker, $mutasiDate, $amount, 
		$saldo, $billNo, $userID, $entryTime, $transNo, $remark){

		$query = "insert into Giosoft_Dev.dbo.gtb_folio (linker, mutasi_date, group_code, 
			trans_code,amount, bill_no,userid, entry_time, debit, credit, 
			remark, trans_no,saldo,debit_val,cash_val) values
			(:linker, :mutasi_date, :group_code, :trans_code, :amount,
			:bill_no, :userid, :entry_time, :debit, :credit, :remark,
			:trans_no, :saldo, :debit_val, :cash_val)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':linker', $linker);
		$stmt->bindValue(':mutasi_date', $mutasiDate);
		$stmt->bindValue(':group_code', 'TB');
		$stmt->bindValue(':trans_code', 'TI');
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':bill_no', $billNo);
		$stmt->bindValue(':userid', $userID);
		$stmt->bindValue(':entry_time', $entryTime);
		$stmt->bindValue(':debit', 0);
		$stmt->bindValue(':credit', $amount);
		$stmt->bindValue(':remark', $remark);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->bindValue(':saldo', $saldo);
		$stmt->bindValue(':debit_val', 'F');
		$stmt->bindValue(':cash_val', 'F');
		$stmt->execute();

		return $stmt;
	}

	public static function Gio_InsertIntoMutasi($dbc, $linker, $mutasiDate,
		$amount, $saldo, $billNo, $userID, $entryTime, $transNo, 
		$destName, $accNo, $modulCode, $refNo, $debit, $description){

		$remark = substr('Transfer-In : ' . $destName, 0, 50);
		$query = "insert into Giosoft_Dev.dbo.gak_mutasi (mutasi_date, modul_code, 
			account_no, group_code, linker, remark, amount, saldo,
			debit_val, cash_val, bill_no, userid, entry_time, remark2, 
			trans_no, trans_status) values
			(:mutasi_date, :modul_code, :account_no, :group_code, :linker, 
			:remark, :amount, :saldo, :debit_val, :cash_val, :bill_no, 
			:userid, :entry_time, :remark2, :trans_no, :trans_status)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':mutasi_date', $mutasiDate);
		$stmt->bindValue(':modul_code', $modulCode);
		$stmt->bindValue(':account_no', $accNo);
		$stmt->bindValue(':group_code', 'TB');
		$stmt->bindValue(':linker', $linker);
		$stmt->bindValue(':remark', $remark);
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':saldo', $saldo);
		$stmt->bindValue(':debit_val', $debit);
		$stmt->bindValue(':cash_val', 'F');
		$stmt->bindValue(':bill_no', $billNo);
		$stmt->bindValue(':userid', $userID);
		$stmt->bindValue(':entry_time', $entryTime);
		$stmt->bindValue(':remark2', $description);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->bindValue(':trans_status', '00');
		$stmt->execute();
		return $stmt;

	}

	public static function Gio_DeleteFolio($dbc, $linker, $mutasiDate, $transNo){

		$query = "delete Giosoft_Dev.dbo.gtb_folio where linker = :linker and 
			mutasi_date = :mutasi_date and 
			trans_no = :trans_no";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':linker', $linker);
		$stmt->bindValue(':mutasi_date', $mutasiDate);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->execute();

		return $stmt;
	}

	public static function Gio_DeleteMutasi($dbc, $linker, $mutasiDate, $transNo){

		$query = "delete Giosoft_Dev.dbo.gak_mutasi where linker = :linker and 
			mutasi_date = :mutasi_date and 
			trans_no = :trans_no";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':linker', $linker);
		$stmt->bindValue(':mutasi_date', $mutasiDate);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->execute();

		return $stmt;
	}

	public static function Gio_InsertIntoCoreTransfer($dbc, $code, 
		$norek, $accNo, $amount, $dateTime, $refNo,
		$accName, $sourceNo, $description){

		$query = "insert into Giosoft_Dev.dbo.gcore_transfer (transfer_code,
			transfer_type,norek,accountNumber,destinationAccountNumber,
			destinationAccountName,amount,dateTimes,referenceNumber,
			serviceType,responseCode,responseDescription) 
			values (:transfer_code,
			:transfer_type, :norek, :accountNumber, :destinationAccountNumber,
			:destinationAccountName,:amount, :dateTimes,:referenceNumber,
			:serviceType,:responseCode, :responseDescription)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':transfer_code', $code);
		$stmt->bindValue(':transfer_type', 'IN');
		$stmt->bindValue(':norek', $norek);
		$stmt->bindValue(':accountNumber', $accNo);
		$stmt->bindValue(':destinationAccountNumber', $sourceNo);
		$stmt->bindValue(':destinationAccountName', $description);
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':dateTimes', $dateTime);
		$stmt->bindValue(':referenceNumber', $refNo);
		$stmt->bindValue(':responseCode', '00');
		$stmt->bindValue(':responseDescription', 'TranferIn sukses');
		$stmt->bindValue(':serviceType', 'Data');
		$stmt->execute();

		return $stmt;
	}

	public static function Gio_CheckUser($name, $pass) {
		$query = DB::select('select * from gmob_nasabah where 
			username=? and pass_crypto=?', array($name, $pass));
		$sandi = "";
		$check = false;
		foreach ($query as $querys){
			$sandi = $querys->pass_crypto;
		}
		if ( $sandi == $pass ){
		 	$check = true;
		}
		return $check;
	
	}

	public static function Gio_CheckToken($token) {
		$check = 0;
		$query = DB::select('select * from gmob_token where token=?', array($token));
		if ($query){
			$check = 1;
		}
		return $check;
	
	}

	public static function Gio_GetReferenceVA($code) {

		$tgl = self::Gio_GetAuditDate();
		$date = substr($tgl, 0, 10);
		$ref = "";
		$query = DB::select('select * from Giosoft_Dev.dbo.gak_mutasi where mutasi_date=? and 
			trans_no=?', array($date,$code));
		foreach ($query as $querys){
			$ref = trim($querys->trans_no);
		}
		return $ref;
	}
	
	public static function Gio_CheckField($request){
		$serviceCode = "24";
		$strCommand = "inquiry";
		$cari = "payment";
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$strCommand = "payment";
			$serviceCode = "25";
		}			
        if ( $request->has('grantType') == true || $request->has('grant_type') == true) { 
			$rc = "200".$serviceCode."00";
			Session::put('respCode', $rc);
			Session::put('respMessage', "Success");
        }else{
			$rc = "400".$serviceCode."02";
			Session::put('respCode', $rc);
			Session::put('respMessage', 'Missing Mandatory Field {grantType}');
        }
		self::Gio_InsertTokenLog($request);
    }

	public static function Gio_InsertTokenLog($request){

		$data_string = $request->getContent();
		$json = json_decode($data_string, true);
		$body = preg_replace( "/\s/", "", $data_string);
		$urlBase = "https://coreseminyak.giosoftech.com:8000";

		$uri = $_SERVER['REQUEST_URI'];
		$info = "\n";
		$info .= "REQUEST : \n";
		$info .= "POST " .$urlBase.$uri. "\n";
		$info .= "Content-type:application/json\n";
		$info .= "X-TIMESTAMP:" .$request->header('X-TIMESTAMP'). "\n";
		$info .= "X-SIGNATURE:" .$request->header('X-SIGNATURE'). "\n";
		$info .= "X-CLIENT-KEY:" .$request->header('X-CLIENT-KEY'). "\n";
		$info .= "DATA:\n";
		$info .= $body . "\n";
		Log::useDailyFiles(storage_path().'/logs/token/request.log');
		Log::info($info);			

	}

	public static function Gio_InsRequestLog($request, $data, $path){

		$data_string = $request->getContent();
		$body = preg_replace( "/\s/", "", $data_string);
		$urlBase = "https://coreseminyak.giosoftech.com:8000";

		$uri = $_SERVER['REQUEST_URI'];
		$info = "\n";
		$info .= "REQUEST : \n";
		$info .= "POST " .$urlBase.$uri. "\n";
		$info .= "Content-type:application/json\n";
		$info .= "Authorization:" .$request->header('Authorization'). "\n";
		$info .= "X-TIMESTAMP:" .$request->header('X-TIMESTAMP'). "\n";
		$info .= "X-SIGNATURE:" .$request->header('X-SIGNATURE'). "\n";
		$info .= "X-PARTNER-ID:" .$request->header('X-PARTNER-ID'). "\n";
		$info .= "X-EXTERNAL-ID:" .$request->header('X-EXTERNAL-ID'). "\n";
		$info .= "CHANNEL-ID:" .$request->header('CHANNEL-ID'). "\n";
		$info .= "DATA:\n";
		$info .= $body . "\n\n";
		$info .= "RESPONSE: \n";
		$info .= $data . "\n";

		Log::useDailyFiles(storage_path().'/logs/' .$path. '/request.txt');
		Log::info($info);		

	}

	public static function Gio_InsResponseLog($data, $path){

		$info = "\n";
		$info .= "RESPONSE: \n";
		$info .= $data . "\n\n";
		
		Log::useDailyFiles(storage_path().'/logs/' .$path. '/response.txt');
		Log::info($info);		

	}

	public static function Gio_InsertInfoLog($header, $data, $path){

		$info = "\n";
		$info .= $header ."\n";
		$info .= $data . "\n\n";
		
		Log::useDailyFiles(storage_path().'/logs/' .$path);
		Log::info($info);			

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
	
	public static function Gio_GetSaldoTabungan($norek) {

		$saldo = 0;
		$query = DB::select('select sum(credit-debit) as saldo from gtb_folio where linker=?', array($norek));
		foreach ($query as $querys){
			$saldo = $querys->saldo;
		}
		return $saldo;
	}

	public static function Get_ResponseDesc($no) {
		$query = DB::select('select * from gmob_responcode where resp_code = ?', array($no));
		$resp = "";
		foreach ($query as $querys){
			$resp = $querys->resp_desc;
		}
		return $resp;
	
	}

	public static function Ins_TransferAR($data, $transno){

		$ref = "";
		$status=0;
		$query = DB::select('select * from gmob_transfer where trans_no=?', array($transno));
		foreach ($query as $querys){
			$ref = $querys->trans_no;
		}

		if ($ref == $transno){		
			$status=3;
		}else{
			$query = DB::update('insert into gmob_transfer (trans_date,
			from_norek,from_name,to_norek,to_name,amount,cost,balance,
			remark,trans_no) values (?,?,?,?,?,?,?,?,?,?)', $data);	

			$query = DB::select('select * from gmob_transfer where trans_no=?',array($transno));
			foreach ($query as $querys){
				$status = $querys->status;
			}
		}
		return $status;
	}

	public static function Gio_InsActivity($externalID, $timeStamp, $ipNo, $data) {
		$query = DB::update('insert into gmob_access (external_id,
			time_stamp, ip_no, request_uri, data) values (?,?,?,?,?)', 
			array($externalID, $timeStamp, $ipNo,  $_SERVER['REQUEST_URI'], $data));	
		return $query;	
	}

	public static function Gio_CheckActivity($externalID, $timeStamp) {
		$query = DB::select('select * from gmob_access where 
			external_id=? or time_stamp=?', array($externalID, $timeStamp));
		return $query;
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

	public static function Gio_GetRespDescSnap($seek) {
		$response = config("app.snap_response_code");
		for ($i=0; $i<count($response); $i++){
			if(preg_match("/$seek/i", $response[$i])) {
				$resp = explode("|", $response[$i]);
				$_REQUEST['attributes']['http_code'] = $resp[1];
				$_REQUEST['attributes']['case_code'] = $resp[2];
				$_REQUEST['attributes']['resp_msg'] = $resp[3];
			}
		}
		return;
	}

	public static function Gio_InsTransferOutBank($data, $transCode){
		$query = DB::update('insert into gcore_transfer (
			transfer_code,transfer_date,transfer_type,norek,nasabah,
			accountNumber,amount,dateTimes,referenceNumber,destinationBankCode,
			destinationAccountNumber,destinationAccountName,hashcode,
			responseCode,responseDescription,serviceType) values 
			(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', $data);
		
		$status = "01";
		$query = DB::select('select * from gcore_transfer where transfer_code=?',  
			array($transCode));
		foreach ($query as $querys){
			$status = $querys->responseCode;
		}
		return trim($status);
	}

	public static function Gio_DelTransferOutBank($norek, $transNo){
		$query = DB::update('delete gtb_folio where linker=? and trans_no=?',  
			array($norek, $transNo));
		$query = DB::update('delete gak_mutasi where linker=? and trans_no=?',  
			array($norek, $transNo));			
		return;
	}

	public static function Gio_GetScrambleCode($user, $pass) {
		$scr = env('SCRAMBLE');
		$query = DB::select('select * from gmob_nasabah where 
			username=? and pass_crypto=? and status=?', array($user, $pass, 'A'));
		foreach ($query as $querys){
			$scr = $querys->scramble_code;
		}
		return $scr;
	}
 	
	public static function Gio_Encrypt($key){
		$encData = Base64_encode($key .env('SCRAMBLE'));
		$pntr = self::Get_Pointer(substr($encData, 0, 1));
		$pointer = explode("-", $pntr);
		$n1 = intval($pointer[0]);
		$n2 = intval($pointer[1]);
		$si = "";
		$str = "";
		for ($i=0; $i<strlen($encData); $i++)
		{
			if ($i == $n1 || $i == $n2){
				$si .= substr($encData, $i, 1);
			}else{
				$str .= substr($encData, $i, 1);
			}
		}
		return $si . $str;
	}

	public static function Get_Pointer($alpha){
		//Valid Test : 31-01-2025
		$abjad = "ABCDEFGHIJKL";
		$Pointer = "7-15-19";
        if (strpos($abjad, $alpha) != ""){ 
			$Pointer = "6-10-18"; 
		}
		return $Pointer;
	}

	public static function Gio_Decrypt($encData){
		//Valid Test : 31-01-2025
		$enc = self::Get_Pointer(substr($encData, 2, 1));
		$pointer = explode("-", $enc);
		$n1 = intval($pointer[0]);
		$n2 = intval($pointer[1]) - 1;
		$s1 = substr($encData, 0, 1);
		$s2 = substr($encData, 1, 1);
		$str = substr($encData, 2, strlen($encData)-2);
		$crypto = "";
		for ($i=0; $i<strlen($str); $i++)
		{
			if ($i == $n1 ){
				$crypto .= $s1 . substr($str, $i, 1);
			}else if ($i == $n2){
				$crypto .= $s2 . substr($str, $i, 1);
			}else{
				$crypto .= substr($str, $i, 1);
			}
		}
		$ori = base64_decode($crypto);
		$ret = str_replace(env('SCRAMBLE'), '', $ori);
		return $ret;
	}

	public static function Gio_Decode($data, $time){
		//Valid Test : 31-01-2025
		$source = env('SCRAMBLE');
		$decData = "";
        $dec = "";
        $scramble = base64_encode($time.substr($source, 12, 6));
		if(preg_match("/$scramble/i", $data)) {
            $dec = str_replace($scramble, "", $data);
            $decData = base64_decode($dec."==");
		}else{
            $scramble = base64_encode($time.substr($source, 6, 6));
    		if(preg_match("/$scramble/i", $data)) {
                $dec = str_replace($scramble, "", $data);
                $decData = base64_decode($dec."=");
    		}else{
                $scramble = base64_encode($time.substr($source, 0, 6));
                $dec = str_replace($scramble, "", $data);
                $decData = base64_decode($dec);
    		}			
		}			
		return $decData;

	}
}