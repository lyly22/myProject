/* 
* @Author: Administrator
* @Date:   2016-01-14 14:08:17
* @Last Modified by:   Administrator
* @Last Modified time: 2016-01-15 13:53:21
*/

'use strict';

function showNumberWithAnimation(i,j,randNumber){
	var numberCell=$('#number-cell-'+i+'-'+j);
	numberCell.css({
		'backgroundColor':getNumberBackColor(randNumber),
		'color':getNumberColor(randNumber)
	}).animate({
		width: cellSideLength,
		height: cellSideLength,
		top:getPosTop(i),
		left:getPosLeft(j)
	},50).text(randNumber);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox),
		left:getPosLeft(toy)
	},200);
}

function updateScore(){
	$('#score').text(score);
}