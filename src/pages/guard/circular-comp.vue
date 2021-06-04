<template>
  <div class="circular-comp">
    <span class="bock"></span>
    <span class="bock"></span>
    <!-- 1 -->
  </div>
</template>
<script>
export default {
  props:{
    
  },
  data(){
    return {
      count:200,
      width:15
    }
  },
  created(){

  },
  methods:{

    transformToRadians(degrees){
      return  degrees * (Math.PI / 180)
    }
  }
  
}
</script>
<style lang="scss" scoped>
.circular-comp{
  // border: 1px solid salmon;
  height: 100%;
  width: 100%;
  .bock{
    display: inline-block;
    width: 20px;
    height: 60px;
    margin:0 5px;
    background: #0A2054;
    transform: rotate(7deg);
  }
}
</style>