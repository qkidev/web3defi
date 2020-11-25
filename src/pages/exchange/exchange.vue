<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">{{from}}转{{to}}</div>
      <div class="back_bg_placeholder"></div>
    </div>
    
    <div class="padd_40">
      <div class="from_item flex_v">
				<div class="smallerGrey2Txt alignLeft mb_10">输入{{from}}</div>
				<div class="input_wrap flex_h_center">
					<input type="text" placeholder="请输入兑换数量" class="smallestGrey1Txt flex1" v-model="fromAmount"/>
          <div class="hr"></div>
          <div class="smallestGrey1Txt">{{from}}</div>
				</div>
			</div>
     <div class="from_item flex_v">
				<div class="smallerGrey2Txt alignLeft mb_10">可兑换{{to}}</div>
				<div class="input_wrap flex_h_center">
					<input type="text" placeholder="请输入兑换数量" class="smallestGrey1Txt flex1" v-model="toAmount"/>
          <div class="hr"></div>
          <div class="smallestGrey1Txt">{{to}}</div>
				</div>
			</div>
      <div class="submit_btn flex_h_center_center normalInverseTxt" @click="submit" >立即兑换</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      from: '',
      to: '',
      fromAmount: '',
      toAmount: ''
    };
  },
  created() {
    // console.log(this.$route)
    this.from = this.$route.params.from;
    this.to = this.$route.params.to;
  },
  methods: { 
    goBack() {
      this.$router.go(-1);
    },
    submit() {

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
.back_bg, .back_bg_placeholder{
  width: 30px;
  height: 30px;
  background-image: url("../../assets/back.png");
}
.mb_10{
  margin-bottom: 10px;
}
.from_item{
  margin-top: 30px;
}
.input_wrap{
  height: 108px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 33px;
  padding-right: 33px;
}
.input_wrap input{
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: none;
  outline: none;
  // border-radius: 10px;
  // padding-left: 15px;
  // padding-right: 15px;
  box-sizing: border-box;
}
.hr{
  width: 1px;
  height: 42px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: #A9ADC1;
}
.submit_btn{
  background-color: #054DFA;
  height: 128px;
  // color: #ffff;
  // font-size: 16px;
  margin-top: 200px;
  margin-bottom: 30px;
  border-radius: 10px;
}
</style>
