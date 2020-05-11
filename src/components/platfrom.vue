<template>
<div>
    <header class="header">
        <Button type="info" class="go">返回监控平台</Button>
	
        <ul class="nav navbar-nav d-md-down-none">
        <li class="nav-item header-item">
          <router-link tag="div" to='' class="nav-link">
            <!-- <p><Icon type="compose" size='30' color="#2d8cf0"></Icon></p> -->
            <p  style="color:black"> 留言管理 </p>
        </router-link> 
        </li>
        <li class="nav-item header-item"> 
            <router-link tag="div" to='' class="nav-link">
                <!-- <p><Icon type="stats-bars" size='30' color="#2d8cf0"></Icon></p> -->
                <p style="color:black"> 浏览排行 </p>
            </router-link> 
        </li>
        <li class="nav-item header-item">
        <!--   -->

        <Dropdown>
      <router-link tag="div" to='' class="nav-link">
            <!-- <p><Icon type="android-cloud" size='30' color="#2d8cf0"></Icon></p> -->
            <p  style="color:black"> 云服务器 </p>
        </router-link>
        <DropdownMenu slot="list">
            <DropdownItem>Linux</DropdownItem>
            <DropdownItem>Mac OS X</DropdownItem>
            <DropdownItem>Windows</DropdownItem>
            
            <DropdownItem>Core OS</DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </li>
        <li class="nav-item header-item">
         <router-link tag="div" to='' class="nav-link">
            <!-- <p><Icon type="trophy" size='30' color="#2d8cf0"></Icon></p> -->
            <p  style="color:black"> 销量排行 </p>
        </router-link> 
      </li>
    </ul>
    </header>
</div>
  
</template>
<style scoped>
    .header {
	width: 100%;
	height: 80px;
	background-color: skyblue;
	position: relative;
}
.go {
	width: 150px;
	height: 40px;
	position: absolute;
	right: 200px;
	bottom: 15px;

}
navbar-nav {
   display: inline-block;
}
</style>
<script>
export default {
  name:'platfrom',
  mounted(){
      return {}
  }
}
</script>

