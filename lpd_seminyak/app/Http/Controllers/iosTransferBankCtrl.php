<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosHelper;
use app\Helpers\iosTransferHelper;

class iosTransferBankCtrl extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckAccess', ['only' => 
		['Check','Inquiry','Posting']]);
		
	}

	public function Check(){

		if ($_POST['status'] != "00") {
			$aResponse = array(
				"status"   	=> $_POST['status'],
				"message"   => $_POST['message'],
			);
			return response()->json($aResponse);
		}			

		$fromAcc = iosHelper::Gio_Decrypt($_GET['from_acc']);
		$toAcc = iosHelper::Gio_Decrypt($_GET['to_acc']);
		$toBank = explode("-", $toAcc);
		$destBank = $toBank[0];
		$destAcc = $toBank[1];
		$amount = iosHelper::Gio_Decrypt($_GET['amount']);
		$dateTime = iosHelper::Gio_Decrypt($_GET['date_time']);
		$hashCode = $toBank[2];
		$refNo = $GLOBALS['reference'];

		$code = "%".$fromAcc."#".$amount."@".$dateTime."^".$refNo."*".$destBank."~".$destAcc."|".env('BPD_HASHCODE')."%";
		$checkHash = hash("sha256", $code);
		if ($hashCode != $checkHash){
			return response()->json(
				[
					"status"   	=> "51",
					"message"   => "Transaksi tidak dapat diproses.",
				]);		
		}

		$snapCode = iosHelper::Gio_Decrypt($_GET['hash_code']);
		$url = 'http://localhost:8081/api-snap-bi/lpd-seminyak/transfer-out/mob_transfer_inquiry.php';
		$respon = self::request_toBPD($fromAcc, $amount, $refNo, 
			$destBank, $destAcc, "", urlencode($snapCode), urlencode($dateTime), "", $url);
		$respData = json_decode($respon, true);
			
		if ($respData['responseCode'] == "2001600"){
			return response()->json(
				[
					"status"   	=> "00",
					"message"   => $respData['responseMessage'],
					"account_name"  => $respData['beneficiaryAccountName'],
				]);
		}else{
			return response()->json(
				[
					"status"   	=> $respData['responseCode'],
					"message"   => $respData['responseMessage'],
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
	
			$fromAcc = iosHelper::Gio_Decrypt($_GET['from_acc']);
			$toAcc = iosHelper::Gio_Decrypt($_GET['to_acc']);
			$toBank = explode("-", $toAcc);
			$destBank = $toBank[0];
			$destAcc = $toBank[1];
			$amount = iosHelper::Gio_Decrypt($_GET['amount']);
			$dateTime = iosHelper::Gio_Decrypt($_GET['date_time']);
			$hashCode = $toBank[2];
			$refNo = $GLOBALS['reference'];
	
			$norek = substr($fromAcc, 6,1) .'.'. substr($fromAcc, -6);
			iosHelper::Gio_GetConfig();
			iosTransferHelper::Get_TransferCost($destBank);

			$admin = $_REQUEST['attributes']['transfer_cost'];
			$valid = iosTransferHelper::Gio_CheckSaldo($norek, $amount+$admin);
			$refExist = iosTransferHelper::Gio_GetReference($refNo, $destAcc, 'inquiryTransferOUT', '2001600');

			$code = "%".$fromAcc."#".$amount."@".$dateTime."^".$refNo."*".$destBank."~".$destAcc."|".env('BPD_HASHCODE')."%";
			$checkHash = hash("sha256", $code);			
			if ($hashCode != $checkHash){
				return response()->json(
					[
						"status"   	=> "52",
						"message"   => "Transaksi tidak dapat diproses.",
						]);		
			}			

			if ($valid && !($refExist)){
						
				$snapCode = iosHelper::Gio_Decrypt($_GET['hash_code']);
				$url = 'http://localhost:8081/api-snap-bi/lpd-seminyak/transfer-out/mob_transfer_inquiry.php';
				$respon = self::request_toBPD($fromAcc, $amount, $refNo, 
					$destBank, $destAcc, "", urlencode($snapCode), urlencode($dateTime), "", $url);
				$respData = json_decode($respon, true);
		
				if ($respData['responseCode'] == "2001600"){
					
					iosTransferHelper::Gio_InsTransferVALog("MOUT", 
					$destAcc, $respData['beneficiaryAccountName'], $amount,
					$respData['responseCode'], $respData['responseMessage'], 
					"inquiryTransferOUT", $refNo, $destBank, $norek, $fromAcc);	
		
					return response()->json(
						[
							"status"   	=> "00",
							"message"   => $respData['responseMessage'],
							"account_name"  => $respData['beneficiaryAccountName'],
						]);		
				}else{
					return response()->json(
						[
							"status"   	=> $respData['responseCode'],
							"message"   => $respData['responseMessage'],
						]);							
				}
			}else if($refExist){
				return response()->json(
					[
						"status"   	=> "45",
						"message"   => "No. referensi duplikat.",
					]);		
			}else if(!$valid){
				return response()->json(
					[
						"status"   	=> "40",
						"message"   => $_REQUEST['attributes']['msg_saldo'],
					]);			
			}

		}catch (\exception $e) {
			return response()->json(
				[
					"status"   	=> "68",
					"message"   => "Time Out",
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

			$fromAcc = iosHelper::Gio_Decrypt($_GET['from_acc']);
			$toAcc = iosHelper::Gio_Decrypt($_GET['to_acc']);
			$toBank = explode("-", $toAcc);
			$destBank = $toBank[0];
			$destAcc = $toBank[1];
			$destName = iosHelper::Gio_Decrypt($_GET['to_name']);
			$amount = iosHelper::Gio_Decrypt($_GET['amount']);
			$dateTime = iosHelper::Gio_Decrypt($_GET['date_time']);
			$hashCode = $toBank[2];
			$pin = $toBank[3];
			$refNo = $GLOBALS['reference'];

			$norek = substr($fromAcc, 6,1) .'.'. substr($fromAcc, -6);
			iosHelper::Gio_GetConfig();
			iosTransferHelper::Get_TransferCost($destBank);
			$admin = $_REQUEST['attributes']['transfer_cost'];

			$valPIN = iosTransferHelper::Gio_CheckPIN($GLOBALS['client_id'], $pin);
			$valSaldo = iosTransferHelper::Gio_CheckSaldo($norek, $amount+$admin);
			$refExist = iosTransferHelper::Gio_GetReference($refNo, $destAcc, 'inquiryTransferOUT', '2001600');
			$refDupli = iosTransferHelper::Gio_GetReference($refNo, $destAcc, 'postingTransferOUT', '2001800');

			if ($valPIN != "00"){
				return response()->json(
					[
						"status"   	=> $valPIN,
						"message"   => "54 Transaksi tidak dapat diproses.",
						]);		
			}
		
			$code = "@".$fromAcc."|".$amount."~".$dateTime."*".$refNo."^".$destBank."#".$destAcc."(".$destName.")".env('BPD_HASHCODE')."@";
			$checkHash = hash("sha256", $code);			
			if ($hashCode != $checkHash){
				return response()->json(
					[
						"status"   	=> "53",
						"message"   => "53 Transaksi tidak dapat diproses.",
						]);		
			}

			if ($valSaldo && $refExist && !($refDupli)){
				
				$tglTrans = date("Y-m-d H:i:s");
				$transCode = 'TRAB' .date("Hisymd") . substr(uniqid(rand(), FALSE), -4);				
				$data = array(
					$transCode, $_REQUEST['attributes']['audit_date'], 
					'MOUT', $norek, '', $fromAcc, $amount, $dateTime, 
					$refNo, $destBank, $destAcc, $destName, 
					'2001800', 'Sukses','Post'				
				);

				$result = iosTransferHelper::Gio_InsTransferOutBank($data, $transCode);
				if ($result == "00"){		 

					$snapCode = iosHelper::Gio_Decrypt($_GET['hash_code']);
					$url = 'http://localhost:8081/api-snap-bi/lpd-seminyak/transfer-out/mob_transfer_payment.php';
					$respon = self::request_toBPD($fromAcc, $amount, $refNo, 
						$destBank, $destAcc, $destName, urlencode($snapCode), urlencode($dateTime), $transCode, $url);
					$respData = json_decode($respon, true);
	
					if ($respData['responseCode'] == "2001800"){
								
						iosTransferHelper::Gio_InsTransferVALog("MOUT", 
							$destAcc, $destName, $amount, 
							$respData['responseCode'], 
							$respData['responseMessage'], 
							"postingTransferOUT", 
							$refNo, $destBank, $norek, $fromAcc);	
						
						return response()->json(
							[
								"status"   	=> "00",
								"message"   => $respData['responseMessage'],
								"destinationAccountName" => $destName,
								"transfer_date" => $tglTrans,
								"balance" => $_REQUEST['attributes']['respon_saldo'],
							]);		
					}else{
						iosTransferHelper::Gio_DelTransferOutBank($norek, $transCode);
						return response()->json(
							[
								"status"   	=> $respData['responseCode'],
								"message"   => $respData['responseMessage'],
							]);							
					}	
				}else{
					iosTransferHelper::Gio_DelTransferOutBank($norek, $transCode);
					return response()->json(
						[
							"status"   	=> "42",
							"message"   => "42 Transaksi tidak dapat diproses",
						]);		
				}
			}else if(!$refExist){
				return response()->json(
					[
						"status"   	=> "43",
						"message"   => "No. referensi tidak ditemukan.",
					]);		
			}else if($refDupli){
				return response()->json(
					[
						"status"   	=> "45",
						"message"   => "No. referensi duplikat.",
					]);		
			}else if(!$valSaldo){
				return response()->json(
					[
						"status"   	=> "40",
						"message"   => $_REQUEST['attributes']['msg_saldo'],
					]);			
			}

		}catch (\exception $e) {
			return response()->json(
				[
					"status"   	=> "68",
					"message"   => "Time Out !",
				]);		
			
		}

	}
	
	public function request_toBPD($accNo, $amount, $refNo, 
		$destBank, $destAccNo, $destAccName, $hashCode, $dateTime, $billNo, $url) {

		$param = "accountNumber=" .$accNo. "&amount=" .$amount. 
			"&referenceNumber=" .$refNo.
			"&billNo=" .$billNo.
			"&hashCode=" .$hashCode.
			"&dateTime=" .$dateTime.
			"&destinationBankCode=" .$destBank. 
			"&destinationAccountNo=" .$destAccNo. 
			"&destinationAccountName=" .urlencode($destAccName);
		$url = $url .'?'. $param;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_POSTFIELDS, "");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json')
		);

		$output = curl_exec($ch);
		curl_close($ch);
		//$result = json_decode($output, true);
		return $output;

	}

}