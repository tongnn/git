<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <!-- <breadcrumb style="margin-bottom: 0;" :list="list"/> -->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside/> -->
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
// import AppAside from '../components/Aside'
// import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    // AppAside,
    // Breadcrumb
  },
  computed: {
    name () {
      return this.$route.name
    },

    list () {
      return this.$route.matched
    }
  }
}
</script>
<style scoped>
  .main .container-fluid{padding:0 0px;}
  a{font-size:14px;}
</style>
