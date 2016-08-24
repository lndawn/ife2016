function $(el){
  return document.querySelector(el);
}
var dateCtrl=function(container){
  this.container=container;
  this.selectedEle=null;
  this.date=new Date();
  this.init();
}
dateCtrl.prototype={
  days:['日', '一', '二', '三', '四', '五', '六'],
  init:function(){
    var self=this;
    var text="";
    text += '<div class="title" id="title">'+'<strong id="pre"><-</strong>'+
            '<strong id="selectMonth"></strong>'+'<strong id="next">-></strong>'+'</div>'+
            '<div class="content" id="content">';
    for(var i=0;i<7;i++){
      if(i==0 || i==6){
        text += '<span style="color:#b12313">'+this.days[i]+'</span>';
      }
      else
        text += '<span>'+this.days[i]+'</span>';
    }
    for(var i=0;i<35;i++){    
      text += '<span style="cursor:pointer"></span>';
    }
    text += '</div>';
    this.container.innerHTML=text;
    $("#content").onclick=function(e){
      self.clickSelectDate(e);
    }
    $("#pre").onclick=function(){
      self.preMonth();
    }
    $("#next").onclick=function(){
      self.nextMonth();
    }
    this.renderByDate(this.date);
  },
  nextMonth:function(){
    var dat=new Date(this.date);
    dat.setMonth(dat.getMonth()+1);
    this.selectDate(dat);
  },
  preMonth:function(){
    var dat=new Date(this.date);
    dat.setMonth(dat.getMonth()-1);
    this.selectDate(dat);
  },
  clickSelectDate:function(e){
    if(e.target.tagName==='SPAN'){
      var index=e.target.innerText,
          selectedIndex=this.selectedEle.innerText;
      var dat=new Date(this.date);
      dat.setDate(dat.getDate()+(index-selectedIndex));
      this.selectDate(dat);
    }
  },
  selectDate:function(date){
    this.selectedEle.style.backgroundColor="";
    this.selectedEle.style.color="";
    this.date=date;
    this.renderByDate(date);
  },
  renderByDate:function(date){
    var title=$('#selectMonth');
    title.innerText=date.getFullYear()+'年'+(date.getMonth()+1)+'月';
    var dat=new Date(date);
    //找到第一个日期
    dat.setDate(dat.getDate() - date.getDate()+1);
    dat.setDate(dat.getDate()-dat.getDay());
    var spanList=document.getElementsByTagName('span');
    for(var i=0;i<35;i++){
      var node=spanList[i+7];
      node.innerText=dat.getDate();
      if(dat.getMonth()!==date.getMonth()){
        node.style.color='gray';
      }else{
        if(dat.getDay()=='0' || dat.getDay()=='6')
          node.style.color='#b12313';
      }
      if(dat.getTime()===date.getTime()){
        node.style.backgroundColor='#b12313';
        node.style.color='white';
        this.selectedEle=node;
      }
      dat.setDate(dat.getDate()+1);
    }
    $("#select").innerHTML=this.getSelectedEle();
  },
   getSelectedEle:function(){
    var y=this.date.getFullYear();
    var m=this.date.getMonth()+1;
    var d=this.date.getDate();
    return y+'年'+m+'月'+d+'日';
  },
}
window.onload=function(){
  var ele=$("#calendar");
  var dateC=new dateCtrl(ele);
}