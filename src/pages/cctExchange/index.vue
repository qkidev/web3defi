<template>
  <div class="container flex_v_start_center home_container pt_50">
    <img src="../../assets/cctExchange/logo.png" alt="" class="logo"/>
    <div class="section flex_h_center_center mt_45">
      <div class="flex1 flex_v_center_start">
        <span class="fStyle_22_6B6E83">CCT 可用余额</span>
        <span class="fStyle_28_ffffff_w500 mt_10">{{cctBalance}}</span>
      </div>
       <div class="flex1 flex_v_center_start">
        <span class="fStyle_22_6B6E83">WCCT 可用余额</span>
        <span class="fStyle_28_ffffff_w500 mt_10">{{wcctBalance}}</span>
      </div>
    </div>
    <div class="flex_h_between_center  mt_45" >
      <div class="flex_v_center_center entry_item flex1" @click="goto('exchange', 'CCT', 'WCCT')">
        <img src="../../assets/cctExchange/cTow.png" alt="" class="icon"/>
        <span class="fStyle_24_363F6A_w500">CCT转WCCT</span>
      </div>
      <div class="flex_v_center_center entry_item flex1 ml_50" @click="goto('exchange', 'WCCT', 'CCT')">
        <img src="../../assets/cctExchange/wToc.png" alt="" class="icon"/>
        <span class="fStyle_24_363F6A_w500">WCCT转CCT</span>
      </div>
      <div class="flex_v_center_center entry_item flex1 ml_50" @click="goto('cctExchangeDesc')">
        <img src="../../assets/cctExchange/intro.png" alt="" class="icon"/>
        <span class="fStyle_24_363F6A_w500">WCCT说明</span>
      </div>
    </div>
  </div> 
</template>

<script>
import { ethers } from 'ethers';
import {NORMAL_ABI, WCCT_ABI} from './const'
import {initEth} from '../../utils/utils'
export default {
  data() {
    return {
      cctBalance: '0.00',
      wcctBalance: '0.00',
      cctAddress: '0xe8377ecb0f32f0c16025d5cf360d6c9e2ea66adf',
      cctContract: null,
      wcctAddress: '0xd9C7e130cd5a6D1Ecea81423502aFB67A9Be259D',
      wcctContract: null,
      decimal: 8
    }
  },
  watch: {
    myAddress() {
      this.initContract();
    }
  },
  created() {
    if(this.myAddress != ''){
      this.initContract();
    }
  },
  mixins:[initEth],
  methods: {
    async initContract() {
      this.cctContract = new ethers.Contract(this.cctAddress, NORMAL_ABI, this.signer);
      let [, cctDecimal] = await this.to(this.cctContract.decimals())
      let [err, balance] = await this.to(this.cctContract.balanceOf(this.myAddress))
      this.doResponse(err, balance, 'cctBalance', cctDecimal)
      // wcct
      this.wcctContract = new ethers.Contract(this.wcctAddress, WCCT_ABI, this.signer);
      // let [, wcctDecimal] = await this.to(this.$root.wcctContract.decimals())
      let [err2, balance2] = await this.to(this.wcctContract.balanceOf(this.myAddress))
      this.doResponse(err2, balance2, 'wcctBalance', cctDecimal)
    },
    goto(routeName, fromCoin, toCoin) {
      if(routeName == 'exchange'){
        this.$router.push({name: 'cctExchange', query: {from: fromCoin, to: toCoin}})
      } else {
        this.$router.push(routeName);
      }
    }
  }
}
</script>

<style lang="scss">
@import './common.scss';
.home_container{
  
  .logo{
    width: 176px;
    height: 245px;
  }
  .icon{
    width: 55px;
    height: 55px;
    margin-bottom: 33px;
  }
  .section{
    padding: 50px 30px;
    background-color: #2E324E;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .entry_item{
    border-radius: 10px;
    background-color: #fff;
    padding-top: 50px;
    padding-bottom: 38px;
  }
}
</style>