<template>
  <div id="dotloader" class="center">
    <div
      class="part"
      v-for="item in count"
      :key="item"
      :class="{ active: (count - item) * proportion < time }"
      :style="{
        transform: `translate(120px,120px) rotate(${
          item * avd - 90
        }deg) translateX(120px) rotate(90deg)`,
      }"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    r: {
      type: Number,
      default: 120,
    },
    count: {
      type: Number,
      default: 200,
    },
    time: {
      type: Number,
      default: 30,
    },
  },
  created() {
    this.init();
  },
  data() {
    return {
      avd: 0,
      proportion: 0,
    };
  },
  methods: {
    init() {
      // const d = 2 * Math.PI * this.r
      // 每一个BOX对应的角度;
      var avd = 360 / this.count;
      //每一个BOX对应的弧度;
      // var ahd = avd*Math.PI/180;
      this.avd = avd;
      this.proportion = 60 / this.count;
    },
  },
};
</script>

<style scoped lang="scss">
#dotloader {
  width: 100%;
  height: 100%;
}
.part {
  width: 0px;
  height: 0px;
  display: block;
  float: left;
  position: absolute;
  -webkit-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
.part::before {
  width: 4px;
  height: 20px;
  background: #0A2054;
  display: block;
  content: "";
  float: left;
  position: absolute;
  left: -10px;
  transition: all 0.5;
}
.active::before {
  background: #00ffdf;
  transition: all 0.5;
}



.center {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>