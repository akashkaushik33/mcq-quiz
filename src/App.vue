<template>
  <div id="app-quiz">
    <!-- router view to load pages -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    
  },
  created () {
    // function to check wheteher a user is logged in and then redirecting him to home page
    // commented out for now, but needed later

    // if (FB) {
    //   FB.getLoginStatus( (res) => {
    //   console.log('RES', res)
    //   if (res.status === 'connected') {
    //     // sessionStorage.clear()
    //     sessionStorage.setItem('status', 'connected')
    //     sessionStorage.setItem('loggedInWith', 'facebook')
    //     this.$router.push({name: 'home'})
    //   } else {
    //     sessionStorage.setItem('status', 'disconnected')
    //     sessionStorage.setItem('loggedInWith', null)
    //     this.$router.push({name: 'login'})
    //   }
    // })
    // }
    
  }
}
</script>

<style lang="scss">
// @import 'main.scss';
#app-quiz {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // overflow: auto;
  color: #2c3e50;
  // margin-top: 60px;
}

</style>
