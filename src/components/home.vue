<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- Dialog box with instruction which appears when we first land on this component -->
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Instructions</md-dialog-title>
          
            <md-dialog-content>        
              <ol>
                <li>There are three sections in this quiz.</li>
                <p> a) Electricity <br> b) Magnetism <br> c) Physics</p>

                <li>Each section contains four questions.</li>
                <li>Question are grouped together in one single page</li>
                <li>All questions are mandatory.</li>
                <li>There is a time limit of 30 minutes to complete the test.</li>
                <li>A timer is placed on the left bottom to indicate the remaining time</li>
                <li>
                  When the timer hits 0, your responses will be automatically submitted and evaluate.
                  But if you finished it before 30 minutes, you can click on the submit button below last question to register your responses.
                </li>
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

      <!-- Looping over mcq and their respective options to render questions and responses -->
      <div v-if="!showDialog && !testCompleted && loaded">
        <!-- Timer -->
        <h6>{{timer}} (in mm:ss)</h6>
        <!-- rendering questions -->
        <md-card md-with-hover class="mt-5"  v-for="(item, indexQ) in mcq" :key="indexQ">
          <md-card-header >
            <h5  >Question {{indexQ+1}} </h5>
          </md-card-header>

          <md-card-content class="ml-auto">
            <h5 class="">{{item.question}}</h5>
            <!-- rendering options for questions and taking response based on user click -->
            <md-radio @change="getResponse(option.name, item, indexQ)" class="md-primary text-center ml-auto " v-for="(option, indexA) in item.options" v-model="responses[indexQ]" :value="option.name" :key="indexA"> {{option.value}} </md-radio>
          </md-card-content>

        </md-card>
        <md-button class="m-5 md-raised md-primary" @click="calculateScore">Submit</md-button>
      </div>

      <!-- Loader is shown when user has clicked on the close button in instruction dialog box but ajax request is still not resolved -->
      <div v-if="!loaded && !showDialog" class="loader">
        <md-progress-spinner  class="align-middle spinner"  :md-diameter="70" :md-stroke="7" md-mode="indeterminate"></md-progress-spinner>
      </div>

      <!-- child component for creating graph based on user score -->
      <md-card v-if="testCompleted" class="mt-5" >
        <scoreChart :score="score" :type="type" ></scoreChart>
      </md-card>

      <!-- buttons for downloading ang toggling graph once user has finished test -->
      <md-button v-if="testCompleted" class="md-raised md-primary mb-5 mt-2" @click="changeGraph">Toggle Graph</md-button>
      <md-button v-if="testCompleted" class="md-raised md-primary mb-5 ml-2 mt-2" @click="downloadGraph">Download Graph</md-button>
      
      <!-- Logout button -->
      <md-button @click="logout" class="md-primary md-raised" style="position:absolute; top:0px; right:0px">Logout</md-button>
    </div>    

  </div>
</template>

<script>
import dataService from '@/services/get-mcq'
import Chart from 'chart.js'
import moment from 'moment'
import scoreChart from './score_chart'

export default {
  name: 'home',
  
  mixins: [dataService],
  components: {
    scoreChart
  },
  data () {
    return {
      showDialog: true,
      testCompleted: false,
      loaded: false,
      mcq: [],
      type: 'pie',
      responses: [],
      answerKey: [],
      userSubmission: [],
      timer: "",
      score: {
        count: 0,
      }
    }
  },
  watch: {
    // watch if user has closed the instruction dialog box to start timer
    showDialog () {
      if (this.showDialog === false) {
        this.setTimer()
      }
    }
  },
  methods: {
    // fucntion to logging user out
    logout() {
      // checking logged in medium and redirecting user to login page based on that
      // also clearning out user session 
      if (sessionStorage.loggedInBy === 'facebook') {
        FB.logout( (res) => {
          sessionStorage.clear()
          this.$router.push({name: 'login'})
        })
      } else {
        // user is logged in with email and password 
        sessionStorage.clear()
        window.location.href = window.location.origin
      }
    },

    // function to create timer for test 
    setTimer() {
      // getting unix timestamp 1 minute from now 
      let endTimestamp = moment().add(1, 'minutes').unix()
      // setting interval to update the timer every one second
      this.interval = setInterval( () => {
        let difference = endTimestamp - (moment().unix())

        // calculating remaining minutes and seconds
        let minutes = Math.floor(difference / 60)
        minutes = minutes > 10 ? minutes : '0'+minutes

        let seconds = difference - (minutes*60)
        seconds = seconds > 10 ? seconds : '0'+seconds
        
        // value that will be displayed on top of test screen
        this.timer = minutes + ':'+ seconds

        // calling calculate score when the timer hits zero and clearing out interval
        if (difference < 0) {
          clearInterval(this.interval)
          this.calculateScore()
        }
      }, 1000) 
    },
    // toggling graph type between pie an bar
    changeGraph () {
      this.type = this.type === 'pie' ? 'bar' : 'pie'
    },

    // fucntion to create a download link from canvas chart
    downloadGraph() {
      // creating data url for downloading chart
      let canvas = document.getElementById('myChart')
      let fullQualityUrl = canvas.toDataURL('image/jpeg', 1.0);
      let fileName = 'testResult.jpeg'
      // dynamically creating <a> tag with download attribute for downloading image 
      let element = document.createElement('a')
      element.setAttribute('href', fullQualityUrl);
      element.setAttribute('download', fileName);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      // deleting above created a tag
      document.body.removeChild(element);

    },

    // function for getting required fields along response from radio button click
    getResponse(answer, item, index) {
      this.userSubmission[index] = {
        'id': item.id,
        'section': item.section,
        'answer': answer.toUpperCase()
      }
    },
    
    // function to calculating score
    calculateScore () {
      // sorting answer key and user submission by their id
      this.userSubmission.sort( (a, b) => {
        return a.id - b.id
      })
      this.answerKey.sort( (a, b) => {
        return a.id - b.id
      })

      // calculating score here
      this.answerKey.map( (item, index) => {
        // creating section keys to calculate score section wise
        if (!this.score.hasOwnProperty(item.section)) {
          this.score[item.section] = 0
        }
        // calculating total score and section wise score
        if (item.answer === this.userSubmission[index].answer) {
          this.score.count++
          this.score[item.section] += 1
        }
      })
      // creating key to get the total number of answers 
      this.score.total = this.answerKey.length
      // emptying responses and user submission
      this.responses = new Array(this.responses.length).fill("")
      this.userSubmission = new Array(this.userSubmission.length).fill({})

      this.testCompleted = true
      // clearnig out interval if any
      clearInterval(this.interval)
    },

  },
  
  created() {
    // calling get data method of mcq-service 
    this.getData().then(res => {
      this.loaded = true
      this.mcq = res.data.mcq
      // creating two seperate arrays for for user response and to get requied values based on user click
      // we created two of them because radio input is not able to provide objects as their values 
      this.responses = new Array(this.mcq.length).fill("")
      this.userSubmission = new Array(this.mcq.length).fill({})
      
      // creating answer key 
      this.mcq.map( (item) => {
        this.answerKey.push({
          'answer': item.answer,
          'section': item.section,
          'id': item.id
        })
      })
    })
  },
  // checking user status to see if he is loged in or not and routing him o login screen based on that
  beforeCreate() {
    if (sessionStorage.status === 'disconnected') {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss">
// @import '../main.scss';
body {
  background: linear-gradient(to right, #2193b0, #6dd5ed );
}
.logout{
  position: absolute;
  top: 0px;
  right: 0px;
}
.spinner {
  position: absolute;
  top:15em;
}
.loader {
   z-index: 3;
  background: rgba(255,255,255,0.3);
}
.toggle{
  position: absolute;
  bottom: 0px;
  right: 0px;
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
