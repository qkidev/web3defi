<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">WQKI</div>
      <div class="back_bg_placeholder"></div>
    </div>
    
    <div class="padd_40">
      <div class="asset_section flex_h">
        <div class="flex1 flex_v">
          <div class="smallestBlueTxt alignLeft mb_5">{{coinName}} 可用余额</div>
          <div class="normalInverseTxt ellipsis alignLeft">{{balance}}</div>
        </div>
        <div class="flex1 flex_v">
          <div class="smallestBlueTxt alignLeft">{{parisCoinName}} 可用余额</div>
          <div class="normalInverseTxt ellipsis alignLeft">{{parisBalance}}</div>
        </div>
      </div>
      <div class="flex_h grids">
        <div class="grids_item" v-for="(item, index) in grids" :key="index" @click="goto(item.routeName, item.coinName, item.parisCoinName)">
          <img :src="item.icon" alt="">
          <div class="smallerTxt">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {initEth} from '@/utils/utils.js'
import { ethers } from 'ethers';
import {abi} from './config';
import { Toast } from "vant";
export default {
  name: "dappHome",
  data() {
    return {
      balance: '',
      parisBalance: '',
      parisCoinName: 'WQKI',
      coinName: 'QKI',
      grids: [],
      contractAddress: '0x835F6dF988B6f51c9477D49e96aDBbc644ba97a2'
    };
  },
   mixins: [initEth],
  created() {
    // this.getDetail();
  },
  mounted() {
    this.getDetail();
    // this.submit();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getDetail() {
      if (window.ethereum.networkVersion != 20181205) {
        Toast('你当前没有使用QKI主网，请切换主网为QKI')
      }
      var contract = new ethers.Contract(this.contractAddress, abi, this.signer);

      this.signer.getAddress().then((address) => {
        // 获取主网qki的余额
        this.provider.getBalance(address).then((balance) => {
          let etherString = ethers.utils.formatEther(balance);
          this.balance = parseFloat(etherString);
        });
        // 获取合约
        contract.balanceOf(address).then((balance) => {
          let etherString = ethers.utils.formatEther(balance);
          this.parisBalance = parseFloat(etherString);
        }, (data) => {
            if (data.code == "INSUFFICIENT_FUNDS") {
              Toast("矿工费不足");
            } else if (data.code == 4001) {
              Toast("用户取消");
            } else {
              Toast("错误代码:" + data.code);
            }
          })        
      });

      this.grids = [{
          icon: require("../../assets/dappHome/exchange.png"),
          title: "QKI转WQKI",
          routeName: 'exchange',
          coinName: 'QKI',
          parisCoinName: 'WQKI',
          contractAddress: this.contractAddress
        },
        {
          icon: require("../../assets/dappHome/exchange1.png"),
          title: "WQKI转QKI",
          routeName: 'exchange',
          coinName: 'WQKI',
          parisCoinName: 'QKI',
          contractAddress: this.contractAddress
        },
        {
          icon: require("../../assets/dappHome/help.png"),
          title: "WQKI说明",
          routeName: 'desc'
        }]
    },

    goto(routeName, fromCoin, toCoin) {
      if(routeName == 'exchange'){
        this.$router.push({name: routeName, params: {from: fromCoin, to: toCoin, contractAddress: this.contractAddress}})
      } else {
        this.$router.push(routeName);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  height: 88px;
  background-color: #fff;
  width: 100%;
  padding-left: 53px;
  padding-right: 53px;
  box-sizing: border-box;
}
.asset_section{
  margin-top: 63px;
  margin-bottom: 50px;
  background-color: #054DFA;
  border-radius: 10px;
  padding: 50px 30px;
}
.mb_5{
  margin-bottom: 5px;
}
.goto_bg {
  width: 9px;
  height: 16px;
  background-image: url("../../assets/home/goto.png");
}
.mr_5 {
  margin-right: 5px;
}
.grids_item{
  width: calc((100% - 100px)/3);
  padding: 50px 25px 40px 25px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 50px;
}
.grids_item:last-child{
  margin-right: 0px;
}
.grids_item img{
  
  width: 52px;
  height: 52px;
  margin-bottom: 33px;
}
</style>
