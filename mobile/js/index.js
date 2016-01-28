/* 
* @Author: Administrator
* @Date:   2016-01-28 11:49:32
* @Last Modified by:   Administrator
* @Last Modified time: 2016-01-28 15:26:56
*/

'use strict';
var winWidth=$(window).width();
var liLength=$('.slider li').length;
var slider=$('.slider');
var sliderLi=$('.slider li');
var timer,i=0;
slider.width(liLength*winWidth);
sliderLi.width(slider.width()/liLength);
// slider.css('left',-winWidth);
function play(){
	i++;
	slider.animate({'left':-winWidth*i},800,function(){
		$('.circle li').eq(i).addClass('act').siblings().removeClass('act');
		if(i===liLength-1){
			i=0;
			slider.animate({'left':-winWidth*i},0);			
			$('.circle li').eq(i).addClass('act').siblings().removeClass('act');
		}		
		
	});
	
	// slider.css('webkitTransform','translateX(-'+winWidth*i+')');
	// slider.css('webkitTransition','1s');
}
timer=setInterval('play()',3000);