const axios = require('axios')

  const dataService = {
    methods: {
      getData: function() {
        var data =  axios.get('https://script.google.com/macros/s/AKfycbybd1BYv3ebCizVI5vwzDzA1MPFN27hExlralO2-5gFz-QgLXLH/exec')
        .then((response) => {
          return response
        })
        return data
      }
    }
  }

  export default dataService