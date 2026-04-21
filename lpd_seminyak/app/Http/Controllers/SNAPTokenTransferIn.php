<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\SNAPHelper;
use Illuminate\Support\Facades\Session;

class SNAPTokenTransferIn extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('snapTokenIn', ['only' => ['AccessToken']]);
		
	}
	
	public function AccessToken(){

        $publicKey = config("app.public_key_bpd");

		$start = date("Y-m-d H:i:s");
		$end = date('Y-m-d H:i:s',strtotime('+3 minutes',strtotime($start)));
        
		$headers = apache_request_headers();
		$signature = $headers['X-SIGNATURE'];
		$timeStamp = $headers['X-TIMESTAMP'];
		$clientID  = $headers['X-CLIENT-KEY'];

		$clientStamp = $clientID ."|". $timeStamp;
		$signor = base64_decode($signature);
		$verifySSL = openssl_verify($clientStamp, $signor, $publicKey,OPENSSL_ALGO_SHA256);

		$token = self::Get_Token();
		$respCode = Session::get('respCode');

		if ($respCode == "4002402"){
			$verifySSL = 2;
		}

		if ( $verifySSL == 1 ){ 
			$rc = "2007300";
			$msg = "Success";
			$query = DB::update('insert into gmob_token (token, start_time, end_time) values (?,?,?)', 
				array($token['token'], $start, $end));	
			$arrResp = array(
					"responseCode"   	=> $rc,
					"responseMessage"   => $msg,
					"accessToken"     	=> $token['token'],
					"tokenType"			=> "Bearer",
					"expiresIn"			=> "180",
			);
		}else if ( $verifySSL == 2 ){
			$arrResp = array(
					"responseCode"   	=> Session::get('respCode'),
					"responseMessage"   => '='.Session::get('respMessage'),
			);	
		}else if ( $verifySSL == 0 ){
			$arrResp = array(
				"responseCode"   	=> "4017301",
				"responseMessage"   => "Invalid access Token",
			);	
		}
		SNAPHelper::Gio_InsertInfoLog("RESPONSE :", json_encode($arrResp), "/token/response.log");
		return response()->json($arrResp);

	}

	function Get_Token() {

		$url = 'https://lamanuna.biz.id/smartindo/public/get-token';
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