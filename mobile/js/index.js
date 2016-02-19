/* 
* @Author: Administrator
* @Date:   2016-01-28 11:49:32
* @Last Modified by:   Administrator
* @Last Modified time: 2016-02-19 08:50:27
*/

'use strict';
var winWidth=$('body').width();
var liLength=$('.slider li').length;
var slider=$('.slider');
var sliderLi=$('.slider li');
var timer,i=1;
slider.width(liLength*winWidth);
sliderLi.width(slider.width()/liLength);
// $('.slider li').height($('.slider li').width()*0.4333);
$('.banner').height(winWidth*0.38);
slider.css('left',-winWidth);
$('.circle li').eq(0).addClass('act').siblings().removeClass('act');
function play(){
	i++;
	slider.animate({'left':-winWidth*i},800,function(){
		$('.circle li').eq(i-1).addClass('act').siblings().removeClass('act');
		if(i===liLength-1){
			i=1;
			slider.animate({'left':-winWidth*i},0);			
			$('.circle li').eq(i-1).addClass('act').siblings().removeClass('act');
		}	
	});
};

function touchRight(){
	i--;
	slider.animate({'left':-winWidth*i},800,function(){
		$('.circle li').eq(i-1).addClass('act').siblings().removeClass('act');
		if(i===0){
			i=liLength-2;
			slider.animate({'left':-winWidth*i},0);			
			$('.circle li').eq(i-1).addClass('act').siblings().removeClass('act');
		}	
	});
}
timer=setInterval('play()',3000);

var banner=$('.banner')[0];
var startx,endx;
banner.addEventListener('touchstart',function(e){
	startx=e.touches[0].pageX;
});
banner.addEventListener('touchmove',function(e){
	e.preventDefault();
});
banner.addEventListener('touchend',function(e){
		clearInterval(timer);
		endx=e.changedTouches[0].pageX;
		var deltaX=endx-startx;
		if(deltaX>0){
			//right
			touchRight();
			window.setTimeout(function(){timer=setInterval('play()',3000);},8000);
		}else if(deltaX<0){
			play();
			window.setTimeout(function(){timer=setInterval('play()',3000);},8000);
		}		
});

$('#about').addClass('current');

