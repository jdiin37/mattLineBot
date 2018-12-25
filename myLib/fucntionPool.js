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

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    var Msg = "現在時間:";
    Msg += "西元:" + yyyy ;
    Msg += "月:" + mm ;
    Msg += "日:" + dd ;
    Msg += "分:" + today.getMinutes() ;
    Msg += "秒:" + today.getSeconds() ;


    return Msg;
  }
  


}


module.exports = functionPool;