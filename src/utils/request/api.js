import { get, post } from './http'

// 领取列表
export const listApi = (params) => get('/airdrop/logs?page='+params.page+'&device='+params.deviceCode+'&is_invite='+params.type);
// 领取空投
export const receiveApi = (params) => post('/airdrop/receive', params);


// eg:::
// import {airdropApi, receiveApi} from '../pathTo/utils/request/api';
// methods:{
//   async getDetail(){
//     let params = {
//       page: 1,
//       deviceCode: 'xxxx',
//       type: 'xxx'
//     }
//     let res = listApi(params);
//     if(res.code == 0) {
//       // doSomething
//     }
//   }
// }