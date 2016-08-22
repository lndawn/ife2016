window.onload=init;
function $(el){
  return document.querySelector(el);
};
var block=$('#square');
var queue=[];
var timer=null;
var command={
  Go:function(num){
    var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
    if(num || num===0){
      a=num;
    }
    else{
      a=d%360;
    }
    switch(a){
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
  },
  traLeft:function(){
    this.Go(270);
  },
  traRight:function(){
    this.Go(90);
  },
  traTop:function(){
    this.Go(0);
  },
  traBot:function(){
    this.Go(180);
  },
  movLeft:function(){
    setMovDirection(-90);
    this.traLeft();
  },
  movRight:function(){
    setMovDirection(90);
    this.traRight();
  },
  movTop:function(){
    setMovDirection(-180);
    this.traTop();
  },
  movBot:function(){
    setMovDirection(180);
    this.traBot();
  }
}
function setDirection(deg){
  var oldDeg=parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
  block.style.transform='rotateZ('+(oldDeg+deg)+'deg)';
}
function setMovDirection(deg){
  var oldDeg=parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
  oldDeg=Math.floor(oldDeg/360)*360;
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
  var items=value.split('\n');
  for(var i=0;i<items.length;i++){
    if(/\d+/.test(items[i])){
      for(var j=0;j<+items[i].match(/\d+/);j++){
        runCmd(items[i].replace(/\s+\d+\s*/g,''));
      }
    }
    else{
      runCmd(items[i]);
    }
  }
};
var runCmd=function(value){
  if(value){
    queue.push(value);
  }
  if(timer){
    return false;
  }else{
    return timer=setTimeout(function(){
      clearTimeout(timer);
      timer=null;
      var val=queue.shift();
      switch(val){
        case 'GO':command.Go();break;
        case 'TUN LEF':command.turnLeft();break;
        case 'TUN RIG':command.turnRight();break;
        case 'TUN BAC':command.turnBack();break;
        case 'TRA LEF':command.traLeft();break;
        case 'TRA RIG':command.traRight();break;
        case 'TRA BAC':command.traBack();break;
        case 'TRA TOP':command.traTop();break;
        case 'MOV LEF':command.movLeft();break;
        case 'MOV RIG':command.movRight();break;
        case 'MOV BAC':command.movBack();break;
        case 'MOV TOP':command.movTop();break;
        default:errorCM(val);queue.length=0;break;
      }
      if(queue.length>0){
        runCmd();
      }
    },400);
  }
}
var resetCommand=function(){
  $('#command').value='';
  line.innerHTML='';
  count=0;
}
var errorCM=function(val){
  var value=$('#command').value;
  var lineNum=document.getElementsByClassName('lineNumber');
  var items=value.split('\n');
  for(var i=0;i<items.length;i++){
    if(val==items[i].replace(/\s+\d+\s*/g,'')){
      lineNum[i].style.backgroundColor="red";
    }
  }
}
var line=$('#command-rows');
var count=0;
$('#command').onkeyup=function(event){
  e=event||window.event;
  if(e.keyCode==13){
    count++;
    var li=document.createElement('li');
    var txt=document.createTextNode(count);
    li.appendChild(txt);
    li.className='lineNum';
    line.appendChild(li);
  }
  line.firstChild.style.marginTop=-$('#command').scrollTop+"px";
}
$('#run').onclick=run;
$('#refresh').onclick=resetCommand;
