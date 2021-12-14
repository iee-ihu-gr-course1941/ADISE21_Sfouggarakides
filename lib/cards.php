<?php
function show_cards() {
    global $mysqli;
	
	$sql = 'SELECT * FROM cards ';
	/*ORDER BY RAND()  ';*/
	$st = $mysqli->prepare($sql);

	$st->execute();
	$res = $st->get_result();

	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function reset_cards() {
	global $mysqli;
	
	$sql = 'call clean_board()';
	$mysqli->query($sql);
}
function take_card($p,$n,$s){
	global $mysqli;
	$sql = 'call `take_card`(?,?,?);';
	$st = $mysqli->prepare($sql);
	$st->bind_param('ssi',$p,$s,$n);
	$st->execute();

	header('Content-type: application/json');
}
?>