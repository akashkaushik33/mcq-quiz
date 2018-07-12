<template>
  <div>
    <!-- Score board -->
    <div class="text-left p-3">
      <p>Total Score: {{score.count}}/{{score.total}}</p>
      <p>Magnetism: {{score.Magnetism}}</p>
      <p>Electricity: {{score.Electricity}}</p>
      <p>Physics: {{score.Physics}}</p>
    </div>
    <div>
      <!-- Rendering chart here -->
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScoreChart',
    props: ['score', 'type'],
    data () {
      return {
        scoreData: [],
        labels: [],
        
      }
    },
    watch: {
      // check if there is any change in chart type from parent component
      // if chart type is changed in parent function then it call createChart function to re-render the chart
      type () {
        this.createChart()
      }
    },
    methods: {
      // funtion to create chart
      createChart() {
        // destroyt the chart instance if exixted
        if (this.chart) {
          this.chart.destroy();
        }
        // 
        const ctx = document.getElementById("myChart");
        
        // Chart plugin to change the background fromm black to white when we download chart as an image
        Chart.plugins.register({
          beforeDraw: function(chartInstance) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
          }
        });

        // creating chart instance to render on canvas element
        this.chart = new Chart(ctx, {
          type: this.type,
          data: {
            labels: this.labels,
            datasets: [{
              data: this.scoreData,
              backgroundColor: ['#f86183', '#37a2eb', '#ffce56']
            }]
          },
          options: {
            scales: {
              xAxes: [
                {
                  type: "category",
                  ticks: {
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false
                  },
                  display: false
                }
              ]
            },
            legend: {
              display: this.type === 'pie' ? true : false,
              position: "bottom",
              // labels: {
              //   boxWidth: 10
              // }
            },
            tooltips: {
              enabled: true,

              mode: "x-axis"
              // callbacks: {
              //   title: function (tooltipItems, data) {

              //     return data.datasets[tooltipItems[0].datasetIndex].label + ;
              //   }
              // }
            },
            responsive: true,
            
          }
        });
      }
    },

    // manipulating data for chart in mounted lifecycle hook
    // this function will be called when this component initialises
    mounted() {
      Object.keys(this.score).forEach( (item) => {
        if (item != 'count'  && item != 'total') {
          this.scoreData.push(this.score[item])
          this.labels.push(item)
        }
      })
      // rendering chart when data manipulation finishes
      this.createChart()
    }
  }
</script>