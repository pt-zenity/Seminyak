<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PPOBController extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('trustMe', ['only' => ['Callback']]);
		
	}

	public function Callback(){

		$ref = $_GET['data']['ref_id'];
		$code = $_GET['data']['product_code'];
		$id = $_GET['data']['customer_id'];
		$sn = $_GET['data']['sn'];
		$price = $_GET['data']['price'];
		$balance = $_GET['data']['balance'];
		$trID = $_GET['data']['tr_id'];
		$rc = $_GET['data']['rc'];

		try {

			$query = DB::update('insert into gppob_callback (customer_id,
				product_code, reference, transact_id, price, balance, sn, rc) 
				values (?,?,?,?,?,?,?,?)', array($id, $code, $ref, $trID, 
				intval($price), intval($balance), $sn, $rc));

			return response()->json(
			[
				"status"   	=> $rc,
				"message"   => $_GET['data']['message'],
			]);

		}catch (\exception $e) {
			$aResponse = array(
					"status"  => "69",
					"message" => "Timeout",
				);
			return response()->json($aResponse);
		}
	
	}	

}