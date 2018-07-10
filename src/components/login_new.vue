<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <div class="md-title">Login</div>
      </div>
      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="form.email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="form.password" type="password"></md-input>
        </md-field>        
        <md-button type="submit" class="md-primary submit">Submit</md-button>
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
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      sessionStorage.setItem('login','connected')
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = ''
      this.form.password = ''
      /* Trick to reset/clear native browser form validation state */
      // this.show = false;
      // this.$nextTick(() => { this.show = true });
    },
  },
  created(){
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ropa+Sans');
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  font-family: 'Ropa Sans', sans-serif;
  background-color: currentColor;
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
  .form {
    margin-bottom: 60px;
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
  .submit{
    float: left;
    margin-top: -10px;
    margin-left: 114px;
    background-color: #3B5998;
    color: white;
  }
  .md-elevation-3{
    background-color: white;
  }
}
</style>