<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
    <!--<router-link to="/login">登入页面</router-link>-->
  </div>
</template>

<script>
import headerDiv from './components/header'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'jquery.pagination/dist/jquery.pagination.css'
import 'jquery.pagination/dist/jquery.pagination'

export default {
  name: 'App',
  components: {
    'headerDiv': headerDiv
  }
}
console.log($('.dropdown'))
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
