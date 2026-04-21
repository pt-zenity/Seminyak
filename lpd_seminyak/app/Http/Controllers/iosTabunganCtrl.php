<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use app\Helpers\iosHelper;

class iosTabunganCtrl extends Controller
{

	function __construct(){
		DB::connection()->getPdo();
		$this->middleware('iosCheckAccess', ['only' => 
		['ListAccount', 'HistoryTransaction', 'HistoryMutasi']]);
		
	}

	public function ListAccount(){

		try {

			$noID = iosHelper::Gio_Decrypt($_GET['customer_id']);
			$data = iosHelper::Get_DaftarRek($noID, 'Tabungan');
			$encData = iosHelper::Gio_Encrypt($data);
			if ( $data !=  "") { 
				$respdata = response()->json(
					[
						"status"    => "00",
						"message" => "Sukses download data",
						"data"   => $encData,
					]);
				return $respdata;
			}else{
				return response()->json(
					[
						"status"  => "84",
						"message" => "Data tidak ditemukan.",
					]);
			}								
		}catch (\exception $e) {
			return response()->json(
				[
					"status"  => "68",
					"message" => "Time-out",
				]);
		}
	}

	public function HistoryTransaction(){

		try {

			$norek = iosHelper::Gio_Decrypt($_GET['customer_acc']);
			$start = $_GET['start_date'];
			$end = $_GET['end_date'];
			$modul = iosHelper::GetModulCode($norek);
			$status = iosHelper::Check_StatusRekening($norek, $modul);

			if ($status == "A") { 
				if ($modul == "b"){
					$data = iosHelper::Get_FolioTabungan($norek, $start, $end);
				}else{
					$data = iosHelper::Get_FolioRekeningTabPlus($norek, $start, $end, $modul);
				}
				return response()->json(
					[
						"status"    => "00",
						"message" => "Sukses download data",
						"data"   => $data,
					]);
			}else{
				return response()->json(
					[
						"status"  => "01",
						"message" => "Rekening tidak aktif:"
					]);
			}								
		}catch (\exception $e) {
			return response()->json(
				[
					"status"  => "68",
					"message" => "Time-out",
				]);
			}
	}

	public function HistoryMutasi(){

		try {
			$noID = iosHelper::Gio_Decrypt($_GET['customer_id']);
			$mutasiList = iosHelper::Get_DaftarMutasi($noID);
			return response()->json(
				[
					"status"    => "00",
					"message" => "Sukses download data",
					"data"   => iosHelper::Gio_Encrypt($mutasiList),
				]);
		}catch (\exception $e) {
			return response()->json(
				[
					"status"  => "68",
					"message" => "Time-out",
				]);
			}
	}

}
	