
(function(){
	var DOM={
		toArray:function(ele){
			try{
				return Array.prototype.slice().call(ele,0);
			}catch(e){
				var ary=[];
				for(var i=0;i<ele.length;i++){
					ary[ary.length]=ele[i];
				}
				return ary;
			}
		},
		toJSON:function(ele){
			return JSON in window ? JSON.parse(ele) : eval("("+ele+")");
		},
	};
	DOM.getByClass=function(str,oParent){
		oParent=oParent || document;
		if("getElementsByClassName" in document){
			return this.toArray(oParent.getElementsByClassName(str));
		}
		var eles=oParent.getElementsByTagName("*"),ary2=[];
		var reg=/(^ +)|( +$)/g;
	    var ary=str.replace(reg,"").split("/\s+/");
	    for(var i=0;i<eles.length;i++){
	    	var curEle=eles[i];
	    	curEle.flag=true;
	    	for(var j=0;j<ary.length;j++){
	    		var reg2=new RegExp("(^| +)"+ary[j]+"( +|$)");
	    		if(!reg2.test(curEle.className)){
	    			curEle.flag=false;
	    			break;
	    		}
	    	}
	    	curEle.flag ? ary2[ary2.length]=curEle : null;
	    }
	};
	DOM.children=function(ele,tagName){
		var childs=ele.childNodes,ary=[];
		for(var i=0;i<childs.length;i++){
			var cur=childs[i];
			if(cur.nodeType===1){
				if(typeof tagName==="string"){
					var curNode=cur.nodeName.toUpperCase();
					var tagName2=tagName.toUpperCase();
					if(curNode===tagName2){
						ary[ary.length]=cur;
					}
					continue;
				}
				ary[ary.length]=cur;
			}
		}
		return ary;
	};
	DOM.prev=function(ele){
		if("previousElementSibling" in ele){
			return ele.previousElementSibling;
		}
		var p=ele.previousSibling,ary=[];
		while(p && p.nodeType!==1){
			p=p.previousSibling;
		}
		return p;
	};
	DOM.prevAll=function(ele){
		var p=this.prev(ele),ary=[];
		while(p){
			ary.unshift(p);
			p=this.prev(p);
		}
		return ary;
	};
	DOM.getIndex=function(ele){
		var a=this.prevAll(ele);
		return a.length;
	};
	DOM.next=function(ele){
		if("nextElementSibling" in ele){
			return ele.nextElementSibling;
		}
		var n=ele.next.nextSibling;
		while(n && n.nodeType!==1){
			n=n.nextSibling;
		}
		return n;
	};
	DOM.nextAll=function(ele){
		var n=this.next(ele),ary=[];
		while(n){
			ary[ary.length]=n;
			n=this.next(n);
		}
		return ary;
	};
	DOM.sibling=function(ele){
		var ary=[];
		var p=this.prev(ele);
		var n=this.next(ele);
		p ? ary.push(p) : null;
		n ? ary.push(n) : null;
		return ary;
	};
	DOM.siblings=function(ele){
		var prevAll=this.prevAll(ele);
		var nextAll=this.nextAll(ele);
		return prevAll.concat(nextAll);
	};
	DOM.first=function(ele,tagName){
		return this.children(ele,tagName)[0];
	};
	DOM.last=function(ele,tagName){
		var childs=this.children(ele,tagName);
		return childs[childs.length-1];
	};
	DOM.css=function(ele,attr,value){
		//获取
		if(typeof value==='undefined'){
			var val= 'getComputedStyle' in window ? window.getComputedStyle(ele,null)[attr] : ele.currentStyle[attr];
			// return parseFloat(val);
			var reg=/^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/;
			return reg.test(val) ? parseFloat(val) : val;
		}
		//设置
        reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
		if(attr==="opacity"){
			if(value>=0 && value<=1){
				ele.style[attr]=value;
				ele.style.filter="alpha(opacity="+value*100+")";
			}			
		}else if(attr==='float'){
			ele.style[cssFloat]=value;
			ele.style[styleFloat]=value;
		}else if(reg.test(attr)){
			ele.style[attr]=isNaN(value)?value:value+'px';
		}else{
			ele.style[attr]=value;
		}
	};
	DOM.setGroupCss=function(ele,obj){
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				this.css(ele,key,obj[key]);
			}
		}
	};
	DOM.offset=function(ele){
		var l=ele.offsetLeft;
		var t=ele.offsetTop;
		var p=ele.offsetParent;
		while(p){
			if(window.navigator.userAgent.indexOf('MSIE 8')<0){
				l+=p.clientLeft;
				l+=p.clientTop;
			}
			l+=p.offsetLeft;
			t+=p.offsetTop;
			p=p.offsetParent;
		}
		return {top:t,left:l};			
	};
	DOM.win=function(attr,value){
		if(typeof value==='undefined'){
			return document.documentElement[attr]||document.body[attr];
		}
		document.documentElement[attr]=value;
		document.body[attr]=value;		
	};
	DOM.hasClass=function(ele,strClass){
		var reg=new RegExp("(^| +)"+strClass+"( +|$)");
		return reg.test(ele.className);
	};
	DOM.addClass=function(ele,strClass){
		if(!this.hasClass(ele,strClass)){
			ele.className+=" strClass";
		}
	};
	DOM.removeClass=function(ele,strClass){
		var reg=new RegExp("(^| +)"+strClass+"( +|$)");
		if(this.hasClass(ele,strClass)){
			ele.className=ele.className.replace(reg," ");
		}		
	};
	DOM.toggleClass=function(ele,strClass){
		if(this.hasClass(ele,strClass)){
			this.removeClass(ele,strClass);
		}else{
			this.addClass(ele,strClass);
		}
	};
	DOM.attr=function(ele,attr,value){
		if(typeof value==='undefined'){
			if(attr==='class'){
				return ele.className;
			}else{
				return ele.getAttribute(attr);
			}
		}
		if(attr==='class'){
				ele.className=value;
			}else{
				ele.setAttribute(attr,value);
			}
	};
	DOM.html=function(ele,value){
		if(typeof value==='undefined'){
			return ele.innerHTML;
		}
		ele.innerHTML=value;
	};
	DOM.value=function(ele,value){
		if(typeof value==='undefined'){
			return ele.value;
		}
		ele.value=value;
	};
	DOM.prepend=function(oParent,ele){
		var first=this.first(oParent);
		first?oParent.insertBefore(ele,first):oParent.appendChild(ele);
	};
	DOM.insertAfter=function(target,ele){
		var p=target.parentNode,o=this.next(target);
		o?p.insertBefore(ele,o):p.appendChild(ele);
	};
	DOM.extend=function(obj){
		for(key in obj){
			if(obj.hasOwnProperty(key)){
				this[key]=obj[key];
			}
		}
	};
	window.dom=DOM;
})();

//扩展
~function () {
    var aryPro = Array.prototype, strPro = String.prototype, regPro = RegExp.prototype;

    //unique：Array distinct
    aryPro.unique = function unique() {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            var cur = this[i];
            obj[cur] == cur ? (this[i] = this[this.length - 1], this.length -= 1, i--) : obj[cur] = cur;
        }
        obj = null;
        return this;
    };

    //myForEach：forEach compatibility
    aryPro.myForEach = function myForEach(callBack, context) {
    	context = context || window;
        if (typeof callBack !== "function") return;
        if (Array.prototype.forEach) {
            return this.forEach(callBack, context);
        }
        for (var i = 0; i < this.length; i++) {
            callBack.call(context, this[i], i, this);
        }
    };

    //myMap：map compatibility
    aryPro.myMap = function myMap(callBack, context) {
        if (Array.prototype.map) {
            return this.map(callBack, context);
        }
        for (var i = 0; i < this.length; i++) {
            this[i] = callBack.call(context, this[i], i, this);
        }
        return this;
    };

    //myTrim：Remove the string and space
    strPro.myTrim = function myTrim() {
        return this.replace(/(^\s+|\s+$)/g, "");
    };

    //mySub：Intercept string, this method is distinguished in English
    strPro.mySub = function mySub() {
        var len = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0;
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
        }
        return str;
    };

    //myFormatTime：Format time
    strPro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g, ary = [];
        this.replace(reg, function () {
            ary = ([].slice.call(arguments)).slice(1, 7);
        });
        var format = arguments[0] || "{0}年{1}月{2}日 {3}:{4}:{5}";
        return format.replace(/{(\d+)}/g, function () {
            var val = ary[arguments[1]];
            return val.length === 1 ? "0" + val : val;
        });
    };

    //queryURLParameter：Gets the parameters in the URL address bar
    strPro.queryURLParameter = function queryURLParameter() {
        var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };
    
    //myExecAll：Capture all of the required content in a one-time capture
    regPro.myExecAll = function myExecAll(str) {
        var reg = !this.global ? eval(this.toString() + "g") : this;
        var ary = [], res = reg.exec(str);
        while (res) {
            ary[ary.length] = res[0];
            res = reg.exec(str);
        }
        return ary.length === 0 ? null : ary;
    };
}();