<template>
  <div>
    <div class="header flex_h_center">
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
        <div class="bigTxt">最近</div>
        <div class="flex_h_center">
          <div class="minGreyTxt mr_5">全部</div>
          <div class="bg-img goto_bg"></div>
        </div>
      </div>
      <div class="flex_h history">
        <div class="history_item" v-for="(item, index) in history" :key="index" @click="goHref(item.url)">
          <img :src="item.icon" alt="">
          <div class="smallerTxt">{{item.title}}</div>
        </div>
      </div>
      <div class="flex_h_between">
        <div class="bigTxt">推荐</div>
      </div>
      <div class="recomment_list">
        <div class="recomment_list_item flex_h" v-for="(item, index) in recomments" :key="index" @click="goto(item.routeName)">
          <img :src="item.icon" alt="">
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
    this.getHistory();
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
  width: 194px;
  height: 40px;
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
</style>
