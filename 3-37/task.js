function $(el){
  return document.querySelector(el);
}
var modal=$("#modal");
var mask=$("#mask");
var title=modal.children[0];
var login=$("#login");
var sure=$("#sure");
var cancle=$("#cancle");
function addEvent(ele,event,handler){
  if(ele.addEventListener){
    ele.addEventListener(event,handler,false);
  }
  else if(ele.attachEvent){
    ele.attachEvent('on'+event,handler);
  }
  else{
    ele['on'+event]=callback;
  }
}
function show(){
  modal.style.display="block";
  mask.style.display="block";
}
function hide(){
  modal.style.display="none";
  mask.style.display="none";
}
function setDrag(event){
  event=event || window.event;
  var disX=event.clientX-modal.offsetLeft;
  var disY=event.clientY-modal.offsetTop;
  document.onmousemove=function(event){
    event=event || window.event;
    modal.style.left=event.clientX+200-disX+"px";
    modal.style.top=event.clientY+100-disY+"px";
  }
  document.onmouseup=function(){
    document.onmousedown=null;
    document.onmousemove=null;
  }
}
addEvent(login,'click',show);
addEvent(sure,'click',hide);
addEvent(cancle,'click',hide);
addEvent(title,'mousedown',setDrag);
addEvent(mask,'click',hide);
