import axios from 'axios';

class ApiCmc {
    url: string = 'https://pro-api.coinmarketcap.com/v1/';
    constructor(url: string){
        this.url += url
    }
    async get(){
        const resp = await axios.get(this.url, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.API_CMC_KEY
            }
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.error(error)
        })
        return resp
    }
}

class ApiFootball {
    url: string = 'https://api-football-v1.p.rapidapi.com/v3/';
    // constructor(url: string){
    //     this.url += url
    // }
    async get(url:string, params?: any){
        const resp = await axios.get(this.url + url, {
            headers: {
                "x-rapidapi-key": process.env.API_FOO_KEY,
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "useQueryString": true
            },
            params: params
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.error(error)
        })
        return resp
    }
}

const ApiFutbol = new ApiFootball()

export {
    ApiCmc,
    ApiFutbol
}

  