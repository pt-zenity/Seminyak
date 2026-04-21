<?php

	$publicKey = "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9yombv0V0Tvkf6J7rZu3
kdtOaSspE4IBu61kMgiY/2zCuiKsREjh4zvGOKrlj50ApzvkysBDSc6yo8/Evdc0
IKB0n2GHNpieUbPd21M7zuXLD2880PicCsbt2hYL4w5eFMT+qpgX/nVwtVKZc1W+
dl8AewqMG1zC3y0hJ5YxiKf4JAtHdPNV2nzaPE2nmSbxZEKST0jzV1S2mEA7fud/
k+5Nr9CJR7C7kTOegJmAmtYtsNh/qleulPhdYOMfY0VbtTU18FcTVgZjRh6xStGM
6GjIBen+Oj7ZAvsxgeEq2fhtn6leq58kqST0gzug5RGbjc6ZmYLDXJfrmiRLEU0q
fwIDAQAB
-----END PUBLIC KEY-----";


	$signor = $_GET['signature'];
	$clientStamp = $_GET['client'];	
	$sign64 = base64_decode($signor);

	$verifySSL = openssl_verify($clientStamp, $sign64, $publicKey,OPENSSL_ALGO_SHA256);

	echo $verifySSL;
	
?>
