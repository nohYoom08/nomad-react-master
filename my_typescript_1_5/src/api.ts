import axios from 'axios';

const BASEURL = 'https://api.coinpaprika.com/v1';

export function fetchCoins(){
    return fetch(`${BASEURL}/coins`)
        .then(response=>response.json());
}

export function fetchInfo(coinId:string|undefined){
    return fetch(`${BASEURL}/coins/${coinId}`)
        .then(response=>response.json());
}

export function fetchPrice(coinId:string|undefined){
    return fetch(`${BASEURL}/tickers/${coinId}`)
        .then(response=>response.json());
}

export function fetchCoinHistory(coinId:string|undefined){
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate-60*60*24*7;
    return axios.get(`https://ohlcv-api.nomadcoders.workers.dev`,
    //coinpaprika가 유료로 전환됨에 따라 니코's api로 전환
    {params:{
        coinId:coinId,
    }})
        .then(response=>response.data)
        .catch(error=>console.log(error));
} 