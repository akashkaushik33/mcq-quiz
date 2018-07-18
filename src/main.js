// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// importing bootstrap and material 
import BootstrapVue from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' 

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// registering bootstrap and material here to access them inside our app
Vue.use(VueMaterial) 
Vue.use(BootstrapVue)

// to disbale vue warnings in production mode
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app-quiz',
  router,
  components: { App },
  template: '<App/>'
})
