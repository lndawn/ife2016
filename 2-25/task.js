window.onload=function(){
  var tree=document.getElementById("tree");
  var search=document.getElementById("search-btn");
  var clear=document.getElementById("clear");
  var found=0,value;
  tree.onclick=function(ev){
    var event=ev||event;
    var target=event.target;
    if(target.tagName=="P"){
      parent=target.parentNode;
    }
    if(parent.className=="node"){
      var childs=parent.childNodes;
      if(childs.length>1){
        for(var node in childs){
          if(childs[node].tagName=="UL"){
            if(childs[node].style.display){
              childs[node].style.display="";
            }
            else
              childs[node].style.display="none";
          }
        }
      }
    }
  }
  search.onclick=function(){
    var input=document.getElementById("search-input"); 
    value=input.value;
    var begin=document.getElementById("tree");
    dfs(begin,value);
    if(found==1){
      alert("找到了");
    }
    else{
      alert("未找到");
    }
  }
  clear.onclick=function(){
    document.getElementById("search-input").value="";
    dfs(root,null);
  }
  function dfs(node,title){
    var childs=node.childNodes;
    if(node.tagName){
      if(node.style.color=="blue"){
        node.style.color="#000";
      }
      if(node.tagName=="P" && node.textContent.indexOf(title)>=0){
        node.style.color="blue";
        parent=node.parentNode;
        while(parent.id!="root"){
          parent.style.display="";
          parent=parent.parentNode;
        }
        found=1;
      }
      for(var i=0;i<childs.length;i++){
        dfs(childs[i],title);
      }
    }
  }
}