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

        console.log('scoreeeeeeeeeeee',this.score)
        const ctx = document.getElementById("myChart");
        // let context = ctx.getContext('2d')
        // context.font="14px";
        // context.fillStyle = "black";
        // context.textAlign = "right";
        // context.fillText("Total score :" + this.score.total , ctx.width/2, ctx.height/2);
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
                    // autoSkipPadding: data.graphType == "TIME" ? 40 : 0
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
                  // gridLines: {
                  //   display: false
                  // },

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
            // events: false,
            // tooltips: {
            //     enabled: false
            // },
            // hover: {
            //     animationDuration: 0
            // },
            responsive: true,
            // animation: {
            //   duration: 1,
            //   onComplete: function () {
            //       var chartInstance = this.chart,
            //           ctx = chartInstance.ctx;
            //       ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            //       ctx.textAlign = 'center';
            //       ctx.textBaseline = 'bottom';

            //       this.data.datasets.forEach(function (dataset, i) {
            //           var meta = chartInstance.controller.getDatasetMeta(i);
            //           meta.data.forEach(function (bar, index) {
            //               var data = dataset.data[index];                            
            //               ctx.fillText(data, bar._model.x, bar._model.y - 5);
            //           });
            //       });
            //   }
            // }
            // maintainAspectRatio: true
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