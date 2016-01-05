/* 
* @Author: Administrator
* @Date:   2015-12-30 09:06:54
* @Last Modified by:   Administrator
* @Last Modified time: 2015-12-30 18:07:35
*/

'use strict';
var index;
function chang(val){
	return val.split('-').slice(1,3).join('-');
};
function starttime(val){
	return val.split(' ').slice(1).toString().split(':').slice(0,2).join(':');
}
function htime(val){
	var ary=[];
	ary=val.split('-').slice(1);
	return ary[0]+'月'+ary[1]+'日';
}
function bind(data){
	if(data.code!==0){
		return;
	}
	data=data["data"];
	var today=data['today'];
	var length=data["data"].length;
	var $calendar=$('.calendar');
	var str='';
	for(var i=0;i<length;i++){
		var date=data["data"][i]['date'];
		var weekday=data["data"][i]['weekday'];
		str+='<li class="calendar-li" time="'+date+'">';
		str+='<span class="calendar-weekday">'+weekday+'</span>';
		str+='<span class="calendar-date">'+chang(date)+'</span>';
		str+='</li>';
		// $calendar[0].innerHTML+='<li class="calendar-li" time="'+date+'"><span class="calendar-weekday">'+weekday+'</span><span class="calendar-date">'+chang(date)+'</span></li>';
	};
	$calendar.html(str);
	var $calendarLi=$('.calendar-li');
	var widthLi=$calendarLi.eq(0).width();
	$calendar.css({'width':151*length});
	$calendarLi.each(function(){
		if($(this).attr('time')===today){
			$(this).addClass('cur');
			index=$(this).index();
			list($(this).attr('time'));
		};
		$(this).click(function(){
			list($(this).attr('time'));
		});
	});
	$('.rightbtn').click(function(){
		index+=7;
		if(index>length-2){
			alert('没有了'+index);
			return;
		};
		$calendar.animate({
			'left':-(index-3)*105
		},400);
	});
	$('.leftbtn').click(function(){
		index-=7;
		if(index<6){
			alert('没有了');
			return;
		};
		$calendar.animate({
			'left':-(index-3)*105
		},400);
	});
	$('.calendar').css('left',-(index-3)*105);
}
var urlhost='http://matchweb.sports.qq.com';
$.ajax({
	url:urlhost+'/kbs/calendar?callback=calendar&columnId=100000&_='+Math.random(),
	type:'get',
	dataType:'jsonp',
	jsonpCallback:'calendar',
	success:function(data){
		bind(data);
	},
	error:function(){

	}
});

function callback(data,time){
	if(data.code!==0){
		return;
	}
	data=data["data"][time];
	var str='<h2 class="game-date">'+htime(time)+'</h2><ul class="geme-list">';
	for(var i=0;i<data.length;i++){
		str+='<li class="game-item">';
		str+='<a href="'+data[i]["VURL"]+'" target="_blank">';
		str+='<div class="game-time">'+starttime(data[i]["startTime"])+'</div>';
		str+='<div class="geme-title">'+data[i]["matchDesc"]+'</div>';
		str+='<div class="game-player"><img src="'+data[i]["leftBadge"]+'" ><span>'+data[i]["leftName"]+'</span></div>';
		str+='<div class="game-score"><span>'+data[i]["leftGoal"]+'-'+data[i]["rightGoal"]+'</span></div>';
		str+='<div class="game-player right"><span>'+data[i]["rightName"]+'</span><img src="'+data[i]["rightBadge"]+'" ></div>';
		str+='<div class="video"><span rl="'+data[i]["VURL"]+'">视频集锦</span></div>';
		str+='</a>';
		str+='</li>';
				
	};
	str+='</ul>';
	$('.gamecontainer').animate({'opacity':1},500).html(str);
}
function list(time){
	$('.gamecontainer').css('opacity',0);
	$.ajax({
		url:urlhost + "/kbs/list?columnId=100000&startTime=" + time + "&endTime=" + time + "&_=" + Math.random(),
		type:'get',
		dataType:'jsonp',
		jsonpCallback:'gameList',
		success:function(data){
			callback(arguments[0],time);
		},
		error:function(){

		}
	})
};

