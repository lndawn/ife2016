var STOP=0;
var START=1;
function SpaceShip(orbit){
  var obj={
    _orbit:orbit,
    drive:{
      start:function(){
        if(obj.__energy>0){
          obj.__status=START;
        }
      },
      stop:function(){
        obj.__status=STOP;
      },
      _fly:function(){
        if(obj.__status==START){
          obj._angle += obj.__rate;
        }
        obj._angle=obj._angle%360;
      }
    },
    energy:{
      add:function(num){
        obj.__energy += num;
        if(obj.__energy>100){
          obj.__energy=100;
        };
      },
      consume:function(num){
        if(obj.__status==START){
          obj.__energy -=num;
        }
        if(obj.__energy<=0){
          obj.__status=STOP;
          obj.__energy=0;
        };
      },
      get:function(){
        return obj.__energy;
      }
    },
    telegraph:{
      sendMessage:function(message){
        if(message.id!=obj._orbit){
          return;
        }
        switch(message.command){
          case 'start':
            obj.drive.start();
            break;
          case 'stop':
            obj.drive.stop();
            break;
          case 'destroy':
            obj.destroy.destroy();
            break;
          case 'rate':
            obj.__rate=message.value;
            break;
        }
      }
    },
    destroy:{
      destroy:function(){
        obj._destroyed=true;
      }
    },
    __status:STOP,
    __energy:100,
    _destroyed:false,
    __rate:1,
    _angle:0
  };
  return obj;
}