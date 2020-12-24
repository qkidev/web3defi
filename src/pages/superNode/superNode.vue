<template>
  <div class="superNode_container">
    <div class="bg-img header-bg flex_v_center_end">
      <div class="flex_h_center_center">
        <span class="biggestInverseTxt">超级节点</span>
      </div>
      <div class="flex_h_center_center">
        <span class="smallInserveTxt">Supernode</span>
      </div>
    </div>

    <div class="hr_superNode"></div>
    <div class="flex_h_center_center mt_50">
      <span class="smallInserveTxt">当前地址在合约内余额</span>
    </div>
    <div class="flex_h_center_center mt_50">
      <span class="inverse46Txt">{{nodeIncome}}</span>
    </div>
    <div class="flex_h_center_center mt_20">
      <span class="smallInserveTxt">QKI</span>
    </div>
    <!-- <div class="hr_superNode mt_50"></div>
    <div class="flex_h_center_center mt_70">
      <span class="smallInserveTxt">节点收益</span>
    </div>
    <div class="flex_h_center_center mt_50">
      <span class="inverse46Txt">{{nodeIncome}}</span>
    </div>
    <div class="flex_h_center_center">
      <span class="smallInserveTxt mt_20">QKI</span>
    </div> -->
    <div class="flex_h_center_center">
      <div class="btn flex_h_center_center mt_70" @click="receiveIncome">
        <span class="inverse30BoldTxt">提现超级节点收益</span>
      </div>
    </div>
    <div class="flex_h_center_center">
      <span class="smallPurpleInverse">目前已有{{nodeAmount}}个超级节点</span>
    </div>
     <!-- 提现收益弹框-->
    <!-- <div class="bg" v-show="show">
      <div class="flex-box flex_v_center_center"  @click="show = false">
        <div class="box1">
          <div class="bg-img model_header"></div>
          <div class="flex_h_center_center">
            <div class="default42Txt">本期超级节点收益</div>
          </div>
          <div class="flex_h_center_center mt_80">
            <div class="purple52BoldTxt">{{nodeIncome}} QKI</div>
          </div>
          <div class="flex_h_center_center superSubmit_btn mt_100" @click="receiveIncome"><span class="inverse30BoldTxt">确定提现收益</span> </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { initEth } from "@/utils/utils";
import { ethers } from "ethers";
import { abi } from "./abi";
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      contractAddress: '0xbabca83f796841d4FC60789D8745fe6ee5687353', // 合约地址
      myAddress:'', // 我的地址
      balance: '', // 合约余额
      nodeIncome: '', // 节点收益
      nodeAmount: 0, // 节点数量
      // balanceQki: 0, // qik余额
    }
  },
  mixins: [initEth],
  async created() {
    await this.getAddress();
    var contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    this.contract = contract;
    // this.getBalance();
    this.getNodeIncome();
    this.getNodeAmount()
  },
  methods: {
    // 获取地址
     async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if(error == null){
        this.myAddress = address;
      } else {
        console.log(error)
      }
    },
    // 得到节点收益
    async getNodeIncome() {
      let [error, balance] = await this.to(this.contract.balanceOf(this.myAddress));
      this.doResponse(error, balance, "nodeIncome",this.decimals);
    },
    // 获取主网qki的余额
    async getBalance() {
      let [error, balance] = await this.to(this.provider.getBalance(this.myAddress));
      if(error == null) {
        let etherString = ethers.utils.formatEther(balance);
        this.balance = parseFloat(etherString);
      } else {
        this.balance = '0.00'
      }
    },
    // 得到节点数量
    async getNodeAmount() {
      let [error, res] = await this.to(this.contract.node_amount());
      if(this.doResponse(error, res, '')){
        let hex = ethers.utils.hexValue(res);
        let value= this.hex2int(hex)
        this.nodeAmount = value;
      }
    },
    // 领取收益
    async receiveIncome() {
      if(this.nodeIncome == 0){
        Toast('您当前还没有收益可领取！')
        return;
      }
      let [error, res] = await this.to(this.contract.deposit());
      if (this.doResponse(error, res, "")) {
        this.show = false;
        Toast("提现成功！");
        await this.queryTransation(res.hash);
      }
    },
     // 查询Transaction
    async queryTransation(hash) {
      await this.provider.waitForTransaction(hash).then(async receipt => {
        Toast("区块打包成功", receipt);
        this.getBalance();
        this.getNodeIncome();
      });
    },
     // 十六进制转10进制
    hex2int(hex) {
      if (hex.indexOf("0x") >= 0) {
        hex = hex.substring("2");
      }
      var len = hex.length,
        a = new Array(len),
        code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }
      return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    // response公共处理方法
    doResponse(error, res, keyName) {
      console.log(keyName+'================', error, res);
      if (error == null) {
        if (keyName) {
          let etherString = ethers.utils.formatEther(res);
          this[keyName] = parseFloat(etherString);
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
  }
};
</script>

<style lang="scss">
$purple-color1: #180550;
$purple-color2: #410b74;
$purple-inverse-color: #c380ff;
$font-size-46: 46px;
$purple-text-color: #723ECA;
.smallPurpleInverse {
  font-size: 26px;
  color: $purple-inverse-color;
}
.inverse46Txt {
  font-size: 46px;
  color: #ffffff;
  font-weight: 200;
}
.inverse30BoldTxt {
  font-size: 30px;
  color: #ffffff;
  font-weight: 800;
}
.default42Txt{
  font-size: 42px;
  color: #333;
  font-weight: 300;
}
.purple52BoldTxt{
  font-size: 52px;
  font-weight: 800;
  color: #723ECA;
}
.superNode_container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(90deg, #180550 0%, #410b74 100%);
  padding-top: 80px;
  padding-bottom: 100px;
}
.header-bg {
  height: 600px;
  width: 100%;
  background-image: url("../../assets/superNode/bg.png");
  padding-bottom: 20px;
  box-sizing: border-box;
}
.model_header{
  width: 181px;
  height: 217px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  width: 430px;
  height: 143px;
  background-image: url("../../assets/superNode/btn.png");
  background-size: 100% 100%;
  box-sizing: border-box;
}
.hr_superNode {
  // width: 612px;
  height: 1px;
  background: #ebe9ed;
  opacity: 0.25;
  margin-left: 70px;
  margin-right: 70px;
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba($color: #000000, $alpha: 0.5);

  .flex-box {
    width: 100%;
    height: 100%;
    .box1 {
      margin-left: 75px;
      margin-right: 75px;
      background: #ffffff;
      border-radius: 20px;
      padding: 75px 90px 75px 90px;
      box-sizing: border-box;
      .superSubmit_btn{
        height: 138px;
        background-image: url('../../assets/superNode/btn1.png');
        background-size: 100% 100%;
      }
    }
  }
}
</style>