<template>
  <div class="container exchange_container">
    <div class="flex1">
      <div class="flex_h_end_center pt_30">
      <div class="address_wrap flex_h_center_center">
        <span class="fStyle_20_ffffff_w600">{{ subAddress(myAddress) }}</span>
        <img src="../../assets/cctExchange/wallet.png" alt="" class="wallet_icon" />
      </div>
    </div>
    <div class="flex_h_start_center mt_30">
      <span class="fStyle_24_BFBFC2">输入{{fromCoin}}</span>
    </div>
    <div class="section mt_20">
      <div class="flex_h_between_center">
        <div class="logo_wrap flex_h_center_center">
          <img :src="require('../../assets/cctExchange/'+fromCoin+'.png')" alt="" :class="[fromCoin == 'CCT' ? 'coin_icon' : 'w_coin_icon']" />
          <span class="fStyle_28_151837_w500">{{fromCoin}}</span>
        </div>
        <div class="">
          <span class="fStyle_24_9C9DAB_500">余额 {{balance}}</span>
          <span class="fStyle_22_0070FF_500 ml_15" @click="getAll">最大</span>
        </div>
      </div>
      <input type="text" class="input fStyle_54_151837_w500 mt_20" placeholder="0.00" v-model="amount"/>
    </div>
    <div class="flex_h_start_center mt_25">
      <img src="../../assets/cctExchange/change.png" alt="" class="change_icon" />
    </div>
    <div class="flex_h_start_center mt_15">
      <span class="fStyle_24_BFBFC2">可兑换{{toCoin}}</span>
    </div>
    <div class="section mt_25">
      <div class="flex_h_between_center">
        <div class="logo_wrap flex_h_center_center">
          <img :src="require('../../assets/cctExchange/'+toCoin+'.png')" alt="" :class="[toCoin == 'CCT' ? 'coin_icon' : 'w_coin_icon']" />
          <span class="fStyle_28_151837_w500">{{toCoin}}</span>
        </div>
      </div>
      <input type="text" class="input fStyle_54_151837_w500 mt_20" placeholder="0.00" v-model="amount"/>
    </div>
    </div>
    
    
    <div class="sure_btn flex_h_center_center mt_100" @click="submit">
      <span class="fStyle_28_ffffff_w500">确定兑换</span>
    </div>
    <van-popup v-model="loadingModel" :close-on-click-overlay="false" round>
       <div class="loading-wrap flex_v_center_center">
         <img src="../../assets/cctExchange/loading.gif" alt="" class="logo_icon">
         <span class="fStyle24_AFB0B2">区块确认中，请等待...</span>
       </div>
     </van-popup>
  </div>
  
</template>

<script>
import {initEth, Decimal} from '../../utils/utils'
import { ethers } from 'ethers';
import { Toast } from 'vant';
import {NORMAL_ABI,WCCT_ABI} from './const'
import Big from "big.js";
export default {
  data() {
    return {
      amount: '',
      balance: 0.00,
      decimal: 8,
      gasPrice: '300',
      show: false,
      loadingModel: false,
      submitflag: false,

      fromCoin: '',
      toCoin: '',

      cctAddress: '0xe8377ecb0f32f0c16025d5cf360d6c9e2ea66adf',
      cctContract: null,
      wcctAddress: '0xd9C7e130cd5a6D1Ecea81423502aFB67A9Be259D',
      wcctContract: null,
    };
  },
  mixins:[initEth, Decimal],
  watch: {
    myAddress() {
      this.initContract()
    },
  },
  created() {
    let {from, to} = this.$route.query;
    this.fromCoin = from;
    this.toCoin = to;
    if (this.myAddress != ''){
      this.initContract()
    }
    this.init();
  },
  methods: {
    async initContract() {
      if(this.cctContract == null){
        this.cctContract = new ethers.Contract(this.cctAddress, NORMAL_ABI, this.signer);
      }
      if(this.wcctContract == null){
        this.wcctContract = new ethers.Contract(this.wcctAddress, WCCT_ABI, this.signer);
      }
      await this.getBalance();
    },
    async init(){
            let _gasPrice = await this.provider.getGasPrice();
      _gasPrice = ethers.utils.formatUnits(_gasPrice, "gwei")
      if (_gasPrice > this.min_gasprice)
      this.min_gasprice = _gasPrice;//如果网络当前矿工费高于预设最小值，使用当前值
    },
    async getBalance() {
      let contract;
      if(this.fromCoin == 'CCT') {
        contract = this.cctContract;
      } else {
        contract = this.wcctContract;
      }
      let [err, balance] = await this.to(contract.balanceOf(this.myAddress))
        this.doResponse(err, balance, 'balance', this.decimal)
    },
    // 全部兑换
    getAll() {
      this.amount = this.balance;
    },
    // 查询授权
    async allowanceContract(amount, callback) {
      let [err2, allowce] = await this.to(
       this.cctContract.allowance(this.myAddress, this.wcctAddress)
      );
      if (err2 == null) {
        let hex = ethers.utils.hexValue(allowce);
        let Value = Big(this.hex2int(hex));
        if (Decimal.sub(Value, amount) < 0) {
          await this.approveContract(callback);
        } else {
          callback();
        }
      } else {
        await this.approveContract(callback);
      }
    },
    // 授权
    async approveContract(callback, amount) {
      let approveAmount = amount != undefined ? amount :
        "1000000000000000000000000000000000000000000000000000000000000000000000000000";
      const gasLimit = await this.getEstimateGas(() =>
        this.cctContract.estimateGas.approve(
          this.wcctAddress,
          approveAmount,
          {
            gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
          }
        )
      );
      let [err, res] = await this.to(
        this.cctContract.approve(this.wcctAddress, approveAmount, {
          gasLimit,
          gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
        })
      );
      if (this.doResponse(err, res)) {
        Toast("权限申请中...");
        this.queryTransation(res.hash, callback);
      } else {
        this.submitFlag = false;
        this.loadingModel = false;
      }
    },
    async exchange() {
      let amount = Decimal.mul(this.amount, ethers.BigNumber.from(10).pow(this.decimal))
      amount = String(amount).split('.')[0]
      this.submitflag = true;
      const gasLimit = await this.getEstimateGas(() =>
        this.wcctContract.estimateGas.depositToken(amount,
          {
            gasPrice: ethers.utils.parseUnits(String(this.gasPrice), 'gwei'),
          },
        ),
      )
      if (gasLimit === 0) {
        return
      }
      const [error, res] = await this.to(this.wcctContract.depositToken(amount, {
        gasLimit,
        gasPrice: ethers.utils.parseUnits(String(this.gasPrice), 'gwei'),
      }))
      if (this.doResponse(error, res)) {
        Toast('提交请求成功，等待区块确认');
        this.queryTransation(res.hash, () => {
          Toast('交易完成!')
          this.submitflag = false;
          this.loadingModel = false;
          this.amount = '';
          this.getBalance();
        })
      } else {
        this.loadingModel = false;
      }
    },
    async withdrawWcct() {
      let amount = Decimal.mul(this.amount, ethers.BigNumber.from(10).pow(this.decimal))
      amount = String(amount).split('.')[0]
      const gasLimit = await this.getEstimateGas(() =>
        this.wcctContract.estimateGas.withdrawToken(amount,
          {
            gasPrice: ethers.utils.parseUnits(String(this.gasPrice), 'gwei'),
          },
        ),
      )
      if (gasLimit === 0) {
        return
      }
      const [error, res] = await this.to(this.wcctContract.withdrawToken(amount, {
        gasLimit,
        gasPrice: ethers.utils.parseUnits(String(this.gasPrice), 'gwei'),
      }))
      if (this.doResponse(error, res)) {
        Toast('提交请求成功，等待区块确认');
        this.queryTransation(res.hash, () => {
          Toast('交易完成!')
          this.submitflag = false;
          this.loadingModel = false;
          this.amount = '';
          this.getBalance();
        })
      } else {
        this.loadingModel = false;
      }
    },
    async submit() {
      if(this.submitflag){
        return;
      }
      if(this.amount == ''){
        Toast('请输入兑换数量')
        return;
      }
      var regFloat = /^([0-9]{1,}[.]?[0-9]*)$/;
      if(!regFloat.test(this.amount)){
        Toast('请输入正确的数量')
        return;
      }
      let amount = Decimal.mul(this.amount, ethers.BigNumber.from(10).pow(this.decimal))
      amount = String(amount).split('.')[0]
      this.submitflag = true;
      this.loadingModel = true;
      if(this.fromCoin == 'CCT') {
        this.allowanceContract(amount, this.exchange);
      } else {
        this.withdrawWcct();
      }
      
      
    }
  },
};
</script>

<style lang="scss">
@import './common.scss';
.exchange_container{
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  .address_wrap{
    background-color: #2E324E;
    border-radius: 28px;
    padding: 10px 25px;
  }
  .logo_wrap{
    .logo_icon{
      width: 50px;
      height: 45px;
      margin-right: 18px;
    }
    .coin_icon{
      width: 45px;
      height: 45px;
      margin-right: 18px;
    }
    .w_coin_icon{
      width: 51px;
      height: 45px;
      margin-right: 18px;
    }
  }
  .wallet_icon{
    width: 27px;
    height: 23px;
    margin-left: 20px;
  }
  .history_icon{
    width: 30px;
    height: 30px;
  }
  .change_icon{
    width: 20px;
    height: 25px;
  }
  .section{
    width: 100%;
    padding: 25px 32px;
    background-color: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    .input{
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
  .sure_btn{
    width: 100%;
    height: 128px;
    border-radius: 10px;
    background-color: #151837;
  }
  .exchange_container{
    padding-top: 90px;
    padding-bottom: 50px;
    padding-left: 80px;
    padding-right: 80px;
    box-sizing: border-box;
    width: calc(100vw - 160px);
    .exchange_icon{
      width: 130px;
      height: 130px;
      margin-bottom: 20px;
    }
    .arrow_down_icon{
      width: 20px;
      height: 25px;
      margin-right: 25px;
    }
    .submit_btn{
      width: 100%;
      height: 100px;
      border-radius: 10px;
      background-color: #0070FF;
    }
  }
  .loading-wrap{
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 20px;
    img{
      width: 40%;
      border-radius: 10px;
    }
  }
}
</style>