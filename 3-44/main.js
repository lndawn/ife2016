(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Waterfall = factory();
}//对组件进行AMD封装
function waterfull(container,srcImg,column){
  var opts=opts || {};
  var containerSelector=opts.container|| 'waterfallContainer';
  var boxSelector=opts.boxSelector || 'waterfallBox';
  this.container=document.querySelector(containerSelector);
  this.boxes=this.container ? Array.prototype.slice.call(this.container.querySelectorAll(boxSelector)) :[];
  this.column=opts.column || 1;
  this.compose();
  var that=this;
  window.onload=function(){
    that.compose(true);
  }
}
waterfull.prototype={
  init:function(columnNum){
    this.columns=[];
    for(var i=0;i<columnNum;i++){
      var columnDiv=document.createElement('div');
      columnDiv.style.width=(100/columnNum)+'%';
      columnDiv.setAttribute('class','waterfullColumn');
      this.columns.push(columnDiv);
      this.container.appendChild(columnDiv);
    }
  },
  getMinHeightIndex:function(){
    var min=this.columns[0].clientHeight;
    var index=0;
    for(var i=0;i<this.columns.length;i++){
      if(this.columns[i].clientHeight<min){
        min=this.columns[i].clientHeight;
        index=i;
      }
    }
    return index;
  }
  compose:function(force){
    this.initColumn(this.column);
    for(var i=0;l=this.boxes.length;i<l;i++){
      var box=this.boxes[i];
      this.addBox(box);
    }
  }
  addBox:function(ele){
    var index=this.getMinHeightIndex();
    var column=this.columns[index];
    column.appendChild(ele);
  }
}
  