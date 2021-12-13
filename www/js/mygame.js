var me={};
var game_status={};

$(function () {

	$('#login').click(login_to_game);
	$('#Game_reset').click(reset_game);

});



function login_to_game() {

	var myTurn = $('#turn').val();

	$.ajax({url: "Moutzourhs.php/players/"+myTurn, 
			method: 'PUT',
			dataType: "json",
			headers: {"X-Token": me.token},
			contentType: 'application/json',
			data: JSON.stringify( {username: $('#username').val(), turn: myTurn}),
			success: login_result,
            error: error_msg});	

}

function login_result(data){
    me = data[0];
	$('#game_initializer').hide(500);
	update_info();
	game_status_update();
}

function game_status_update() {
	$.ajax({url: "Moutzourhs.php/status/", success: update_status,headers: {"X-Token": me.token} });
}

function update_status(data) {
	var game_stat_old = game_status;
	game_status=data[0];
	update_info();
	if(game_status.p_turn==me.player &&  me.player!=null) {
		x=0;
		// do play
		if(game_stat_old.p_turn!=me.myTurn) {
			//fill_board();
		}
		$('#move_div').show(500);
		setTimeout(function() { game_status_update();}, 15000);
	} else {
		// must wait for something
		$('#move_div').hide(500);
		setTimeout(function() { game_status_update();}, 4000);
	}
 	
}

function error_msg(data,y,z,c){
    var x = data.responseJSON;
    alert(x.errormesg);
}

function update_info(){
	$('#game_info').html("I am Player: "+me.player+", my name is "+me.username +'<br>Token='+me.token+'<br>Game state: '+game_status.status+', '+ game_status.p_turn+' must play now.');
	
}

function reset_game(){
	$.ajax({url: "Moutzourhs.php/cards/", headers: {"X-Token": me.token}, method: 'POST',  success: hide_cards });
	$('#game_initializer').show(500);
}

function hide_cards(){

}
