var me={};
var game_status={};
$(function () {

	$('#login').click(login_to_game);
	$('#Game_reset').click(reset_game);

});


function login_to_game() {
	if($('#username').val()=='') {
		alert('You have to set a username');
		return;
	}
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

function login_result(){
    me = data[0];
}

function error_msg(data,y,z,c){
    var x = data.responseJSON;
    alert(x.errormesg);
}


function reset_game(){
	$.ajax({url: "Moutzourhs.php/cards/", headers: {"X-Token": me.token}, method: 'POST',  success: fill_board_by_data });
}

function fill_board_by_data(){

	
}