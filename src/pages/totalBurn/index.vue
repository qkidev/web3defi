<template>
  <div class="totalBurn">
    <div class="appbar">
      <div class="left">
        <img
          @click="$router.go(-1)"
          src="~@/assets/totalBurn/back.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="title">流通销毁CCT数量</div>
    </div>
    <div class="container">
      <h3>流通销毁CCT数量</h3>
      <img class="des-img" src="~@/assets/totalBurn/des.png" alt="" srcset="">
      <h2>
        {{ cctNumS[0] }}<span>.{{ cctNumS[1] }}</span>
      </h2>
    </div>
  </div>
</template>
<script>
import abi from "./abi";
import { ethers } from "ethers";
import { h5Copy, initEth, Decimal } from "@/utils/utils";
import { Toast } from "vant";
export default {
  data() {
    return {
      contract: null,
      contractAddress: "0xE8377eCb0F32f0C16025d5cF360D6C9e2EA66Adf",
      wei: "",
      decimals: "",
      cctNum: "----.--------",
      timer:null
    };
  },
  created() {
    this.getContract();
    this.getTotalBurn()
    if(this.timer){
      clearInterval(this.timer)
    }else{
      this.timer=setInterval(()=>{
        this.getTotalBurn()
      },5000)
    }
  },
  computed: {
    desU() {
      return "The number of <br>CCT destroyed in circulation".toUpperCase();
    },
    cctNumS() {
      return this.cctNum.split(".");
    },

  },
  mixins: [h5Copy, initEth, Decimal],

  destroyed(){
    clearInterval(this.timer)
  },

  methods: {
   getContract() {
      this.contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
    },

   async getTotalBurn(){
     if(this.contract==null) return false
      let [error, res] = await this.to(this.contract.totalBurn());
      let [decimalserror, decimals] = await this.to(this.contract.decimals());
      this.doResponse(error, res, "wei");
      this.doResponse(decimalserror, decimals, "decimals");
      this.cctNum = ethers.utils.formatUnits(this.wei, this.decimals);
    },
    doResponse(error, res, keyName, Decimal = 0) {
      if (error == null) {
        if (keyName) {
          let hex = ethers.utils.hexValue(res);
          let Value =
            this.hex2int(hex) / ethers.BigNumber.from(10).pow(Decimal);
          this[keyName] = Value;
        }
        return true;
      } else {
        if (error.code == "INSUFFICIENT_FUNDS") {
          Toast("矿工费不足");
        } else if (error.code == 4001) {
          Toast("用户取消");
        } else {
          Toast("错误代码:" + error.code);
        }
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container{
  background: transparent !important;
  min-height: auto;
}
.totalBurn {
  background: url("~@/assets/totalBurn/bg02.png") no-repeat,
    url("~@/assets/totalBurn/bg01.png") no-repeat,
    linear-gradient(180deg, #192132 0%, #1a2132 33%, #191f30 100%);
  background-position: bottom center, top center;
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  .appbar {
    position: relative;
    display: flex;
    font-size: 18px;
    font-weight: 500;
    height: 90px;
    align-items: center;
    padding: 0 36px;
    margin-top: 90px;
    .left {
      img {
        width: 48px;
        height: 48px;
      }
    }
    .title {
      color: #09fff7;
      font-size: 36px;
      text-align: center;
      flex: 1;
      position: absolute;
      left: 50%;
      width: 70%;
      transform: translateX(-50%);
    }
  }
  .text-center {
    text-align: center;
  }
  .container {
    text-align: left;
    padding: 0 42px;
    background-color: transparent;
    .box {
      padding: 0 30px;
    }
    h3 {
      font-size: 64px;
      font-weight: bold;
      color: #ffffff;
      line-height: 92px;
      margin-top: 68px;
      margin-bottom: 48px;
    }
    .des-img{
      height: 100px;
      object-fit: contain;
      margin-bottom: 70px;
    }
    h2 {
      font-size: 68px;
      font-family: D-DIN-Bold;
      color: #09fff7;
      position: relative;
      font-weight: bold;
      margin: 0;
      span{
        font-size: 44px;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 10px;
        background: linear-gradient(
          94deg,
          #40fce0 0%,
          rgba(86, 219, 255, 0) 100%
        );
      }
    }
  }
}
</style>