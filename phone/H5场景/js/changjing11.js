var winH=document.documentElement.clientHeight;
var main = document.querySelector('.main');
var pages = document.querySelectorAll("section");
    console.log(pages.length);
[].forEach.call(pages, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
})
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    /*阻止默认行为*/
    var touchMove = e.changedTouches[0].pageY;
    var changePos = touchMove - this.startY;
    var cur = this.index;
    var step = 1/2;
    var scalePos =(Math.abs(changePos)/winH)*step;
    [].forEach.call(pages,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].style.zIndex=1;
        arguments[0].id="";
    })
    if (changePos > 0) {/*↓*/
        var pos = -winH+changePos;
        this.preSIndex = cur == 0 ? pages.length - 1 : cur - 1;

    } else if (changePos < 0) {/*↑*/
        var pos = winH+changePos;
        this.preSIndex = cur == pages.length - 1 ? 0 : cur + 1;

    }
    pages[this.preSIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    pages[this.preSIndex].style.zIndex=100;
    pages[this.preSIndex].style.display="block";
    pages[cur].style.webkitTransform = "scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
}
function end(e) {
    pages[this.preSIndex].style.webkitTransform ="translate(0,0)";
    pages[this.preSIndex].style.webkitTransition="0.5s";
    pages[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.id = "section"+(this.index+1);
    })
};
document.addEventListener('touchmove',function(e){},false);