<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\TransferHelper;
use app\Helpers\SNAPHelper;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class SNAPTransferIn extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('snapTransferIn', ['only' => ['Inquiry', 'Payment']]);
		
	}
	
	public function Inquiry(){

		$serviceCode = Session::get('serviceCode');
		$kode = "200" .$serviceCode. "00";
		if ($_POST['Code'] != $kode) {
			$aResponse = array(
				"responseCode"   	=> $_POST['Code'],
				"responseMessage"     => $_POST['Description'],
			);
			SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/inquiry/response.log");
			return response()->json($aResponse);
		}			

		$_REQUEST['attributes'] = self::SetParam();		
		$_REQUEST['attributes']['command']	= "inquiryTransferIn";
		$prefix = isset($_GET['partnerServiceId']) ? $_GET['partnerServiceId'] : '';
		$customerNo = isset($_GET['customerNo']) ? $_GET['customerNo'] : '';
		$virtualNo = isset($_GET['virtualAccountNo']) ? $_GET['virtualAccountNo'] : '';
		$refNo = isset($_GET['inquiryRequestId']) ? $_GET['inquiryRequestId'] : '';
		$amount = isset($_GET['amount']['value']) ? $_GET['amount']['value'] : '';
		$terminalType = $_GET['additionalInfo']['terminalType'];
		$terminalId = $_GET['additionalInfo']['terminalId'];

		try {

			$prefix = trim($prefix);
			$virtualNo = trim($virtualNo);
			$norek =  substr($virtualNo, -7);
			$norek =  substr($norek, 0, 1) .".". substr($norek, -6);
			$valAcc = TransferHelper::Gio_GetNasabah($norek);
			$billNo = SNAPHelper::Gio_GetReferenceVA($refNo);

			if ( empty($prefix) || empty($customerNo) || empty($virtualNo) ||
				empty($refNo) || empty($amount) ){	
				$seek = "invalid-field";
			}else if ($valAcc && $prefix == env("BPD_PREFIX")){
				$seek = "";
				if ($_REQUEST['attributes']['customer_status'] == "A"){
					$seek = "sukses";
				}else{
					$seek = "not-aktif";
				}	
			}			
			if ($valAcc == false){
				$seek = "not-sumber";
			}else if ($billNo == $refNo){
				$seek = "duplicate";
			}
	
			TransferHelper::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			TransferHelper::Gio_InsTransferVALog("IQIN", $virtualNo, 
				$_REQUEST['attributes']['customer_name'], $amount, $rc, 
				$_REQUEST['attributes']['resp_msg'], 
				$_REQUEST['attributes']['command'], $refNo);

			$aResponse = array(
				"responseCode"   	=> $rc,
				"responseMessage"     => $_REQUEST['attributes']['resp_msg'],
				"virtualAccountData"  => array(
					"partnerServiceId" => str_pad($prefix, 8, " ", STR_PAD_LEFT),
					"customerNo" => $customerNo,
					"virtualAccountNo" => str_pad($prefix, 8, " ", STR_PAD_LEFT) . str_replace(".","",$norek),
					"inquiryRequestId" => $refNo,
					"virtualAccountName" => trim($_REQUEST['attributes']['customer_name']),
				)
			);

			SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/inquiry/response.log");
			return response()->json($aResponse);

		}catch (\exception $e) {
			$seek = "error";
			TransferHelper::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			$aResponse = array(
				"responseCode"   	=> $rc,
				"responseMessage"     => $_REQUEST['attributes']['resp_msg'],
			);
			SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/inquiry/response.log");
			return response()->json($aResponse);
		}

	}	

	public function Payment(){
		$serviceCode = "25";
		$kode = "200" .$serviceCode. "00";
		if ($_POST["Code"] != $kode) {
			$aResponse = array(
				"responseCode"   	=> $_POST['Code'],
				"responseMessage"     => $_POST['Description'],
			);
			SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/posting/response.log");
			return response()->json($aResponse);
		}			

		$_REQUEST['attributes'] = self::SetParam();	
		$_REQUEST['attributes']['command']	= "postingTransferIn";
		$prefix = isset($_GET['partnerServiceId']) ? $_GET['partnerServiceId'] : '';
		$customerNo = isset($_GET['customerNo']) ? $_GET['customerNo'] : '';
		$virtualNo = isset($_GET['virtualAccountNo']) ? $_GET['virtualAccountNo'] : '';
		$refNo = isset($_GET['paymentRequestId']) ? $_GET['paymentRequestId'] : '';
		$amount = isset($_GET['paidAmount']['value']) ? $_GET['paidAmount']['value'] : '';
		$terminalType = $_GET['additionalInfo']['terminalType'];
		$terminalId = $_GET['additionalInfo']['terminalId'];
		$sourceAccountNo = $_GET['additionalInfo']['sourceAccountNo'];
		$description = $_GET['additionalInfo']['description'];

		try {
			$prefix = trim($prefix);
			$virtualNo = trim($virtualNo);
			$norek =  substr($virtualNo, -7);
			$norek =  substr($norek, 0, 1) .".". substr($norek, -6);
			$valAcc = TransferHelper::Gio_GetNasabah($norek);
			$billNo = SNAPHelper::Gio_GetReferenceVA($refNo);
				
			if ( empty($prefix) || empty($customerNo) || empty($virtualNo) ||
				empty($refNo) || empty($amount) ){	
				$seek = "invalid-field";
			}else if ($valAcc && $prefix == env("BPD_PREFIX")){
				$seek = "";
				if ($_REQUEST['attributes']['customer_status'] == "A"){
					$seek = "sukses";
				}else{
					$seek = "not-aktif";
				}	
			}			

			if ($valAcc == false){
				$seek = "not-sumber";
			}else if ($billNo == $refNo){
				$seek = "duplicate";
			}


			$arrVirtual = array(
				"partnerServiceId" => str_pad($prefix, 8, " ", STR_PAD_LEFT),
				"customerNo" => $customerNo,
				"virtualAccountNo" => str_pad($prefix, 8, " ", STR_PAD_LEFT) . str_replace(".","",$norek),
				"inquiryRequestId" => $refNo,
				"virtualAccountName" => trim($_REQUEST['attributes']['customer_name']),
			);
			if ($seek != "sukses"){
				TransferHelper::Gio_GetRespDescSnap($seek);
				$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
				$aResponse = array(
					"responseCode"   	  => $rc,
					"responseMessage"     => $_REQUEST['attributes']['resp_msg'],
					"virtualAccountData"  => $arrVirtual
				);
				SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/posting/response.log");
				return response()->json($aResponse);	
			}

			$respstatus = SNAPHelper::Gio_PostTransferVA(
				$norek, $virtualNo, $amount, $refNo, $sourceAccountNo, 
				$description, $_REQUEST['attributes']['customer_name']
			);
			$seek = "sukses";
			if ($respstatus != "00"){
				$seek = "not-error";
			}
			TransferHelper::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			TransferHelper::Gio_InsTransferVALog("TRIN", $virtualNo, 
				$_REQUEST['attributes']['customer_name'], $amount, $rc, 
				$_REQUEST['attributes']['resp_msg'], 
				$_REQUEST['attributes']['command'], $refNo);
			$aResponse = array(
				"responseCode"   		  => $rc,
				"responseMessage"     => $_REQUEST['attributes']['resp_msg'],
				"virtualAccountData"  => $arrVirtual
			);
			SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/posting/response.log");
			return response()->json($aResponse);	

		}catch (\exception $e) {
			$seek = "error";
			TransferHelper::Gio_GetRespDescSnap($seek);
			$rc = $_REQUEST['attributes']['http_code'] .$serviceCode. $_REQUEST['attributes']['case_code'];
			$aResponse = array(
				"responseCode"   	=> $rc,
				"responseMessage"     => $_REQUEST['attributes']['resp_msg'],
			);
			SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($aResponse), "/transfer-in/posting/response.log");
			return response()->json($aResponse);
		}

		
	}	

	function SetParam(){
		$param = array(
			'customer_name' => "", 'customer_code' => "", 'customer_status' => "",
			'http_code' => "", 'case_code' => "", 'resp_msg' => "",
			'command' => ""
		);
		return $param;
	}

}
