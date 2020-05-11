<template>
  <div class="wrap">
    <div id='leadout' @click='out'>导出</div>
    <Modal v-model="modal1" title="导出文件"  @on-ok="saveRole" @on-cancel="cancel">
          
        <form name="infoForm" method="get" action="document.htm" >
                <p id='propsId'>{{message}}</p>
                <input type="hidden" id="param_act" name="param_act" value="docExport">
                <input type="hidden" id="param_selectedIds" name="param_selectedIds" value="${param_bean.param_selectedIds}"> 
                <input type="hidden" id="param_funcId" name="param_funcId" value="${param_bean.param_funcId}"> 
                <input type="hidden" id="param_formId" name="param_formId" value="${param_bean.param_formId}"> 
                <input type="hidden" id="param_parentFormId" name="param_parentFormId" value="${param_bean.param_parentFormId}"> 
                <input type="hidden" id="param_parentDataId" name="param_parentDataId" value="${param_bean.param_parentDataId}"> 
                <input type="hidden" id="param_param_treeSelectId" name="param_param_treeSelectId" value="${param_bean.param_treeSelectId}"> 
                <input type="hidden" id="param_querySql" name="param_querySql" value="${param_bean.param_querySql}"> 
                <input type="hidden" id="param_queryCondId" name="param_queryCondId" value="${param_bean.param_queryCondId}"> 
                <input type="hidden" id="param_dataDict" name="param_dataDict" value="${param_bean.param_dataDict}"> 
                <input type="hidden" id="checkItemCodes" name="checkItemCodes" value="">
                <table width="100%" id="mainTable" border="0" cellspacing="1" cellpadding="1" align=center>
                    <tr>
                        <td>导出类型</td>
                        <td>
                            <input type="radio" name="exportPurpose" id="exportPurpose0" value="view" checked @click="displayItems('mainTable2')">
                            <label class="font_black" for="exportPurpose0" ID="LB_exportPurpose0">一般文件</label>
                            <input type="radio" name="exportPurpose" id="exportPurpose1" value="backup" checked @click="hideItems('mainTable2') ">
                            <label class="font_black" for="exportPurpose1" ID="LB_exportPurpose1">导出文件</label>
                        </td>
                    </tr>
                    <tr>
                        <td>文件类型</td>
                        <td>
                            <input type="radio" name="fileType" id="typeXls" value="xls" checked>
                            <label class="font_black" for="fileType" ID="LB_typeXls">EXCEL文件</label>
                            <!-- <input type="radio" name="fileType" id="typeTxt" value="txt">
                            <label class="font_black" for="typeTxt" ID="LB_typeTxt">文本文件</label> -->
                        </td>
                    </tr>
                    <tr>
                        <td>数据来源</td>
                        <td><input type="radio" name="fileData" id="fileData" value="select" checked @click="hideItems('tr_select')">
                            <label class="font_black" for="fileData" ID="LB_FILE_DATA" @click="hideItems('tr_select')">选中列表数据</label>&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="fileData" id="fileData1" value="hand" @click="displayItems('tr_select')">
                            <label class="font_black" for="fileData1" ID="LB_fileData1" @click="displayItems('tr_select')">全部列表数据</label>
                        </td>
                    </tr>
                </table>
                <div style='margin-left:12%;display:none' id='linage'>
                    <input id='startLine' class="textPlane" type="text" name="startLine" value="1" chname="起始行"> 到
                    <input id='finallLine' type="text" value="1000">
                </div>
                <!-- 暂时不用的选项框 -->
                <!-- <table id="mainTable2" border="1" cellspacing="1" cellpadding="1" align=left>
                    <tr>
                        <td width=%>请选择字段列表</td>
                        <td width=17% align=center>表单字段列表</td>
                        <td width=17% align=center>导出字段列表</td>
                        <td width=30%></td>
                        <td width=10%></td>
                    </tr>
                <tr>
                    <td align=center>1 </td>
                    <td align=center>2 
                            <select id="select1" name="select1" multiple size="15" STYLE="width: 120px"> 
                            </select>                       
                    </td>
                    <td align=center>3
                        <table>
                            <tr>
                                <td><a href="javascript:void(0);" style="text-decoration: none" @click="delOptions();"><font face="Webdings">3</font></a> </td>
                            </tr>
                            <tr>
                                <td><a href="javascript:void(0);" style="text-decoration: none" @click="addOptions();"><font face="Webdings">4</font></a></td>
                            </tr>
                            <tr>
                                <td><a href="javascript:void(0);" style="text-decoration: none" @click="delAllOptions();"><font face="Webdings">7</font></a> </td>
                            </tr>
                            <tr>
                                <td> <a href="javascript:void(0);" style="text-decoration: none" @click="addAllOptions();"><font face="Webdings">8</font></a> </td>
                            </tr>
                        </table>   
                    </td>
                    <td align=center> 4 
                        <select id="select2" name="select2" multiple size="15" STYLE="width: 120px"></select>
                    </td>
                    <td align=center> 5
                        <table>
                            <tr>
                                <td><a href="javascript:void(0);" style="text-decoration: none"  @click="upOption();"><font face="Webdings">5</font></a></td>
                            </tr>
                            <tr>
                                <td><a href="javascript:void(0);" style="text-decoration: none" @click="downOption();"><font face="Webdings">6</font></a></td>
                            </tr>
                        </table>

                    </td>
                </tr> 
                </table> -->
        </form>
     </Modal>
  </div> 
</template>
<script>
var baseURL = process.env.BASE_API;
var msg=''; var startLine=''; var endLine=''; var param_dataDict; var param_formId;
import axios from 'axios'
import fetch from 'utils/fetch'
export default {
    name: 'leadOut',
    data(){  
        return { modal1: false }
        },
    props: {
        message:String,  //定义传值的类型   
        // required:true 
    },
    methods:{
        displayItems(){
            $("#linage").show();
        },
        hideItems(){
            $("#linage").hide();      
        },
        up(){
            var selIndex = document.all.right_.selectedIndex;
            if(selIndex!=0 && selIndex !=-1){
                var sName = document.all.right_.options[selIndex].text;
                var sValue = document.all.right_.options[selIndex].value;
                var sName2 = document.all.right_.options[selIndex-1].text;
                var sValue2 = document.all.right_.options[selIndex-1].value;
                document.all.right_.options[selIndex-1]=new Option(sName,sValue);
                document.all.right_.options[selIndex]=new Option(sName2,sValue2);
                document.all.right_.options.selectedIndex = (selIndex-1);
            }
        },
        down(){
            var selIndex = document.all.right_.selectedIndex;
            var s = document.all.right_.options.length-1;
            if(selIndex!= s && selIndex !=-1){
            var sName = document.all.right_.options[selIndex].text;
            var sValue = document.all.right_.options[selIndex].value;
            var sName2 = document.all.right_.options[parseInt(selIndex+1)].text;
            var sValue2 = document.all.right_.options[parseInt(selIndex+1)].value;
            document.all.right_.options[parseInt(selIndex+1)]=new Option(sName,sValue);
            document.all.right_.options[selIndex]=new Option(sName2,sValue2);
            document.all.right_.options.selectedIndex = (selIndex+1);
            }
        },
        all_leftMove(){
            var options=document.getElementById("right_").options;
            for(var i=0;i<options.length;i++){
                var option=options[i];
                var oOption = document.createElement('OPTION');
                oOption.text = option.text;
                oOption.value = option.value;
                document.all.left_.options.add(oOption);
            }
            for(var i=options.length-1;i>-1;i--){
                var option=options[i];
                options.remove(i);
            }
            return false;
        },
        all_rightMove(){
            var options=document.getElementById("left_").options;
            for(var i=0;i<options.length;i++){
                var option=options[i];
                var select2Option = document.createElement('OPTION');
                select2Option.text = option.text;
                    select2Option.value = option.value;
                    document.all.right_.options.add(select2Option);
            }
            for(var i=options.length-1;i>-1;i--){
                var option=options[i];
                options.remove(i);
            }
            return false;
        },
        left_move(){
            var options=document.getElementById("right_").options;
            for(var i=options.length-1;i>-1;i--){
                var option=options[i];
                if(option.selected) {
                    options.remove(i);
                    var oOption = document.createElement('OPTION');
                        oOption.text = option.text;
                            oOption.value = option.value;
                            document.all.left_.options.add(oOption);
                }
            }
            return false;
        },
        right_move(){
            var options=document.getElementById("left_").options;
            for(var i=options.length-1;i>-1;i--){
                var option=options[i];
                if(option.selected) {
                    options.remove(i);
                    var oOption = document.createElement('OPTION');
                        oOption.text = option.text;
                        oOption.value = option.value;
                        document.all.right_.options.add(oOption);
                }
            }
            return false;
        },
        choiceSel(){
            $("#lineNum,.leadForm .allSel i").hide();$(".leadForm .choiceSel i").show();
        },
        allSel(){
            $("#lineNum,.leadForm .allSel i").show();$(".leadForm .choiceSel i").hide();
        },
        exlSel(){
             $(".leadForm .textFile i").hide(); $(".leadForm .exlFile i").show();
        },
        txtSel(){ 
            $(".leadForm .textFile i").show(); $(".leadForm .exlFile i").hide();
        },
        ordSel(){ 
            var exportPurpose=view;//一般文件
            $(".leadForm .sysBackup i").hide(); $(".leadForm .regularFile i,.fieldList").show();
        },
        sysSel(){
            var exportPurpose=backup;//备份文件
            $(".leadForm .sysBackup i").show(); $(".leadForm .regularFile i,.fieldList").hide();
        },
        out(){ 
            this.modal1 = true;
            $("#propsId,#exportPurpose0,#LB_exportPurpose0").hide();
            $.ajax({  
                url: baseURL+'/docFile.htm?param_act=showExport&param_selectedIds=&param_funcId=016067709dd4000b',//导出展示
                async: false,  
                success: function(data) {
                    msg=JSON.parse(data)
                    param_dataDict=msg.param_dataDict
                    param_formId=msg.param_formId
                    }
            });
        },
        saveRole(){ 
            var param_selectedIds=$("#propsId").html();    
            var exportPurpose='backup';
            var fileType='xls';
            var startLine=$("#startLine").val();
            var endLine=$("#finallLine").val();
            var fileData='';
            if (document.getElementById("fileData").checked) {
                if(!param_selectedIds || param_selectedIds==''){
                    this.$alert('请选择导出列','提示')
                    return;
                }
                fileData='select'
            }else{
                fileData='hand'
            }
             fetch({
                headers: { 'Content-Type': 'application/json'},
                baseURL:baseURL,
                url: '/docFile.htm?param_act=docExport&&param_funcId=016067709dd4000b',
                method:'post',
                params:{param_selectedIds,param_dataDict,param_formId,exportPurpose,fileType,startLine,endLine,fileData},
                responseType:'arraybuffer'
            }).then(res =>{ 
                    let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
                var link = document.createElement('a');  
                link.href = window.URL.createObjectURL(blob);  
                link.download = "download";  
                link.click();  
            }).catch((err) => {
                console.log(err);
                resolve(0);
            })
        },
        cancel(){ 
            this.$Message.info('点击了取消');
            this.modal1=false;
        }
    }
}
</script>
<style scoped>
    .top span,.leadForm span{cursor: pointer;}
    #leadout{background-color:rgb(114, 193, 243);width:130px;height:35px;text-align:center;line-height:35px;border-radius:5px;margin-top:2px;color:white;font-weight:500;}
    .top{margin: auto;width:110px}
    .top span{display: inline-block;width:50px;height: 25px;background-color:rgb(231, 230, 230);text-align: center;line-height:25px;}
    .leadForm{margin-top: 10px;}
    .leadForm span{display: inline-block;width:11px;height:11px;border-radius:50%;background-color: rgb(204, 204, 207);position: relative}
    .leadForm span i{display: inline-block;width:5px;height:5px;border-radius:50%;background-color:black;position: absolute;left:3px;top:3px;}
    .leadForm .selMiddle{margin-left:20%}
    .leadForm .selFinally{margin-left:5%}
    .leadForm .selFinally i{display: none}
    .leadForm input{width: 90px;height: 26px;}
    .leadForm .firstInt{margin-left:20%}
    .leadForm #lineNum{display:none;}
    .fieldList{margin-top:10px;min-height:165px;}
    .fieldList .smallList1{margin-left:10%;}
    .fieldList .smallList2{margin-left:27%;}  
    .fieldList #wrap{width:300px;margin-left:120px;margin-top:10px;}
    #fieldset{width:100px;height:200px;border:1px solid lightgray;}
    #pic{height:200px;float: left;margin-left:5px;}
    #exportField{width:100px;height: 200px;border:1px solid lightgray;margin-left:10px;}
    #pic :first-child{margin-top:50px;}
    #pic li{width:20px;height:20px;border: 1px solid darkblue;margin-top:5px;text-align: center;line-height:20px;font-size:15px;}  
    #pic li,#mainUl li{cursor: pointer;}
    .discolor{color: #fff;  background: #337ab7;}
    #showUl li{cursor: pointer}
</style>