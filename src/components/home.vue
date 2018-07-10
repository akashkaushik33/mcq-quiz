<template>
  <div>
    <md-dialog  :md-active.sync="showDialog">
      <md-dialog-title class="text-center" >Instructions</md-dialog-title>
        
        <md-dialog-content>

          <!-- <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p> -->
        
        <ol>
          <li>
            There are three sections
          </li>
        </ol>
        </md-dialog-content>


      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div class="mt-5" v-if="!showDialog" v-for="(item, index) in mcq" :key="index" >
      <h5>Question {{index+1}}: {{item.question}}</h5>
      <md-radio  @change="getResponse(item, item.a, index)"  :value="false" :id="item.a + index">{{item.a}}</md-radio>
      <md-radio  @change="getResponse(item, item.b, index)"  :value="item.b" :id="item.b + index">{{item.b}}</md-radio>
      <md-radio  @change="getResponse(item, item.c, index)"   :value="item.c" :id="item.c + index">{{item.c}}</md-radio>
      <md-radio  @change="getResponse(item, item.d, index)"  :value="item.d" :id="item.d + index">{{item.d}}</md-radio>
    </div>


  </div>
</template>

<script>
import dataService from "@/services/get-mcq";
export default {
  name: 'home',
  mixins: [dataService],
  data () {
    return {
      showDialog: false,
      mcq: [],
      responses: []
    }
  },
  methods: {
    getResponse(item, response, index) {
      console.log('ITEM', item)
      console.log('response', response)
    }
  },
  created() {
    if(sessionStorage.getItem('login')=='connected')
    { this.showDialog=true
      this.getData().then(data => {
      this.mcq = data.data.user
      console.log(this.mcq)
    })
    }
  }
}
</script>

<style lang="scss">
h1 {
  font-weight: normal;
}
a {
  color: #42b983;
  text-decoration: none
}
</style>
