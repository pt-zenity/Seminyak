<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;

class iosTransferHelper {

	public static function Ins_TransferAR($data, $transno){

		$ref = "";
		$status=0;
		$query = DB::select('select * from gmob_transfer where trans_no=?', array($transno));
		foreach ($query as $querys){
			$ref = $querys->trans_no;
		}

		if ($ref == $transno){		
			$status=3;
		}else{
			$query = DB::update('insert into gmob_transfer (trans_date,
			from_norek,from_name,to_norek,to_name,amount,cost,balance,
			remark,trans_no) values (?,?,?,?,?,?,?,?,?,?)', $data);	

			$query = DB::select('select * from gmob_transfer where trans_no=?',array($transno));
			foreach ($query as $querys){
				$status = $querys->status;
			}
		}
		return $status;
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

	public static function Gio_GetSaldoTabungan($norek) {
		$sisa = 0;
		$saldo = DB::select('select sum(credit-debit) as Sisa from gtb_folio where linker=?', array($norek));
		foreach ($saldo as $saldos){
			$sisa = $saldos->Sisa;
		}
		return $sisa;
	}

	public static function Gio_GetSaldoTabPlus($norek) {
		$sisa = 0;
		$saldo = DB::select('select sum(credit-debit) as Sisa from gtb_folio where linker=?', array($norek));
		foreach ($saldo as $saldos){
			$sisa = $saldos->Sisa;
		}
		return $sisa;
	}

	public static function Gio_InsTransferARLog($fromNo, $fromName, 
		$toNo, $toName, $amount, $transNo, $rc, $response){

		$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();
		$query = "insert into gmob_transferlog (
			from_norek, from_name, to_norek, to_name, amount,
			trans_no, rc, response) values 
			(:from_norek, :from_name, :to_norek, :to_name, 
			:amount, :trans_no, :rc, :response)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':from_norek', $fromNo);
		$stmt->bindValue(':from_name', $fromName);
		$stmt->bindValue(':to_norek', $toNo);
		$stmt->bindValue(':to_name', $toName);
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':trans_no', $transNo);
		$stmt->bindValue(':rc', $rc);
		$stmt->bindValue(':response', $response);
		$stmt->execute();

		return $stmt;

	}

	public static function Gio_CheckPIN($imei, $pin) {
		$pan = "";
		$status = "54";
		$query = DB::select('select * from gmob_nasabah where 
			imei_code=? and pin_crypto=?',array($imei, $pin));
		foreach ($query as $querys){
			$pan = $querys->pin_crypto;
		}
		if ($pan == $pin){
			$status = "00";
		}
		return $status;
	
	}

	public static function Gio_CheckSaldo($norek, $amount) {
		$saldo = self::Gio_GetSaldoTabungan($norek);
		$total = self::Gio_GetTotalTrans($norek);
		$_REQUEST['attributes']['respon_saldo'] = $saldo - $amount;
		$result = true;
		if ( $saldo < $amount ) {
			$_REQUEST['attributes']['msg_saldo'] = "Saldo rekening tidak mencukupi.";
			$result = false;
		}else if( $total+$amount > $_REQUEST['attributes']['max_transfer']  ){
			$_REQUEST['attributes']['msg_saldo'] = "Total transfer hari ini melebihi limit.";
			$result = false;
		}else if( $_REQUEST['attributes']['respon_saldo'] < ENV("SALDO_MIN") ){
			$_REQUEST['attributes']['msg_saldo'] = "Saldo minimal rekening tidak mencukupi.";
			$result = false;
		}else if( $amount < ENV("MIN_TRANSFER") ){
			$_REQUEST['attributes']['msg_saldo'] = "Transaksi di bawah batas minimum.";
			$result = false;
		}else if( $amount > $_REQUEST['attributes']['max_transfer'] ){
			$_REQUEST['attributes']['msg_saldo'] = "Transaksi di atas batas maksimum.";
			$result = false;
		}
		return $result;

	}

	public static function Get_TransferCost($code) {
		$query = DB::select('select * from gcore_bankcode where 
		bank_code=?',array($code));
		foreach ($query as $querys){
			$_REQUEST['attributes']['transfer_cost'] = $querys->transfer_cost + $querys->revenue;
		}
		return $query;
	
	}

	public static function Gio_InsTransferVALog($code, $no, $name, 
		$amount,$rc, $msg, $cmd, $refNo, $bankCode, $norek, $virtualAccount){

		$tcode = $code .'-'. date('ymd') . date('Hms') . substr(rand(),-5);
		$dbc = \Illuminate\Support\Facades\DB::connection()->getPdo();
		$query = "insert into gcore_log (transfer_code,
			accountNumber,accountName,amount,message,responsecode,command,
			referenceNumber, bankCode, norek, virtualAccount) values 
			(:transfer_code, :accountNumber,:accountName,:amount,:message,
			:responsecode,:command,:referenceNumber,:bankCode,:norek,:virtualAccount)";
		$stmt = $dbc->prepare($query);
		$stmt->bindValue(':transfer_code', $tcode);
		$stmt->bindValue(':accountNumber', $no);
		$stmt->bindValue(':accountName', $name);
		$stmt->bindValue(':amount', $amount);
		$stmt->bindValue(':message', $msg);
		$stmt->bindValue(':responsecode', $rc);
		$stmt->bindValue(':command', $cmd);
		$stmt->bindValue(':referenceNumber', $refNo);
		$stmt->bindValue(':bankCode', $bankCode);
		$stmt->bindValue(':norek', $norek);
		$stmt->bindValue(':virtualAccount', $virtualAccount);
		$stmt->execute();

		return $stmt;

	}

	public static function Gio_GetReference($noRef, $noAcc, $command, $rc) {
		$status = false;
		$query = DB::select('select * from gcore_log where 
			referenceNumber=? and accountNumber=? and command=? and responsecode=?',
			array($noRef, $noAcc, $command, $rc));
		foreach ($query as $querys){
			if ($querys->referenceNumber == $noRef){
				$status = true;
			};
		}
	
		return $status;

	}

	public static function Gio_InsTransferOutBank($data, $transCode){
		$query = DB::update('insert into gcore_transfer (
			transfer_code,transfer_date,transfer_type,norek,nasabah,
			accountNumber,amount,dateTimes,referenceNumber,destinationBankCode,
			destinationAccountNumber,destinationAccountName,
			responseCode,responseDescription,serviceType) values 
			(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', $data);
		
		$status = "01";
		$query = DB::select('select * from gcore_transfer where transfer_code=?',  
			array($transCode));
		foreach ($query as $querys){
			$status = $querys->responseCode;
		}
		return trim($status);
	}

	public static function Gio_DelTransferOutBank($norek, $transNo){
		$query = DB::update('delete gtb_folio where linker=? and trans_no=?',  
			array($norek, $transNo));
		$query = DB::update('delete gak_mutasi where linker=? and trans_no=?',  
			array($norek, $transNo));			
		return;
	}

}