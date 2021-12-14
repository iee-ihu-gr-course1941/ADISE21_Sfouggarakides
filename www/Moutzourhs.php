<?php
require_once "../lib/dbconnect.php";
require_once "../lib/cards.php";
require_once "../lib/game.php";
require_once "../lib/users.php";

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);


switch ($r=array_shift($request)) {
    case 'cards' : 
        switch ($b=array_shift($request)) {
            case '':
            case null: handle_board($method,$input);
                        break;
            case 'draw': handle_draw($method, $request[0],$request[1],$input);
                        break;
            }
            break;
    case 'status': 
			if(sizeof($request)==0) {handle_status($method);}
			else {header("HTTP/1.1 404 Not Found");}
			break;
	case 'players': handle_player($method, $request,$input);
			    break;
	default:  header("HTTP/1.1 404 Not Found");
                        exit;
}


function handle_board($method) {
    if($method=='GET') {
            show_cards();
    } else if ($method=='POST') {
            reset_cards();
    } else {
        header('HTTP/1.1405 Method Not Allowed');
    }
    
}

function handle_player($method, $p,$input) {
    switch ($b=array_shift($p)) {

        case 'F': 
		case 'S': handle_user($method, $b,$input);
					break;
		default: header("HTTP/1.1 404 Not Found");
				 print json_encode(['errormesg'=>"Player $b not found."]);
                 break;
	}
}
function handle_status($method) {
    if($method=='GET') {
        show_status();
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}
?>