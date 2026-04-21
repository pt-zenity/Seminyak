<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosHelper;

//Check Valid : 2025-02-12
class iosAccessCtrl extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckAccess', ['only' => 
		['Register', 'Login', 'Logout', 'UpdatePass', 'UpdatePin']]);
		
	}

	public function Register(){

		if ($_POST['status'] != "00") {
			$aResponse = array(
				"status"   	=> $_POST['status'],
				"message"   => $_POST['message'],
			);
			return response()->json($aResponse);
		}			

		try {

			$username = $_GET['user_name'];
			$userpass = $_GET['user_pass'];
			$status = self::Check_Register($username, $userpass);
			if($status == "R"){
				$akun = iosHelper::Get_DaftarRek($GLOBALS['noid'], 'Tabungan');
				$Akun = iosHelper::Gio_Encrypt($akun);	
				$key = env('BPD_PREFIX') .'<>'. env('BPD_HASHCODE');
				$bankKey = iosHelper::Gio_Encrypt($key);	
				$bankList =  config("app.master_bank_list");
				$ppobList =  config("app.master_ppob_list");
				$noID = $GLOBALS['noid'];
				$pin = $GLOBALS['pin'];
				if ($GLOBALS['version'] >= "25002"){
					$noID = iosHelper::Gio_Encrypt($GLOBALS['noid']);
					$pin = iosHelper::Gio_Encrypt($GLOBALS['pin']);	
				}
				return response()->json(
				[
					"status"  => "00",
					"message" => "Sukses",
					"customer_id" => $noID,
					"customer_name" => $GLOBALS['nasabah'],
					"customer_pin" => $pin,
					"account_list" => $Akun,
					"bank_key" => $bankKey,
					"bank_list" => $bankList,
					"ppob_list" => $ppobList,
				]);
			}else{
				$rc = "10";
				$msg =  iosHelper::Get_ResponseDesc($rc);
				return response()->json(
				[
					"status"  => $rc,
					"message" => $msg,
				]);
			}
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

	public function Login(){
		
		if ($_POST['status'] != "00") {
			$aResponse = array(
				"status"   	=> $_POST['status'],
				"message"   => $_POST['message'],
			);
			return response()->json($aResponse);
		}			

		try {

			$username = $_GET['user_name'];
			$userpass = $_GET['user_pass'];

			$status = self::Check_Login($username, $userpass);
			if($status == "A"){
				$akun = iosHelper::Get_DaftarRek($GLOBALS['noid'], 'Tabungan');
				$Akun = iosHelper::Gio_Encrypt($akun);
				$key = env('BPD_PREFIX') .'<>'. env('BPD_HASHCODE');
				$bankKey = iosHelper::Gio_Encrypt($key);	
				$bankList =  config("app.master_bank_list");
				$ppobList =  config("app.master_ppob_list");
				return response()->json(
				[
					"status"  => "00",
					"message" => "Sukses",
					"account_list" => $Akun,
					"bank_key" => $bankKey,
					"bank_list" => $bankList,
					"ppob_list" => $ppobList,
				]);
			}else if($status == "B"){
				$rc = "43";
				$msg =  iosHelper::Get_ResponseDesc($rc);
				return response()->json(
				[
					"status"  => $rc,
					"message" => $msg,
				]);
			}else{
				$rc = "21";
				$msg =  iosHelper::Get_ResponseDesc($rc);
				return response()->json(
				[
					"status"  => $rc,
					"message" => $msg,
				]);
			}
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
	
	public function Logout(){

		if ($_POST['status'] != "00") {
			$aResponse = array(
				"status"   	=> $_POST['status'],
				"message"   => $_POST['message'],
			);
			return response()->json($aResponse);
		}			

		try {

			$current = date("Y-m-d H:i:s");
			$query = DB::update('update gmob_token set end_time=?, status=? 
				where account_no=?', 
			array($current, "closed", $GLOBALS['client_id']));
			return response()->json(
				[
					"status"  => "00",
					"message" => "Logout berhasil.",
				]);
	
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

	public function Check_Register($name, $pass) {
		$query = DB::select('select * from gmob_nasabah where username=? and pass_crypto=?',
			array($name, $pass));
		$statusrek = "X";
		foreach ($query as $querys){
			$GLOBALS['nasabah'] = $querys->nama;
			$GLOBALS['norek'] = $querys->norek;
			$GLOBALS['noid'] = $querys->noid;
			$GLOBALS['pin'] = $querys->pin_crypto;
			$GLOBALS['version'] = $querys->version;
			$statusrek = $querys->status;
		}
		
		if (substr($GLOBALS['noid'], 0, 2) == "SY"){
			$statusrek = "R";
		}
		if ($statusrek == "R"){
			$ins = DB::update('update gmob_nasabah set status=?,
				imei_code=?, aes_key=?, aes_iv=?, aes_cs=? where noid=?', 
				array('A', $GLOBALS['client_id'],
				$GLOBALS['aes_key'],
				$GLOBALS['aes_iv'], 
				$GLOBALS['aes_cs'], 
				$GLOBALS['noid']));				
		}
		return $statusrek;
	}

	public function Check_Login($user, $pass) {
		$status = "X";
		$query = DB::select('select * from gmob_nasabah where imei_code=?
			and username=? and pass_crypto=?',
			array($GLOBALS['client_id'], $user, $pass));
		foreach ($query as $querys){
			$GLOBALS['noid'] = $querys->noid;
			$status = $querys->status;
		}
		return $status;
	}

	public function UpdatePass() {

		try {

			$passOld = iosHelper::Gio_Decrypt($_GET['pass_old']);
			$passNew = iosHelper::Gio_Decrypt($_GET['pass_new']);

			$pass = "";
			$query = DB::select('select * from gmob_nasabah where imei_code=?',
				array($GLOBALS['client_id']));
			foreach ($query as $querys){
				$pass = $querys->pass_crypto;
			}

			if ($passOld == $pass){
				$query = DB::update('update gmob_nasabah set pass_crypto=? 
					where imei_code=?',
				array($passNew, $GLOBALS['client_id']));
				return response()->json(
					[
						"status"  => "00",
						"message" => "Sukses",
				]);
			}else{
				return response()->json(
					[
						"status"  => "01",
						"message" => "Kata sandi tidak sama.",
				]);

			}

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

	public function UpdatePin() {

		try {

			$pinOld = iosHelper::Gio_Decrypt($_GET['pin_old']);
			$pinNew = iosHelper::Gio_Decrypt($_GET['pin_new']);

			$pin = "";
			$query = DB::select('select * from gmob_nasabah where imei_code=?',
				array($GLOBALS['client_id']));
			foreach ($query as $querys){
				$pin = $querys->pin_crypto;
			}

			if ($pinOld == $pin){
				$query = DB::update('update gmob_nasabah set pin_crypto=? 
					where imei_code=?',
				array($pinNew, $GLOBALS['client_id']));
				return response()->json(
					[
						"status"  => "00",
						"message" => "Sukses",
				]);
			}else{
				return response()->json(
					[
						"status"  => "01",
						"message" => "PIN tidak sama.",
				]);

			}

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

	public function Get_BankList(){
		$bank = iosHelper::Get_BankList();
		return $bank;
	}

	public function Get_PPOBList(){
		$ppob = iosHelper::Get_PPOBProduct();
		return $ppob;	
	}

	public function Go_InsertUser($client, $imei, $id, $name) {

		$data = array(
			"client_code" => $client,
			"imei_code" => $imei,
			"customer_id" => $id,
			"customer_name" => $name,
		);		
		$data_string = json_encode($data);
		$url = 'https://lamanuna.biz.id/smartindo-lgn/public/legion/access/user/ins';
	
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

	public function Test(){

		$id = "MGEyYTg0M2E0YzYxODUyNDBhYjg5OTI3ODNjNzM1ZTBlMjFhMGQzZWUyMWIzMWMwNGE5MjdlYTZmYzMwNjkyZjw+MTY3MjM2OTY3U2VtaW55YWt8U1AxQSE4OTRjNDg3MjQ0Y2RjMDg3MzUxZmVkNT4yMTA4MTIuMDE2fDIwZDU4YSgpZjI0ZjU1NDIwYmRkOGM1YjcyMjUtMDgtMDYgMjI6NDU6NDAjNzNlMDMxZmFiMDY2MmJjYjUzYTUzYWRhMDBmZA=";
		$time = "2025-08-06 22:14:13";
		//U2VtaW55YWt8U1AxQS
		//4yMTA4MTIuMDE2fDIw
		//MjUtMDgtMDYgMjI6MTQ6MTM
		$len = explode(":", "18:18:0");
		$col = explode(":", "100:150:200");
		$idd = substr($id, 100, 18).substr($id, 150, 18).substr($id, 200, 23);
		$kar = ord("z");
		return response()->json(
			[
				"scrambel"  => $id,
				"ascii" => $kar
			]);
	}

	public function Send_UserID(){
		$query = DB::select('select * from gmob_nasabah where status=?', array("A"));
		foreach ($query as $querys){
			$imei = base64_encode($querys->imei_code);
			self::Go_InsertUser('SMYK', $imei, $querys->noid, $querys->nama);
		}
		return response()->json(
			[
				"imei"  => $imei,
			]);

	}
}
