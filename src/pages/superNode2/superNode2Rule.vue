<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">超级节点规则</div>
      <div class="back_bg_placeholder"></div>
    </div>
    <div class="superNodeRule_container">
    <p>参与规则：</p>
    <p>
      用户在钱包将自己的QKI转入星球池，星球池会竞选成为超级节点，将按比例权重获得每天的全球节点矿工费分红，将开启下列规则：
    </p>
    <p>
      1、第一星球：当QKI在QKSWAP2.0的价格涨至5QUSDT时，用户可自行将星球池中的QKI以及矿工费分红转出星球池到自己钱包。
    </p>
    <p>
      2、第二星球：当QKI在QKSWAP2.0的价格涨至10QUSDT时，用户可自行将星球池中的QKI以及矿工费分红转出星球池到自己钱包。
    </p>
    <p>
      3、第三星球：当QKI在QKSWAP2.0的价格涨至20QUSDT时，用户可自行将星球池中的QKI以及矿工费分红转出星球池到自己钱包。
    </p>
    <p>以此类推</p>
    <p>
      4、第十星球：当QKI在QKSWAP2.0的价格涨至2560QUSDT时，用户可自行将星球池中的QKI以及矿工费分红转出星球池到自己钱包。
    </p>
    <p>
      5、超级星球池：用户还可以将自己钱包内的QKI转入【100QUSDT】的超级星球池，投入超级星球池的QKI将获得2倍的全球节点矿工费分红。
      参与条件：
    </p>
    <p>1.投入QKI没有上下限，可任意数量起投，都能获得相应比例的矿工费分红</p>
    <p>2.投入时间没有限制，第一阶段将同时部署5QUSDT和100QUSDT的星球池。</p>
    <p>3.不需要每个小时领取分红，只要有人领取分红，所有星球池所有地址都能获得分红。</p>
    <p style="color:red">温馨提示：</p>
    <p>
      1、价格是否到达对应星球解锁价格是根据用户手动解锁时的实时价格进行判断的。
    </p>
    <p>
      2、特色升级功能：用户可以一键将QKI以及矿工费分红投入更高阶段的星球池。例如在QKI价格达到5U之后，可以一键将在5QUSDT星球池的QKI投入10QUSDT、50QUSDT的星球池。
    </p>
    <p>
      3、举例：当价格到达5QUSDT时，手动解锁了星球池，之后只能往上投入更高等级的星球池，并且当普通池递增到100QUSDT的阶段后，超级星球池也会随之升级至200QUSDT。
    </p>
    <p>4、价格以QUSDT为计算单位。</p>
    <p>5、投入的QKI及矿工费分红均需到达对应阶段才可转出。</p>
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

<style>
.superNodeRule_container {
  background: linear-gradient(90deg, #262455 0%, #232150 100%);
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  font-size: 28px;
  line-height: 1.5;
  color: #ffffff;
  text-align: left;
  text-indent: 2em;
}
</style>