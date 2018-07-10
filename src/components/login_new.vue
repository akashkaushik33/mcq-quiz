<template>
  <div class="login-wrap">
    <div class="login-html">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="InputGroup1"
                      label="Email address:"
                      label-for="Input1">
          <b-form-input id="Input1"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="InputGroup2"
                      label="Password:"
                      label-for="Input2">
          <b-form-input id="Input2"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter name">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
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
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = ''
      this.form.password = ''
      /* Trick to reset/clear native browser form validation state */
      // this.show = false;
      // this.$nextTick(() => { this.show = true });
    }
  }
}
</script>
<style>
.col-form-label{
  float:left;
  color:white
}
body{
	margin:0;
	color:#6a6f8c;
	background:#c8c8c8;
	font:600 16px/18px 'Open Sans',sans-serif;
}
*,:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none}

.login-wrap{
	width:100%;
	margin:auto;
	max-width:525px;
  min-height:320px;
  margin-top:100px;
	position:relative;
	background: no-repeat center;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	padding:90px 70px 50px 70px;
	background:#2c3e50;
}
</style>


