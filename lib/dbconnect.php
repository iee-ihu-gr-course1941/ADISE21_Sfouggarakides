<?php
$host='localhost';
$db = 'moutzouris';
require_once "db_upass.php";

$user=$DB_USER;
$pass=$DB_PASS;
$path=$DB_DIR;



if(gethostname()=='users.iee.ihu.gr') {
	$mysqli = new mysqli($host, $user, $pass, $db,null,$path);
} else {
    $pass=$DB_passLocal;
        $mysqli = new mysqli($host, $user, $pass, $db);
}

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . 
    $mysqli->connect_errno . ") " . $mysqli->connect_error;
}?>
