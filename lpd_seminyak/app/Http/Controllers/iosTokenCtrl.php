<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosHelper;

class iosTokenCtrl extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckToken', ['only' => 
		['AccessToken', 'AccessKey']]);
		
	}
	
	public function AccessToken(){

        $publicKey = config("app.public_key_lpd");

		date_default_timezone_set("Asia/Makassar");

		$headers = apache_request_headers();
		$signature = $headers['X-SIGNATURE'];
		$timeStamp = $headers['X-TIMESTAMP'];
		$clientIDs = $headers['X-CLIENT-ID'];

		$clientID = iosHelper::Gio_DecryptDID($clientIDs);

		$clientStamp = hash("sha256", "Seminyak|". $timeStamp);
		$signor = base64_decode($signature);
		$verifySSL = openssl_verify($clientStamp, $signor, $publicKey,OPENSSL_ALGO_SHA256);

		$token = self::Get_Token();
		$respCode = "4017301";
		$respMsg  = "Cannot access Token.";
		$noIP = iosHelper::checkClientIP();

		$whiteList = env('GIO_WHITE_LIST');
		if(preg_match("/$noIP/i", $whiteList) == 0) {
			$verifySSL = 3;
			$respCode = "4037302";
			$respMsg  = "Feature Not Allowed at this time.";
		}
		
		if ( $verifySSL == 0 || $verifySSL > 1 ){ 
			$arrResp = array(
				"status"   	=> $respCode,
				"message"   => $respMsg,
			);	
		}else{
			$current = date("Y-m-d H:i:s");
			$start = date('Y-m-d H:i:s',strtotime('-3 minutes',strtotime($current)));
		
			$rc = "2007300";
			$msg = "Success";
			$strToSign = $clientID. "|" .$token['token'];
			$signClient = base64_encode(hash_hmac("sha512", $strToSign, ENV('CLIENT_SECRET')));

			$query2 = DB::update('insert into gmob_token 
				(token, start_time, account_no) values (?,?,?)', 
				array($token['token'], $current, $clientID));	

			$arrResp = array(
					"status"   	=> $rc,
					"message"   => $msg,
					"token"     => $token['token'],
					"signature" => $signClient,
			);
		}
		//MBankingHelper::Gio_InsertInfoLog("RESPONSE :", "token:".$token['token'], "/token/response.log");
		return response()->json($arrResp);

	}

	public function AccessKey(){

		$publicKey = $_POST['key'];
		file_put_contents('c:\/xampp\/htdocs\/\/lpd_seminyak\/keys\/public_key.pem', $publicKey);

	}

	function Get_Token() {

		$url = 'https://lamanuna.biz.id/smartindo/public/mobile/get-token';

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
		$result = json_decode($output, true);
		curl_close($ch);
		return $result;
		
	}

}