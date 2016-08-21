var list=[
{city:'西安',school:['西安电子科技大学','西安交通大学','西北工业大学']},
{city:'北京',school:['清华大学','北京大学','北京邮电大学','北京理工大学']},
{city:'上海',school:['复旦大学','上海交通大学','上海戏剧学院','华东师范大学']}];
  var undergraduate=document.getElementById("undergraduate");
  var graduate=document.getElementById("graduate");
  var college=document.getElementById("college");
  var company=document.getElementById("company");
  var city=document.getElementById("city");
  var school=document.getElementById("school");
  undergraduate.onclick=function(){
    if(undergraduate.checked){
        college.style.display="block";
        company.style.display="none";
        graduate.checked=false;
    }
  };
  graduate.onclick=function(){
    if(graduate.checked){
      college.style.display="none";
      company.style.display="block";
      undergraduate.checked=false;
    }
  };
  function selected(){
    for(var i=0;i<list.length;i++){
      var option=document.createElement("option");
      option.innerHTML=list[i].city;
      option.value=list[i].city;
      city.appendChild(option);     
    }
  };
  function selectedTwo(){
    school.innerHTML="";
    for(var i=0;i<list.length;i++){
      if(city.childNodes[i].selected){
        for(var j=0;j<list[i].school.length;j++){
          option=document.createElement("option");
          option.innerHTML=list[i].school[j];
          option.value=list[i].school[j];
          school.appendChild(option);
        }
      }
    }
  };
  selected();
  selectedTwo();
  city.onclick=function(){
    selectedTwo();
  }
