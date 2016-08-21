window.onload=function(){
  var tagInput=document.getElementById("tagInput");
  var hobbyInput=document.getElementById("hobbyInput");
  var confirmHobby=document.getElementById("confirm");
  var tag=document.getElementById("tag");
  var hobby=document.getElementById("hobby");
  var tagList=[];
  var hobbyList=[];
  function check(list,item){
    for(var i=0;i<list.length;i++){
      if(item==list[i].toLowerCase())
        return true;
    }
    return false;
  }
  function render(list,container){
    container.innerHTML=list.map(function(e){
      return '<div>'+e+'</div>';
    }).join('');
  }
  tagInput.onkeyup=function(e){
    var oe=e||event;
    if(oe.keyCode==13 || oe.keyCode==32 || oe.keyCode==188){
      var newTag=this.value;
      newTag=newTag.substring(0,newTag.length);
      if(!check(tagList,newTag)){
        if(tagList.length>=10){
          tagList.shift();
        }
        tagList.push(newTag.toLowerCase());
      }
      render(tagList,tag);
      this.value="";
    }
  }
  confirmHobby.onclick=function(){
    var str=hobbyInput.value.trim();
    var hobbyword=str.split(/[,; .\s\n]+/);
    for(item in hobbyword){
      if(!check(hobbyList,hobbyword[item])){
        if(hobbyList.length>=10){
          hobbyList.shift();
        }
        hobbyList.push(hobbyword[item].toLowerCase());
      }
    }
    render(hobbyList,hobby);
    hobbyInput.value="";
  }
}