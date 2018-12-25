var functionPool = {

  showhhh : function() {
    console.log('hhh');
    return 'hhh';
  },
  showIAmGroot:function(){
    return ' , I Am Groot!';
  },
  checkTime:function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var hour =today.getHours();
    var minute = today.getMinutes();
    var ss = today.getSeconds();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    if(hour < 10){
      hour = '0' + hour;
    }
    
    if(minute < 10){
      minute = '0' + minute;
    }
    
    if(ss < 10){
      ss = '0' + ss;
    }

    var Msg = "現在時間:";
    Msg +=  yyyy + "/" + mm + "/" + dd;
    Msg +=  "  " + hour +":" + minute + ":" +ss ;


    return Msg;
  }
  


}


module.exports = functionPool;