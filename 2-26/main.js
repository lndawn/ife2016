function getTime(){
  var date=new Date();
  console.log(date);
  var year=("0000"+date.getFullYear()).substr(-4);
  var month=("00"+(date.getMonth()+1)).substr(-2);
  var day=("00"+date.getDay()).substr(-2);
  var hour=("00"+date.getHours()).substr(-2);
  var minute=("00"+date.getMinutes()).substr(-2);
  var second=("00"+date.getSeconds()).substr(-2);
  var millisecond=("000"+date.getMilliseconds()).substr(-3);
  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second+"."+millisecond;
};
var getCss=function(obj,key){
  return obj.currentStyle ? obj.currentStyle[key] : document.defaultView.getComputedStyle(obj,null).getPropertyValue(key);
};
var startDrag=function(target,callback){
  var params={
  left:0,
  top:0,
  currentX:0,
  currentY:0,
  flag:false
  };
  if(getCss(target,"left")!=="auto"){
    params.left=getCss(target,"left");
  }
  if(getCss(target,"top")!=="auto"){
    params.top=getCss(target,"top");
  }
  target.onmousedown=function(event){
    params.flag=true;
    if(!event){
      event=window.event;
      bar.onselectstart=function(){
        return false;
      }
    }
    var e=event;
    params.currentX=e.clientX;
    params.currentY=e.clientY;
  }
  target.onmouseup=function(){
    params.flag=false;
    if(getCss(target,"left")!=="auto"){
      params.left=getCss(target,"left");
    }
    if(getCss(target,"top")!=="auto"){
      params.top=getCss(target,"top");
    }
  };
  target.onmousemove=function(event){
    var e=event || window.event;
    if(params.flag){
      var nowX=e.clientX,nowY=e.clientY;
      var disX=nowX-params.currentX,disY=nowY-params.currentY;
      target.style.left=parseInt(params.left)+disX+"px";
      target.style.top=parseInt(params.top)+disY+"px";
    }
    if(typeof callback=="function"){
      callback(parseInt(params.left)+disX,parseInt(params.top)+disY);
    }
  }
}
var control=document.getElementById("control");
var consoleDiv=document.getElementById("console");
startDrag(control);
startDrag(consoleDiv);
(function(){
	var buttonClick=function(){
    var orbit=this.parentNode.dataset.id-0;
    var message=this.dataset.type;
    switch(message){
      case 'create':
        if(this.dataset.status=='create'){
          commander.createSpaceShip(orbit);
          this.dataset.status="created";
          this.innerHTML='自爆销毁';
          this.nextElementSibling.disabled=false;
          this.nextElementSibling.nextElementSibling.disabled=false;
          this.nextElementSibling.nextElementSibling.nextElementSibling.disabled=false;
        }
        else{
          commander.destroy(orbit);
          this.dataset.status="create";
          this.innerHTML='创建飞船';
          this.nextElementSibling.disabled=true;
          this.nextElementSibling.dataset.status='start';
          this.nextElementSibling.innerHTML='飞行';
          this.nextElementSibling.nextElementSibling.disabled=true;
          this.nextElementSibling.nextElementSibling.value=1;
          this.nextElementSibling.nextElementSibling.nextElementSibling.disabled=true;
        }
        break;
      case 'drive':
        if(this.dataset.status=='start'){
          commander.start(orbit);
          this.dataset.status='stop';
          this.innerHTML='停止';
        }
        else{
          commander.stop(orbit);
          this.dataset.status='start';
          this.innerHTML='飞行';
        }
        break;
    }
  };
  var buttons=document.getElementsByTagName("button");
  for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",buttonClick);
  }
})();
var consoleText=document.getElementById("console-text");
function log(message,color){
  var p=document.createElement('p');
  p.innerHTML=getTime()+" ";
  var span=document.createElement("span");
  span.innerHTML=message;
  span.style.color=color;
  p.appendChild(span);
  consoleText.appendChild(p);
  consoleText.scrollTop=consoleText.scrollHeight;
}
