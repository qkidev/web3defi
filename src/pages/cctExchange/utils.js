import { Toast } from "vant";
import Big from 'big.js'
// 复制功能
const h5Copy = {
  methods: {
    h5Copy(content, msg) {
      if (!document.queryCommandSupported('copy')) {
        // 不支持
        return false
      }
      let textarea = document.createElement("textarea")
      textarea.value = content
      textarea.readOnly = "readOnly"
      document.body.appendChild(textarea)
      textarea.select() // 选择对象
      textarea.setSelectionRange(0, content.length) //核心
      document.execCommand("copy") // 执行浏览器复制命令
      textarea.remove()
      Toast(msg ? msg : '复制成功！');
    }
  }
}

// 初始化智能合约
import { ethers } from "ethers";
const initEth = {
  mixins: [asyncUtils],
  methods: {
    // 获取地址
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if(error == null){
        this.address = address;
      } else {
        console.log(error)
      }
    },
    
  }
}

// 下载apk
const downloadApk = {
  methods: {
    downloadApk(params) {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

      if (u.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
        // TODO: 展示跳转浏览器下载
      } else {
        var oA = document.createElement('a')
        oA.download = ''// 设置下载的文件名，默认是'下载'
        oA.href = isAndroid ? params.androidUrl : params.iosUrl
        document.body.appendChild(oA)
        oA.click()
        oA.remove()
      }
    }
  }
}

// 处理异步的工具
const asyncUtils = {
  data() {
    return {
      provider: null,
      signer: null,
      address: '',
    }
  },
  async created() {
    if (typeof ethereum == "undefined") {
      Toast('请安装metamask插件、或者使用owncoin打开')
    } else {
      window.ethereum.enable();
      let customHttpProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      this.provider = customHttpProvider;
      this.signer = customHttpProvider.getSigner();
      let network = await customHttpProvider.getNetwork();
      let networkVersion = network.chainId;
      // 判断是否为火币生态链
      if (networkVersion != 20181205) {
        Toast('你当前没有使用QKI主网，请切换主网为QKI');
      }
      // 监听链的改变
      window.ethereum.on('chainChanged', (chainId) => {
        if (chainId != "0x133f0d5") {
          Toast('请使用QKI主网')
        }
      });
      await this.getAddress();
    }
  },
  methods: {
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if(error == null){
        this.address = address;
      } else {
        console.log(error)
      }
    },
    // 统一封装异步请求
    to(fnPromise){
      return fnPromise.then(res => [null, res]).catch(error => [error]);
    },
    // 处理地址
    subAddress(address) {
      console.log(address)
      if (address && address != "") {
        let prevStr = address.substring(0, 5);
        let lastStr = address.substring(
          address.length - 5,
          address.length
        );
        return prevStr + "..." + lastStr;
      } else {
        return "";
      }
    },
     // response公共处理方法
     doResponse(error, res, keyName, Decimal = 0) {
      if (error == null) {
        if (keyName) {
          let hex = ethers.utils.hexValue(res);
          let Value = Big(this.hex2int(hex)) / ethers.BigNumber.from(10).pow(Decimal);
          this[keyName] = Value;
        }
        return true;
      } else {
        if (error.code == "INSUFFICIENT_FUNDS") {
          Toast("矿工费不足");
        } else if (error.code == 4001 || error == 'cancelled') {
          Toast("用户取消");
        } else if(error.code == -32603){
          if(error.data.message && error.data.message != ''){
            if(error.data.message.indexOf('exceeds allowance') > 0){
              Toast("矿工费不足");
            } else if(error.data.message.indexOf('gas') > 0){
              Toast("矿工费不足");
            } else if(error.data.message.indexOf('RPC') > 0){
              Toast("节点异常，请切换节点");
            } else {
              Toast("错误代码:" + error.data.message || '');
            }
          }
        } else {
          if(error.data.message.indexOf('gas') > 0){
            Toast("矿工费不足");
          } else if(error.data.message.indexOf('RPC') > 0){
            Toast("节点异常，请切换节点");
          } else {
            Toast("异常");
          }
        }
        return false;
      }
    },
    // 查询Transaction,完成后回调
    async queryTransation(provider, hash, fnCallback) {
      await provider.waitForTransaction(hash).then(async receipt => {
        Toast("区块打包成功", receipt);
        fnCallback && fnCallback();
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
    // 获得gas
    async getEstimateGas (fn) {
      const [err, res] = await this.to(fn())
      if (this.doResponse(err, res)) {
        const hex = ethers.utils.hexValue(res)
        const Value = this.hex2int(hex)
        console.log('getEstimateGas========', Value)
        return String(Decimal.mul(Value, 1.5)).split('.')[0]
      } else {
        return 0
      }
    },
  }
}

// 时间处理工具
const timeUtils = {
  data(){
    return {
      day: '0',
      hour:'00',
      minutes: '00',
      seconds: '00'
    }
  },
  methods: {
     // 获取当前时间
    getCurrTime() {
      let timeStr = (Date.now()).toString().substring(0, 10);
      console.log(timeStr);
    },
    // 时间戳转时间
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 倒计时
    countDown(maxtime, fnCallback) {
      let distance = maxtime;
      if (maxtime >= 0) {
        // 距离结束剩下多少天
        let day = Math.floor(maxtime / 86400);
        // 得到剩下的分钟数
        maxtime -= day * 86400;
        let hour = Math.floor(maxtime / 3600);
        // 得到剩下的分钟数
        maxtime -= hour * 3600;
        let minutes = Math.floor(maxtime / 60);
        let seconds = Math.floor(maxtime % 60);
        --distance;
        this.day = day.toString();
        if (hour < 10) {
          hour = "0" + hour;
        }
        this.hour = hour.toString();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        this.minutes = minutes.toString();
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        this.seconds = seconds.toString();
        this.timer = setTimeout(() => {
          this.countDown(distance, fnCallback);
        }, 1000);
      } else {
        clearInterval(this.timer);
        fnCallback && fnCallback();
      }
    },
  }
}

// 和原生通信
const channelNative = {
  created() {
    // 挂载到window上
    window.h5ParseJson = this.parseRes;
  },
  
  methods: {
    // eg:使用方式..
    goShare(regCode) {
      const dataStr = JSON.stringify({
        type: 'share',
        funcName: 'h5ParseJson',
        data: JSON.stringify({
          url: 'http://localhost:8081/#/asssit?regCode=' + regCode,
          title: '帮他助力',
          desc: '帮好友冲榜领现金，下载立得1.68元。升级还有红包领。'
        })
      });
      this.toNative(dataStr);
    },
    // 提供给原生调用的h5端的方法
    parseRes(res) {
      console.log(res);
    },
    // 和原生通信
    toNative(dataStr) {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      let res = '';
      // onCall为和原生端定义的方法名，这个属性可变
      if (isAndroid) {
        res = window.postMessage.onCall(dataStr);
      } else {
        res = window.webkit.messageHandlers.onCall.postMessage(dataStr);
      }
      return res;
    },
  }
}

Big.DP = 18
Big.NE = -19

window.Big = Big

export const Decimal = {
  add (a, b) {
    try {
      return Big(a).add(Big(b))
    } catch {
      console.log('err')
    }
  },
  sub (a, b) {
    try {
      return Big(a).sub(Big(b))
    } catch {
      console.log('err')
    }
  },
  mul (a, b) {
    try {
      return Big(a).mul(Big(b))
    } catch {
      console.log('err')
    }
  },
  div (a, b) {
    try {
      return Big(a).div(Big(b))
    } catch {
      console.log('err')
    }
  },
}

export {
  h5Copy,
  initEth,
  downloadApk,
  asyncUtils,
  timeUtils,
  channelNative
}