function getEle(ele){
	return document.querySelector(ele);
}
var desW=640;
var desH=1008;
var winW=window.innerWidth;
var winH=window.innerHeight;
var main=getEle('#main');
var loadInner=getEle('.load-inner');
var loading=getEle('#loading');
var phonebg1=getEle('.phonebg1');
var phonebg2=getEle('.phonebg2');
var phone=getEle('.phone');
var msg1=getEle('#message');
var msg=getEle('.mesg');
var cubebox=getEle('.cubebox');
var msgLi=document.querySelectorAll('#message li');
var cubeLi=document.querySelectorAll('.cubebox li');
if(desW/desH<winW/winH){
	main.style.webkitTransform='scale('+winW/desW+')';
}else{
	main.style.webkitTransform='scale('+winH/desH+')';
}
(function(){
	var arr= ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png','phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
	var num=0;
	(function(){
		for(var i=0;i<arr.length;i++){
			var oImg=new Image();
			oImg.src='images/'+arr[num];
			oImg.onload=function(){
				num++;
				loadInner.style.width=num/(arr.length)*100+'%';
			}
		}
		loadInner.addEventListener('webkitTransitionEnd', function(){
			loading.remove();
			fnPhone.init();
		}, false);
	})();
})();

var fnPhone={
	init:function(){
		bell.play();
		phone.addEventListener('touchstart',this.touch,false);
	},
	touch:function(e){
		if(e.target.className==='receive'){
			bell.pause();
			window.setTimeout(function(){say.play();}, 1000);
			phonebg1.style.display='none';
			phonebg2.style.webkitTransform='translate(0,0)';
			
		}else if(e.target.className==='close'){
			fnPhone.closephone();
		}else if(e.target.className==='reject'){
			bell.pause();
			phone.style.webkitTransform='translate(0,'+desH+'px)';
			main.remove();
			// message();
		}
	},
	closephone:function(){
			bell.pause();
			say.pause();
			phone.style.webkitTransform='translate(0,'+desH+'px)';
			message();
	}
}
function message(){
	var n=0,h=0;
	var timer=window.setInterval(function(){
		msgLi[n].style.opacity=1;
		n++;
		if(n===msgLi.length-1){
			window.clearInterval(timer);
			msg.remove();
			msg1.style.webkitTransform='translate(0,'+desH+'px)';
			msg1.addEventListener('webkitTransitionEnd',function(){this.remove();},false);
			cube();
		}
		if(n>5){
			h=100*(n-5);
			msg.style.webkitTransform='translate(0,'+(-h)+'px)';
		};
	} ,1000);
}

function cube(){
	// cubebox.style.opacity=1;
	cubebox.style.webkitTransform='scale(0.7) rotateX(-45deg) rotateY(-45deg)';
	startTouch={x:0,y:0};
	var startX=-45;
	var startY=-45;
	   [].forEach.call(cubeLi,function(){
       arguments[0].addEventListener('touchstart',start,false)
       arguments[0].addEventListener('touchmove',move,false)
       arguments[0].addEventListener('touchend',end,false);
   })
    function start(e){
        startTouch.x = e.changedTouches[0].pageX;
        startTouch.y = e.changedTouches[0].pageY;
    }
    function move(e){
        var moveTouchX = e.changedTouches[0].pageX;
        var moveTouchY = e.changedTouches[0].pageY;
        this.changePosX = moveTouchX - startTouch.x;
        this.changePosY = moveTouchY - startTouch.y;
        this.parentNode.style.webkitTransform = "scale(0.7)  rotateX("+(-startY-this.changePosY)+"deg) rotateY("+(-startX+this.changePosX)+"deg)";
    }
    function end(){
        startX+=this.changePosX;
        startY+=this.changePosY;
    }
}
// document.addEventListener('touchstart',function(){
// },false);

//向右滑动，需要让rotateY增大，
//向上滑动，需要让rotateX增大，