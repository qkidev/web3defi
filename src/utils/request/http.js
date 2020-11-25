import Axios from 'axios';

let axios = Axios.create({
  baseURL: 'http://qkpay.siru.com/api/',
  timeout: 1000 * 12
});

export function get(url, params){    
  return new Promise((resolve, reject) =>{        
      axios.get(url, {            
          params: params        
      }).then(res => {
          resolve(res.data);
      }).catch(err =>{
          reject(err.data)        
  })    
});}

export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url,params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}
