<template>
  <div class="code-item" @click="handleClick">
    <div class="row">
      <img class="icon" :src="data.icon" alt="" srcset="">
      <span class="code-name">{{data.name.toLocaleUpperCase()}}</span>
      <div>
        <!-- <span class="networks">{{data.network.name}}</span> -->
      </div>
    </div>
    <p>{{data.contract}}</p>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  },
  methods:{
    handleClick(){
      this.$emit('item-click',this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.code-item{
  padding: 25px 33px;
}
.row{
  display: flex;
  align-items: center;
}
.icon{
  width: 40px;
  height: 40px;
  margin-right: 30px;
}
.code-name{
  margin-right: 28px;
  font-size: 28px;
  color: #333333;
}
.networks{
  background: #3A70DC;
  font-size: 20px;
  color: #fff;
  padding: 5px 20px;
  height: 36px;
  border-radius: 22px;
  line-height: 28px;
}
p{
  margin: 0;
  color: #999999;
  margin-top: 9px;
  font-size: 22px;
}
</style>