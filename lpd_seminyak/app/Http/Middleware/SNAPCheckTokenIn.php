<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use app\Helpers\SNAPHelper;

class SNAPCheckTokenIn
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

        SNAPHelper::Gio_CheckField($request);
		$response = $next($request);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 
		'X-TIMESTAMP,X-CLIENT-KEY,X-CLIENT-SECRET,Content-Type,X-SIGNATURE,Accept,Authorization,Authorization-Customer,ORIGIN,X-PARTNER-ID,X-EXTERNAL-ID,X-IP-ADDRESS,X-DEVICE-ID,CHANNEL-ID,X-LATITUDE,X-LONGITUDE');
        return $response;

	}

}
