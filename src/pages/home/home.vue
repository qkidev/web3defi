<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img logo_bg"></div>
    </div>
    <div class="padd_40">
      <div class="swiper_wrap">
        <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in banners" :key="index" class="swiper_item">
            <img :src="item.icon" alt mode="aspectFit" />
            <div class="img_desc">
              <div class="smallerInverseTxt ellipsis alignLeft">{{item.title}}</div>
              <div class="minestInverseTxt ellipsis alignLeft">{{item.desc}}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="flex_h_between">
        <div class="bigTxt">推荐</div>
      </div>
      <div class="recomment_list">
        <div class="recomment_list_item flex_h" v-for="(item, index) in recomments" :key="index" @click="goto(item.routeName)">
          <img :src="item.icon" alt="" :class="[item.routeName == 'dappHome' ? 'dapp_icon' : (item.routeName)+'_dapp_icon' ]">
          <div class="flex1 flex_v ellipsis">
            <div class="smallerGrey2Txt ellipsis alignLeft">{{item.title}}</div>
            <div class="minestGrey1Txt ellipsis alignLeft">{{item.desc}}</div>
          </div>
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
      banners: [],
      history: [],
      recomments: []
    };
  },
  created() {
    this.getBanner();
    this.getRecomments();
  },
  methods: {
    getBanner() {
      this.banners = [
        {
          icon: require("../../assets/temp/banner1.png"),
          title: "WQKI",
          desc: "全称Wrapped QKI，Wrapped QKI是一个智能合约"
        }
      ];
    },
    getHistory() {
      this.history = [
        {
          icon: require("../../assets/temp/history.png"),
          title: "QKSWAP",
          url: 'https://app.qkswap.io/'
        },
        {
          icon: require("../../assets/temp/history.png"),
          title: "Qscout",
          url: 'https://quarkscout.com/'
        },
        {
          icon: require("../../assets/temp/history.png"),
          title: "Uniswap",
          url: 'https://app.uniswap.org/#/swap'
        }
      ];
    },
    getRecomments() {
      this.recomments = [
        {
          icon: require("../../assets/temp/1.png"),
          title: "WQKI",
          desc: "全称Wrapped QKI，Wrapped QKI是一个智能合约",
          routeName: 'dappHome'
        },
        {
          icon: require("../../assets/temp/2.png"),
          title: "一键发布通证",
          desc: "输入通证总量、通证名称、通证精度，通证缩写即可发布",
          routeName: 'token'
        },
        {
          icon: require("../../assets/temp/3.png"),
          title: "超级节点",
          desc: "基于合约部署的超级节点管理工具",
          routeName: 'superNode'
        },
        {
          icon: require("../../assets/temp/4.jpg"),
          title: "超级节点2.0",
          desc: "基于合约部署的超级节点管理工具",
          routeName: 'superNode2'
        },
        {
          icon: require("../../assets/temp/5.png"),
          title: "pizza空投",
          desc: "持有qki3y用户可以免费领取1万pi空投",
          routeName: 'pizzaAirdrop'
        },
        {
          icon: require("../../assets/temp/6.png"),
          title: "签名&验证信息",
          desc: "轻松验证/签名任何信息",
          routeName: 'signature'
        },
        {
          icon: require("../../assets/temp/7.png"),
          title: "CCT消耗",
          desc: "流通销毁CCT数量",
          routeName: 'totalBurn'
        },
        {
          icon: require("../../assets/temp/8.png"),
          title: "WCCT",
          desc: "把cct包裹成标准的token，用于交易所兼容",
          routeName: 'cctExchangeHome'
        },
        {
          icon: require("../../assets/temp/9.png"),
          title: "一站到底",
          desc: "擂台守卫一站到底",
          routeName: 'guard'
        }
      ];
    },
    goto(routeName){
      this.$router.push(routeName);
    },
    goHref(url){
      window.location.href = url;
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
.logo_bg {
  width: 114px;
  height: 75px;
  background-image: url("../../assets/home/logo.png");
}
.swiper_wrap {
  margin-top: 40px;
  margin-bottom: 40px;
  // width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  // background-color: red;
}
.swiper_wrap .swiper {
  height: 300px;
}
.swiper_wrap img,
.swiper_wrap .swiper_item {
  height: 300px;
  width: 100%;
  position: relative;
}
.img_desc {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0;
  padding-left: 45px;
  padding-right: 45px;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 20px;
  padding-bottom: 20px;
  z-index: 1;
}
.van-swipe__indicators {
  bottom: 120px !important;
}
.goto_bg {
  width: 9px;
  height: 16px;
  background-image: url("../../assets/home/goto.png");
}
.mr_5 {
  margin-right: 5px;
}
.history{
  margin-top: 20px;
  margin-bottom: 50px;
}
.history_item{
  margin-right: 40px;
}
.history_item:last-child{
  margin-right: 0px;
}
.history_item img{
  width: 120px;
  height: 120px;
  margin-bottom: 0px;
}
.recomment_list{
  margin-top: 30px
}
.recomment_list_item{
  background-color: #fff;
  margin-bottom: 30px;
  padding: 40px;
  border-radius: 10px;
}
.recomment_list_item img{
  width: 80px;
  height: 80px;
  margin-right: 50px;
}
.recomment_list_item .dapp_icon{
  width: 80px;
  height: 70px;
}
.recomment_list_item .superNode_dapp_icon{
  width: 80px;
  height: 86px;
}
.recomment_list_item .pizzaAirdrop_dapp_icon{
  width: 80px;
  height: 63px;
}
.recomment_list_item .signature_dapp_icon, .cctExchangeHome_dapp_icon{
  width: 80px;
  height: 86px;
}

</style>
