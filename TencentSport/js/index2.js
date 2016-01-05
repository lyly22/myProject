/* 
* @Author: Administrator
* @Date:   2015-12-30 09:06:54
* @Last Modified by:   Administrator
* @Last Modified time: 2015-12-30 19:13:55
*/

'use strict';
var urlhost='http://matchweb.sports.qq.com';
var changetime={
	chang:function chang(val){
		return val.split('-').slice(1,3).join('-');
	},
	starttime:function(val){
		return val.split(' ').slice(1).toString().split(':').slice(0,2).join(':');
	},
	htime:function(val){
		var ary=[];
		ary=val.split('-').slice(1);
		return ary[0]+'月'+ary[1]+'日';
	}
};
var timelist={
	index:0,
	bind:function(data){
		if(data.code!==0){
			return;
		};
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
			str+='<span class="calendar-date">'+changetime.chang(date)+'</span>';
			str+='</li>';
			// $calendar[0].innerHTML+='<li class="calendar-li" time="'+date+'"><span class="calendar-weekday">'+weekday+'</span><span class="calendar-date">'+chang(date)+'</span></li>';
		};
		$calendar.html(str);
		var $calendarLi=$('.calendar-li');
		$calendar.css({'width':151*length});
		$calendarLi.each(function(){
			if($(this).attr('time')===today){
				$(this).addClass('cur');
				timelist.index=$(this).index();
				gameList.list($(this).attr('time'));
			};
			$(this).click(function(){
				gameList.list($(this).attr('time'));
			});
		});
		$calendar.css('left',-(this.index-3)*105);
		$('.rightbtn').click(function(){
			timelist.index+=7;
			if(timelist.index>length-2){
				alert('没有了');
				return;
			};
			$calendar.animate({
				'left':-(timelist.index-3)*105
			},400);
		});
		$('.leftbtn').click(function(){
			timelist.index-=7;
			if(timelist.index<6){
				alert('没有了');
				return;
			};
			$calendar.animate({
				'left':-(timelist.index-3)*105
			},400);
		});
	},
	init:function(){
		var _this=this;
		$.ajax({
			url:urlhost+'/kbs/calendar?callback=calendar&columnId=100000&_='+Math.random(),
			type:'get',
			dataType:'jsonp',
			jsonpCallback:'calendar',
			success:function(data){
				_this.bind(data);
			},
			error:function(){

			}
		});
	}
};	

var gameList={
	callback:function (data,time){
		if(data.code!==0){
			return;
		}
		data=data["data"][time];
		var str='<h2 class="game-date">'+changetime.htime(time)+'</h2><ul class="geme-list">';
		for(var i=0;i<data.length;i++){
			str+='<li class="game-item">';
			str+='<a href="'+data[i]["VURL"]+'" target="_blank">';
			str+='<div class="game-time">'+changetime.starttime(data[i]["startTime"])+'</div>';
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
		$('.game-item:last').css('border-bottom','1px solid #ececec');
	},
	list:function (time){
		$('.gamecontainer').css('opacity',0);
		var _this=this;
		$.ajax({
			url:urlhost + "/kbs/list?columnId=100000&startTime=" + time + "&endTime=" + time + "&_=" + Math.random(),
			type:'get',
			dataType:'jsonp',
			jsonpCallback:'gameList',
			success:function(data){
				_this.callback(arguments[0],time);
			},
			error:function(){

			}
		})
	}
};
timelist.init();




