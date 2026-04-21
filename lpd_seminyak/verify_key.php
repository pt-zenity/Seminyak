<?php

	$publicKey = "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAscROkuSFemcMJORfbhXA
N40ePsXgI3UPt/MokRbawY583ZODsfzFdfH5yCEAGTo+9rTGLfgSMtx1YVnRnBZJ
kcPRPvMqBDi49aDnpzeTfJrkLVpdAK5ykmnm8fxr7A73ivikxifKioIJBxgaMfHM
PEKu+maS35s0JW4novoX7CLWf/sh8BcbD83haebvxVP7RIV/R8cjYwxIkj56xxIU
ppcSfgnmb+tuP4GUBCMcEvXX0jGZ/4ZfmM1oXoLrufkDI3woyNx7Gm5BYdGQ+XnT
Eu9nn5vhY7VcAov/N8EovdRHxmI9CzLKTqg0waeeSAuYmaYag7RwYd3ntq/EUt9q
LQIDAQAB
-----END PUBLIC KEY-----";


	$signor = $_GET['signature'];
	$clientStamp = $_GET['client'];	
	$sign64 = base64_decode($signor);

	$verifySSL = openssl_verify($clientStamp, $sign64, $publicKey,OPENSSL_ALGO_SHA256);

	echo $verifySSL;
	
?>
