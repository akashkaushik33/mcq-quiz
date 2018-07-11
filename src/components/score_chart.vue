<template>
  <div>
    <div class="text-left p-3">
      <p>Total Score: {{score.count}}/{{score.total}}</p>
      <p>Magnetism: {{score.Magnetism}}</p>
      <p>Electricity: {{score.Electricity}}</p>
      <p>Physics: {{score.Physics}}</p>
    </div>
    <div>
      <canvas id="myChart">
      </canvas>
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
      type () {
        this.createChart()
      }
    },
    methods: {
      createChart() {
        if (this.chart) {
          this.chart.destroy();
        }
        const ctx = document.getElementById("myChart");

        Chart.plugins.register({
          beforeDraw: function(chartInstance) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
          }
        });

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
    mounted() {
      Object.keys(this.score).forEach( (item) => {
        if (item != 'count'  && item != 'total') {
          this.scoreData.push(this.score[item])
          this.labels.push(item)
        }
      })
      this.createChart()
    }
  }
</script>