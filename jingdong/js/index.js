window.onload=function(){
	var oCategorys=document.getElementById('categorys-2014');
	var oItems=dom.getByClass('item',oCategorys);
	var oLayer=dom.getByClass('dorpdown-layer',oCategorys)[0];
	var oItemSub=dom.getByClass('item-sub',oCategorys);
	for(var i=0;i<oItems.length;i++){
		var cur=oItems[i];
		cur.index=i;
		cur.onmouseover=function(){
			$(this).addClass('hover').siblings().removeClass('hover');
			var index=$(this).index();
			oLayer.style.display='block';
			$(oItemSub).eq(index).css('display','block').siblings().css('display','none');
		}	
			oLayer.onmouseover=function(){
				this.style.display='block';
			}
	}
	oCategorys.onmouseout=function(){
		oLayer.style.display='none';
	};


    

	var key=document.getElementById('key');

	var value=key.defaultValue;
	key.onfocus=function(){
		if(key.value===value){
			key.value="";
		}
	}
	key.onblur=function(){
		if(key.value===""){
			key.value=value;
		}
	}
}

$(document).ready(function(){
// //产品列表
// 	$('.item').mouseover(function(){
// 		$(this).addClass('hover').siblings().removeClass('hover');
// 		var index=$(this).index();
// 		$('#categorys-2014 .dorpdown-layer').show();
// 		$('#categorys-2014 .item-sub:eq('+index+')').show().siblings().hide();
// 	});


//lazyload
	
	var Img='images/lazyload.gif';
	$(function(){
		$('img').lazyload({
			placeholder:Img,
			effect:'fadeIn'
		});
	});
//轮播
	var i=0;
	var timer;
	function move(){
		i++;
		if(i>4){
			i=0;
		}
		tab(i);			
	};

	timer=setInterval(move,3000);
	$('.slider-item').mouseover(function(){
		var index=$(this).index();
		tab(index);
	});
	function tab(i){
		$('.slider-panel').eq(i).fadeIn(800).siblings().fadeOut(800);
		$('.slider-item').eq(i).addClass('slider-selected').siblings().removeClass('slider-selected');
	};
	$('#focus .slider-next').click(function(){
		i++;
		if(i>4){
			i=0;
		}
		tab(i);
	});
	$('#focus .slider-prev').click(function(){
		i--;
		if(i<0){
			i=4;
		}
		tab(i);
	});
	$('#focus').mouseover(function(){
		clearInterval(timer);
	});
	$('#focus').mouseout(function(){
		timer=setInterval(move,3000);
	});

	var m=0;
	var slideLength=$('.slide-main li').length;
	var slideLi=$('.slide-main li');
	var slideMain=$('.slide-main');
	slideMain.width(slideLength*(slideLi.width()+1));
	$('#todays .slider-prev').click(function(){
		if(m<Math.ceil(slideLength/4)-1){
			m++;
			slideMain.animate({
				left:-m*1000
			},480);
		}
	});
	$('#todays .slider-next').click(function(){
		if(m>0){			
			m--;
			slideMain.animate({
				left:-m*1000
			},480)
		}
	});

	//little slide
	var a=0;
	var auto=null;
	auto=setInterval(autoPaly, 3000);

	function autoPaly(){
		a++;
		if(a>3){
			a=0;
		}
		$('.main-selected .slider-main').animate({
		    left:-a*$('.side-panel').width()
		});	
		$('.main-selected .slider-item:eq('+a+')').addClass('slider-selected').siblings().removeClass('slider-selected');
	}
	$('.slider-main').mouseover(function(){
		clearInterval(auto);
	});
	$('.slider-main').mouseout(function(){
		auto=setInterval(autoPaly, 3000);
	});

	$('.slider-main').width(4*$('.side-panel').width());

	$('#clothes .slider-item').mouseover(function(){
		$(this).addClass('slider-selected').siblings().removeClass('slider-selected');
		var index=$(this).index();
		$('#clothes .slider-main').animate({
		    left:-index*$('.side-panel').width()
		});
	});

	$('#clothes .slider-next').click(function(){
		if(a<3){
			a++;	
			$('#clothes .slider-main').animate({
			    left:-a*$('.side-panel').width()
			});	
			$('#clothes .slider-item:eq('+a+')').addClass('slider-selected').siblings().removeClass('slider-selected');
		}
	})
	$('#clothes .slider-prev').click(function(){
		if(a>0){
			a--;
			$('#clothes .slider-item:eq('+a+')').addClass('slider-selected').siblings().removeClass('slider-selected');
			$('#clothes .slider-main').animate({
			    left:-a*$('.side-panel').width()
			});			
		}
	});


	// tab
	$('.tab-item').mouseover(function(){
		var index=$(this).index();
		$('.main:eq('+index+')').addClass('main-selected').siblings('.main').removeClass('main-selected');
		$(this).addClass('tab-selected').siblings().removeClass('tab-selected');
		return false;
	});

	$('.close-btn').click(function(){
		$('#top-banner').hide(800);
		return false;
	});

	$(window).scroll(function(){
		if($(window).scrollTop()>500){
			$('.totop').fadeIn();
		}else{
			$('.totop').fadeOut();
		}
	});
	$('.totop').click(function(){
		$('html,body').animate({
			scrollTop:0
		},300)
	})
})
	


	

