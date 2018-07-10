const axios = require('axios')

//  export default async function getData() {
//     let data = await dataaxios.get('https://script.google.com/macros/s/AKfycbybd1BYv3ebCizVI5vwzDzA1MPFN27hExlralO2-5gFz-QgLXLH/exec')
//     console.log('DATA', data)

//   }

  const dataService = {
    methods: {
      getData: function() {
        var data =  axios.get('https://script.google.com/macros/s/AKfycbybd1BYv3ebCizVI5vwzDzA1MPFN27hExlralO2-5gFz-QgLXLH/exec')
        .then((response) => {
          console.log("RS", response)
          return response
        })
        return data
      }
    }
  }

  export default dataService