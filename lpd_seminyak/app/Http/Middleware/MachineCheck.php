<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class MachineCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

      $_GET = json_decode($request->getContent(), true);				      
      $noip = self::checkClientIP();
			$whiteList = env('GIO_WHITE_LIST').env('ATM_WHITE_LIST');
			if(preg_match("/$noip/i", $whiteList) == 0) {
        return response()->json(
          [
            "status"  => "40",
            "message" => "Feature Not Allowed at this time : " .$noip,
          ]);
        }
      
      if (isset($_GET['token'])){
        $token = $_GET['token'];
      }else{
        $token = "";
      }
      $hashCode = hash("sha256", env('ATM_HASHCODE') .$token 
        .$_GET['account_no'] .$_GET['transaction_datetime']);
      if ($hashCode != $_GET['hash_code']){
        return response()->json(
          [
            "status"  => "30",
            "message" => "Hash code tidak valid.",
            "token" => $hashCode,
          ]);
        }

      return $next($request);

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
  
}
