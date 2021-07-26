<template>
  <div class="pizza_container">
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">pizzaAirdrop</div>
      <div class="back_bg_placeholder"></div>
    </div>
     <div class="loading_section" v-if="loading">
      <img :src="require('../../assets/loading.gif')" alt="">
    </div>

    <div class="padd_40">
      <div class="from_item grey_bg flex_h_between">
        <div class="smallerGrey2Txt alignLeft mb_10">qki3y余额</div>
        <div class="input_wrap flex_h_between">
          <div class="bigTxt flex1 ellipsis">{{balance}}</div>
        </div>
      </div>
      <div class="from_item flex_h_between">
        <div class="smallerGrey2Txt alignLeft mb_10">是否领取过</div>
        <div class="input_wrap flex_h_between">
          <div class="bigTxt flex1 ellipsis">{{isAirdrop ? '是' : '否'}}</div>
        </div>
      </div>

      <div class="submit_btn flex_h_center_center normalInverseTxt" @click="submit" :style="{'backgroundColor': isAirdrop ? '#ddd' : '#054dfa' }">领取空投</div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { Toast } from "vant";
import { new_abi, abi } from "./config";
import {initEth, Decimal} from '@/utils/utils.js'
export default {
  name: "token",
  data() {
    return {
      loading: false,
      balance: 0,
      isAirdrop: 0,
      airdropContract: null,
      contractAddress: '0xfDcf9C3e9f0592C1828b43f40DC99d5F0238D698',
      gasPrice: '100'
    };
  },
  mixins: [initEth],
  watch:{
     myAddress() {
      var contract = new ethers.Contract(this.contractAddress, new_abi, this.signer);
      this.airdropContract = contract;
      this.getQki3yBanlance();
      this.getAirdropStatus();
    }
  },
  methods: {
    async getQki3yBanlance() {
      let contract = new ethers.Contract(
        '0x7D56168BBcF187848F080FEb09E39dA865f5453d',
        abi,
        this.signer
      )
      let [error, res]  = await this.to(contract.balanceOf(this.myAddress));
      this.doResponse(error, res, 'balance', 8)
    },
    async getAirdropStatus(){
      let [error, res]= await this.to(this.airdropContract.get(this.myAddress))
      this.doResponse(error, res, 'isAirdrop')
    },
    goBack() {
      this.$router.go(-1);
    },
    async submit() {
      if(this.loading){
        return;
      }
      if(this.balance == 0) {
          Toast('您当前还没有qki3y,不能参加本次空投活动!');
          return;
      }
      if(this.isAirdrop == 1) {
          Toast('您已经领取过空投了!');
          return;
      }
      this.loading = true;
      const gasLimit = await this.getEstimateGas(() =>
          this.airdropContract.estimateGas.getairdrop({gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei")})
        );
        if (gasLimit === 0) {
          return;
        }
      let [error, res] = await this.to(this.airdropContract.getairdrop({
          gasLimit,
          gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
        }))
       this.loading = false;
      if (this.doResponse(error, res)) {
         Toast("提交请求成功，等待区块确认");
        await this.queryTransation(res.hash, () => {
          this.getAirdropStatus();
        });
      }
      
    },
    async getEstimateGas(fn) {
      const [err, res] = await this.to(fn());
      if (this.doResponse(err, res)) {
        const hex = ethers.utils.hexValue(res);
        const Value = this.hex2int(hex);
        return String(Decimal.mul(Value, 1.5)).split(".")[0];
      } else {
        return 0;
      }
    },
    copy() {
      if (!document.queryCommandSupported("copy")) {
        // 不支持
        return false;
      }

      let textarea = document.createElement("textarea");
      textarea.value = this.address;
      textarea.readOnly = "readOnly";
      document.body.appendChild(textarea);
      textarea.select(); // 选择对象
      textarea.setSelectionRange(0, this.address.length); //核心
      document.execCommand("copy"); // 执行浏览器复制命令
      textarea.remove();
      Toast('通证发布成功，通证合约地址复制成功')
      // return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pizza_container{
  .header {
  height: 88px;
  background-color: #fff;
  width: 100%;
  padding-left: 53px;
  padding-right: 53px;
  box-sizing: border-box;
}
.back_bg,
.back_bg_placeholder {
  width: 30px;
  height: 30px;
  background-image: url("../../assets/back.png");
}
.mb_10 {
  margin-bottom: 10px;
}
.from_item {
  margin-top: 30px;
  padding-left: 30px;
  background-color: #fff;
  border-radius: 10px;
}
.input_wrap {
  height: 108px;
  border-radius: 10px;
  padding-left: 33px;
  padding-right: 33px;
}
.input_wrap input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.grey_bg .input_wrap, .grey_bg .input_wrap input{
  background-color: transparent;
}
.hr {
  width: 1px;
  height: 42px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: #a9adc1;
}
.submit_btn {
  background-color: #054dfa;
  height: 128px;
  // color: #ffff;
  // font-size: 16px;
  margin-top: 200px;
  margin-bottom: 30px;
  border-radius: 10px;
}
.copy_btn {
  background: #eaf0fc;
  // color: #2F71DF;
  padding: 10px 20px;
  margin-left: 20px;
  border-radius: 10px;
}
.loading_section{
  background-color: #fff;
}
.loading_section img{
   width: 150px;
  height: 75px;
}
}

</style>
