var me={};
var game_status={};
var timeout;
$(function () {

	$('#login').click(login_to_game);
	$('#Game_reset').click(reset_game);
});

$(document).ready(function(){
	$(".card").click(getCard);
});

function getCard(){
	var id = $(this).id;
	alert(id);
}

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
	Start_game();
	update_info();
	game_status_update();
}


function Start_game(){
	$.ajax({url: "Moutzourhs.php/cards/", method: 'get', success: update_cards });
}

function update_cards(data) {

	
	var m = '<table id="Me">';
	m += '<tr>';

	var op = '<table id="Op">';
	op += '<tr>';



	for(var i=0; i<data.length;i++) {
		var o = data[i];
		var c = o.Number + '_' + o.Symbol;
		if (o.Player == me.player){			
			m += '<td class="My_Cards" id="rectangle_'+i+'"><img class="card" id='+c+' src="images/'+c+'.png"></td>';	
		}
		else if (o.Player !=null){
			op += '<td class="opCard" id="rectangle_'+i+'"><img class="card" id='+c+' src="images/blank.png" onclick="getCard()" ="SetDest(this.id)"></td>';	
		}
	}
	
	m += '<tr>';
	m += '</table>';

	op += '<tr>';
	op += '</table">';

	op+= m;
	$('#Game_board').html(op);	
}


function game_status_update() {
	$.ajax({url: "Moutzourhs.php/status/", success: update_status,headers: {"X-Token": me.token} });
}

function update_status(data) {
	Start_game();
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
		timeout = setTimeout(function() { game_status_update();}, 15000);
	} else {
		// must wait for something
		$('#move_div').hide(500);
		timeout = setTimeout(function() { game_status_update();}, 4000);
	}
 	
}

function error_msg(data,y,z,c){
    var x = data.responseJSON;
    alert(x.errormesg);
}

function update_info(){
	if (game_status.p_turn==null){
		$('#game_info').html("I am Player: "+me.player+", my name is "+me.username +'<br>Token='+me.token+'<br>Game state: '+game_status.status+',  Wait for an opponent.');
	}else {
		$('#game_info').html("I am Player: "+me.player+", my name is "+me.username +'<br>Token='+me.token+'<br>Game state: '+game_status.status+',  '+game_status.p_turn+' must play.');	
	}
	

}



function reset_game(){
	$.ajax({url: "Moutzourhs.php/cards/", headers: {"X-Token": me.token}, method: 'POST',  success: hide_cards });
	$('#game_initializer').show(500);
	$('#Game_board').html("");
	clearTimeout(timeout);
}

function hide_cards(){

}
