<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">{{from}}转{{toCoin}}</div>
      <div class="back_bg_placeholder"></div>
    </div>
    <div class="loading_section" v-if="loading">
      <img :src="require('../../assets/loading.gif')" alt />
    </div>

    <div class="padd_40">
      <div class="from_item flex_v">
        <div class="smallerGrey2Txt alignLeft mb_10">输入{{from}}</div>
        <div class="input_wrap flex_h_center">
          <input type="text" placeholder="请输入兑换数量" class="bigTxt flex1" v-model="fromAmount" />
          <div class="hr"></div>
          <div class="smallestGrey1Txt">{{from}}</div>
        </div>
      </div>
      <div class="from_item flex_v">
        <div class="smallerGrey2Txt alignLeft mb_10">可兑换{{toCoin}}</div>
        <div class="input_wrap flex_h_center">
          <input
            type="text"
            placeholder="请输入兑换数量"
            class="bigTxt flex1"
            v-model="fromAmount"
            disabled
          />
          <div class="hr"></div>
          <div class="smallestGrey1Txt">{{toCoin}}</div>
        </div>
      </div>
      <div class="submit_btn flex_h_center_center normalInverseTxt" @click="submit">立即兑换</div>
    </div>
  </div>
</template>

<script>
import { initEth } from "@/utils/utils.js";
import { ethers } from "ethers";
import { abi } from "../dappHome/config";
import { Toast } from "vant";

export default {
  name: "home",
  data() {
    return {
      from: "",
      toCoin: "",
      fromAmount: "",
      toAmount: "",
      loading: false
    };
  },
  mixins: [initEth],
  created() {
    // console.log(this.$route)
    this.from = this.$route.params.from;
    this.toCoin = this.$route.params.to;
    this.contractAddress = this.$route.params.contractAddress;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      if (this.loading) {
        return;
      }
      if (this.fromAmount == "") {
        Toast("请输入" + this.from);
        return;
      }
      let numReg = /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/g;
      if (!numReg.test(this.fromAmount)) {
        Toast("请输入正确的通行总量！");
        return;
      }
      this.loading = true;
      if (this.from == "QKI") {
        this.qkiExchangeWqki();
      } else {
        this.wqkiExchangeQki();
      }
    },
    wqkiExchangeQki() {
      var contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      ); //实例化合约对象

      var amount = ethers.utils.parseEther(this.fromAmount.toString());
      //wqki转qki就是调用合约方法 withdraw ，参数只有一个，就是数量，但是处理数值
      contract
        .withdraw(amount, {
          gasLimit: 80000,
          gasPrice: ethers.utils.parseUnits("100", "gwei")
        })
        .then(
          data => {
            var hash = data.hash;
            Toast("提交成功，等待区块打包，请等待片刻");
            this.provider.waitForTransaction(hash).then(receipt => {
              this.loading = false;
              if (receipt.status == 1) {
                Toast("区块打包成功，兑换成功", receipt);
              } else {
                Toast("区块打包成功，兑换失败，请确认数量是否正确", receipt);
              }
            });
          },
          (data) => {
            this.loading = false;
            if (data.code == "INSUFFICIENT_FUNDS") {
              Toast("矿工费不足");
            } else if (data.code == 4001) {
              Toast("用户取消");
            } else {
              Toast("错误代码:" + data.code);
            }
          }
        );
    },
    qkiExchangeWqki() {
      this.signer.getAddress().then(address => {
        var amount = ethers.utils.parseEther(this.fromAmount.toString()); //参数必须是字符串格式，例如转1个qki，这个数量需要使用这个方法进行转换
        let tx = {
          from: address, //当前用户地址
          to: this.contractAddress, //接收地址
          gasLimit: 200000,
          value: amount
        };

        let sendPromise = this.signer.sendTransaction(tx);
        sendPromise.then(
          tx => {
            Toast("提交成功，等待区块打包，请等待片刻");
            var hash = tx.hash;
            this.provider.waitForTransaction(hash).then(receipt => {
              this.loading = false;
              if (receipt.status == 1) {
                Toast("区块打包成功，兑换成功", receipt);
              } else {
                Toast("区块打包成功，兑换失败，请确认数量是否正确", receipt);
              }
            });
          },
          (data) => {
            this.loading = false;
            if (data.code == "INSUFFICIENT_FUNDS") {
              Toast("矿工费不足");
            } else if (data.code == 4001) {
              Toast("用户取消");
            } else {
              Toast("错误代码:" + data.code);
            }
          }
        );
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
}
.input_wrap {
  height: 108px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 33px;
  padding-right: 33px;
}
.input_wrap input {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: none;
  outline: none;
  // border-radius: 10px;
  // padding-left: 15px;
  // padding-right: 15px;
  box-sizing: border-box;
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
.loading_section {
  background-color: #fff;
}
.loading_section img {
  width: 150px;
  height: 75px;
}
</style>
