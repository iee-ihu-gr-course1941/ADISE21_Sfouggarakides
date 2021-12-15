var me={};
var game_status={};
var timeout;
$(function () {
	$('#login').click(login_to_game);
	$('#Game_reset').click(reset_game);
});


function getCard(e){
	if (game_status.p_turn==me.player){
		
		var a = e.id.trim().split(/[_]+/);

		$.ajax({url: "Moutzourhs.php/cards/draw/"+a[0]+'/'+a[1], 
			method: 'PUT',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify( {p: me.player}),
			headers: {"X-Token": me.token},
			success: move_result});

		//draw card do things
	}
}

function move_result(data){
	Start_game();
	update_info();
	game_status_update();
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
			op += '<td class="opCard" id="rectangle_'+i+'"><img class="card" id='+c+' src="images/blank.png" onclick="getCard(this)"></td>';	
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
	timeout = setTimeout(function() { game_status_update();}, 2000);
	
	update_info();
	
 	
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

	if (game_status.status == "not active"){
		clearTimeout(timeout);
		reset_game();
	}
	

}



function reset_game(){
	$.ajax({url: "Moutzourhs.php/cards/", headers: {"X-Token": me.token}, method: 'POST',  success: hide_cards });

}

function hide_cards(){
	$('#game_initializer').show(500);
	$('#Game_board').html("");
	$('#game_info').html("");
	clearTimeout(timeout);
	
}
