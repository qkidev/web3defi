<template>
  <div class="container pt_50" style="background-color: #fff">
    <div class="header flex_h_center_center">
      <div class="fStyle_54_151837_w500">Wrapped cct(wcct)</div>
    </div>

    <div class="padd_40 mt_20">
      <div class="flex_v_center_start alignLeft" style="line-height: 1.8">
        <span class="fStyle_28_151837_w500">把cct包裹成标准的token，用于交易所兼容</span>
        <span class="fStyle_28_151837_w500">1.cct和wcct双向1:1兑换,免销毁。</span>
        <span class="fStyle_28_151837_w500">2.wcct归集到交易所免销毁，交易转出免销毁，便于交易所接入。</span>
        <span class="fStyle_28_151837_w500">3.日常转账5%销毁不变，wcct发生的销毁，会同步到cct。</span>
      </div>
    </div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './common.scss';
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
