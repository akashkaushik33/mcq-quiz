<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>Instructions</md-dialog-title>
        
           <md-dialog-content >        
            <ol>
              <li>There are three sections in this quiz.</li>
              <p> a) Electricity <br> b) Magnetism <br> c) Physics</p>

              <li>Each section contains four questions.</li>
              <li>All questions are mandatory.</li>
              <li>There is a time limit of 30 minutes to complete the test.</li>
              <li>A timer is placed on the left bottom to indicate the remaining time</li>
              <li>When the timer hits 0, your responses will be automatically submitted and evaluated.</li>
              <li>When you press close button on the bottom right, the test will start.</li>
              <br>
              <h5 class="mt-2 text-center">Good Luck!!</h5>
            </ol>
          </md-dialog-content>


          <md-dialog-actions>
            <md-button class="md-primary md-raised" @click="showDialog = false">Close</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>
    </div>

    <div v-if="!showDialog">
      <md-card md-with-hover class="mt-5"  v-for="(item, indexQ) in mcq" :key="indexQ">
        <md-card-header>
        <h4 class="" >Question {{indexQ+1}} </h4>

        </md-card-header>
        <md-card-content>
          <h5>{{item.question}}</h5>
        <md-radio @change="getResponse(option.name, item, indexQ)" class="md-primary" v-for="(option, indexA) in item.options" v-model="responses[indexQ]" :value="option.name" :key="indexA"> {{option.value}} </md-radio>
        </md-card-content>
      </md-card>
      <md-button class="m-5 md-raised md-primary" @click="calculateScore">Submit</md-button>
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
      showDialog: true,
      mcq: [],
      responses: [],
      answerKey: [],
      userSubmission: [],
      score: {
        count: 0,
      }
    }
  },
  methods: {
    getResponse(answer, item, index) {
      console.log('this.responses', this.responses)
      console.log('index', index)
      console.log('item', item)
      this.userSubmission[index] = {
        'id': item.id,
        'section': item.section,
        'answer': answer.toUpperCase()
      }
      console.log('this.userSubmission', this.userSubmission)
    },
    calculateScore () {
      this.userSubmission.sort( (a, b) => {
        return a.id - b.id
      })
      this.answerKey.sort( (a, b) => {
        return a.id - b.id
      })

      this.answerKey.map( (item, index) => {
        if (!this.score.hasOwnProperty(item.section)) {
          this.score[item.section] = 0
        }
        if (item.answer === this.userSubmission[index].answer) {
          this.score.count++
          this.score[item.section] += 1
        }
      })

      console.log('Score', this.score)
      this.responses = new Array(this.responses.length).fill("")
      this.userSubmission = new Array(this.userSubmission.length).fill({})
      
    },

  },
  
  created() {
    this.getData().then(res => {
      this.mcq = res.data.mcq
      console.log(this.mcq.length)
      this.responses = new Array(this.mcq.length).fill("")
      this.userSubmission = new Array(this.mcq.length).fill({})
      this.mcq.map( (item) => {
        this.answerKey.push({
          'answer': item.answer,
          'section': item.section,
          'id': item.id
        })
      })
      console.log(this.answerKey )
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ropa+Sans');
body {
  background: linear-gradient(to right, #2193b0, #6dd5ed );
// font-family: 'Ropa Sans', sans-serif;
}
.md-card.md-theme-default {
  opacity: 0.9;
  border-radius: 10px;
}
h1 {
  font-weight: normal;
}
h4 h5 {
  color: #444444
}
a {
  color: #42b983;
  text-decoration: none
}
</style>
