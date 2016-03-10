/* 
* @Author: Administrator
* @Date:   2016-01-14 14:07:44
* @Last Modified by:   Administrator
* @Last Modified time: 2016-01-15 14:56:04
*/

'use strict';
// 游戏主逻辑
var board=new Array();
var score=0;
var hasConflicted=new Array();

var startX=0;
var startY=0;
var endX=0;
var endY=0;

$(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){

	if(documentWidth>500){
		gridContainerWidth=400;
		cellSideLength=75;
		cellSpace=20;
		$('.shuoming').show();
	};
	$('#grid-container').css({
		'width':gridContainerWidth-2*cellSpace,
		'height':gridContainerWidth-2*cellSpace,
		'padding':cellSpace,
		'border-radius':0.02*gridContainerWidth,
		'margin':'30px auto'
	});
	$('.grid-cell').css({
		'width':cellSideLength,
		'height':cellSideLength
	});
	$('header h1').css('fontSize',30);
}

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
};

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){

			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i));
			gridCell.css('left',getPosLeft(j));
		}
	}

	for (var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}

	updateBoardView();
	score=0;
}

function updateBoardView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);

			if(board[i][j]===0){
				theNumberCell.css({
					'width':0,
					'height':0,
					'top':getPosTop(i)+cellSideLength/2,
					'left':getPosLeft(j)+cellSideLength/2
				})
			}else{
				theNumberCell.css({
					'width':cellSideLength,
					'height':cellSideLength,
					'top':getPosTop(i),
					'left':getPosLeft(j),
					'backgroundColor':getNumberBackColor(board[i][j]),
					'color':getNumberColor(board[i][j])			
				}).text(board[i][j])
			}
			hasConflicted[i][j]=false;
		}
		$('.number-cell').css({
			'line-height':cellSideLength+'px',
			'fontSize':0.6*cellSideLength
		});
	}
}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var randomx=parseInt(Math.floor(Math.random()*4));
	var randomy=parseInt(Math.floor(Math.random()*4));

	var time=0;
	while(time<50){
		if(board[randomx][randomy]===0)
			break;
			var randomx=parseInt(Math.floor(Math.random()*4));
			var randomy=parseInt(Math.floor(Math.random()*4));
			time++;
	}	
	if(time===50){
		for(var i=0; i<4; i++){
			for(var j=0;j<4;j++){
				if(board[i][j]===0){
					randomx=i;
					randomy=j;
				}
			}
		}
	}
	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	//在随机的位置显示随机数字
	board[randomx][randomy]=randNumber;
	showNumberWithAnimation(randomx,randomy,randNumber);
	return true;
}

$(document).keydown(function(e){
	switch(e.keyCode){
		case 37://left
			e.preventDefault(); 
			if(moveLeft()){
				setTimeout('generateOneNumber()',200);
				setTimeout('isgameOver()',300);
			}
		    break;
		case 38://up
			e.preventDefault(); 
			if(moveUp()){
				setTimeout('generateOneNumber()',200);
				setTimeout('isgameOver()',300);
			}
			break;
        case 39://right
			e.preventDefault(); 
			if(moveRight()){
				setTimeout('generateOneNumber()',200);
				setTimeout('isgameOver()',300);
			}
        	break;
        case 40://down
			e.preventDefault(); 
			if(moveDown()){
				setTimeout('generateOneNumber()',200);
				setTimeout('isgameOver()',300);
			}
        	break;
        default:
        	break;
	}
});

document.addEventListener('touchstart',function(e){
	startX=e.touches[0].pageX;
	startY=e.touches[0].pageY;
});

document.addEventListener('touchmove',function(e){
	e.preventDefault();
})

document.addEventListener('touchend',function(e){
	endX=e.changedTouches[0].pageX;
	endY=e.changedTouches[0].pageY;

	var deltaX=endX-startX;
	var deltaY=endY-startY;

	// if(Math.abs(deltaX)<0.3*documentWidth && Math.abs(deltaY)<0.3*documentWidth){
	// 	return;
	// }

	//x
	if(Math.abs(deltaX)>=Math.abs(deltaY)){
		if(deltaX>0){
			//move right
			if(moveRight()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameOver()',300);
			}
		}else if(deltaX<0){
			//move left
			if(moveLeft()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameOver()',300);
			}
		}
	}
	//Y
	else{
		if(deltaY>0){
			//move down
			if(moveDown()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameOver()',300);
			}
		}else if(deltaY<0){
			//move up
			if(moveUp()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameOver()',300);
			}
		}
	}
});

function isgameOver(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('gameover!');
}

function moveLeft(){

    if( !canMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlock( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlock( i , k , j , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlock( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlock( i , j , k , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
