window.onload=function(){
  var newNumber=document.getElementById("new-number");
  var buttonList=document.getElementsByTagName("button");
  var container=document.getElementById("arr-area");
  var queue={
    str:[],
    leftPush:function(num){
      this.str.unshift(num);
      this.paint();
    },
    rightPush:function(num){
      this.str.push(num);
      this.paint();
    },
    isEmpty: function() {
      return (this.str.length == 0);
    },
    isFull:function(){
      return(this.str.length>60);
    },
    leftPop:function(){
      if(!this.isEmpty()){
        this.str.shift();
        this.paint();
      }
      else{
        alert("The queue is already empty!");
      }
    },
    rightPop:function(){
      if(!this.isEmpty()){
        this.str.pop();
        this.paint();
      }
      else{
        alert("The queue is already empty!");
      }
    },
    paint:function(){
      var str="";
      for(var cur=0;cur<this.str.length;cur++){
        str+="<span style=\'height:"+this.str[cur]+"px\'></span>";
      }
      container.innerHTML=str;
    }
  }
  function BubbleSort(){
    var count=0,i=0;
    var Clock;
    Clock=setInterval(function(){
      if(count>=queue.str.length){
        clearInterval(Clock);
      }
      if(i==queue.str.length-1-count){
        i=0;
        count++;
      }
      if(queue.str[i]>queue.str[i+1]){
        var temp=queue.str[i];
        queue.str[i]=queue.str[i+1];
        queue.str[i+1]=temp;
        queue.paint();
      }
      i++;
    },100);
  }
  function selectSort(){
    var count=0,i=0;
    var Clock;
    Clock=setInterval(function(){
      if(count>=queue.str.length-1){
        clearInterval(Clock);
      }
      if(i==queue.str.length){
        count++;
        i=count+1;
      }
      if(queue.str[i] && queue.str[i]<queue.str[count]){
        var temp=queue.str[i];
        queue.str[i]=queue.str[count];
        queue.str[count]=temp;
        queue.paint();
      }
      i++;
    },100)
  }
  buttonList[0].onclick=function(){
    var input=newNumber.value;
    if((/^[0-9]+$/).test(input)){
      queue.leftPush(input);
    }
    else{
      alert("Please enter in integer!")
    }
  }
  buttonList[1].addEventListener("click",function(){
    var input=newNumber.value;
    if((/^[0-9]+$/).test(input)){
      queue.rightPush(input);
    }
    else{
      alert("Please enter in integer!")
    }
  },false);
  buttonList[2].onclick=function(){
    queue.leftPop();
  }
  buttonList[3].onclick=function(){
    queue.rightPop();
  }
  buttonList[4].onclick=function(){
    BubbleSort();
  }
  buttonList[5].onclick=function(){
    selectSort();
  }
}