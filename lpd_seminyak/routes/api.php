<?php

use Illuminate\Http\Request;

// url untuk SNAP Transfer-In Antar Bank (BPD) ========================================
Route::post('/v1.0/transfer-va/inquiry', 'SNAPTransferIn@Inquiry');
Route::post('/v1.0/transfer-va/payment', 'SNAPTransferIn@Payment');
Route::post('/v1.0/access-token/b2b', 'SNAPTokenTransferIn@AccessToken');

// ATM
Route::post('/cardless/create-token', 'MachineController@CreateToken');
Route::post('/cardless/get-token', 'MachineController@GetToken');
Route::post('/cardless/check-balance', 'MachineController@CekSaldo');
Route::post('/cardless/cash-debit', 'MachineController@Penarikan');
Route::post('/cardless/cash-credit', 'MachineController@Penyetoran');
Route::post('/cardless/reversal-debit', 'MachineController@BatalTarik');
Route::post('/cardless/reversal-credit', 'MachineController@BatalSetor');

Route::post('/ppob/callback', 'PPOBController@Callback');

//Mobile Banking ios
Route::prefix('/smart')->group(function () {

    Route::post('/access/token','iosTokenCtrl@AccessToken'); 
    Route::post('/access/key','iosTokenCtrl@AccessKey'); 
    Route::post('/access/register','iosAccessCtrl@Register'); 
    Route::post('/access/login','iosAccessCtrl@Login'); 
    Route::post('/access/logout','iosAccessCtrl@Logout'); 
    Route::post('/access/update/pass','iosAccessCtrl@UpdatePass'); 
    Route::post('/access/update/pin','iosAccessCtrl@UpdatePin'); 

    Route::post('/tabungan/account-list','iosTabunganCtrl@ListAccount'); 
    Route::post('/tabungan/transaction-history','iosTabunganCtrl@HistoryTransaction'); 
    Route::post('/tabungan/mutasi-history','iosTabunganCtrl@HistoryMutasi'); 

    Route::post('/transfer/lpd/check','iosTransferLPDCtrl@Check'); 
    Route::post('/transfer/lpd/inquiry','iosTransferLPDCtrl@Inquiry'); 
    Route::post('/transfer/lpd/post','iosTransferLPDCtrl@Posting'); 

    Route::post('/transfer/bank/check','iosTransferBankCtrl@Check'); 
    Route::post('/transfer/bank/inquiry','iosTransferBankCtrl@Inquiry'); 
    Route::post('/transfer/bank/post','iosTransferBankCtrl@Posting'); 

    Route::post('/ppob/check', 'iosPPOBController@Check');
    Route::post('/ppob/request', 'iosPPOBController@Request');
    Route::post('/iak/check', 'iosPPOBIAKController@Check');
    Route::post('/iak/request', 'iosPPOBIAKController@Request');

    Route::post('/cardless/create/token', 'iosMachineCtrl@CreateToken');

});