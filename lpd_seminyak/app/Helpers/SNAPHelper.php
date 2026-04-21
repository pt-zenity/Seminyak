<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use app\Helpers\MBankingHelper;

class SNAPHelper {

	public static function checkTransferVA($request) {
		$serviceCode = "24";
		$strCommand = "inquiryTranserIn";
		$endPoinUrl = "/v1.0/transfer-va/inquiry";
		$cari = "payment";
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$serviceCode = "25";
			$strCommand = "postingTranserIn";
			$endPoinUrl = "/v1.0/transfer-va/payment";
		}			

		$data_string = $request->getContent();
		$json = json_decode($data_string, true);
		$body = preg_replace( "/\s/", "", $data_string);
		$noip = MBankingHelper::checkClientIP();

		self::Gio_InsertInquiryLog($request, $serviceCode);
		try {

			$_REQUEST['attributes']['http_code'] = "";
			$_REQUEST['attributes']['case_code'] = "";
			$_REQUEST['attributes']['resp_msg'] = "";
			Session::put('serviceCode', $serviceCode);

			$prefix = $json['partnerServiceId'];
			$virtualNo = $json['virtualAccountNo'];
			$customerNo = $json['customerNo'];
			$terminalType = $json['additionalInfo']['terminalType'];
			$terminalId = $json['additionalInfo']['terminalId'];

			$bodyminify = str_replace(env('BPD_PREFIX'), '  '.env('BPD_PREFIX'), $body);
			$data = $bodyminify;

			$bodysha = hash("sha256", $data);
			$timeStamp = $request->header('X-TIMESTAMP');
			$signature = $request->header('X-SIGNATURE');
			$partnerID = $request->header('X-PARTNER-ID');
			$accessToken = str_replace("Bearer ", "", $request->header('Authorization'));
			$checkToken = self::Gio_CheckToken($accessToken);

			Session::put('token', $accessToken);
			$method = "POST";
			$cs = env("CLIENT_SECRET");
			$strToSign = $method. ":" .$endPoinUrl. ":" .$accessToken. ":" .$bodysha. ":" .$timeStamp;
			$signHash = base64_encode(hash_hmac("sha512", $strToSign, $cs, true));	

			$uri = $_SERVER['REQUEST_URI'];
			if ($noip == ENV("BPD_STATICIP1") || $noip == ENV("BPD_STATICIP2") || 
				$noip == ENV("BPD_STATICIP3") || $noip == ENV("BPD_STATICIP4") || 
				$noip == ENV("BPD_STATICIP5") || $noip == ENV("BPD_STATICIP6") || 
				$noip == ENV("BPD_STATICIP7") || $noip == ENV("BPD_STATICIP8") ||
				$noip == ENV("GIO_STATICIP1")){
				$seek = "sukses";
			}else{
				$seek = "not-ip";
			}		
			
			//$signHash = preg_replace('/[^\da-z]/i', '', $signHash);
			//$signature = preg_replace('/[^\da-z]/i', '', $signature);
			if ($signHash != $signature){
				$seek = "invalid-signature";
			}else if( $checkToken == 0 ){
				$seek = "invalid-token";
			}
			
			TransferHelper::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			return [
				"Code"   			=> $rc,
				"Description" 		=> $_REQUEST['attributes']['resp_msg']
			];	

		} catch (\Exception $e) {
			$seek = "not-error";
			TransferHelper::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			//TransferHelper::Gio_InsTransferVALog("IQIN", $virtualNo, "", 0,
			//	$rc, $_REQUEST['attributes']['resp_msg'], 
			//	$strCommand, $refNo);
			return [
					"Code"   			=> $rc,
					"Description" 		=> $_REQUEST['attributes']['resp_msg']
				];	
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
		if ( (trim($_GET['partnerServiceId']) != env("BPD_PREFIX")) || (strcmp($_GET['partnerServiceId'], str_pad(env("BPD_PREFIX"), 8, " ", STR_PAD_LEFT)) > 0) ){
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

		$query = "insert into gtb_folio (linker, mutasi_date, group_code, 
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
		$query = "insert into gak_mutasi (mutasi_date, modul_code, 
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

		$query = "delete gtb_folio where linker = :linker and 
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

		$query = "delete gak_mutasi where linker = :linker and 
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

		$query = "insert into gcore_transfer (transfer_code,
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
		$query = DB::select('select * from Giosoft_Mobile.dbo.users 
			where name=?', array($name));
		$sandi = "";
		$check = false;
		foreach ($query as $querys){
			$sandi = $querys->password;
		}
		if ( $sandi == $pass ){ $check = true;}
		return $check;
	
	}

	public static function Gio_CheckToken($token) {
		$tkn = "";
		$query = DB::select('select * from gmob_token where token=?', array($token));
		$check = 0;
		foreach ($query as $querys){
			$tkn = $querys->token;
		}
		if ($token == $tkn){
			$check = 1;
		}
		return $check;
	
	}

	public static function Gio_GetReferenceVA($code) {

		$tgl = self::Gio_GetAuditDate();
		$date = substr($tgl, 0, 10);
		$ref = "";
		$query = DB::select('select * from gak_mutasi where mutasi_date=? and 
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
		$urlBase = "https://lpdseminyak.biz.id:8000";

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

	public static function Gio_InsertInquiryLog($request, $serviceCode){

		$data_string = $request->getContent();
		$json = json_decode($data_string, true);
		$body = preg_replace( "/\s/", "", $data_string);
		$urlBase = "https://lpdseminyak.biz.id:8000";

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
		$info .= "No. TUJUAN:\n";
		$info .= trim($json['virtualAccountNo']) . "\n";

		if ($serviceCode == "24"){
			Log::useDailyFiles(storage_path().'/logs/transfer-in/inquiry/' .$request->header('X-EXTERNAL-ID'). '.log');
			Log::info($info);		
		}else{
			Log::useDailyFiles(storage_path().'/logs/transfer-in/posting/' .$request->header('X-EXTERNAL-ID'). '.log');
			Log::info($info);		
		}	

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
	
}