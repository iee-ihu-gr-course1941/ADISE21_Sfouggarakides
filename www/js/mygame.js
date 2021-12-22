var me={};
var game_status={};
var timeout;
var MyCards = [];
var OpCads=[];
var ispva = false;
var flag = false;

$(function () {
	$('#Game_reset').click(reset_game);
	$('#pvp').click(pvp);
	$('#pva').click(pva);
});


function pvp(){
	$('#main').load("pick.html");
}

function pva(){
	pvp();
	ispva = true;

}

function getCard(e){
	if (game_status.p_turn==me.player){
		var card = OpCads[e.id];
		var a = card.trim().split(/[_]+/);
		swal2.fire({
			title: "You Chose: ",
			text: "Keepgoing",
			imageUrl:'images/'+card+'.png',
			imageWidth: 100,
  			imageHeight: 150,
			button: "Close",
		})
			.then(() => {
				$.ajax({url: "Moutzourhs.php/cards/draw/"+a[0]+'/'+a[1], 
				method: 'PUT',
				dataType: "json",
				contentType: 'application/json',
				data: JSON.stringify( {p: me.player}),
				headers: {"X-Token": me.token},
				success: move_result});
			});
	}
}

function move_result(data){
	Start_game();
	update_info();
	game_status_update();
}


function login_to_game() {
	var myTurn = $('#turn').val();
	var us = $('#username').val();
	logIn(us,myTurn);
}

function logIn(us,myTurn) {

	$.ajax({url: "Moutzourhs.php/players/"+myTurn, 
			method: 'PUT',
			dataType: "json",
			headers: {"X-Token": me.token},
			contentType: 'application/json',
			data: JSON.stringify( {username: us, turn: myTurn}),
			success: login_result,
            error: error_msg});	
}


function login_result(data){
	if (ispva && !flag){
		me = data[0];
		$('#p').hide(500);
		if (me.player == 'F'){
			logIn('fake','S');
			flag =true;
		}
		else {
		logIn('fake','F');
		flag =true;
		}

		Start_game();
		update_Bot_info();
		botGameUpdate();
			
	}
	else if (!ispva){
		me = data[0];
		$('#p').hide(500);
		Start_game();
		update_info();
		game_status_update();
	}
	

}

//Bot Plays
function botGameUpdate() {
	$.ajax({url: "Moutzourhs.php/status/", success: update_bot,headers: {"X-Token": me.token} });
}

function update_bot(data) {
	Start_game();
	var game_stat_old = game_status;
	game_status=data[0];
	timeout = setTimeout(function() { botGameUpdate();}, 1000);
	update_Bot_info();
}

function update_Bot_info(){
	if (game_status.p_turn==me.player){
		$('#game_info').html('Its your turn');
	}else if (game_status.p_turn != null){
		$('#game_info').html('Wait for the computer');
		var ran = Math.floor(Math.random()*MyCards.length - 1);
		botRandomCard(ran);
	}





	if (game_status.status == "not active"){
		game_status.status = null;
		clearTimeout(timeout);
		reset_game();
	}
	if (game_status.status == "ended"){
		if (game_status.p_turn == me.player){
			swal.fire({
				title: "You Won!",
				text: "Good Job!",
				icon: "success",
				button: "Bye :)",
			  }).then(() => {
				reset_game();
			  });			
			  // alert('You are the Winner!!!');
		}else{
			// alert('You Lost, better luck next time !!!!');	
			
			swal.fire({
				title: "You Lost",
				text: "Maybe another time..",
				icon: "error",
				button: "Bye!",
			  }).then(() => {
				reset_game();
			  });
		}
		clearTimeout(timeout);
		
	}
	
}

function botRandomCard(c){
	var a = MyCards[c].trim().split(/[_]+/);
	var b = 'F'
	if (me.player = 'F') { b = 'S'};
	$.ajax({url: "Moutzourhs.php/cards/draw/"+a[0]+'/'+a[1], 
		method: 'PUT',
		dataType: "json",
		contentType: 'application/json',
		data: JSON.stringify( {p: b}),
		headers: {"X-Token": me.token},
		success: botdraw});

}
function botdraw(data){
	update_Bot_info();
}

//end


function Start_game(){
	$.ajax({url: "Moutzourhs.php/cards/", method: 'get', success: update_cards });
}


function update_cards(data) {
	var myN = 0;
	var OpN = 0;


	var m = '<table id="Me">';
	m += '<tr>';

	var op = '<table id="Op">';
	op += '<tr>';



	for(var i=0; i<data.length;i++) {
		var o = data[i];
		var c = o.Number + '_' + o.Symbol;
		if (o.Player == me.player){	
			
			m += '<td class="My_Cards" id="rectangle_'+i+'"><img class="card" id='+myN+' src="images/'+c+'.png"></td>';
			MyCards[myN]= c;
			myN++;
		}
		else if (o.Player !=null){

			op += '<td class="opCard" id="rectangle_'+i+'"><img class="card" id='+OpN+' src="images/blank.png" onclick="getCard(this)"></td>';
			OpCads[OpN] = c;
			OpN++;	
		}
	}
	
	m += '</tr>';
	m += '</table>';

	op += '</tr>';
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
		game_status.status = null;
		clearTimeout(timeout);
		reset_game();


	}
	if (game_status.status == "ended"){
		if (game_status.p_turn == me.player){
			// alert('You are the Winner!!!');
			swal.fire({
				title: "You Won!",
				text: "Good Job!",
				icon: "success",
				button: "Bye :)",
			  }).then(() => {
				reset_game();
			  });
		}else{
			// alert('You Lost, better luck next time !!!!');
			swal.fire({
				title: "You Lost",
				text: "Maybe another time..",
				icon: "error",
				button: "Bye!",
			  }).then(() => {
				reset_game();
			  });
		}
		clearTimeout(timeout);

	}
	
}



function reset_game(){
	$.ajax({url: "Moutzourhs.php/cards/", headers: {"X-Token": me.token}, method: 'POST',  success: hide_cards });

}

function hide_cards(){
	
	location.reload();
	
}
