window.onload=init;
function $(el){
  return document.querySelector(el);
}
var block=$('#square');
var command={
  Go:function(){
    var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
    switch(d%360){
      case 0:
      case -0:{
        if(block.style.top==='50px')
          return false;
        block.style.top = (parseInt(block.style.top)-50)+"px";
        break;
      }
      case 90:
      case -270:{
        if(block.style.left==='500px')
          return false
        block.style.left = (parseInt(block.style.left)+50)+"px";
        break;
      }
      case 180:
      case -180:{
        if(block.style.top==='500px')
          return false
        block.style.top = (parseInt(block.style.top)+50)+"px";
        break;
      }
      case 270:
      case -90:{
        if(block.style.left==='50px')
          return false
        block.style.left = (parseInt(block.style.left)-50)+"px";
        break;
      }
    }
  },
  turnLeft:function(){
    setDirection(-90);
  },
  turnRight:function(){
    setDirection(90);
  },
  turnBack:function(){
    setDirection(180);
  }
}
function setDirection(deg){
  var oldDeg=parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
  block.style.transform='rotateZ('+(oldDeg+deg)+'deg)';
}
function init(){
  var row=$('#background');
  var text="";
  for(var i=0;i<11;i++){
    text+="<tr>";
    for(var j=0;j<11;j++){
      text+="<td>";
      if(i===0 && j>0){
        text += j;
      };
      if(j===0 && i>0){
        text += i;
      }
      text += "</td>";
    }
    text += "</tr>";
  }
  row.innerHTML=text;
  block.style.left=Math.ceil(Math.random()*10)*50+"px";
  block.style.top=Math.ceil(Math.random()*10)*50+"px";
  block.style.transform="rotateZ(0deg)";
}
var run=function(){
  var value=$('#command').value;
  switch(value){
    case 'GO':return command.Go();
    case 'TUN LEF':return command.turnLeft();
    case 'TUN RIG':return command.turnRight();
    case 'TUN BAC':return command.turnBack();
  }
  alert("输入命令有误！")
}
document.onkeydown=function(event){
  var e=event || window.event;
  switch(e.keyCode){
    case 37:
      return command.turnLeft();
    case 38:
      return command.Go();
    case 39:
      return command.turnBack();
    case 40:
      return command.turnRight();
  }
}

