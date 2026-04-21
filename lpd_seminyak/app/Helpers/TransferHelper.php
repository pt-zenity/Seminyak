<?php

	namespace App\Helpers;
	use Illuminate\Support\Facades\DB;
	use Carbon\Carbon;

	class TransferHelper {

	public static function checkTransferIn($request) {
		$noip =self::checkClientIP();
		$cmd = "inquiryTransferIn";
		$cari = "posting";
		$data = json_decode($request->getContent(), true);	
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
			$cmd = "postingTransferIn";
		}			
		try {
			if ($noip == ENV("BPD_STATICIP1") || $noip == ENV("BPD_STATICIP2") || 
				$noip == ENV("BPD_STATICIP3") || $noip == ENV("BPD_STATICIP4") ||
				$noip == ENV("BPD_STATICIP5") || $noip == ENV("BPD_STATICIP6") ||
				$noip == ENV("BPD_STATICIP7") ||
				$noip == ENV("VPS_STATICIP")  || $noip == ENV("GIO_STATICIP1")
				){
			}else{
				$rc = "32";
				$msg = TransferHelper::Gio_InsTransferlog($data['referenceNumber'], 
				$data['dateTime'], $data['accountNumber'], '', $rc, $cmd);
				return [
					"Code"   			=> $rc,
					"Description" 		=> 'No. IP Sumber '.$noip .' tidak dikenal !'
				];
			}		
			$datas = $data['accountNumber'].$data['amount'].$data['dateTime'].$data['referenceNumber'].
				$data['terminalType'].$data['terminalId'].ENV("BPD_HASHCODE");
			$hashcode = hash('sha256', $datas, false);
			if ($hashcode !== $data['hashCode']){
				$rc = "30";
				$msg = TransferHelper::Gio_InsTransferlog($data['referenceNumber'], 
				$data['dateTime'], $data['accountNumber'], '', $rc,$cmd);
				return [
					"Code"   			=> $rc,
					"Description"   	=> $datas
				];
			}else{
				return [
						"Code"   			=> "00",
						"Description"   	=> "Hashcode valid."
				];
			}
		} catch (\Exception $e) {
			$rc = "24";
			$msg = TransferHelper::Gio_InsTransferlog($data['referenceNumber'], 
			$data['dateTime'], $data['accountNumber'], '', $rc,$cmd);
			return [
						"Code"   			=> $rc,
						"Description"   	=> $msg
			];
		}
	}
	
	public static function Gio_GetNasabah($va) {
		$query = DB::select('select * from gtb_nasabah where linker = ?', array($va));
		foreach ($query as $querys){
			$_REQUEST['attributes']['customer_name'] = $querys->nasabah;
			$_REQUEST['attributes']['customer_code'] = $querys->linker;
			$_REQUEST['attributes']['customer_status'] = $querys->status;
		}
		return $query;
	}

	public static function Gio_GetResponseDesc($no) {
		$query = DB::select('select * from gmob_responcode where resp_code = ?', array($no));
		$resp = "";
		foreach ($query as $querys){
			$resp = $querys->resp_desc;
		}
		return $resp;

	}

	public static function Gio_GetSaldoTab($norek) {
		$query = DB::select('select sum(credit-debit) as Saldo from gtb_folio where linker=?', array($norek));
		$sisa = 0;
		foreach ($query as $querys){
			$sisa = $querys->Saldo;
		}
		return $sisa;
	}


	public static function Gio_GetDateTime() {

		$query = DB::select('select left(CONVERT(datetimeoffset, getdate(), 19),19) as audit_date');
		$tgl = "";
		foreach ($query as $querys){
			$tgl = $querys->audit_date;
		}
		return $tgl;
	}

	public static function Gio_InqTransferIn($data){

		$query = DB::update('insert into gcore_transfer (transfer_code,transfer_date,transfer_type,norek,accountNumber,
			amount,dateTimes,referenceNumber,terminalType,terminalId,hashCode,nasabah,responseCode,
			responseDescription,serviceType) 
			values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', $data);
			
		return $query;
	}

	public static function Gio_PostTransferIn($data, $code){

		$query = DB::update('insert into gcore_transfer (transfer_code,transfer_date,transfer_type,norek,accountNumber,
			amount,dateTimes,referenceNumber,terminalType,terminalId,hashCode,nasabah,serviceType) 
			values (?,?,?,?,?,?,?,?,?,?,?,?,?)', $data);
			
		$query = DB::select('select * from gcore_transfer where transfer_code=?',array($code));
		foreach ($query as $querys){
			$status = $querys->responseCode;
		}
			
		return $status;
	}

	public static function Gio_GetTransferCode($code) {
		$query = DB::select('select * from gcore_transfer where serviceType=? and referenceNumber=?', array('Post',$code));
		return $query;
	}

	public static function Gio_InsTransferLog($code, $tgl, $no, $name, $rc, $cmd){

		$msg = self::Gio_GetResponseDesc($rc);
		$date = substr($tgl,0,4) .'-'. substr($tgl,4,2) .'-'. substr($tgl,6,2) .' '. substr($tgl,8,2) .':'. substr($tgl,10,2) .':'. substr($tgl,12,2);
		$query = DB::update('insert into gcore_log (transfer_code,
			transfer_date,accountNumber,accountName,message,responsecode,
			command) values (?,?,?,?,?,?,?)', 
			array($code,$date,$no,$name,$msg,$rc,$cmd));	
		return $msg;
	}

	//Samrtindo-SNAP
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

	public static function Gio_ScanData($query, $data) {
		$query = DB::select($query, $data);
		return $query;
	}

	public static function Ins_TransferARLog($prefix, $postfix, $norek, $name, $tonorek, $toname, $bankcd, $banknm,
		$amount, $rc){

		$date = DatabaseHelper::Gio_GetServerDate();
		$code = MobileHelper::Get_ReffNo($prefix, $date, $postfix);
		$msg = MobileHelper::Get_ResponseDesc($rc);
		$query = DB::update('insert into gmob_transferlog (trans_date,from_norek,from_name,to_norek,to_name,bankcode,bankname,
			amount,trans_no,rc,response) values (?,?,?,?,?,?,?,?,?,?,?)', 
			array($date, $norek, $name, $tonorek, $toname, $bankcd, $banknm, $amount, $code, $rc, $msg));	
		return $msg;
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
		$query = DB::select('select * from gcore_respcodeSnap where seek_code = ?', array($seek));
		foreach ($query as $querys){
			$_REQUEST['attributes']['http_code'] = $querys->http_code;
			$_REQUEST['attributes']['case_code'] = $querys->case_code;
			$_REQUEST['attributes']['resp_msg'] = $querys->resp_msg;
		}
		return;
	}

	public static function Gio_InsTransferVALog($code, $no, $name, 
		$amount,$rc, $msg, $cmd, $refNo){

		$tgl = Carbon::now('Asia/Makassar')->format('Y-m-d H:m:s'); 
		$date = substr($tgl, 0, 10);
		$time = str_replace(":", "", substr($tgl, -8));
		$tcode = $code .'-'. str_replace("-","",$date) .$time; 
		$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();
		$query = "insert into gcore_log (transfer_code,transfer_date,
			accountNumber,accountName,amount,message,responsecode,command,
			referenceNumber) values (:transfer_code,:transfer_date,
			:accountNumber,:accountName,:amount,:message,:responsecode,
			:command,:referenceNumber)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':transfer_code', $tcode);
		$stmt->bindValue(':transfer_date', $tgl);
		$stmt->bindValue(':accountNumber', $no);
		$stmt->bindValue(':accountName', $name);
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':message', $msg);
		$stmt->bindValue(':responsecode', $rc);
		$stmt->bindValue(':command', $cmd);
		$stmt->bindValue(':referenceNumber', $refNo);
		$stmt->execute();

		return $stmt;

	}

		
	public static function Gio_PostTransferVA($data, $code){
	
		$query = DB::update('insert into gcore_transfer (transfer_code,
			transfer_date,transfer_type,norek,accountNumber,
			amount,dateTimes,referenceNumber,terminalType,terminalId,
			hashCode,destinationAccountName,serviceType) 
			values (?,?,?,?,?,?,?,?,?,?,?,?,?)', $data);
			
		$query = DB::select('select * from gcore_transfer where transfer_code=?',array($code));
		foreach ($query as $querys){
			$status = $querys->responseCode;
		}
			
		return $status;
	}
	
}