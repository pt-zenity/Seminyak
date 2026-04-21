<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TabunganHelper {
	
	//Valid : 2023-01-24
	public static function Check_StatusTabungan($norek) {
		$status = "";
		$query = DB::select('select * from gtb_Nasabah where linker = ?', array($norek));
		foreach ($query as $querys){
			$status = $querys->status;
		}
		return $status;

	}

	public static function Check_StatusRekening($norek, $modul) {
		$status = "";
		$query = DB::select('select * from gt' .$modul. '_nasabah where linker = ?', array($norek));
		foreach ($query as $querys){
			$status = $querys->status;
		}
		return $status;

	}

	//Smartindo-SNAP
	public static function Gio_GetSaldoTabungan($norek) {
		$sisa = 0;
		$saldo = DB::select('select sum(credit-debit) as Sisa from gtb_folio where linker=?', array($norek));
		foreach ($saldo as $saldos){
			$sisa = $saldos->Sisa;
		}
		return $sisa;
	}

	//Smartindo-SNAP
	public static function Get_FolioTabungan($norek, $start, $end) {
		$folio = "";
		$query = DB::select('select Fol.debit_val as debval,
			debit,credit,Fol.remark,left(CONVERT(datetimeoffset, trans_date, 19),10) as tgltrans,
			Kode.remark as keter, Kode.trans_code as kdtrans,
			Fol.trans_code as dekre, Fol.trans_no, Fol.bill_no
			from gtb_folio Fol, gum_kdtrs Kode
			where linker=? and Fol.trans_code=Kode.trans_code
			and trans_date>=? and trans_date<?
			order by mutasi_date, bill_no', 
			array($norek, $start, $end));
		foreach ($query as $querys){
			$amount = $querys->credit + $querys->debit;
			$keterangan = trim($querys->keter);
			$rem = trim($querys->remark);
			if ($rem != ""){
				$keterangan = trim($querys->remark);
			}
			$trsno = trim($querys->trans_no);
			if ($trsno == ""){
				$trsno = $querys->bill_no;
			}
			$keterangan = str_replace("[","-",$keterangan);
			$keterangan = str_replace("]","-",$keterangan);
			$keterangan = str_replace("#","-",$keterangan);
			$folio .= '[' . $querys->tgltrans .'#'. $querys->debval .'#'. $trsno .'#'. $amount .'#'. $keterangan .']';
		}

		return $folio;

	}

	//Smartindo-SNAP
	public static function Get_FolioRekeningTabPlus($norek, $start, $end, $modul) {
		$folio = "";
		$tabel  = 'gt' .$modul. '_folio';
		$sdebit  = 'gt' .$modul. '_folio.debit_val as debval';
		$query = DB::select('select debit,credit,trans_code,trans_no,bill_no,
			left(CONVERT(datetimeoffset, trans_date, 19),10) 
			as tgltrans,' .$sdebit. ' from ' .$tabel. ' where linker=? 
			and mutasi_date>=? and mutasi_date<=? 
			order by mutasi_date,bill_no', array($norek,$start,$end));
		foreach ($query as $querys){
			$amount = $querys->credit + $querys->debit;
			if ($querys->trans_code == "01"){
				$remark = "Setor Tunai";
			}elseif ($querys->trans_code == "02"){
				$remark = "Tarik Tunai";
			}elseif ($querys->trans_code == "05"){
				$remark = "Bunga Tabungan";
			}
			$trsno = trim($querys->trans_no);
			if ($trsno == ""){
				$trsno = $querys->bill_no;
			}
			$folio .= '[' . $querys->tgltrans .'#'. $querys->debval .'#'. $trsno .'#'. $amount .'#'. $remark .']';
		}

		return $folio;

	}


	//Smartindo-SNAP
	public static function Get_DataDebitur($norek) {
		$data = "";
		$query = DB::select('select *,left(CONVERT(datetimeoffset, START_DATE, 19),10) as tglMulai,
			left(CONVERT(datetimeoffset, END_DATE, 19),10) as tglSampai		
			from gkr_debitor where LINKER = ?', array($norek));
		foreach ($query as $querys){
			$data =  $querys->tglMulai .'#'. $querys->tglSampai .'#'.
				$querys->JW .'#'. $querys->SUKU .'#'. 
				trim($querys->SISTEM) .'#'. $querys->AMOUNT .'#'. 
				$querys->PREDIKAT .'#'. $querys->NUNGGAK1 .'#'. 
				$querys->NUNGGAK2 .'#'. $querys->NUNGGAK3; 
		}
		return $data;

	}

	//Smartindo-SNAP
	public static function Get_FolioPinjaman($norek) {
		$folio = "";
		$dura = self::Get_DisplayMax("K");
		$start = Carbon::now('Asia/Jakarta')->addDay(-$dura);
		$query = DB::select('select dk,pokok,bunga,denda,
			left(CONVERT(datetimeoffset, mutasi_date, 19),10) 
			as tgltrans from gkr_folio where linker=? and mutasi_date>? 
			and dk<>? order by mutasi_date,bill_no', 
			array($norek, $start, 'W'));
		foreach ($query as $querys){
			$remark = "";
			if ($querys->dk == "K"){
				$remark = "Realisasi";
			}elseif ($querys->dk == "D"){
				$remark = "Angsuran";
			}
			$folio .= '[' . $querys->tgltrans .'#'. $querys->dk .'#'. 
				$querys->pokok .'#'. $querys->bunga .'#'. 
				$querys->denda .'#'. $remark .']';
		}

		return $folio;

	}

	//Smartindo-SNAP
	public static function Get_DataDeposan($norek) {
		$data = "";
		$query = DB::select('select *,left(CONVERT(datetimeoffset, START_DATE, 19),10) as tglMulai,
			left(CONVERT(datetimeoffset, END_DATE, 19),10) as tglSampai		
			from gdp_deposan where LINKER = ?', array($norek));
		foreach ($query as $querys){
			$notab = trim($querys->NO_TABUNGAN);
			$data =  $querys->tglMulai .'#'. $querys->tglSampai .'#'.
				$querys->PERIODE .'#'. $querys->RATE .'#'. 
				$querys->rate_system .'#'. $querys->AMOUNT .'#'; 
		}
		$nama = self::Gio_GetNamaNasabah($notab);
		if (trim($nama) == ""){
			$notab = " ";
			$nama = " ";
		}
		$data .= $notab .'#'. $nama; 
		return $data;

	}

	//Smartindo-SNAP
	public static function Get_FolioDeposito($norek) {
		$folio = "";
		$dura = self::Get_DisplayMax("D");
		$start = Carbon::now('Asia/Jakarta')->addDay(-$dura);
		$query = DB::select('select *,
			left(CONVERT(datetimeoffset, MUTASI_DATE, 19),10) 
			as tgltrans from gdp_bunga where LINKER=? and MUTASI_DATE>=?
			order by MUTASI_DATE, BILL_NO', array($norek, $start));
		foreach ($query as $querys){
			$debitval = "T";
			if ($querys->TRANS_CODE == "Di" || $querys->TRANS_CODE == "05"){
				$debitval = "F";
			}
			$folio .= '[' . $querys->tgltrans .'#'. $debitval .'#'. 
				$querys->BILL_NO .'#'. $querys->AMOUNT .'#'. $querys->REMARK .']';
		}

		return $folio;

	}

	public static function Gio_GetNoRekFrom($norek) {
		$query = DB::select('select * from gmob_nasabah where norek = :norek', ['norek' => $norek]);
		foreach ($query as $querys){
			$_REQUEST['attributes']['nama_from'] = $querys->nama;
			$_REQUEST['attributes']['respon_pin'] = $querys->pin_crypto;
			$_REQUEST['attributes']['max_transfer'] = $querys->max_transfer;
		}
		return $query;

	}

	public static function Gio_GetConfig() {

		$query = DB::select('select *,left(CONVERT(datetimeoffset, getdate(), 19),10)as trans_date from gum_config');
		foreach ($query as $querys){
			$_REQUEST['attributes']['audit_date'] = substr($querys->audit_date,0,10);
			$_REQUEST['attributes']['trans_date'] = $querys->trans_date;
			$_REQUEST['attributes']['max_transfer'] = $querys->max_transfer;			
		}
		return $query;
	}

	//[Smartindo-SNAP]
	public static function Gio_GetAccountExist($norek, $to) {
		$query = DB::select('select * from gmob_listaccount where 
			norek=? and to_norek=?',array($norek, $to));
		foreach ($query as $querys){
				$_REQUEST['attributes']['nama_to'] = $querys->to_name;
		}
		return $query;

	}

	//[Smartindo-SNAP]
	public static function Gio_GetAccountStatus($norek, $modul) {
		$tabel = "gt" .$modul. "_nasabah";
		$query = DB::select('select nasabah from ' .$tabel. ' 
			where linker=? and status=?',array($norek, 'A'));
		return $query;
	}

	//[Smartindo-SNAP]
	public static function Gio_InsNoRekTo($norek, $tonorek, $toname){
		self::Gio_DelNoRekTo($norek, $tonorek.'#');
		$query = DB::update('insert into gmob_listaccount (norek,
			to_norek, to_name) values (?,?,?)', 
			array($norek, $tonorek, $toname));
		return $query;
	}

	//[Smartindo-SNAP]
	public static function Gio_DelNoRekTo($norek, $tonorek){
		$aLinker = explode("#", $tonorek);
		for ($i=0; $i < count($aLinker)-1 ; $i++){
			$query = DB::update('delete gmob_listaccount where norek=?
				and to_norek=?', array($norek, $aLinker[$i]));
		}
		return $query;
	}
	
	public static function Gio_GetNamaNasabah($norek) {
		$nama = "";
		$query = DB::select('select * from gtb_nasabah where linker=? and status != ?',array($norek, 'T'));
		foreach ($query as $querys){
			$nama = $querys->nasabah;
		}
		return $nama;

	}

	public static function Gio_CheckPin($pin) {

		$result = false;
		if ( $pin == $_REQUEST['attributes']['respon_pin'] ) {
			$result = true;
		}
		return $result;

	}

	public static function Gio_CheckSaldo($norek, $amount) {
		$saldo = self::Gio_GetSaldoTabungan($norek);
		$total = self::Gio_GetTotalTrans($norek);
		$_REQUEST['attributes']['respon_saldo'] = $saldo - $amount;
		$result = true;
		if ( $saldo < $amount ) {
			$_REQUEST['attributes']['msg_saldo'] = "Saldo rekening tidak mencukupi.";
			$result = false;
		}else if( $total+$amount > ENV("MAX_TRANSFER")  ){
			$_REQUEST['attributes']['msg_saldo'] = "Total transfer hari ini melebihi limit.";
			$result = false;
		}else if( $_REQUEST['attributes']['respon_saldo'] < ENV("SALDO_MIN") ){
			$_REQUEST['attributes']['msg_saldo'] = "Saldo minimal rekening tidak mencukupi.";
			$result = false;
		}else if( $amount < ENV("MIN_TRANSFER") ){
			$_REQUEST['attributes']['msg_saldo'] = "Transaksi di bawah batas minimum.";
			$result = false;
		}else if( $amount > ENV("MAX_TRANSFER") ){
			$_REQUEST['attributes']['msg_saldo'] = "Transaksi di atas batas maksimum.";
			$result = false;
		}
		return $result;

	}

	public static function Gio_GetTotalTrans($norek) {
		$tgl = date("Y-m-d");
		$query = DB::select('select isnull(sum(debit),0) as Total from gtb_folio 
			where linker=? and trans_date>=? and userid=?', 
			array($norek, $tgl, 'mBanking'));
		$total = 0;
		foreach ($query as $querys){
			$total = $querys->Total;
		}
		return $total;
	
	}

	public static function Get_TransferCost($code) {
		$query = DB::select('select * from gcore_bankcode where 
		bank_code=?',array($code));
		foreach ($query as $querys){
			$_REQUEST['attributes']['transfer_cost'] = $querys->transfer_cost + $querys->revenue;
		}
		return $query;
	
	}

	public static function GetModulCode($norek){
		$mdl = "b";
		$_REQUEST['attributes']['jenis'] = 'Tabungan';
		if( substr($norek,0,2) == '10' || substr($norek,0,2) == '11'){
		  $mdl = "e";
		  $_REQUEST['attributes']['jenis'] = 'Takamas';
		}else if( substr($norek,0,2) == '20' ){
		  $mdl = "f";
		  $_REQUEST['attributes']['jenis'] = 'Sipura';
		}else if( substr($norek,0,2) == '30' ){
			$mdl = "g";
			$_REQUEST['attributes']['jenis'] = 'Sitirta';
		}else if( substr($norek,0,2) == '40' ){
			$mdl = "h";
			$_REQUEST['attributes']['jenis'] = 'Simapan';
		}else if( substr($norek,0,2) == '33' || substr($norek,0,2) == '34' ){
			$mdl = "D";
			$_REQUEST['attributes']['jenis'] = 'Deposito';
		}
		return $mdl;
	}

	public static function Gio_GetNoRekTo($norek, $modul) {
		$tabel = "gt" .$modul. "_nasabah";
		$query = DB::select('select nasabah from ' .$tabel. ' where linker=? and status=?',array($norek, 'A'));
		foreach ($query as $querys){
			$_REQUEST['attributes']['nama_to'] = $querys->nasabah;
		}
		return $query;

	}

	public static function Gio_GetSaldoABA() {
		$accno = '1.20.05';
		$saldo = 0.00;
		$tgl = $_REQUEST['attributes']['audit_date'];
		$query = DB::select('select sum(debit-credit) as total from gak_ledger where 
			account_no=?',array($accno));
		foreach ($query as $querys){
			$saldo = $querys->total;
		}

		$query = DB::select('select sum(amount) as total from gak_mutasi where 
			account_no=? and mutasi_date=? and debit_val=?',
			array($accno, $tgl, 'T'));
		foreach ($query as $querys){
			$saldo = $saldo + $querys->total;
		}

		$query = DB::select('select sum(amount) as total from gak_mutasi where 
		account_no=? and mutasi_date=? and debit_val=?',
		array($accno, $tgl, 'F'));
		foreach ($query as $querys){
			$saldo = $saldo - $querys->total;
		}

		return $saldo;
	
	}

	public static function Gio_InsTransaksiPPOB($data){
		$query = DB::update('insert into gmob_payment (trans_code,
			trans_number,trans_date,norek,product_code,product_name,
			nominal,admin,customer,ref_no) 
			values (?,?,?,?,?,?,?,?,?,?)', $data);
		return $query;
	}

	public static function Gio_DeleteTransaksiPPOB($norek, $transNo){
		$query = DB::update('delete gtb_folio where 
			linker=? and trans_no=?', array($norek, $transNo));
		$query = DB::update('delete gak_mutasi where 
			linker=? and trans_no=?', array($norek, $transNo));
		$query = DB::update('delete gppob_transactions where 
			trans_code=?', array($transNo));
		return;
	}

	public static function Gio_GetDepositPPOB() {
		$saldo = 0;
		$query = DB::select('select sum(debit-credit) as Saldo 
			from gppob_transaction');
		foreach ($query as $querys){
			$saldo = $querys->Saldo;
		}
		return $saldo;
	}

	public static function Get_DaftarRek($noid, $jenis) {
		$folio = "";
		if ($jenis == 'Tabungan'){
			$query = DB::select('select * from gmob_rekening where 
				noid=? and produk<>? order by id', 
				array($noid, 'Pinjaman'));
		}else{
			$query = DB::select('select * from gmob_rekening where 
				noid=? and produk=? order by id', 
				array($noid, 'Pinjaman'));
		}
		foreach ($query as $querys){
			$norek = $querys->notab;
			$saldo = $querys->saldo;
			$nama = $querys->nama;
			$produk = $querys->produk;
			$folio .= '[' . $norek .'#'. $nama .'#'. $saldo .'#'. $produk .']';
		}

		return $folio;

	}

	public static function Get_DisplayMax($modul) {
		if ($modul == "D"){
			$query = DB::select('select * from gdp_setup');
		}else{
			$query = DB::select('select * from gkr_setup where 
			kode_sektor=?',array('01'));
		}
		foreach ($query as $querys){
			$durasi = $querys->display_max;
		}
		return $durasi;
	
	}

	public static function Get_BlackList($accno) {
		$found = false;
		$query = DB::select('select count(*) from gcore_transfer');
		foreach ($query as $querys){
			if ($querys->account_no == $accno){
				$found = true;
			}
		}
		return $true;
	}

}