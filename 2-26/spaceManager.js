var spaceManager={
  notebook:{
    spaceShipList:[],
    spaceShipFlyManager:0,
    solarManager:0
  },
  createSpaceShip:function(orbitId){
    var shipId=this.notebook.spaceShipList.push(new SpaceShip(orbitId));
    var spaceshipDiv=document.createElement("div");
    spaceshipDiv.id="spaceship"+shipId;
    spaceshipDiv.className="space-ship orbit-ship"+orbitId;
    var energyDiv=document.createElement("div");
    energyDiv.className="energy";
    spaceshipDiv.appendChild(energyDiv);
    var textDiv=document.createElement("div");
    textDiv.className="text";
    textDiv.innerHTML="100%";
    spaceshipDiv.appendChild(textDiv);
    document.body.appendChild(spaceshipDiv);
  },
  Mediator:{
    sendMessage:function(message){
      setTimeout(function(){
        if(Math.random()<=0.3){
          log("向轨道"+(message.id+1)+"发送的"+message.command+"指令包丢失","red");
        }
        log("向轨道"+(message.id+1)+"发送"+message.command+"指令成功","green");
        for(var i=0;i<spaceManager.notebook.spaceShipList.length;i++){
          if(spaceManager.notebook.spaceShipList[i]._destroyed){
            continue;
          }
          spaceManager.notebook.spaceShipList[i].telegraph.sendMessage(message);
        }
      },1000)
    },
    createSpaceShip:function(orbitId){
      setTimeout(function(){
        if(Math.random()<=0.3){
          log("向轨道"+(orbitId+1)+"发送的create指令丢包了!","red");
        }
        log("向轨道"+(orbitId+1)+"发送的create指令成功!","green");
        spaceManager.createSpaceShip(orbitId);
      },1000);
    }
  }
};
(function(){
  spaceManager.notebook.spaceShipFlyManager=setInterval(function(){
    for(var i=0;i<spaceManager.notebook.spaceShipList.length;i++){
      if(spaceManager.notebook.spaceShipList[i]._destroyed){
        if(!spaceManager.notebook.spaceShipList[i].clear){
          spaceManager.notebook.spaceShipList[i].clear=true;
          document.body.removeChild(document.getElementById("spaceship"+(i+1)));
        }
        continue;
      }
      spaceManager.notebook.spaceShipList[i].drive._fly();
      var ship=document.getElementById("spaceship"+(i+1));
      ship.style.transform="rotate("+spaceManager.notebook.spaceShipList[i]._angle+"deg)";
      ship.firstElementChild.style.width=spaceManager.notebook.spaceShipList[i].energy.get()+"%";
      ship.lastElementChild.innerHTML=spaceManager.notebook.spaceShipList[i].energy.get()+"%";
    }
  },100);
})();
(function(){
  spaceManager.notebook.solarManager=setInterval(function(){
    for(var i=0;i<spaceManager.notebook.spaceShipList.length;i++){
      if(spaceManager.notebook.spaceShipList[i]._destroyed){
        continue;
      }
      spaceManager.notebook.spaceShipList[i].energy.add(2);
      spaceManager.notebook.spaceShipList[i].energy.consume(5);
    }
  },1000);
})();