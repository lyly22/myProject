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

	var bigTab={
		i:0,
		timer:null,
		move:function(){
			i++;
			if(i>4){
				i=0;
			}
			this.tab(i);	
		},
		tab:function(){
			$('.slider-panel').eq(i).fadeIn(800).siblings().fadeOut(800);
			$('.slider-item').eq(i).addClass('slider-selected').siblings().removeClass('slider-selected');
		},

		change:function(){
			$('.slider-item').mouseover(function(){
				var index=$(this).index();
				tab(index);
				timer=setInterval(bigTab.move,3000);

			$('#focus .slider-next').click(function(){
				i++;
				if(i>4){
					i=0;
				}
				bigTab.tab(i);
			});
			$('#focus .slider-prev').click(function(){
				i--;
				if(i<0){
					i=4;
				}
				bigTab.tab(i);
			});

			$('#focus').mouseover(function(){
				clearInterval(bigTab.timer);
			});
			$('#focus').mouseout(function(){
				bigTab.timer=setInterval(bigTab.move,3000);
			});
		}
			});

			


	};


	var prjSlide={
		m:0,
		slideLength:$('.slide-main li').length,
		slideLi:$('.slide-main li'),
		slideMain:$('.slide-main'),
		change:
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
	};


	//little slide
	
	var littleSlide={
		a:0,
		auto:null,
		autoPaly:function(){
			a++;
			if(a>3){
				a=0;
			}
			$('.main-selected .slider-main').animate({
			    left:-littleSlide.a*$('.side-panel').width()
			});	
			$('.main-selected .slider-item:eq('+littleSlide.a+')').addClass('slider-selected').siblings().removeClass('slider-selected');
		},
		change:
			$('.slider-main').mouseover(function(){
				clearInterval(littleSlide.auto);
			});
			$('.slider-main').mouseout(function(){
				auto=setInterval(littleSlide.autoPaly, 3000);
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
				if(littleSlide.a<3){
					littleSlide.a++;	
					$('#clothes .slider-main').animate({
					    left:-littleSlide.a*$('.side-panel').width()
					});	
					$('#clothes .slider-item:eq('+littleSlide.a+')').addClass('slider-selected').siblings().removeClass('slider-selected');
				}
			})
			$('#clothes .slider-prev').click(function(){
				if(littleSlide.a>0){
					littleSlide.a--;
					$('#clothes .slider-item:eq('+littleSlide.a+')').addClass('slider-selected').siblings().removeClass('slider-selected');
					$('#clothes .slider-main').animate({
					    left:-a*$('.side-panel').width()
					});			
				}
			});
		auto:setInterval(littleSlide.autoPaly, 3000),
	};




	// tab
	
	var tab={
		change:{
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
		}
	};




	var toTop={
		scroll:function(){
			if($(window).scrollTop()>500){
				$('.totop').fadeIn();
			}else{
				$('.totop').fadeOut();
			}
		},
		click:function(){
			$('html,body').animate({
				scrollTop:0
			},300)
		}
	};

	var common={
		tab:function(btn,content,class1,class2){
			var index=$(this).index();
			$(this).addClass(class1).siblings().removeClass(class1);
			$('content:eq('+index+')').addClass(class2).siblings().removeClass(class2);
		}
	};
})


	


	

