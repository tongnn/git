export { login, navTab }
var _this = this
var baseURL = process.env.BASE_API;
function navTab() {


    //全部设备与月度报告
    $("#month_R").on("click",function(){
        $("#line_r").show();
        $("#all_e1").hide();
        $("#box2").hide();
        $("#box3").hide();
        $("#one_L").hide();
        $("#two_L").show();
        $("#month_R").css("color","#333");
        $("#all_Pie").css("color","#808080");
    });
    $("#all_Pie").on("click",function(){
        $("#line_r").hide();
        $("#all_e1").show();
        $("#box2").hide();
        $("#box3").hide();
        $("#one_L").show();
        $("#two_L").hide();
        $("#all_Pie").css("color","#333");
        $("#month_R").css("color","#808080");
    })



}


