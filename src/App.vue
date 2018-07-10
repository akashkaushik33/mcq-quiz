<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log('FB', FB)
    FB.getLoginStatus( (res) => {
      console.log('RES', res)
      if (res.status === 'connected') {
        this.$router.push({name: 'home'})
      }
    })
  }
}
</script>

<style lang="scss">
// @import 'main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // overflow: auto;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
