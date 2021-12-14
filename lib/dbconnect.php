<?php
$host='localhost';
$db = 'moutzouris';
require_once "db_upass.php";

$user=$DB_USER;
$pass=$DB_PASS;



if(gethostname()=='users.iee.ihu.gr') {
	$mysqli = new mysqli($host, $user, $pass, $db,null,'/home/student/it/2016/it164828/mysql/run/mysql.sock');
} else {
		$pass=null;
        $mysqli = new mysqli($host, "root", $pass, $db);
}

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . 
    $mysqli->connect_errno . ") " . $mysqli->connect_error;
}?>
