<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosHelper;

//Check Valid : 2025-02-12
class iosMachineCtrl extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckAccess', ['only' => 
		['CreateToken']]);		
	}

	public function CreateToken(){
	
		try {

			$accountNo = iosHelper::Gio_Decrypt($_GET['customer_acc']);
			$prefix = substr($accountNo, 0, 6);
			$norek = substr($accountNo, 6, 1) .'.'. substr($accountNo, 7, 6);
			$start = date("Y-m-d H:i:s");
			$end = date('Y-m-d H:i:s',strtotime('+5 minutes',strtotime($start)));
			$dtime = date('YmdHis',strtotime('+5 minutes',strtotime($start)));
			$status = "01";
			$message = "Customer ID tidak valid.";
			$statusrek = iosHelper::Check_StatusTabungan($norek);
			$token = "";
/*
			$hashCode = hash("sha256", $GLOBALS['aes_cs'] 
				.$accountNo .$GLOBALS['timestamp']);
	 	  	if ($hashCode != $_GET['hash_code']){
				return response()->json(
				[
					"status"  => "30",
					"message" => "Hash code tidak valid.",
				]);
			}
*/				
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
			$msg =  iosHelper::Get_ResponseDesc($rc);
			return response()->json(
			[
				"status"  => $rc,
				"message" => $msg,
			]);
		}

	}	

}
