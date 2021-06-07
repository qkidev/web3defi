<template>
  <div id="dotloader" class="center">
    <div class="part" v-for="item in 80" :key="item" :style="{transform:`translate(120px,120px) rotate(${item * 5}deg) translateX(120px) rotate(90deg)`}"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    // this.init();
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
/* input variables*/
/* calculated */

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
  width: 10px;
  height: 40px;
  background: #ccc;
  display: block;
  content: "";
  float: left;
  position: absolute;
  left: -10px;
}
// .part:nth-child(1) {
//   transform: translate(240px, 240px) rotate(-60deg) translateX(60px)
//     rotate(90deg);
// }

// .part:nth-child(2) {
//   transform: translate(480px, 480px) rotate(-30deg) translateX(120px)
//     rotate(90deg);
// }

.part:nth-child(3) {
 
  transform: translate(480px,480px) rotate(0deg) translateX(120px)
    rotate(90deg);
  
}
.part:nth-child(4) {
 
  transform: translate(480px,480px) rotate(30deg) translateX(120px)
    rotate(90deg);
  
}


.part:nth-child(5) {
 
  transform: translate(480px,480px) rotate(60deg) translateX(120px)
    rotate(90deg);

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