<template>
  <div>
    <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">WQKI说明</div>
      <div class="back_bg_placeholder"></div>
    </div>

    <div class="padd_40">
      <div class="bigTxt alignLeft mt_50 indent">
        一个把qki包装成通证的智能合约，qki和wqki随时可以通过合约自动免费的1：1进行兑换。
        </div>
        <div class="bigTxt alignLeft mt_20 indent" style="word-break: break-all">
wqki的合约地址是：0x835F6dF988B6f51c9477D49e96aDBbc644ba97a2
        </div>
<div class="bigTxt alignLeft mt_20 indent">
转入qki到合约地址，自动给你生成wqki，调用合约可以把wqki销毁转成qki返回。
      </div>
  
    </div>
  </div>
</template>

<script>
import { initEth } from "@/utils/utils.js";
import { ethers } from "ethers";
import { abi } from "../dappHome/config";
import { Toast } from 'vant';
export default {
  name: "home",
  data() {
    return {
      from: "",
      to: "",
      fromAmount: "",
      toAmount: ""
    };
  },
  mixins: [initEth],
  created() {
    // console.log(this.$route)
    this.from = this.$route.params.from;
    this.to = this.$route.params.to;
    this.contractAddress = this.$route.params.contractAddress;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      if(this.fromAmount == ''){
        Toast('请输入'+this.from);
        return;
      }
      let numReg = /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/g;
      if (!numReg.test(this.fromAmount)) {
        Toast("请输入正确的通行总量！");
        return;
      }
      if(this.from == 'QKI') {
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
      //wqki转qki就是调用合约方法 withdraw ，参数只有一个，就是数量，但是处理数值
      var amount = ethers.utils.parseEther(this.fromAmount.toString());

      // this.signer.getAddress().then(address => {
        
      // });
      // 获取主网qki的余额
        contract
          .withdraw(amount, {
            gasLimit: 80000,
            gasPrice: ethers.utils.parseUnits("100", "gwei")
          })
          .then(
            function(data) {
              var hash = data.hash;
              Toast("提交成功，等待区块打包，自动执行智能合约");
              this.provider.waitForTransaction(hash).then(receipt => {
                Toast("区块打包成功", receipt);
              });
            },
            function(data) {
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
            var hash = tx.hash;
            this.provider.waitForTransaction(hash).then(receipt => {
              if (receipt.status == 1) {
                Toast("兑换成功");
                this.fromAmount = '';
              } else {
                Toast("兑换失败");
              }
            });
          },
          function(data) {
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
.mt_20{
  margin-top: 20px;
}
.mt_50{
  margin-top: 50px;
}
.indent{
  text-indent: 2em;
}
</style>
