<template>
  <div class="home">
    <div class="tabs">
      <span :class="{active:activeName == 'first'}" @click="activeName = 'first'">验证</span>
      <span :class="{active:activeName == 'second'}" @click="activeName = 'second'">签名</span>
    </div>
    <div v-show="activeName == 'first'">
      <VerifyMessage/>
    </div>
    <div v-show="activeName == 'second'">
      <SignMessage/>
    </div>
  </div>
</template>

<script>
import VerifyMessage from './VerifyMessage'
import SignMessage from './SignMessage'
export default {
  name: "Home",
  data() {
    return {
      activeName: "first",
    };
  },
  components: {
    VerifyMessage,
    SignMessage
  },
};
</script>
<style lang="scss" scoped>
.home {
  max-width: 1200Px;
  margin: 0 auto;
  padding-top: 50px;
}
.tabs{
  text-align: left;
  padding: 15px;
  span{
    height: 80px;
    line-height: 80px;
    margin-right: 40px;
    position: relative;
    display: inline-block;
    padding: 2px 0;
    cursor: pointer;
    &.active{
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        height: 4px;
        left: 0;
        width: 100%;
        background: #409EFF;
        transition: .3s;
      }
    }
    
  }
}
</style>
