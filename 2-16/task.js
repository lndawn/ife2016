var aqiData={};
function addAqiData(){
  var strCity=document.getElementById("city").value.trim();
  var strValue=document.getElementById("quality").value.trim();
  if(!strCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
    alert("城市名必须为中文字符");
    return;
  }
  if(!strValue.match(/^\d+$/)){
    alert("空气质量指数必须为整数！");
    return;
  }
  aqiData[strCity]=strValue;
  console.log(aqiData[strCity]);
}
function renderAqiList(){
  var table=document.getElementById("aqi-table");
  table.innerHTML="";
  for(var strCity in aqiData){
    if(table.children.length===0){
      table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    }
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    td1.innerHTML=strCity;
    tr.appendChild(td1);
    var td2=document.createElement("td");
    td2.innerHTML=aqiData[strCity];
    tr.appendChild(td2);
    var td3=document.createElement("td");
    td3.innerHTML="<button class='del-btn'>删除</button>";
    tr.appendChild(td3);
    table.appendChild(tr);
  }
}
function addBtnHandle(){
  addAqiData();
  renderAqiList();
}
function delBtnHandle(target){
  var tr=target.parentElement.parentElement;
  var strCity=tr.children[0].innerHTML;
  delete aqiData[strCity];
  renderAqiList();
}
function init(){
  var btnAdd=document.getElementById("add");
  btnAdd.onclick=addBtnHandle;
  var table=document.getElementById("aqi-table");
  var delBtn=table.getElementsByClassName("del-btn");
  table.addEventListener("click",function(e){
    if(e.target && e.target.nodeName==="BUTTON"){
      delBtnHandle(e.target);
    }
  })
}

init();