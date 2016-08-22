window.onload=init;
function $(el){
  return document.querySelector(el);
};
var block=$('#square');
var command={
  goLeft:function(){
    if(block.style.left==="50px"){
      return false;
    }
    block.style.left =(parseInt(block.style.left)-50)+"px";
  },
  goRight:function(){
    if(block.style.left==="500px"){
      return false;
    }
    block.style.left=(parseInt(block.style.left)+50)+"px";
  },
  goTop:function(){
    if(block.style.top==='50px'){
      return false;
    }
    block.style.top=(parseInt(block.style.top)-50)+'px';
  },
  goBot:function(){
    if(block.style.top==='500px'){
      return false;
    }
    block.style.top=(parseInt(block.style.top)+50)+'px';
  },
  turnLeft:function(){
    setDirection(-90);
    this.goLeft();
  },
  turnRight:function(){
    setDirection(90);
    this.goRight();
  },
  turnTop:function(){
    setDirection(-180);
    this.goTop();
  },
  turnBot:function(){
    setDirection(180);
    this.goBot();
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
  var value=$("#command").value;
  switch(value){
    case 'TRA LEF':return command.goLeft();
    case 'TRA RIG':return command.goRight();
    case 'TRA TOP':return command.goTop();
    case 'TRA BOT':return command.goBot();
    case 'MOV LEF':return command.turnLeft();
    case 'MOV RIG':return command.turnRight();
    case 'MOV TOP':return command.turnTop();
    case 'MOV BOT':return command.turnBot();
  }
  alert('输入的指令有误');
}
