<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">WQKI说明</div>
      <div class="back_bg_placeholder"></div>
    </div>

    <div class="padd_40">
      <div class="bigTxt alignLeft mt_50 indent">
        一个把qki包装成通证的智能合约，qki和wqki随时可以通过合约自动免费的1：1进行兑换。
        </div>
        <div class="bigTxt alignLeft mt_20 indent" style="word-break: break-all">
wqki的合约地址是：0x835F6dF988B6f51c9477D49e96aDBbc644ba97a2
        </div>
<div class="bigTxt alignLeft mt_20 indent">
转入qki到合约地址，自动给你生成wqki，调用合约可以把wqki销毁转成qki返回。
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
  
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.mt_20{
  margin-top: 20px;
}
.mt_50{
  margin-top: 50px;
}
.indent{
  text-indent: 2em;
}
</style>
