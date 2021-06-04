<template>
  <div class="guard-page">
    <div class="appbar">
      <div class="left">
        <img
          class="back-icon"
          src="~@/assets/guard/back-icon.png"
          alt=""
          srcset=""
          @click="$router.go(-1)"
        />
      </div>
      <div class="right">
        <div class="select flex" @click="show = true" v-if="currentTokenCode">
          <div class="code-icon">
            <img :src="currentTokenCode.icon" alt="" srcset="" />
          </div>
          <div class="code-name">{{currentTokenCode.name | toLocaleUpperCase}}</div>
          <img
            class="more"
            src="~@/assets/guard/more-icon.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
    <img class="title-img" src="~@/assets/guard/title.png" alt="" srcset="" />
    <div class="content">
      <img
        class="circular"
        src="~@/assets/guard/circular.png"
        alt=""
        srcset=""
      />
      <div class="content-time">
        <!-- <CircularComp /> -->
      </div>
      <div class="content-text">
        <p class="title">奖金池总金额</p>
        <p class="number">{{gubalance}}</p>
        <div class="time" v-if="guardAccount === '0x0000000000000000000000000000000000000000'">
          <span>暂未开始</span>
        </div>
        <div class="time count-down-bg" v-else-if="countD>0">
          <span>守擂倒计时：</span><span class="count-time">{{ countD }}</span>
        </div>
        <div class="time" v-else>
          <span>等待发放奖励</span>
        </div>
      </div>
    </div>
    <div class="input-box">
      <p>{{currentTokenCodeName | toLocaleUpperCase}} 余额：{{balance}}</p>
      <input  v-model="joinNumber" type="text" placeholder="请输入守擂数量" />
    </div>
    <div class="btn1" @click="submit">立即参与</div>
    <div class="des">
      <p class="des-title">* 规则</p>
      <p>1、守擂数量：无门槛</p>
      <p>2、守擂时间：60秒</p>
      <p>
        3、奖励发放时间：守擂结束后，有人发起守擂随即自动发放奖励至余额，同时新开下一轮守擂
      </p>
      <p>
        4、奖励：守擂成功者可获得奖金池50%奖励但不会超过最后一次参与数量x1000
      </p>
    </div>
    <van-popup class="model" v-model="show" :close-on-click-overlay="false">
      <div class="wrapper" @click.stop>
        <div class="wrapper-box">
          <div class="model-head">
            <div>选择一个币种</div>
            <img class="close-icon" src="~@/assets/guard/close.png" alt="" srcset="" @click="show = false">
          </div>
          <div class="search">
            <div class="ipt">
              <input type="text" v-model="newTokenCode" placeholder="没找到？输入合约试一试">
            </div>
            <div class="btn-add">
              <button @click="handleTokenCode">添加</button>
            </div>
          </div>
          <div class="scroll">
             <div class="scrool-wrapper">
               <CodeItem v-for="item in symbols" :key="item.id" :data="item" @item-click="handleItemClick"/>
             </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {initEth} from '@/utils/utils.js'
import { Popup } from "vant";
import CodeItem from './code-item'
import {network} from '@/utils/request/api'
// import CircularComp from './circular-comp'
import md5 from 'js-md5';
import { ethers } from 'ethers';
import abi from './abi'
import erc20abi from './erc20abi'
export default {
  components: {
    // CircularComp,
    [Popup.name]: Popup,
    CodeItem
  },
  data() {
    return {
      erContract:null,//erc20合约
      guContract:null,//擂台合约
      show: false,
      decimal:1,//精度
      targetCode:['QKI'],//需要的主网昵称，大写
      networks:[],//主网列表
      symbols:[],//代币列表
      guardAddress:'0xeA43A19a37e7A914F3b94a73e27E332Ac1077B29',//擂台合约地址
      currentTokenCode:null,//当前代币
      balance:null,//代币余额
      gubalance:null,//资金池余额
      guarDuration:0,//擂台时长
      guardTime:null,//擂台时间
      guardAccount:'0x0000000000000000000000000000000000000000',//擂台账户
      timer:null,//时间对象
      countD:'',//倒计时
      joinNumber:'',//守擂数量
      newTokenCode:'',//添加合约地址
      allowanceResp:0,//授权数量
      approveNum:9999999999999999,//默认授权数量
      loading:false
    };
  },
  mixins: [initEth],
  created(){
    this.init()
  },
  computed:{
    currentTokenCodeName(){
      return this.currentTokenCode?.name ?? '--'
    }
  },
  filters:{
    toLocaleUpperCase(e){
      if(e!=null && e!= ''){
        return e.toLocaleUpperCase()
      }else{
        return e
      }
    }
  },
  watch:{
    currentTokenCode:{
      deep:true,
      handler(e){
        if(e==null) return false
        this.getCurrentTokenCodeContract()
      }
    }
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods:{
    async init(){
      this.getNetwork()
    },
   async submit(){
     console.log(ethers.utils.parseUnits('10', this.decimal).toString());
      if(this.guContract==null || this.erContract==null){
        return this.$toast('出错了！')
      }
      if(!this.joinNumber)return this.$toast('守擂数量不能为空')

      const [allowanceErr,allowanceResp] = await this.to(this.erContract.allowance(this.myAddress,this.guardAddress))
  
      this.doResponse(allowanceErr, allowanceResp, "allowanceResp",this.decimal);
      if(this.allowanceResp<this.joinNumber){
        //如果没设置默认授权数量 根据根据表单授权
        const approveNum = this.approveNum ?? this.joinNumber;

        const [approveErr,] = await this.to(this.erContract.approve(this.guardAddress,ethers.utils.parseUnits(approveNum+'', this.decimal)))
        console.log(approveErr);

        if(approveErr){
          return this.$toast('授权失败')
        }else{
          return this.$toast('授权成功')
        }
      }

      if(this.loading) return false
      this.loading = true
      const [err,] = await this.to(this.guContract.join(this.currentTokenCode.contract_origin,ethers.utils.parseUnits(this.joinNumber+'',this.decimal)))
      if(err){
        return this.$toast(err.message)
      }else{
        this.getCurrentTokenCodeContract()
        this.joinNumber = ''
      }
      this.loading = false
    },
   async handleTokenCode(){
     if(!this.newTokenCode) return this.$toast('合约地址不能为空')
      var re = new RegExp(/0x[a-f0-9]{40}/);
      if(!re.test(this.newTokenCode.toLocaleLowerCase()))return this.$toast('请输入正确的合约地址')
      try {
        const contract =  new ethers.Contract(this.newTokenCode, erc20abi, this.signer);
        let [,name] = await this.to(contract.name())
        if(!name) return this.$toast('合约地址错误')
        this.currentTokenCode={
          contract_origin: this.newTokenCode,
          name:name,
          icon:this.networks[0].icon
        }
        this.newTokenCode = ''
        this.show = false
      } catch (error) {
        // 
      }
    },
    //代币合约
    async getCurrentTokenCodeContract(){
      const contract =  new ethers.Contract(this.currentTokenCode.contract_origin, erc20abi, this.signer);
      this.erContract = contract;
      let [,decimal] = await this.to(contract.decimals())
      let [err, balance] = await this.to(contract.balanceOf(this.myAddress))
      let [, gubalance] = await this.to(contract.balanceOf(this.guardAddress))
      this.decimal = decimal
      this.doResponse(err, balance, 'balance', decimal)
     this.gubalance = ethers.utils.formatUnits(gubalance, decimal);
      // console.log(ethers.utils.formatUnits(gubalance, decimals));

      this.guardContract()

      contract.on("Approval", (owner, spender,value, event) => {
          console.log(owner, spender,value, event);
      });
      
      
    },
    //擂台合约
    async guardContract() {
      const contract = new ethers.Contract(this.guardAddress, abi, this.signer);
      this.guContract = contract
      let [err,duration] = await this.to(contract.duration())
      let [latesterr, latest] = await this.to(contract.latest(this.currentTokenCode.contract_origin))
      this.doResponse(err, duration, "guarDuration");
      this.doResponse(latesterr,latest.time, "guardTime");
      this.guardAccount = latest.account
      if(this.guardTime > 0){
        const second = new Date().getTime() / 1000
        this.countD = parseInt(this.guardTime + this.guarDuration - second)
        this.countTime()
      }
    },

    //倒计时
    countTime(){
        if(this.timer){
          clearInterval(this.timer)
        }
        this.timer=setInterval(()=>{
          this.guardContract()
        },1000)
    },
    
    //下拉框选择
    handleItemClick(e){
      this.currentTokenCode = e
      this.show = false
    },
    //获取币种
    async getNetwork(){
      try {
        const {data} = await network({v:'9.9.9',nonce:md5(new Date().getTime().toString())})
        this.networks = data.networks?.filter(e=> this.targetCode.indexOf(e.name.toLocaleUpperCase())>=0) ?? []
        this.symbols = data.symbols?.filter(e=> this.networks.findIndex(y=>y.id===e.network.id&&y.id!=e.id)>=0) ?? []
        this.currentTokenCode = this.symbols.find(e=>e.name ===this.targetCode[0]) ?? this.symbols[0]
      } catch (error) {
        this.$toast('出错了')
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.model{
  overflow: hidden;
  background: #FFFFFF;
  border-radius: 10px;
}
.guard-page {
  background: url("~@/assets/guard/bg-top.png") no-repeat, #000338;
  background-size: 100%;
  color: #368acb;
  text-align: left;
  padding-top: 18px;
}
.appbar {
  position: relative;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    padding-left: 30px;
    .back-icon {
      width: 20px;
      height: 31px;
    }
  }
  .right {
    .select {
      display: flex;
      align-items: center;
      height: 55px;
      background: url("~@/assets/guard/select-bg.png") no-repeat;
      background-size: 100% 55px;
      padding-left: 16px;
      padding-right: 28px;
      .code-icon {
        width: 32px;
        height: 32px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .code-name {
        color: #fff;
        margin-left: 7px;
        margin-right: 15px;
        font-size: 24px;
      }
      .more {
        width: 15px;
        height: 9px;
        img {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
.title-img {
  width: 100%;
  margin-top: -106px;
}
.content {
  background: url("~@/assets/guard/bg-center.png") no-repeat;
  background-size: 100%;
  position: relative;
  text-align: center;
  margin-top: -30px;
  .circular {
    width: 727px;
    height: 727px;
  }
  .content-time{
    width: 480px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -240px;
    margin-top: -240px;
    
  }
  .content-text {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -150px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    p {
      margin: 0;
    }
    .title {
      color: #c9a189;
      font-size: 28px;
      line-height: 40px;
    }
    .number {
      font-size: 60px;
      color: #00e5c8;
      font-weight: bold;
      line-height: 70px;
      word-wrap: break-word;
      margin: 25px 0;
    }
    .time {
      width: 294px;
      height: 72px;
      text-align: center;
      line-height: 72px;
      margin: 0 auto;
      font-size: 28px;
      color: #137dbf;
    }
    .count-down-bg {
      background: url("~@/assets/guard/btn-bg.png") no-repeat;
      background-size: contain;
    }
    .count-time {
      color: #ffb588;
    }
  }
}
.input-box {
  width: 648px;
  height: 245.31px;
  background: url("~@/assets/guard/input-bg.png") no-repeat, #000237;
  background-size: 100%;
  margin: 0 auto;
  padding: 38px 55px;
  box-sizing: border-box;
  p {
    font-size: 28px;
    color: #00e5c8;
    line-height: 40px;
    margin: 0;
    margin-bottom: 32px;
  }
  input {
    height: 88px;
    width: 100%;
    background: transparent;
    border: 1px solid #32c5ff;
    padding: 22px;
    box-sizing: border-box;
    font-size: 30px;
    color: #00e5c8;
  }
  input::placeholder {
    color: #034a7e;
    font-size: 30px;
  }
}
.btn1 {
  width: 540px;
  height: 90px;
  background: linear-gradient(70deg, #00ffee 0%, #16a8ff 100%);
  border-radius: 6px;
  margin: 0 auto;
  color: #000338;
  font-size: 32px;
  font-weight: 800px;
  text-align: center;
  line-height: 90px;
  margin-top: 53px;
}
.des {
  padding: 65px;
  .des-title {
    color: #82dbff;
  }
  p {
    margin: 0;
    line-height: 52px;
    font-size: 26px;
  }
}

.model{

  .wrapper-box {
    width: 577px;
    color: #333333;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .model-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    font-size: 28px;
    flex-shrink: 0;
    border-bottom: 1px solid #F6F6F6;
    .close-icon{
      width: 26px;
      height: 26px;
    }
  }
  .search{
    padding: 10px 32px;
    display: flex;
    flex-shrink: 0;
    .ipt{
      flex: 1;
    }
    input{
      border: none;
      border-bottom: 1px solid #DADADA;
      padding: 22px 0;
      width: 100%;
    }
    .btn-add{
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    button{
      background: #3A70DC;
      border-radius: 10px;
      border: none;
      color: #fff;
      padding: 11px 40px;
      margin-left: 19px;
      
      font-size: 26px;
    }
  }
  .scroll{
    max-height: 670px;
    overflow: scroll;
  }
}

</style>