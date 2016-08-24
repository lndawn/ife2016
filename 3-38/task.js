var data={
  thead:{'姓名':false,'数学':true,'语文':true,'英语':true},
  tbody:[
    ['小明',80,90,70],
    ['小红',90,60,80],
    ['小亮',85,95,65],
    ['小赵',70,80,90],
    ['小陌',80,90,95], 
  ],
  sortFlag:[true,true,true,true]//升序排列
}
function $(el){
  return document.querySelector(el);
}
function addEvent(ele,event,handler){
  if(ele.addEventListener){
    ele.addEventListener(event,handler,false);
  }
  else if(ele.attachEvent){
    ele.attachEvent('on'+event,handler);
  }
  else{
    ele['on'+event]=handler;
  }
}
var table=function(data,ele){
  this.data=data;
  this.ele=ele;
  this.createTable();
};
table.prototype={
  createTable:function(){
    var theadItems=this.data.thead;
    var tbodyItems=this.data.tbody;
    var theadStr='';
    var tbodyStr='';
    for(var i in theadItems){
      if(theadItems[i])
        theadStr += '<th>'+i+'<span class="sort"></span></th>';
      else
        theadStr += '<th>'+i+'<span></span></th>';
    }
    for(var i in tbodyItems){
      var item=tbodyItems[i];
      tbodyStr += '<tr>';
      for(var j=0;j<item.length;j++){
        tbodyStr += '<td>'+item[j]+'</td>';
      }
      tbodyStr += '</tr>';
    }
    var tableStr='<table border=1 class="table-tool" id="table-tool"><thead class="head" id="head"><tr>'+theadStr+
          '</tr></thead><tbody>'+tbodyStr+'</tbody></table>';
    this.ele.innerHTML=tableStr;
    this.bindEvent();
    this.setTable();
  },
  sortTable:function(num){
    function compare(a,b){
      if(this.data.sortFlag[num]==true){
        return a[num]-b[num];
      }else{
        return b[num]-a[num];
      }
    }
    this.data.sortFlag[num]=!this.data.sortFlag[num];
    this.data.tbody.sort(compare);
    return this.data;
  },
  bindEvent:function(){
    var self=this;
    var sortBtn=document.getElementById('head');//事件委托
    var item=[];
    var sortItem,sortNum;
    for(var i in this.data.thead){
      item.push(i);
    }
    addEvent(sortBtn,'click',function(e){
      if(e.target.className=='sort'){
        sortItem=e.target.parentNode.innerText;//文本查询索引
        sortNum=item.indexOf(sortItem);
        self.sortTable(sortNum);
        self.createTable();
      }
    })  
  },
  setTable:function(){
    thead=$('#head');
    table=$('#table-tool');
    window.onscroll=function(){
      var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
      if(table.offsetTop-scrollTop<=0){
        thead.style.position='fixed';
        thead.style.top='0';
        if(table.offsetTop+parseInt(getComputedStyle(table).height)-scrollTop<=0){
          thead.style.position='absolute';
        }
      }else{
        thead.style.position='static';
      }
    }
  }
}
window.onload=function(){
  var ele=$('#table');
  var tableShow=new table(data,ele);
}