<?php  

	include("database.php");
	$imei = "MAR196504030000";
	$kdgroup = "MM";
	
	$query = "select * from gkol_kolektor where imei='$imei' and kdgroup='$kdgroup'";
	$result = $GLOBALS['conn']->query($query);	 
	while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
		$status = $row['nama'];
	}
	echo $status;
	
?>