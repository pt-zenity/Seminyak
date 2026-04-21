<?php  

    $serverName = "SERVERSEMINYAK";
    $database = "Giosoft_LPD";
    $uid = "sa";
    $pwd = "#sa?seminyak";
    
    $GLOBALS['conn'] = new PDO("sqlsrv:server=$serverName ; Database = $database", $uid, $pwd);
	if (!$GLOBALS['conn']){
	  exit("Connection failed!" . $conn);
	}
?>