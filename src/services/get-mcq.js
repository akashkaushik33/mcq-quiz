const axios = require('axios')
  // service to load multiple choice question json data
  const dataService = {
    methods: {
      getData: function() {
        var data =  axios.get('https://script.google.com/macros/s/AKfycbybd1BYv3ebCizVI5vwzDzA1MPFN27hExlralO2-5gFz-QgLXLH/exec')
        .then((response) => {
          // returning from then
          return response
        })
        // returning mcq json data
        return data
      }
    }
  }

  export default dataService