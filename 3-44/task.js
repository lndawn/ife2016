var img=["img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg",
"img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg",
"img/example1.jpg","img/example2.jpg","img/example3.jpg","img/example4.jpg"];
function waterfull(container,srcImg,column){
  this.container=container;
  this.column=column;
  this.srcImg=srcImg;
  this.compose();
}
waterfull.prototype={
  init:function(){
    var text='';
    var columnWidth=100/this.column+'%'
    for(var i=0;i<this.column;i++){
      text += '<div class="column" style="width:columnWidth"></div>';
    }
    this.container.innerHTML=text;
  },
  compose:function(){
    this.init();
    var i=0;
    for(i in this.srcImg){
      var index=this.getMinHeightIndex();
      var imgBox=document.createElement('div');
      imgBox.setAttribute('class','imgBox');
      var image=document.createElement('img');
      image.src=this.srcImg[i];
      imgBox.appendChild(image);
      var insertColumn=document.getElementsByClassName('column')[index];
      insertColumn.appendChild(imgBox);
    }
  },
  getMinHeightIndex:function(){
    var columns=document.getElementsByClassName('column');
    var minIndex=0;
    for(var i=0;i<columns.length;i++){
      if(columns[i].clientHeight<columns[minIndex].clientHeight){
        minIndex=i;   
      }
      console.log(columns[i].clientWidth);
    }
    return minIndex;
  },
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
  var imgShow=new waterfull(ele,img,4);
  displayImage();
}();