<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\MobileHelper;
use app\Helpers\TransferHelper;
use app\Helpers\MBankingHelper;
use app\Helpers\TabunganHelper;

//Check Valid : 2025-02-12
class MachineController extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('machineCheck', ['only' => 
			['CreateToken','GetToken','CekSaldo','Penarikan',
			'Penyetoran','BatalTarik','BatalSetor']]);
		
	}

	public function CreateToken(){
	
		try {

			$accountNo = $_GET['account_no'];
			$prefix = substr($accountNo, 0, 6);
			$norek = substr($accountNo, 6, 1) .'.'. substr($accountNo, 7, 6);
			$start = date("Y-m-d H:i:s");
			$end = date('Y-m-d H:i:s',strtotime('+5 minutes',strtotime($start)));
			$dtime = date('YmdHis',strtotime('+5 minutes',strtotime($start)));
			$status = "01";
			$message = "Customer ID tidak valid.";
			$statusrek = TabunganHelper::Check_StatusTabungan($norek);
			$token = "";
			
			if ($statusrek == "A" && $prefix == env('BPD_PREFIX')){

				$status = "00";
				$message = "Token Berhasil.";

				for ($i=1; $i<100; $i++){
					$token = substr(uniqid(rand(), TRUE), -6);
				}

				$query = DB::update('update gmob_token set status=? where 
				left(account_no,6)=?',
				array('closed', $prefix)); 

				$query2 = DB::update('insert into gmob_token 
				(token, start_time, end_time, account_no, date_time) values (?,?,?,?,?)', 
				array($token, $start, $end, $accountNo, $dtime));	
				
			}	

			$arrResp = array(
					"status"   	=> $status,
					"message"   => $message,
					"data"		=> $token,
			);
			return response()->json($arrResp);
			
		}catch (\exception $e) {
			$rc = "68";
			$msg =  MobileHelper::Get_ResponseDesc($rc);
			return response()->json(
			[
				"status"  => $rc,
				"message" => $msg,
			]);
		}

	}	

	public function GetToken(){

		try {

			$transCode = $_GET['transaction_code'];
			$transID = $_GET['transaction_id'];
			$dateTime = $_GET['transaction_datetime'];
			$accountNo = $_GET['account_no'];
			$prefix = substr($accountNo, 0, 6);
			$norek = substr($accountNo, 6, 1) .'.'. substr($accountNo, 7, 6);
			$statusrek = TabunganHelper::Check_StatusTabungan($norek);

			$token = MobileHelper::ATM_GetToken($accountNo, $dateTime);
			$responseCode = "00";

			if ($transCode != "39"){
				$responseCode = "12";
				$token = "";
			}elseif ($statusrek != "A"){
				$responseCode = "14";
				$token = "";
			}elseif ($prefix != env('BPD_PREFIX')){
				$responseCode = "57";
				$token = "";
			}elseif ($token == 'invalid'){
				$responseCode = "30";
				$token = "";
			}			

			if ($responseCode == "00"){
				$query = DB::update('update gmob_token set status=? where 
					left(account_no,6)=?',
					array('closed', $prefix)); 
			}

			$arrResp = array(
				"transaction_code"  => $transCode,
				"transaction_id"  => $transID,
				"response_code"  => $responseCode,
				"token"  => $token,
			);	

			MBankingHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($arrResp), "/atm/response.log");
			return response()->json($arrResp);
	
		}catch (\exception $e) {
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => "06",
					"token"  => "",
				]);		
		}

	}	

	public function CekSaldo(){

		try {

			$transCode = $_GET['transaction_code'];
			$transID = $_GET['transaction_id'];
			$dateTime = $_GET['transaction_datetime'];
			$accountNo = $_GET['account_no'];
			$terminalID = $_GET['terminal_id'];
			$token = $_GET['token'];
			$_REQUEST['attributes'] = self::SetParam();	

			$status = MobileHelper::ATM_ValidToken($accountNo, $token);
			$accNo = str_replace(env('BPD_PREFIX'), '', $accountNo);
			$norek = substr($accNo, 0, 1) .'.'. substr($accNo, -6);
			TransferHelper::Gio_GetNasabah($norek);
			$responseCode = "14";
			$saldo = 0;

			if ($transCode == "30" && $status == "open" && $_REQUEST['attributes']['customer_status'] == "A"){
				$responseCode = "00";
				$saldo = MobileHelper::Gio_GetSaldoTab($norek);
			}else{
				$_REQUEST['attributes']['customer_name'] = "";				
			}			

			$request = $token .'|'. $accountNo .'|'. $dateTime .'|'. $status;
			MBankingHelper::Gio_InsertInfoLog("RESPONSE :", $request, "/atm/request.log");

			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => $responseCode,
					"balance"  => $saldo,
					"account_name"  => $_REQUEST['attributes']['customer_name'],
				]);		
		}catch (\exception $e) {
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => transID,
					"response_code"  => "06",
					"balance"  => 0,
					"account_name"  => "",
				]);		
		}

	}	

	public function Penarikan(){

		try {

			$transCode = $_GET['transaction_code'];
			$transID = $_GET['transaction_id'];
			$dateTime = $_GET['transaction_datetime'];
			$accountNo = $_GET['account_no'];
			$terminalID = $_GET['terminal_id'];
			$amount = $_GET['amount'];
			$token = $_GET['token'];
			$_REQUEST['attributes'] = self::SetParam();	

			$status = MobileHelper::ATM_ValidToken($accountNo, $token);
			$accNo = str_replace(env('BPD_PREFIX'), '', $accountNo);
			$norek = substr($accNo, 0, 1) .'.'. substr($accNo, -6);
			TransferHelper::Gio_GetNasabah($norek);
			$saldo = MobileHelper::Gio_GetSaldoTab($norek);
			$responseCode = "51";
			$salmin = 50000;

			if ($transCode == "01" && $status == "open" && $_REQUEST['attributes']['customer_status'] == "A" &&
				$saldo-$amount > $salmin ){
				$responseCode = "00";
				$auditDate = MobileHelper::Gio_GetAuditDate();
				$tgl = date("Y-m-d H:i:s");
				$time = date("H:i:s");
				$billNo = date("dHis");
				$remark = "Penarikan dari " . $terminalID;		
				$saldo = $saldo - $amount;
				
				$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();						
				MobileHelper::Gio_InsertIntoFolio($dbc, $norek, 
					$auditDate, "M2", $amount, 0, $saldo, $billNo, 
					$terminalID, $time, $transID, $remark, "T", $dateTime);	
				MobileHelper::Gio_InsertIntoMutasi($dbc, $norek, 
					$auditDate, $amount, $saldo, $billNo, $terminalID, 
					$time, $transID, $_REQUEST['attributes']['customer_name'], 
					'1.10.03', 'A', $billNo, 'F', $remark, $dateTime);	
				MobileHelper::Gio_InsertIntoMutasi($dbc, $norek, 
					$auditDate, $amount, $saldo, $billNo, $terminalID, 
					$time, $transID, $_REQUEST['attributes']['customer_name'], 
					'2.10.02', 'T', $billNo, 'T', $remark, $dateTime);	
				
			}elseif ($_REQUEST['attributes']['customer_status'] != "A"){
				$responseCode = "14";
				$saldo = 0;
			}elseif ($saldo - $amount < $salmin){
				$responseCode = "61";
				$saldo = 0;
			}		

			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => $responseCode,
					"balance"  => $saldo,
				]);		

		}catch (\exception $e) {
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => "06",
					"balance"  => 0,
				]);		
		}

	}	

	public function Penyetoran(){

		try {

			$transCode = $_GET['transaction_code'];
			$transID = $_GET['transaction_id'];
			$dateTime = $_GET['transaction_datetime'];
			$accountNo = $_GET['account_no'];
			$terminalID = $_GET['terminal_id'];
			$amount = $_GET['amount'];
			$token = $_GET['token'];
			$_REQUEST['attributes'] = self::SetParam();	

			$status = MobileHelper::ATM_ValidToken($accountNo, $token);
			$accNo = str_replace(env('BPD_PREFIX'), '', $accountNo);
			$norek = substr($accNo, 0, 1) .'.'. substr($accNo, -6);
			TransferHelper::Gio_GetNasabah($norek);
			$saldo = MobileHelper::Gio_GetSaldoTab($norek);
			$responseCode = "14";

			if ($transCode == "21" && $status == "open" && $_REQUEST['attributes']['customer_status'] == "A" ){
				$responseCode = "00";
				$auditDate = MobileHelper::Gio_GetAuditDate();
				$tgl = date("Y-m-d H:i:s");
				$time = date("H:i:s");
				$billNo = date("dHis");
				$remark = "Penyetoran ke " . $terminalID;		
				$saldo = $saldo + $amount;
				
				$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();						
				MobileHelper::Gio_InsertIntoFolio($dbc, $norek, 
					$auditDate, "M1", 0, $amount, $saldo, $billNo, 
					$terminalID, $time, $transID, $remark, "F", $dateTime);	
				MobileHelper::Gio_InsertIntoMutasi($dbc, $norek, 
					$auditDate, $amount, $saldo, $billNo, $terminalID, 
					$time, $transID, $_REQUEST['attributes']['customer_name'], 
					'1.10.03', 'A', $billNo, 'T', $remark, $dateTime);	
				MobileHelper::Gio_InsertIntoMutasi($dbc, $norek, 
					$auditDate, $amount, $saldo, $billNo, $terminalID, 
					$time, $transID, $_REQUEST['attributes']['customer_name'], 
					'2.10.02', 'T', $billNo, 'F', $remark, $dateTime);	
				
			}			
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => $responseCode,
					"balance"  => $saldo,
				]);		
		}catch (\exception $e) {
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => "06",
					"balance"  => 0,
				]);		
		}

	}	

	public function BatalTarik(){

		try {

			$transCode = $_GET['transaction_code'];
			$transID = $_GET['transaction_id'];
			$dateTime = $_GET['transaction_datetime'];
			$responseCode = "25";

			if ($transCode == "02"){				

				$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();						
				$folio = MobileHelper::Gio_DeleteFolio($dbc, $transID, $dateTime);
				$mutasi = MobileHelper::Gio_DeleteMutasi($dbc, $transID, $dateTime);				

				if ($folio && $mutasi){
					$responseCode = "00";
				}
			}			
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => $responseCode,
				]);		
		}catch (\exception $e) {
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => transID,
					"response_code"  => "06",
				]);		
		}

	}	

	public function BatalSetor(){

		try {

			$transCode = $_GET['transaction_code'];
			$transID = $_GET['transaction_id'];
			$dateTime = $_GET['transaction_datetime'];
			$responseCode = "25";

			if ($transCode == "22"){				

				$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();						
				$folio = MobileHelper::Gio_DeleteFolio($dbc, $transID, $dateTime);
				$mutasi = MobileHelper::Gio_DeleteMutasi($dbc, $transID, $dateTime);				

				if ($folio && $mutasi){
					$responseCode = "00";
				}
			}			
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => $transID,
					"response_code"  => $responseCode,
				]);		
		}catch (\exception $e) {
			return response()->json(
				[
					"transaction_code"  => $transCode,
					"transaction_id"  => transID,
					"response_code"  => "06",
				]);		
		}

	}	

	function SetParam(){
		$param = array(
			'nasabah' => "", 'status' => "", 'saldo' => 0, 'rc' => "", 'message' => "", 
			'prefix' => "", 'subfix' => "", 'norek' => "", 'noid' => "", 'pin' => "",
			'phone' => "", 'customer_name' => "", 'customer_code' => "", 'customer_status' => ""
		);
		return $param;
	}

}