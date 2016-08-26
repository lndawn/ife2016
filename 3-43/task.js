var img2=["img/example1.jpg","img/example2.jpg"];
var img6=["img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg","img/example1.jpg","img/example2.jpg"];
function puzzle(container,imgSrc){
  this.container=container;
  this.imgSrc=imgSrc;
  this.init();
};
puzzle.prototype={
  init:function(){
    var len=this.imgSrc.length,
        text ="";
    this.container.className='img'+len;
    for(var i=0;i<len;i++){
      text += '<div class="imgBox"><img src='+this.imgSrc[i]+'></div>';
    }
    this.container.innerHTML=text;
  }
}
window.onload=function(){
  container=document.getElementById('content');
  var show=new puzzle(container,img2);
}