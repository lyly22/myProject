/*
* @Author: Administrator
* @Date:   2016-03-11 21:35:36
* @Last Modified by:   Administrator
* @Last Modified time: 2016-03-14 18:00:09
*/

'use strict';
$(function(){	
	//不再提醒
	if($.cookie('noTip')){
        $('#top').hide();
    }else{
		$('.no-tip').click(function(){
	        $('#top').slideUp();
	        $.cookie('noTip',true,{expires:7});
			var t=$.cookie('noTip');
	    });
    }    
    //关注
    $('input').focus(function(){
    	$(this).siblings('label').hide();
    });
    $('input').blur(function(){
    	if($(this).val()===""){
    		$(this).siblings('label').show();
    	}
    });
    function changUser(){
    	if($('input[type="text"]').val()===""){
    		$('.errorMsg').show().html('请输入用户名');
    		return false;
    	}else if($('input[type="password"]').val()===""){
    		$('.errorMsg').show().html('请输入密码');
    		return false;
    	}else{
    		return true;
    	}
    }
    if($.cookie('followSuc')){
    	$('.notice').html('√ 已关注').css({'backgroundColor':'#f8f8f8','color':'#333333'});
    }
    $('.notice').click(function(){
    	if($.cookie('loginSuc')){
    		return;
    	}
    	$('.m-popuplog').show();
    	$('.submit').click(function(){
    		if(changUser()){
    			var fans=$('.fans i').html();
    			$.ajax({
	    			url:'http://study.163.com/webDev/login.htm',
	    			data:{
	    				userName:hex_md5($('input[type="text"]').val()),
	    				password:hex_md5($('input[type="password"]').val())
	    			},
	    			success:function(data){
	    				if(data==='1'){
	    					$.cookie('loginSuc',true);    					
	    					$('.m-popuplog').hide();
	    					$.get('http://study.163.com/webDev/ attention.htm',function(data){
	    						if(data==='1'){
	    							$.cookie('followSuc',true,{expires:7});
		    						alert('关注成功');
			    					fans++;
				    				$('.fans i').html(fans);
		    						$('.notice').html('√ 已关注').css({'backgroundColor':'#f8f8f8','color':'#333333'});
	    						}
	    					});	    					
	    					
	    				}else if(data==='0'){
	    					$('.errorMsg').show().html('用户名或密码错误');
	    				}
	    			}
	    		})
    		};
    		
    	})
    });
    $('.m-popuplog .close').click(function(){
    	$('.m-popuplog').hide();
    })
	//轮播	
	var slideArr=[
		{href:'http://open.163.com/',src:'images/wangyibanner1.jpg'},
		{href:'http://study.163.com/',src:'images/wangyibanner2.jpg'},
		{href:'http://www.icourse163.org/',src:'images/wangyibanner3.jpg'}
	];
	$.each(slideArr,function(n,obj){
		$('#banner').append('<a href="'+obj.href+'"><img src="'+obj.src+'"></a>');
		$('.circle').append('<li></li>');
	});
	var i=0,l=$('#banner a').length;
	$('#banner a').eq(0).show().siblings('a').hide();
	$('.circle li').eq(0).addClass('active');
	$('.circle li').mouseover(function(){
		i=$(this).index();
		play(i);
	});
	var t=setInterval(function(){
		i++;
		if(i===l){
			i=0;
		}
		play(i);
	},3000);
	$('#banner').hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
			i++;
			if(i===l){
				i=0;
			}
			play(i);
		},3000);
	});
	function play(i){		
		$('#banner a').eq(i).fadeIn(1000).siblings('a').fadeOut(1000);
		$('.circle li').eq(i).addClass('active').siblings().removeClass('active');
	};

	//获取课程列表
	var pageNo=1,totalPage=0;
	function initPage(totalPage){
		totalPage=totalPage>5?5:totalPage;
		if($('.page span')){
			$('.page span').remove();
		}
		var str='';
		for(var i=1;i<=totalPage;i++){
			str+='<span>'+i+'</span>';
			//$('<span>'+i+'</span>').insertBefore('.next');
		}
		$(str).insertBefore('.next');
		$('.page span').eq(pageNo-1).addClass('active').siblings('span').removeClass('active');
		$('#pageid').find('span').click(function(){
			debugger;
			if($(this).html()==1){
				return;
			}			
			pageNo=$(this).html();	
			changePage();
		});
	}
	function lessonList(obj){
			$('.design').html('');
		for(var i=0;i<obj.pagination.pageSize;i++){
			var dataObj=obj.list[i];
			var price=dataObj.price===0?'免费':'￥'+dataObj.price;
			$('.design').append('<div class="lesson-box"><img src="'+dataObj.bigPhotoUrl+'">'+
                                '<p class="coursename f-toe">'+dataObj.name+'</p>'+
                                '<div class="provider">'+dataObj.provider+'</div>'+
                                '<span class="study-number">'+dataObj.learnerCount+'</span>'+
                                '<strong>'+price+'</strong>'+
                                '<a href="">'+
                                    '<img src="'+dataObj.bigPhotoUrl+'">'+
                                    '<h3>'+dataObj.name+'</h3>'+
                                    '<span>'+dataObj.learnerCount+'</span>'+
                                    '<p class="categoryname">“'+dataObj.provider+'”<br />“分类：'+dataObj.categoryName+'”</p>'+
                                    '<p class="description">'+dataObj.description+'</p>'+
                                '</a>'+
                            '</div>');
		}
	}
	function changePage(){	
		$('.page span').eq(pageNo-1).addClass('active').siblings('span').removeClass('active');				
		$.ajax({
			url:'http://study.163.com/webDev/couresByCategory.htm',
			dataType:"json",
			data:{
				pageNo:pageNo,
				psize:20,
				type:10
			},
			success:function(data){
			//	var obj=JSON.parse(data);
				lessonList(data);	
			}
		});
	}

	//切换页码
	$('.prev').click(function(){	
		if(pageNo===1){
			alert('已经是第一张');
			return;
		}
		pageNo--;
		changePage();
	});
	$('.next').click(function(){		
		if(pageNo===totalPage){
			alert('没有更多数据');
			return;
		}
		pageNo++;
		changePage();
	});
	//tab切换
	$('.language-tab').click(function(){
		$.ajax({
			url:'http://study.163.com/webDev/couresByCategory.htm',
			data:{
				pageNo:1,
				psize:20,
				type:20
			},
			success:function(data){
				var obj=JSON.parse(data);
				totalPage=obj.pagination.totlePageCount;
				initPage(totalPage);
				lessonList(obj);
			}
		});
	});
	$('.design-tab').click(function(){
		$.ajax({
			url:'http://study.163.com/webDev/couresByCategory.htm',
			data:{
				pageNo:1,
				psize:20,
				type:10
			},
			success:function(data){
				var obj=JSON.parse(data);
				totalPage=obj.pagination.totlePageCount;
				initPage(totalPage);
				lessonList(obj);
			}
		});
	});
	$('.tab div').click(function(e){		
		$(this).addClass('active').siblings().removeClass('active');		
	});
	$('.design-tab').trigger('click');
	//最热排行
	$.ajax({
		url:'http://study.163.com/webDev/hotcouresByCategory.htm?_='+new Date().getTime(),
		success:function(data){
			var obj=JSON.parse(data);
			for(var i=0;i<obj.length;i++){					
				$('.m-wrap2').append('<li>'+
	                                '<div>'+
	                                    '<img src="'+obj[i].smallPhotoUrl+'" />'+
	                                '</div>'+
	                                '<p class="f-toe">'+obj[i].name+'</p>'+
	                                '<span>'+obj[i].learnerCount+'</span>'+
	                            '</li>')
			}
		}
	});
	//滚动
	$('.m-list').scrollbox({
	  switchItems:1,
	  distance: 70
	});
	//video
	$('.trigger').click(function(){
		$('.popupvideo').show();
	});
	$('.popupvideo .close').click(function(){
		$('.popupvideo').hide();
	});
})