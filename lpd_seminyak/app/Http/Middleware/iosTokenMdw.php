<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class iosTokenMdw
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

        self::Gio_InsertLog($request);
        $_POST = json_decode($request->getContent(), true);
		$response = $next($request);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 
		'X-TIMESTAMP,X-CLIENT-KEY,X-CLIENT-SECRET,Content-Type,X-SIGNATURE,Accept,Authorization,Authorization-Customer,ORIGIN,X-PARTNER-ID,X-EXTERNAL-ID,X-IP-ADDRESS,X-DEVICE-ID,CHANNEL-ID,X-LATITUDE,X-LONGITUDE');
        return $response;

	}

	public function Gio_InsertLog($request){

		$data_string = $request->getContent();
		$body = preg_replace( "/\s/", "", $data_string);
		$urlBase = "https://lpdseminyak.biz.id:8000";

		$uri = $_SERVER['REQUEST_URI'];
		$info = "\n";
		$info .= "REQUEST : \n";
		$info .= "POST " .$urlBase.$uri. "\n";
		$info .= "Content-type:application/json\n";
		$info .= "X-TIMESTAMP:" .$request->header('X-TIMESTAMP'). "\n";
		$info .= "X-CLIENT-ID:" .$request->header('X-CLIENT-ID'). "\n";
		$info .= "X-SIGNATURE:" .$request->header('X-SIGNATURE'). "\n";
		$info .= "DATA:\n";
		$info .= $body . "\n\n";

        Log::useDailyFiles(storage_path().'/logs/token.txt');
        Log::info($info);		

	}

}
