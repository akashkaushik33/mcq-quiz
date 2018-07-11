<template>
  <div class="main">
    <h3 class="ml-1">{{msg}}</h3>
    <div class="row">
      <div class="mr-5 col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
        <div class="ml-5 align-middle xs-elevation-5 sm-elevation-5 md-elevation-5 lg-elevation-5">
          <form @submit.prevent="login(form)" class="">
            <md-card class="md-layout-item">
              <md-card-header>
                <div class="md-title">Login</div>
              </md-card-header>

              <md-card-content>
                <div class="">
                  <md-field  >
                    <label>Enter your email</label>
                    <md-input v-model="form.email" required ></md-input>
                    <span class="md-error">Enter valid email</span>
                  </md-field>
                  <md-field>
                    <label>Enter your password</label>
                    <md-input type= "password" v-model="form.password"></md-input>
                  </md-field>
                </div>

              </md-card-content>

              <md-card-actions>
                <md-button type="submit" class="md-primary">Login</md-button>
              </md-card-actions>
            </md-card>           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      msg: "Welcome to Quiz App",
      form: {},
      email: "",
      password: "",
      radio: 'false',
      user: {
        email: "akashkaushik33@gmail.com",
        password: "123456"
      }
    };
  },
  methods : {
    login(form) {
      console.log('EVENT')
      form.email.toLowerCase()
      if (form.email === this.user.email & form.password === this.user.password) {
        sessionStorage.setItem('status', 'conncted')
        sessionStorage.setItem('loggedInWith', 'credentials')
        this.$router.push({name : 'home'})
      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
h3 {
  font-weight: normal;
  color: rgb(71, 69, 69);
}
/* ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: none;
} */
</style>
