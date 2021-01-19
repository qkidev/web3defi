<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">一键发行通证</div>
      <div class="back_bg_placeholder"></div>
    </div>
     <div class="loading_section" v-if="loading">
      <img :src="require('../../assets/loading.gif')" alt="">
    </div>

    <div class="padd_40">
      <div class="from_item grey_bg flex_v" v-if="address != ''">
        <div class="smallerGrey2Txt alignLeft mb_10" style="color:red">通证地址</div>
        <div class="input_wrap flex_h_between">
          <div class="bigTxt flex1 ellipsis">{{address}}</div>
          <div class="copy_btn smallestBlueTxt" @click="copy">复制</div>
        </div>
      </div>
      <div class="from_item flex_v">
        <div class="smallerGrey2Txt alignLeft mb_10">通证名称</div>
        <div class="input_wrap flex_h_center">
          <input type="text" placeholder="请输入您的通证名称" class="bigTxt flex1" v-model="name" />
        </div>
      </div>
      <div class="from_item flex_v">
        <div class="smallerGrey2Txt alignLeft mb_10">通证缩写</div>
        <div class="input_wrap flex_h_center">
          <input
            type="text"
            placeholder="请输入您的通证缩写"
            class="bigTxt flex1"
            v-model="shortName"
          />
        </div>
      </div>
      <div class="from_item flex_v">
        <div class="smallerGrey2Txt alignLeft mb_10">通证精度</div>
        <div class="input_wrap flex_h_center">
          <input
            type="text"
            placeholder="请输入您的通证精度"
            class="bigTxt flex1"
            v-model="precision"
          />
        </div>
      </div>
      <div class="from_item flex_v">
        <div class="smallerGrey2Txt alignLeft mb_10">通证总量</div>
        <div class="input_wrap flex_h_center">
          <input
            type="text"
            placeholder="请输入您的通证总量"
            class="bigTxt flex1"
            v-model="totalAmount"
          />
        </div>
      </div>
      <div class="submit_btn flex_h_center_center normalInverseTxt" @click="submit">确定提交发行通证</div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { Toast } from "vant";
import { new_abi, bytecode } from "./config";
import {initEth} from '@/utils/utils.js'
export default {
  name: "token",
  data() {
    return {
      precision: "",
      name: "",
      totalAmount: "",
      shortName: "",
      address: "",
      loading: false,
    };
  },
  mixins: [initEth],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async submit() {
      if(this.loading){
        return;
      }
      this.loading = true;
      if(!await this.isQKI()){
        this.loading = false;
        return;
      }
      this.loading = false;
      let enReg = /^[a-zA-Z0-9]+$/g;
      let numReg1 = /^[0-9]+$/g;
      let numReg = /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/g;
      // let numReg
      if (this.name == "") {
        Toast("请输入通证名称！");
        return;
      }
      if (!enReg.test(this.name)) {
        Toast("通证名称只支持数字和字母组合！");
        return;
      }
      if (this.shortName == "") {
        Toast("请输入通证缩写！");
        return;
      }
      if (!(/^[a-zA-Z0-9]+$/g.test(this.shortName))) {
        Toast("通行证缩写只支持数字和字母组合！");
        return;
      }
      if (this.precision == "") {
        Toast("请输入通证精度！");
        return;
      }
      if (!numReg1.test(this.precision)) {
        Toast("通证精度只能是数字！");
        return;
      }
      if (this.precision < 0 || this.precision > 18) {
        Toast("通证精度范围0-18");
        return;
      }
      if (this.totalAmount == "") {
        Toast("请输入通证总量！");
        return;
      }
      if (!numReg.test(this.totalAmount)) {
        Toast("请输入正确的通证总量！");
        return;
      }
      this.loading = true;
      let factory = new ethers.ContractFactory(new_abi, bytecode, this.signer);
      //部署
      let _this = this;
      factory
        .deploy(this.totalAmount, this.name, this.precision, this.shortName, {
          gasLimit: 1000000,
          gasPrice: ethers.utils.parseUnits("1000", "gwei")
        })
        .then(
          function(data) {
            //部署成功后，可以拿到合约地址,看看是否保存在页面上，让用户复制保存
            data.address;
            var hash = data.deployTransaction.hash;

            _this.provider.waitForTransaction(hash).then(receipt => {
              _this.loading = false;
              if (receipt.status == 1) {
                Toast("创建成功");
                _this.address = data.address;
              } else {
                Toast("创建失败");
              }
            });
          },
          function(data) {
            _this.loading = false;
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
.grey_bg .input_wrap, .grey_bg .input_wrap input{
  background-color: #eaf0fc;
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
</style>
