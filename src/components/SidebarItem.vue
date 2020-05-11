<template>
  <div class="sidebar" style="width:140px;border:none;">
    <nav class="sidebar-nav"  style="width:140px">
      <ul class="nav">
        <template v-for="item in routes" >
            <router-link tag="li"  class="nav-item nav-dropdown"   v-if="!item.hidden&&item.children&&item.children.length>0" :to="item.path+''+item.children[0].path" disabled>
                <div class="nav-link nav-dropdown-toggle rr" @click="handleClick"  style="">
                  <img :src="'static/img/right/' + item.icon" style="margin-left:15px;margin-right:18px;margin-bottom:5px;width:16px;height:16px;" color="white"/>
                  {{ item.name}}  
                </div>
                <ul class="nav-dropdown-items" >
                  <li class="nav-item" v-for="child in item.children" :key="child" v-if='!child.hidden' @click="addActive" >
                    <!-- <router-link :to="child.path+'/'+item.children[0].path" class="nav-link" ><i class="icon-puzzle"></i> {{ child.name}} </router-link> -->
                    <router-link :to="item.path+'/'+child.path+'/'+child.children[0].path" class="nav-link" v-if="!child.hidden&&child.children" ><img :src="'static/img/right/' + item.icon" style="margin:0 15px;width:20px;height:20px;"  color="white" />{{ child.name}} </router-link> 
                    <router-link :to="item.path+'/'+child.path" class="nav-link" v-else="!child.children" >{{ child.name}} </router-link>  
                  </li>
                </ul>
            </router-link>
            <li class="nav-item" v-if="!item.hidden&&!item.children">
              <router-link  :to="item.path" class="nav-link" exact><img :src="'static/img/right/' + item.icon" style="margin-left:15px;margin-right:18px;margin-bottom:5px;width:16px;height:16px;" color="white" />{{ item.name}} </router-link>
            </li>
        </template>
    </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'
var Hub=new Vue();
import Axios from 'axios'
    export default {
      name: 'SidebarItem',
      props: {
        routes: {
          src: Array
        }
      },
      methods: {
            handleClick (e) {
              e.preventDefault()
              e.target.parentElement.classList.toggle('open');
              // if($('.rr').hasClass('hh') == false){
              //   e.target.parentElement.classList.add("hh");
              // }
              
            },
            addActive(e){
               e.preventDefault()
              e.target.parentElement.parentElement.parentElement.classList.add('open')
            },
       
        },
        mounted(){
          
               Hub.$on('change',function(val){console.log(val) })
            
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
     /* a:hover{background:#1B86FF;} */
    .hh{
        background: -webkit-linear-gradient(left, rgba(24,24,30,1) 10%,rgba(0,72,255,0.8)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(left, rgba(24,24,30,1) 10%,rgba(0,72,255,0.8)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(left,rgba(24,24,30,1) 10%,rgba(0,72,255,0.8)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to left, rgba(24,24,30,1) 10%,rgba(0,72,255,0.8)); /* 标准的语法（必须放在最后） */ 
    }
</style>

