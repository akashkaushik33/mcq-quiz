<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <div class="md-title">Login</div>
      </div>
      <div class="mb-2">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="form.email" autofocus></md-input>
        </md-field>

        <md-field>
          <label>Password</label>
          <md-input v-model="form.password" type="password"></md-input>
        </md-field>        
        <md-button type="submit" @click="login" class="md-primary mt-2 md-raised">Submit</md-button>
      </div>
      <div class="md-title"><hr/>Or</div>
      <div class="fb-login-button" onlogin="checkLoginState()" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
    
    </md-content>
    
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      user: {
        email: "akashkaushik33@gmail.com",
        password: "123456"
      }
    }
  },
  methods: {
    login() {
      console.log('EVENT')
      this.form.email.toLowerCase()
      if (this.form.email === this.user.email & this.form.password === this.user.password) {
        sessionStorage.setItem('status', 'connected')
        this.$router.push({name : 'home'})
        this.form = {}
      } 
    },
  },
  mounted(){
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=1767336439980544&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      console.log('MOUNT')
  }
}
</script>
<style lang="scss">
@import '../main.scss';
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: left;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .fb-login-button{
    margin-top:10px;
  }

  .md-elevation-3{
    background-color: white;
    border-radius: 10px;

  }
}
</style>