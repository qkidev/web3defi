<template>
  <div class="superNode_container">
    <!-- <div class="header flex_h_center_center">
      <div class="bg-img back_bg" @click="goBack"></div>
      <div class="bigTxt flex1">超级节点2.0</div>
      <div class="back_bg_placeholder"></div>
    </div> -->
    <div class="head flex_v_center">
      <div class="flex_h_between head_img_wrap" style="align-items: flex-start">
         <div
          class="rule_bg flex_h_center_center normalInverseBoldTxt"
          @click="rewardShow = true"
        >
          分红
        </div>
        <div class="flex_v">
          <div style="height: 40px; width: 10px;"></div>
          <img
            :src="require('../../assets/superNode2/logo1.png')"
            alt=""
            class="logo1"
          />
          <img
            :src="require('../../assets/superNode2/logo2.png')"
            alt=""
            class="logo2"
          />
        </div>
        <div
          class="rule_bg flex_h_center_center normalInverseBoldTxt"
          @click="gotoRule"
        >
          规则
        </div>
      </div>

      <div
        class="pool_bg flex_h_center_center mt_50 hugestInverseBoldTxt"
        @click="openTogglePool('togglePoolShow')"
      >
        {{ currPool && currPool.amount }}U
      </div>
      <div class="flex_h mt_15">
        <img
          :src="require('../../assets/superNode2/toggle.png')"
          alt=""
          class="toggle_icon"
        />
        <span class="smallestInverseTxt" style="opacity: 0.4"
          >点击星球切换星球池</span
        >
      </div>
      <div class="smallInverseTxt mt_50">当前合约地址内余额</div>
      <div class="biggestInverseThinTxt mt_20">
        {{ contractQkiBalance }}
        <span class="smallInverseThinTxt" style="opacity: 0.5">QKI</span>
      </div>
      <div class="price_wrap mt_20 smallInverseTxt">
        当前星球锁仓价值 {{ totalPrice }} USDT
      </div>
    </div>
    <div class="hy">
      <div class="space-between">
        <div
          class="smallestInverseTxt ellipsis"
          style="text-transform: uppercase"
        >
          {{ contractAddress }}
        </div>
        <img
          src="../../assets/superNode2/copy.png"
          class="copy"
          @click="h5Copy(contractAddress)"
          mode
        />
      </div>
    </div>
    <div class="flex_h_between flex1 padd_60">
      <div class="smallInverseTxt">凭证数量</div>
      <div class="biggestInverseThinTxt">{{ balance }}</div>
    </div>
    <div class="hr_v"></div>
    <div class="flex_h_between flex1 padd_60">
      <div class="smallInverseTxt">存入数量(QKI)</div>
      <div class="biggestInverseThinTxt">{{ storeAmount }}</div>
    </div>
    <div class="hr_v"></div>
    <div class="flex_h_between flex1 padd_60">
      <div class="smallInverseTxt">赚取总额(USDT)</div>
      <div class="biggestInverseThinTxt">{{ withDrawAmount }}</div>
    </div>
    <div class="hr_v"></div>
    <div class="flex_h_between flex1 padd_60">
      <div class="smallInverseTxt">赚取QKI总额</div>
      <div class="biggestInverseThinTxt">{{ earnQkiTotal }}</div>
    </div>
    <div class="hr_v"></div>
    <div class="flex_h_between padd_60">
      <div class="smallInverseTxt">当前QKI价格</div>
      <div>
        <span class="biggestInverseThinTxt">{{ price }} </span>
        <span class="smallerInverseThinTxt">USDT</span>
      </div>
    </div>
    <div class="hr_v"></div>
    <div class="fixed_bottom_placeholder"></div>
    <div class="fixed_bottom flex_v" v-if="balance != 0">
      <div class="flex_h_between">
        <div
          class="withdraw_btn flex_h_center_center smallerInverseTxt"
          @click="openModel('withDrawShow')"
        >
          立即提现
        </div>
        <div
          class="store_btn flex_h_center_center smallerInverseTxt"
          @click="openStoreModel"
        >
          立即存入
        </div>
      </div>
      <div class="flex_h_between mt_65">
        <span class="smallestMainInverseThinTxt"
          >* 当价格到达{{ withdrawPrice }} USDT可进行提现</span
        >
        <div class="flex_h_center" @click="openModel('upgredeShow')">
          <img
            :src="require('../../assets/superNode2/upgrade.png')"
            alt=""
            class="upgrade_btn"
          />
          <span class="smallestInverseTxt"
            >升级到{{ nextPoolAmount }}U星球池</span
          >
        </div>
      </div>
    </div>
    <div class="fixed_bottom flex_v" v-else>
      <div class="flex_h_center_center">
        <div
          class="store_btn flex_h_center_center smallerInverseTxt"
          @click="openTogglePool('startPoolShow')"
        >
          开启你的星球池
        </div>
      </div>
    </div>

    <!-- 提现 -->
    <div class="bg" v-show="withDrawShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img
            src="../../assets/superNode2/withdraw_model_head.png"
            class="withdraw_model_bg"
            mode
          />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">提现数量</div>
          </div>
          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              placeholder="请输入你存入数量"
              v-model="amount"
            />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt" @click="inputAll">全部</div>
            </div>
          </div>
          <div
            class="submit_btn flex_h_center_center middleInverseTxt"
            @click="withDraw"
          >
            确定提现
          </div>
          <div class="smallGrey2Txt" @click="withDrawShow = false">
            取消切换
          </div>
        </div>
      </div>
    </div>
    <!-- 升级 -->
    <div class="bg" v-show="upgredeShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img
            src="../../assets/superNode2/pool_bg.png"
            class="pool_model_bg"
            mode
          />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">升级{{ nextPoolAmount }}U星际池</div>
          </div>
          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              placeholder="请输入你的凭证数量"
              v-model="amount"
            />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt" @click="inputAll">全部</div>
            </div>
          </div>
          <div
            class="submit_btn flex_h_center_center middleInverseTxt"
            @click="upgrade"
          >
            确定升级
          </div>
          <div class="smallGrey2Txt" @click="upgredeShow = false">取消升级</div>
        </div>
      </div>
    </div>
    <!-- 存入 -->
    <div class="bg" v-show="storeShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img
            src="../../assets/superNode2/rocket.png"
            class="rocket_bg"
            mode
          />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">存入数量</div>
          </div>
          <div class="input-box space-between">
            <input
              type="text"
              class="input"
              value
              placeholder="请输入你的存入数量"
              v-model="amount"
            />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt">QKI</div>
            </div>
          </div>
          <div
            class="submit_btn flex_h_center_center middleInverseTxt"
            @click="store"
          >
            确定存入
          </div>
          <div class="smallGrey2Txt" @click="storeShow = false">取消存入</div>
        </div>
      </div>
    </div>
    <!-- 切换星球 -->
    <div class="bg" v-show="togglePoolShow">
      <div class="flex-box">
        <div class="box1 flex_v_center">
          <img
            src="../../assets/superNode2/pool_bg.png"
            class="pool_model_bg"
            mode
          />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">选择星球池</div>
          </div>
          <div
            class="pool_list flex_h_between mt_65"
            style="flex-wrap: wrap; width: 100%"
          >
            <div
              :class="[
                'pool_item',
                'flex_h_center_center',
                (tempPool && tempPool.amount) === item.amount ? 'currItem' : '',
              ]"
              v-for="(item, index) in poolList"
              :key="index"
              @click="tempPool = item"
            >
              {{ item.amount }}U 星球池
              <img
                :src="require('../../assets/superNode2/cuttItem.png')"
                alt=""
                class="img"
                v-show="(tempPool && tempPool.amount) === item.amount"
              />
            </div>
          </div>
          <div
            class="submit_btn flex_h_center_center middleInverseTxt"
            @click="togglePool"
          >
            确定切换
          </div>
          <div class="smallGrey2Txt" @click="togglePoolShow = false">
            取消切换
          </div>
        </div>
      </div>
    </div>
    <!-- 开启星球 -->
    <div class="bg" v-show="startPoolShow">
      <div class="flex-box">
        <div class="box1 flex_v_center">
          <img
            src="../../assets/superNode2/pool_bg.png"
            class="pool_model_bg"
            mode
          />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">选择星球池</div>
          </div>
          <div
            class="pool_list flex_h_between mt_65"
            style="flex-wrap: wrap; width: 100%"
          >
            <div
              :class="[
                'pool_item',
                'flex_h_center_center',
                (tempPool && tempPool.amount) === item.amount ? 'currItem' : '',
              ]"
              v-for="(item, index) in poolList"
              :key="index"
            >
              {{ item.amount }}U 星球池
              <img
                :src="require('../../assets/superNode2/cuttItem.png')"
                alt=""
                class="img"
                v-show="(tempPool && tempPool.amount) === item.amount"
              />
            </div>
          </div>
          <div class="input-box space-between" style="margin-top: 0">
            <input
              type="text"
              class="input"
              value
              placeholder="请输入你的存入数量"
              v-model="amount"
            />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt">QKI</div>
            </div>
          </div>
          <div
            class="submit_btn flex_h_center_center middleInverseTxt"
            @click="start"
          >
            确定开启
          </div>
          <div class="smallGrey2Txt" @click="startPoolShow = false">
            取消开启
          </div>
        </div>
      </div>
    </div>
    <!-- 分红弹框 -->
    <div class="bg" v-show="rewardShow">
      <div class="flex-box">
        <div class="box1 flex_v_center">
          <img
            src="../../assets/superNode2/reward_pool_bg.png"
            class="pool_model_bg"
            mode
          />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">合约待分红总量</div>
          </div>
          <div class="align-center mt_30">
            <div class="biggestRedTxt">{{rewardTotalAmount}}</div>
          </div>
          <div class="align-center mt_15">
            <div class="bigFontThinTxt" style="color: $494949">QKI</div>
          </div>
          <div class="align-center mt_50">
            <div class="smaller494949Txt">上次分红时间</div>
          </div>
          <div class="align-center">
            <div class="smallGrey2Txt">{{prevTime}}</div>
          </div>
          <div class="align-center mt_50">
            <div class="smaller494949Txt">下次分红时间</div>
          </div>
          <div class="align-center">
            <div class="smallGrey2Txt">{{nextTime}}</div>
          </div>
     
          <div
            class="submit_btn flex_h_center_center middleInverseTxt" style="margin-top: 50px;"
            @click="getAward"
            v-if="canReward"
          >
            领取分红
          </div>
          <div
            class="submit_btn flex_h_center_center middleInverseTxt" style="margin-top: 50px;background: #d1d1d1"
            @click="getNoAward"
            v-else
          >
            领取分红
          </div>
          <div class="smallGrey2Txt" @click="rewardShow = false">
            取消
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import h5Copy from '../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
import { h5Copy, initEth, Decimal } from "@/utils/utils";
import { ethers } from "ethers";
import { abi, rewardAbi } from "./abi";
import { Toast } from "vant";
export default {
  data() {
    return {
      contractAddress: "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3", // 合约地址
      contract: null, // 当前的合约对象
      myAddress: "", // 我的地址
      balance: "0.00", // 当前星球的凭证数量
      amount: "",
      storeAmount: "0.00",
      // withDrawAmount: "0.00", // 累计提现总额
      depositUsdtValue: 0, // 累计存入usdt价值
      withdrawtUsdtValue: 0, // 累计提现usdt价值
      contractQkiBalance: 0, // 合约的qki总量
      totalSupply: "0.00", // 全网通证总量
      withDrawShow: false,
      bgShow: false,
      upgredeShow: false,
      storeShow: false,
      togglePoolShow: false,
      startPoolShow: false,
      type: 1,
      decimals: 18, //精度
      poolList: [
        { amount: 5, address: "0x419a7356dC08Bf5a20d9f660DeE723ecb9345B72" },
        { amount: 10, address: "0x134e0600B1ec8924e7B5eC7D51568093e0Bbf8cb" },
        { amount: 20, address: "0x81341Db0cdC3F5b289a126f307a5c96be2013c7f" },
        { amount: 100, address: "0x164F31A5bfA746bcc55bd2279A400B645E99aaeB" },
      ],
      currPool: null,
      withdrawPrice: 0.0, // 提现价格
      price: "0.00", //
      next_pool: ethers.constants.AddressZero, // 下一个星球池地址
      tempPool: null,
      // earnQkiTotal: 0.0,
      withDrawValue: 0,
      rewardContractAddress: '0x3805D1864e21A883F8f701Ce6f24C609fe0Acd53',
      rewardContract: null,
      rewardBalance: 0,
      rewardShow: false,
      rewardTotalAmount: 0, // 分红总量
      prevTimeTimeStamp: '', // 上次分红时间
      prevTime: '',
      rewardInterval: 0,
      nextTime: '', // 下次分红时间
      canReward: false,
    };
  },
  async created() {
    // 第一次进入默认10u星球池
    this.getContract(this.poolList[1].address);
    this.currPool = this.poolList[1];
    this.tempPool = this.poolList[1];
    await this.getDecimals();
  },
  mixins: [h5Copy, initEth, Decimal],
  computed: {
    withDrawAmount: function () {
      // 占比
      if (Number(this.balance) == 0) {
        return 0;
      }
      const stake = Decimal.div(this.balance, this.totalSupply);
      // 池内qki数量
      const balanceQki = Decimal.mul(stake, this.contractQkiBalance);
      // 池内qki数量usdt
      let usdtPrice = Decimal.mul(balanceQki, this.price);
      const withDrawAmountValue = Decimal.add(
        Decimal.sub(usdtPrice, this.depositUsdtValue),
        this.withdrawtUsdtValue == undefined ? '0' :this.withdrawtUsdtValue
      );
      if(withDrawAmountValue == undefined) {
        return 0.0
      } else if(Number(withDrawAmountValue.valueOf()) < 0) {
        return 0.0
      }
      return Number(withDrawAmountValue.valueOf()).toFixed(2);
    },
    earnQkiTotal: function() {
      // 占比
      if (Number(this.balance) == 0) {
        return 0;
      }
      const stake = Decimal.div(this.balance, this.totalSupply);
      // 池内qki数量
      const balanceQki = Decimal.mul(stake, this.contractQkiBalance);
      // qki赚取的数量
      const earnQkiTotal = Decimal.add(Decimal.sub(balanceQki, this.storeAmount), this.withDrawValue)
      if(Number(earnQkiTotal.valueOf()) < 0) {
        return 0.0
      }
      return Number(earnQkiTotal.valueOf()).toFixed(8);
    },
    nextPoolAmount: function () {
      let amount = 0;
      const len = this.poolList.length;
      for (let i = 0; i < len; i++) {
        if (
          this.poolList[i].address.toLowerCase() ==
          this.currPool.address.toLowerCase()
        ) {
          if (i + 1 < len) {
            amount = this.poolList[i + 1].amount;
            break;
          }
        }
      }
      return amount;
    },
    totalPrice: function () {
      // 池内qki数量
      const totalPrice = Decimal.mul(this.price, this.contractQkiBalance);
      return Number((totalPrice && totalPrice.valueOf()) || 0).toFixed(2);
    },
  },
  watch: {
    rewardInterval(value) {
      let nextTime = this.prevTimeTimeStamp + value;
      this.nextTime = this.timestampToTime(nextTime);
      this.prevTime = this.timestampToTime(this.prevTimeTimeStamp);
          let nowTimeStr = Date.now()
        .toString()
        .substring(0, 10);
      if((Number(nowTimeStr) - Number(nextTime)) > 0){
        this.canReward = true;
      } else {
        this.canReward = false;
      }
    }
  },
  methods: {
    openTogglePool(keyName) {
      if(keyName === "startPoolShow") {
        if(Number(this.price) >= Number(this.withdrawPrice)) {
          Toast('当前QKI价格高于可提现价格，不能进行存入操作，你可以切换到更高级的星球池进行操作');
          return;
        }
      }
      this.tempPool = this.currPool;
      this[keyName] = true;
    },
    openModel(keyName) {
      if (this.next_pool === ethers.constants.AddressZero) {
        if (keyName === "withDrawShow") {
          Toast("还未达到提现条件");
        } else {
          Toast("还未达到升级下一星球条件");
        }
        return;
      }
      this[keyName] = true;
    },
    openStoreModel(){
      if(Number(this.price) >= Number(this.withdrawPrice)) {
        Toast('当前QKI价格高于可提现价格，不能进行存入操作');
        return;
      }
      this.storeShow = true
    },
    goBack() {
      this.$router.go(-1);
    },
    gotoRule() {
      this.$router.push("superNode2Rule");
    },
    // 初始化数据
    async init() {
      this.getTotalSupply();
      await this.getBalance();
      await this.getPrice();
      await this.getContractQkiBalance();
      await this.getWithdrawPrice();
      if (this.balance !== 0) {
        this.geUsers();
        this.getNextPoolAddress();
      }
      await this.getRewardInit();
      
    },
    // 初始化合约
    getContract(address) {
      this.contractAddress = address;
      var contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
      var rewardContract = new ethers.Contract(this.rewardContractAddress, rewardAbi, this.signer);
      this.contract = contract;
      this.rewardContract = rewardContract;
    },
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if (error == null) {
        this.myAddress = address;
      } else {
        console.log(error);
      }
    },
    // 获取主网qki的余额
    async getContractQkiBalance() {
      let [error, balance] = await this.to(
        this.provider.getBalance(this.contractAddress)
      );
      if (error == null) {
        let etherString = ethers.utils.formatEther(balance);

        this.contractQkiBalance = parseFloat(etherString);
      }
      // return 0.0;
    },
    // 得到凭证数量
    async getBalance() {
      let [error, balance] = await this.to(
        this.contract.balanceOf(this.myAddress)
      );
      this.doResponse(error, balance, "balance", this.decimals);
    },
    // 得到合约的余额
    async getTotalSupply() {
      let [error, res] = await this.to(this.contract.totalSupply());
      this.doResponse(error, res, "totalSupply", this.decimals);
    },
    // 获得解锁价格
    async getWithdrawPrice() {
      let [error, res] = await this.to(this.contract.withdrawPrice());
      this.doResponse(error, res, "withdrawPrice", 6);
    },
    // 获取下一个可升级的星球池
    async getNextPoolAddress() {
      let [error, res] = await this.to(this.contract.next_pool());
      if (this.doResponse(error, res)) {
        if (res == ethers.utils.AddressZero) {
          this.next_pool = res;
        } else {
          this.next_pool = res;
        }
      }
      this.doResponse(error, res, "", this.decimals);
    },
    // 获得用户的累计存入数量
    async geUsers() {
      let [error, res] = await this.to(this.contract.users(this.myAddress));
      if (this.doResponse(error, res)) {
        // 累计存入qki数量
        let hex = ethers.utils.hexValue(res[0]);
        let Value =
          this.hex2int(hex) / ethers.BigNumber.from(10).pow(this.decimals);
        this.storeAmount = Value;
        // 累计提现的qki数量
        let withDrawhex = ethers.utils.hexValue(res[1]);
        let  withDrawValue =
          this.hex2int(withDrawhex) / ethers.BigNumber.from(10).pow(this.decimals);
        // 赚取qki总
        this.withDrawValue = withDrawValue
        // 获得累计存入usdt
        let depositUsdt = ethers.utils.hexValue(res[2]);
        let depositUsdtValue =
          this.hex2int(depositUsdt) / ethers.BigNumber.from(10).pow(24);
        this.depositUsdtValue = depositUsdtValue;

        let withdrawtUsdt = ethers.utils.hexValue(res[3]);
        let withdrawtUsdtValue =
          this.hex2int(withdrawtUsdt) / ethers.BigNumber.from(10).pow(24);
        this.withdrawtUsdtValue = withdrawtUsdtValue;
      }
    },
    // 获得当前价格
    async getPrice() {
      let [error, res] = await this.to(this.contract.getPrice());
      // qusdt的精度为6
      this.doResponse(error, res, "price", 6);
    },
    // 得到精度
    async getDecimals() {
      let [error, res] = await this.to(this.contract.decimals());
      this.doResponse(error, res, "decimals");
    },

    // 切换星球
    async togglePool() {
      this.currPool = this.tempPool;

      this.next_pool_amount = this.togglePoolShow = false;
      this.getContract(this.currPool.address);
      this.init();
    },
    // 处理工单
    async dealOrder(type, modelKeyName) {
      if (this.amount == "") {
        Toast("请输入您的存入的数量");
        return;
      }
      let amount = ethers.utils.parseEther(this.amount.toString());
      let response;
      if (type === "start" || type === "store") {
        let tx = {
          from: this.myAddress, //当前用户地址
          to: this.contract.address, //接收地址
          value: amount,
        };
        const gasLimit = await this.getEstimateGas(() =>
          this.signer.estimateGas(tx, {gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei")})
        );
        if (gasLimit === 0) {
          return;
        }
        tx = Object.assign(tx, {
          gasLimit: Number(gasLimit),
          gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
        });
        response = await this.to(this.signer.sendTransaction(tx));
      } else if (type === "upgrade") {
        const gasLimit = await this.getEstimateGas(() =>
          this.contract.estimateGas.upgrade(amount, {gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei")})
        );
        if (gasLimit === 0) {
          return;
        }
        response = await this.to(
          this.contract.upgrade(amount, {
            gasLimit,
            gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
          })
        );
      } else if (type === "withdraw") {
        const gasLimit = await this.getEstimateGas(() =>
          this.contract.estimateGas.withdraw(amount,{gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei")})
        );
        if (gasLimit === 0) {
          return;
        }
        response = await this.to(
          this.contract.withdraw(amount, {
            gasLimit,
            gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
          })
        );
      }
      let [error, res] = response;
      if (this.doResponse(error, res)) {
        this[modelKeyName] = false;
        this.amount = "";
        Toast("提交请求成功，等待区块确认");
        await this.queryTransation(res.hash, () => {
          if (type === "upgrade") {
            for (let i = 0, len = this.poolList.length; i < len; i++) {
              if (
                this.next_pool.toLowerCase() ===
                this.poolList[i].address.toLowerCase()
              ) {
                this.currPool = this.poolList[i];
                this.tempPool = this.poolList[i];
                this.getContract(this.poolList[i].address);
              }
            }
          }
          this.init();
        });
      }
    },
    // 开启星球
    async start() {
      this.currPool = this.tempPool;
      this.dealOrder("start", "startPoolShow");
    },
    // 升级星球
    async upgrade() {
      this.dealOrder("upgrade", "upgredeShow");
    },
    // 存入
    async store() {
      
      this.dealOrder("store", "storeShow");
    },
    // 提现
    async withDraw() {
      this.dealOrder("withdraw", "withDrawShow");
    },

    // 得到分红初始化数据的数量
    async getRewardInit() {
      let [error, balance] = await this.to(
        this.provider.getBalance(this.rewardContractAddress)
      );
      if (error == null) {
        let etherString = ethers.utils.formatEther(balance);

        this.rewardTotalAmount = parseFloat(etherString);
      }
      let [err1, lTime] = await this.to(
        this.rewardContract.last_time()
      );
      this.doResponse(err1, lTime, 'prevTimeTimeStamp');
      let [err2, intervals] = await this.to(
        this.rewardContract.Intervals()
      );
      this.doResponse(err2, intervals, 'rewardInterval');
    },

    // 领取分红
    async getAward() {
      const gasLimit = await this.getEstimateGas(() =>
          this.rewardContract.estimateGas.reward({gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),})
        );
        if (gasLimit === 0) {
          return;
        }
      let [err1, res] = await this.to(
        this.rewardContract.reward({
          gasLimit,
          gasPrice: ethers.utils.parseUnits(this.gasPrice, "gwei"),
        })
      );
      if(err1 == null){
         Toast("领取成功");
         await this.queryTransation(res.hash, () => {
          this.getRewardInit();
        });
         this.rewardShow = false;
      }
    },
    getNoAward() {
      Toast('当前还不可以领取分红哦');
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
      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    // response公共处理方法
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
    // 输入全部
    inputAll() {
      this.amount = this.balance;
    },
    // inputAllWithDrawn() {
      // this.amount = 
    // },
    // 获得gas
    async getEstimateGas(fn) {
      const [err, res] = await this.to(fn());
      if (this.doResponse(err, res)) {
        const hex = ethers.utils.hexValue(res);
        const Value = this.hex2int(hex);
        console.log("getEstimateGas========", Value);
        return String(Decimal.mul(Value, 1.5)).split(".")[0];
      } else {
        return 0;
      }
    },
    tab(num) {
      this.active = num;
    },
  },
};
</script>

<style scoped lang="scss">
.superNode_container {
  $minFontSize: 20px;
  $smallestFontSize: 22px;
  $smallerFontSize: 24px;
  $smallFontSize: 26px;
  $normalFontSize: 28px;
  $middleFontSize: 30px;
  $bigFontSize: 34px;
  $bigerFontSize: 38px;
  $biggestFontSize: 46px;
  $hugeFontSize: 50px;
  $hugerFontSize: 80px;
  $hugestFontSize: 60px;
  $inverse_color: #fff;
  $input_color: #ebebeb;
  $font_color: #333;
  $bg_color: #f5f5f5;
  $grey_color: #b3b3b3;
  $grey2_color: #d1d1d1;
  $black_color: #000000;
  $red_color: #ff5746;
  $main_color-inverse: #ffcdcd;
  $main_color: #262455;
  $main2_color: #232150;
  $main_inverse_color: #8480d4;

  background: linear-gradient(90deg, #262455 0%, #232150 100%);
  min-height: 100vh;

  box-sizing: border-box;
  .padd_60 {
    margin-left: 60px;
    margin-right: 60px;
  }
  .head_img_wrap {
    width: calc(100% - 120px);
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 60px;
    padding-right: 60px;
  }

  .smallestInverseTxt {
    color: $inverse_color;
    font-size: $smallestFontSize;
  }
  .smallestBlackTxt {
    color: $black_color;
    font-size: $smallestFontSize;
  }
  .smallestMainInverseThinTxt {
    color: $main_inverse_color;
    font-size: $smallestFontSize;
    font-weight: 200;
  }
  .smallerInverseThinTxt {
    color: $inverse_color;
    font-size: $smallerFontSize;
    font-weight: 200;
  }
  .smallerInverseTxt {
    color: $inverse_color;
    font-size: $smallerFontSize;
  }
  .smaller494949Txt{
    color: #494949;
    font-size: $smallerFontSize;
    font-weight: 400;
  }
  .smallInverseTxt {
    color: $inverse_color;
    font-size: $smallFontSize;
  }
  .smallInverseThinTxt {
    color: $inverse_color;
    font-size: $smallFontSize;
    font-weight: 200;
  }
  .smallGrey2Txt {
    color: $grey2_color;
    font-size: $smallFontSize;
  }
  .normalInverseBoldTxt {
    color: $inverse_color;
    font-size: $normalFontSize;
    font-weight: 800;
  }
  // .bigFontSize
  .bigFontThinTxt {
    color: $font_color;
    font-size: $bigFontSize;
    font-weight: 300;
    font-family: PingFang SC;
  }
  .middleInverseTxt {
    color: $inverse_color;
    font-size: $middleFontSize;
  }
  .biggerInverseThinTxt {
    color: $inverse_color;
    font-size: $bigerFontSize;
    font-weight: 200;
  }
  .biggestInverseThinTxt {
    color: $inverse_color;
    font-size: $biggestFontSize;
    font-weight: 200;
    opacity: 0.7;
  }
  .biggestRedTxt {
    color: #F31C7B;
    font-size: $biggestFontSize;
    font-weight: normal;
  }
  .hugestInverseBoldTxt {
    color: $inverse_color;
    font-size: $hugestFontSize;
    font-weight: 900;
  }
  .mt_65 {
    margin-top: 65px;
  }
  .mt_50 {
    margin-top: 50px;
  }
  .mt_15 {
    margin-top: 15px;
  }
  .mt_85 {
    margin-top: 85px;
  }
  .mt_30 {
    margin-top: 30px;
  }
  .mt_20 {
    margin-top: 20px;
  }
  .container {
    background: linear-gradient(90deg, #262455 0%, #232150 100%);
    min-height: 100vh;
    padding-left: 60px;
    padding-right: 60px;
  }
  .head {
    background-image: url("../../assets/superNode2/bg.png");
    background-repeat: no-repeat;
    // width: 100%;
    height: 821px;
    background-size: 100% 100%;
  }
  .rule_bg {
    background-image: url("../../assets/superNode2/rule_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 104px;
    height: 104px;
  }
  .logo1 {
    width: 202px;
    height: 33px;
  }
  .logo2 {
    width: 207px;
    height: 76px;
    margin-top: 12px;
  }
  .toggle_icon {
    width: 27px;
    height: 35px;
    margin-right: 5px;
  }
  .copy {
    width: 28px;
    height: 29px;
    margin-left: 10px;
  }
  .upgrade_btn {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
  .pool_bg {
    background-image: url("../../assets/superNode2/pool_bg.png");
    background-repeat: no-repeat;
    width: 215px;
    height: 215px;
    background-size: 100% 100%;
  }
  .flex {
    display: flex;
  }
  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .align-center {
    display: flex;
    align-items: center;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hy {
    box-sizing: border-box;
    border-bottom: 2px solid rgba(235, 233, 237, 0.4);
    padding-bottom: 25px;
    margin-bottom: 50px;
    margin-left: 60px;
    margin-right: 60px;
  }
  .hr_v {
    height: 2px;
    width: calc(100% - 120px);
    background: rgba(235, 233, 237, 0.4);
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 60px;
    margin-right: 60px;
  }
  .hr_h {
    height: 90px;
    width: 2px;
    background: rgba(235, 233, 237, 0.4);
  }
  .fixed_bottom_placeholder {
    width: 100%;
    height: 360px;
  }
  .fixed_bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: #232150;
    padding: 60px;
  }
  .withdraw_btn {
    width: 285px;
    height: 94px;
    background-image: url("../../assets/superNode2/withdraw_btn.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .store_btn {
    width: 285px;
    height: 94px;
    background-image: url("../../assets/superNode2/store_btn.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .store_btn_big {
    width: 430px;
    height: 146px;
    background-image: url("../../assets/superNode2/store_btn.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .line {
    width: 1px;
    height: 41px;
    background: #d1d1d1;
    margin-right: 20px;
  }
  .submit_btn {
    height: 119px;
    margin-left: 60px;
    margin-right: 60px;
    width: 100%;
    background: linear-gradient(95deg, #fe207b 0%, #d6117b 100%);
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 59px;
    margin-bottom: 25px;
    margin-top: 0;
  }
  .pool_item {
    width: calc((100% - 30px) / 2);
    padding-top: 36px;
    padding-bottom: 36px;
    border: 1px solid #d1d1d1;
    border-radius: 80px;
    margin-bottom: 60px;
    position: relative;
    color: #d1d1d1;
    font-size: 30px;
    &.currItem {
      border: 1px solid #ff5746;
      color: #ff5746;
    }
    .img {
      position: absolute;
      width: 51px;
      height: 51px;
      left: 50%;
      top: -25px;
      transform: translateX(-50%);
    }
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
      .pool_model_bg {
        width: 215px;
        height: 215px;
        position: absolute;
        left: 50%;
        top: -100px;
        transform: translateX(-50%);
      }
      .box {
        width: 654px;
        height: 673px;
        background: #ffffff;
        border-radius: 20px;
        padding: 90px 78px 0 63px;
        box-sizing: border-box;
        position: relative;
        .withdraw_model_bg {
          width: 285px;
          height: 184px;
          position: absolute;
          left: 50%;
          top: -100px;
          transform: translateX(-50%);
        }
        .rocket_bg {
          width: 95px;
          height: 274px;
          position: absolute;
          left: 50%;
          top: 50%;
          top: -160px;
          transform: translateX(-50%);
        }
      }

      .box1 {
        margin-left: 50px;
        margin-right: 50px;
        width: 100%;
        background: #ffffff;
        border-radius: 20px;
        padding: 71px 56px 71px 56px;
        position: relative;
        .line {
          width: 1px;
          height: 51px;
          background: #d8d8d8;
          margin: 0 13px;
        }
      }
    }
  }
  .input-box {
    width: 100%;
    height: 92px;
    background: #ebebeb;
    border-radius: 50px;
    margin-top: 80px;
    margin-bottom: 80px;
    padding: 0 37px;
    box-sizing: border-box;
    .input {
      width: 70%;
      height: 100%;
      border: none;
      background-color: transparent;
    }
  }
  .price_wrap {
    background-color: rgba(114, 237, 252, 0.5);
    margin-left: -60px;
    margin-right: -60px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
  }
}
</style>
