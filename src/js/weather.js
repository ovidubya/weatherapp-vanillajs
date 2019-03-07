export class Weather {
    constructor(apiKey) {
        this.currentAPI = `${location.protocol}//api.apixu.com/v1/current.json?key=${apiKey}`; 
    }
    getCurrentJSON() {
        fetch(this.currentAPI + '&q=Chicago')
        .then(data => data.json())
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
}

