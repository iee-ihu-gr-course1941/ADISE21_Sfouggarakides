$(function () {
	draw_empty_board();
	fill_board();
});


function draw_empty_board() {
	var t = '<table id="Player1">';
	t += '<tr>';
	for(var i=1;i<22;i++) {
		t += '<td class="Player1_Card" id="rectangle_'+i+'_'+1+'">' + i +','+1+'</td>'; 
	}
	t += '</tr>';
	t+='</table>';


	t += '<table id="Player2">';
	t += '<tr>';
	for(var i=1;i<21;i++) {
		t += '<td class="Player2_Card" id="rectangle_'+i+'_'+2+'">' + i +','+2+'</td>'; 
	}
	t += '</tr>';

	t+='</table>';
	
	$('#Game_board').html(t);
}

function fill_board() {
	$.ajax({url: "Moutzourhs.php/cards/", method: 'get', success: shufflecards });
	
}

function shufflecards(data) {

	for(var i=1;i<22;i++){
		var o = data[i-1];
		var id = '#rectangle_' + i + '_' + 1;
		var c = o.Number + '_' + o.Symbol;
		var im = '<img class="piece" src="images/'+c+'.png">';
		$(id).addClass('1').html(im);
	}

	for(var i=1;i<21;i++){
		var o = data[20+i];
		var id = '#rectangle_' + i + '_' + 2;
		var c = o.Number + '_' + o.Symbol;
		var im = '<img class="piece" src="images/'+c+'.png">';
		$(id).addClass('1').html(im);
	}
	
}
