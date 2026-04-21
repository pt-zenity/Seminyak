<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use app\Helpers\iosHelper;

class iosAccessMdw
{

    public function handle($request, Closure $next)
    {
        $GLOBALS = iosHelper::Gio_SetParam();
        $path = self::get_log_path();
        self::Gio_InsertLog($request, $path);

        $cari = "register";
        $GLOBALS['client_id'] = iosHelper::Gio_DecryptDID($request->header('X-CLIENT-ID'));
		if(preg_match("/$cari/i", $_SERVER['REQUEST_URI'])) {
            list($key, $iv, $cs) = iosHelper::Gio_CreateKeyAndIv(
                $GLOBALS['client_id'], 
                $request->header('X-TIMESTAMP'));
            $GLOBALS['aes_key'] = $key;
            $GLOBALS['aes_iv'] = $iv;
            $GLOBALS['aes_cs'] = $cs;
        }else{    
            list($key, $iv, $cs) = iosHelper::Gio_GetKeyAndIv($GLOBALS['client_id']);
            $GLOBALS['aes_key'] = $key;
            $GLOBALS['aes_iv'] = $iv;
            $GLOBALS['aes_cs'] = $cs;
        }

        $GLOBALS['timestamp'] = $request->header('X-TIMESTAMP');
        $GLOBALS['partner_id'] = $request->header('X-PARTNER-ID');
        $GLOBALS['reference'] = $request->header('X-REFERENCE') ?? '';
        
        $_POST = self::check_access($GLOBALS['client_id'],
            $request->header('X-PARTNER-ID'), 
            $request->header('Authorization'), 
            $request->header('X-TIMESTAMP'), 
            $request->getContent());
		$_GET = json_decode($request->getContent(), true);
		$response = $next($request);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 
		'X-TIMESTAMP,X-CLIENT-KEY,X-CLIENT-SECRET,Content-Type,X-SIGNATURE,Accept,Authorization,Authorization-Customer,ORIGIN,X-PARTNER-ID,X-EXTERNAL-ID,X-IP-ADDRESS,X-DEVICE-ID,CHANNEL-ID,X-LATITUDE,X-LONGITUDE');
        return $response;
        
	}

    public function check_access($clientID, $partnerID, $token, $timeStamp, $data){
        $strToSign = $token. ":" .$timeStamp;
        $partner64 = base64_encode(hash_hmac("sha512", $strToSign, 
            $GLOBALS['aes_cs'], true));
        $rc = "00";
        $msg = "Partner ID valid.";    

        if ($partner64 != $partnerID){
            $rc = "01";
            $msg = $GLOBALS['client_id']; //"Partner ID invalid.";                
        }
        if ($clientID == ""){
            $rc = "02";
            $msg = "Client ID invalid.";    
            
        }

		if(preg_match("/logout/i", $_SERVER['REQUEST_URI'])) {
        }else{
            $author = iosHelper::Gio_CheckToken($clientID);
            if ($token != $author){
                //$rc = "03";
                $msg = "Token sudah kadaluarsa";    
            }
        }

		$noIP = iosHelper::checkClientIP();
        iosHelper::Gio_InsertRequest($noIP, $_SERVER['REQUEST_URI'], $data);
        $whiteList = env('GIO_WHITE_LIST');
		if(preg_match("/$noIP/i", $whiteList) == 0) {
            self::Go_InsertIP($noIP);
            $rc = "03";
            $msg = "Akses url tidak valid.";    
		}

		if(preg_match("/smart/i", $_SERVER['REQUEST_URI']) == 0) {
            self::Go_InsertIP($noIP);
            $rc = "04";
            $msg = "Akses url tidak valid..";    
		}

		$current = date("H:i");
		if(preg_match("/transfer/i", $_SERVER['REQUEST_URI']) > 0) {
            if ($current > "00:00" && $current < "05:00"){
                $rc = "09";
                $msg = "Server Hostbank off";    
            }
        }

		if(preg_match("/ppob/i", $_SERVER['REQUEST_URI']) > 0) {
            if ($current > "01:00" && $current < "03:00"){
                $rc = "08";
                $msg = "PPOB Hostbank off";    
            }
        }

        $aResponse = array(
            "status"   => $rc,
            "message"  => $msg,
        );
        return $aResponse;

    }

    public function get_log_path(){
        $path = "access.txt";
		if(preg_match("/tabungan/i", $_SERVER['REQUEST_URI'])) {
            $path = "tabungan.txt";
        }else if(preg_match("/lpd/i", $_SERVER['REQUEST_URI'])) {
            $path = "transfer-AR.txt";
        }else if(preg_match("/bank/i", $_SERVER['REQUEST_URI'])) {
            $path = "transfer-AB.txt";
        }else if(preg_match("/ppob/i", $_SERVER['REQUEST_URI'])) {
            $path = "ppob.txt";
        }
        return $path;
    }

	public function Gio_InsertLog($request, $path){

		$data_string = $request->getContent();
		$body = preg_replace( "/\s/", "", $data_string);
		$urlBase = "https://lpdseminyak.biz.id:8000";

		$uri = $_SERVER['REQUEST_URI'];
        $refNo = $request->header('X-REFERENCE') ?? '';
		$info = "\n";
		$info .= "REQUEST : \n";
		$info .= "POST " .$urlBase.$uri. "\n";
		$info .= "Content-type:application/json\n";
		$info .= "Authorization:" .$request->header('Authorization'). "\n";
		$info .= "X-TIMESTAMP:" .$request->header('X-TIMESTAMP'). "\n";
		$info .= "X-SIGNATURE:" .$request->header('X-SIGNATURE'). "\n";
		$info .= "X-PARTNER-ID:" .$request->header('X-PARTNER-ID'). "\n";
		$info .= "X-CLIENT-ID:" .$request->header('X-CLIENT-ID'). "\n";
		$info .= "X-REFERENCE:" .$refNo. "\n";
		$info .= "DATA:\n";
		$info .= $body . "\n\n";

        Log::useDailyFiles(storage_path().'/logs/' .$path );
        Log::info($info);		

	}

	public function Go_InsertIP($ip) {

		$data = array(
			"no_ip" => $ip,
		);		
		$data_string = json_encode($data);
		$url = 'https://lamanuna.biz.id/smartindo/public/mobile/ins-ip';
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json')
		);

		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
		
	}    
}
