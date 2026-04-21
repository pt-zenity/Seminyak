<?php

Route::get('/get-list-bank', 'iosAccessCtrl@Get_BankList');
Route::get('/get-list-ppob', 'iosAccessCtrl@Get_PPOBList');
Route::get('/get-list-display', 'MBankingAccess@Get_AppList');

Route::get('/test', 'iosAccessCtrl@Test');
Route::get('/get-token', 'SNAPTokenTransferIn@Get_Token');
Route::get('/send-imei', 'iosAccessCtrl@Send_UserID');
