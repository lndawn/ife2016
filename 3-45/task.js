var img=["img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg",
"img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg",
"img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg"];
function bucket(container,srcImg,minHeight){
  this.container=container;
  this.srcImg=srcImg;
  this.minHeight=minHeight || 300;
  this.curRow=0;
  this.compose();
}
bucket.prototype={
  compose:function(){
    var rows=this.calcRow(3,6);
    var index=0;
    var text="";
    for(var i=0;i<this.srcImg.length;i++){
      if(i>rows[index].number) index++;
      text += '<div class="imgBox" style="height:'+rows[index].height+'px"><img src='+this.srcImg[i]+'></div>';
    }
    this.container.innerHTML=text;
  },
  calcRow:function(min,max){
    var height=this.minHeight;
    var rows=[];
    var count=0;
    var width=0;
    var totalWidth;
    var totalHeight;
    var ratio;
    var newWidth;
    for(var i=0;i<this.srcImg.length;i++){
      var image=new Image();
      var ratio=0;
      image.src=img[i];
      if(image.complete){
        ratio=image.width/image.height;
      }
      newWidth=height*ratio;
      width += newWidth;
      count ++;
      if((width>this.container.clientWidth && count>min) || count>max){
        totalWidth=width-newWidth;
        ratio=height/totalWidth;
        console.log(width);
        totalHeight=parseInt(this.container.clientWidth*ratio);
        rows.push({number:i-1,height:totalHeight});
        count=1;
        width=newWidth;
      }
    }
    rows.push({number:i,height:this.minHeight});
    console.log(rows);
    return rows;
  }
}
function displayImage(){
  document.querySelector("#content").addEventListener('click',function(e){
    if(e.target.tagName==='IMG'){
      var display=document.querySelector('#display');
      var img=display.querySelector('img');
      img.setAttribute('src',e.target.getAttribute('src'));
      display.className="display";
      display.addEventListener('click',function(){
          display.className="hidden";
      })
    }
  },false)
}
window.onload=function(){
  var ele=document.getElementById("content");
  var imgShow=new bucket(ele,img,200);
  displayImage();
}();