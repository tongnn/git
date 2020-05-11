<template>
  <div class="wrap">
    <div id='leadInto' @click='into'>导入</div>
    <Modal v-model="modal1" title="导入文件"  @on-ok="saveRole1" @on-cancel="cancel1">
        <form action="" enctype="multipart/form-data" method="post" border='2px solid red'> 
            <div class='top'>
                <div class='fontText' style='font-weight:bold;'>请选择导入excel文件：</div>
                <input type="file" id="upfile" @click=''>
            </div>
        </form>
    </Modal>
    <Modal v-model="modal2" title="导入文件第二步"  @on-ok="saveRole" @on-cancel="cancel">
            <form name="infoForm" method="post" action="document.htm" enctype="multipart/form-data">
                <table width="100%" border="0" cellspacing="1" cellpadding="1" align=center>
                    <tr>
                        <td class="dataLabel">导入类型：</td>
                        <td>
                            <div style="float:left"><input type="radio" name="FILE_TYPE" id="TYPEOLD" value="OLD" checked >系统导入文件&nbsp;&nbsp;&nbsp;</div>
                            <!-- <div style="float:left;margin-left:11%;"><input type="radio" name="FILE_TYPE" id="TYPENEW" value="NEW" >模板文件</div> -->
                        </td>
                    </tr>    
                    <tr>
                        <td class="dataLabel">行数选择：</td>
                        <td>
                            <div style="float:left"><input class="textPlane" id='starLine' type="text" name="START_LINE" size= "10"  value="1" chname="起始行" datatype="NUM" dpt="10,0" isnull="false" ipt=""></div>
                            <div style="float:left;line-height:28px;margin:0 5px;">到</div>
                            <div style="float:left"><input class="textPlane" id='endLine' type="text" name="END_LINE" size= "10"  value="1000" chname="结束行" datatype="NUM" dpt="10,0" isnull="false" ipt=""></div>
                        </td>
                    </tr>
                    <tr>
                        <p id='propUser'>{{solecode}}</p>
                    </tr>
                    <!-- <tr>
                            <td class="dataLabel">唯一性标志字段：</td>
                            <td><select id="onlyField" name="onlyField" multiple size="8"></select></td>
                           
                    </tr> -->
                    <tr>
                        <td class="dataLabel">重复数据：</td>
                        <td>
                                <!-- <div style="float:left"  class='dot'><input type="radio" name="DUPLACATE_DATA" id="DUPLACATE_DATA0" value="OVERWRITE" ><label class="font_black" for="DUPLACATE_DATA0" ID="LB_DUPLACATE_DATA0">覆盖</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div> -->
                                <div style="float:left"  class='dot'><input type="radio" name="DUPLACATE_DATA" id="DUPLACATE_DATA1" value="UPDATE"><label class="font_black" for="DUPLACATE_DATA0" ID="LB_DUPLACATE_DATA2">更新</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div style="float:left"><input type="radio" name="DUPLACATE_DATA" id="DUPLACATE_DATA2" value="IGNORE" checked><label class="font_black" for="DUPLACATE_DATA1" ID="LB_DUPLACATE_DATA1">追加</label></div>
                                
                        </td>
                    </tr> 
                </table>
                    <input type="hidden" name="param_funcId" value="${param_bean.param_funcId}">
                    <input type="hidden" name="param_formId" value="${param_bean.param_formId}">
                    <input type="hidden" name="param_parentFormId" value="${param_bean.param_parentFormId}">
                    <input type="hidden" name="onlyFieldCode" id="onlyFieldCode" value="">
                    <input type="hidden" name="fitemListStr" id="fitemListStr" value="">
                    <input type="hidden" name="param_act" value="docImport">
            </form>
    </Modal>
  </div> 
</template>
<script>
var baseURL = process.env.BASE_API; 
var atts; var fitemListStr; var param_formId;
export default {
    name: 'leadInto',
    data(){
            return { modal1: false, modal2: false }
    }, 
    props:{
        solecode:{
            type:String,
            required:true
        }
    },
    methods:{
        into(){ //导入
            this.modal1 = true;
        },
        saveRole1(){ //下一步
            // $("#onlyField").find('option').remove();
            if($("#upfile").val()=="" || !$("#upfile").val()){
                    this.$alert('请选择文件','提示');
                }else{
                    var a = new FormData();
                    var content=$("#upfile").val();
                    a.append("file", $("#upfile")[0].files[0]);
                    a.append("name", content);
                    var _this=this;
                    $.ajax({
                        url:baseURL+'/docFile.htm?param_act=showNextImport&param_funcId=01177796568b0001&param_parentFormId=main', 
                        xhrFields:{ withCredentials:true},
                        type: "POST",
                        cache: false,
                        data: a,
                        processData: false, //jquery不去处理发送的数据
                        contentType:false,//不去设置content-type请求头
                        async: false,
                        success: function (data) {
                            var news=JSON.parse(data);
                            // console.log(news)
                            if(news.msg){
                                _this.$alert(news.msg,'提示')
                            }else{
                                fitemListStr=news.fitemListStr
                                // console.log(fitemListStr)
                                param_formId=news.param_formId
                                // console.log(param_formId)
                                var fields=news.fitemListStr.split(",");
                                for (var i = 0; i < fields.length; i++) {
                                    if (fields[i].length > 0) {
                                        atts = fields[i].split("~");
                                        var sName = atts[1];
                                        var sValue = atts[0];
                                        // console.log(sName); 
                                        // console.log(sValue);
                                        var oOption = document.createElement('OPTION');
                                        oOption.text = sName;
                                        oOption.value = sValue;
                                        // document.all.onlyField.options.add(oOption);
                                    }
                                }
                                _this.modal1 = false;
                                _this.modal2 = true;
                            }
                            $("#upfile").val('');
                        },
                    })
                }
                //第一步导入结束
        },
        cancel1(){
            this.modal1 = false;
        },
        saveRole(){ //执行导入
            var DUPLACATE_DATA;
            var START_LINE=$('#starLine').val();            
            var END_LINE=$('#endLine').val();
            var onlyFieldCode=$("#propUser").html()
            // var onlyFieldCode=$("#onlyField").val().toString();
            // if(!onlyFieldCode || onlyFieldCode==''){
            //     this.$alert('请选择唯一性标志字段')
            //     return;
            // }
            if(document.getElementById("DUPLACATE_DATA2").checked){
                DUPLACATE_DATA='IGNORE'
            }else if(document.getElementById("DUPLACATE_DATA1").checked){
                DUPLACATE_DATA='UPDATE';
            }
            var _this=this;
            $.ajax({
                type:'post',
                url:baseURL + '/docFile.htm?param_act=docImport&param_funcId=01177796568b0001&param_parentFormId=main',
                data:{'START_LINE':START_LINE,'END_LINE':END_LINE,'FILE_TYPE':'OLD','onlyFieldCode':onlyFieldCode,'DUPLACATE_DATA':DUPLACATE_DATA,'fitemListStr':fitemListStr,'param_formId':param_formId},
                success:function(data){
                    var news=JSON.parse(data).msg
                    _this.$alert(news,'提示')
                    jQuery("#grid-table").trigger("reloadGrid");
                    }       
            })
        },
        cancel(){//取消
            this.modal2 = false;
        }
    },
    mounted(){
        $(function(){
            $('.ivu-modal-footer').find('button').eq(1).text(' ');
            $('.ivu-modal-footer').find('button').eq(1).text('下一步');                 
        })
    }
}
</script>
<style scoped>
  #leadInto,.below,.off{cursor: pointer;}
  #leadInto{width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;background-color:rgb(114, 148, 243);}
  .top, .below{text-align: center;}
  .top{height:26px}
  .top .fontText,input{float: left;text-align: center;}
  .top .fontText{height:26px;line-height: 26px;}
  .below{margin-top:20px}
  .below .off{width:50px;height:30px;background-color:#67aaf1;display:inline-block;width:60px;height:30px;line-height:30px;border-radius:3px;}
  .below .off{margin-left:5%}
  #infoForm{width:800px;height:auto;border:1px solid red;}
  /* #onlyField{width:auto;} */
  #propUser{display:none}
</style>