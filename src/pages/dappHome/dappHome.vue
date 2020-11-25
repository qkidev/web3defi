<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bigTxt">WQKI</div>
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
export default {
  name: "home",
  data() {
    return {
      balance: '',
      parisBalance: '',
      parisCoinName: '',
      coinName: '',
      grids: []
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.balance = '128374.2048928';
      this.parisBalance = '128374.2048928';
      this.coinName = 'QKI'
      this.parisCoinName = 'WQKI';
      this.grids = [{
          icon: require("../../assets/dappHome/exchange.png"),
          title: "QKI转WQKI",
          routeName: 'exchange',
          coinName: 'QKI',
          parisCoinName: 'WQKI'
        },
        {
          icon: require("../../assets/dappHome/exchange1.png"),
          title: "WQKI转QKI",
          routeName: 'exchange',
          coinName: 'WQKI',
          parisCoinName: 'QKI'
        },
        {
          icon: require("../../assets/dappHome/help.png"),
          title: "WQKI说明"
        }]
    },
    goto(routeName, fromCoin, toCoin) {
      if(routeName == 'exchange'){
        this.$router.push({name: routeName, params: {from: fromCoin, to: toCoin}})
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
