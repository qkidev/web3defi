import { ethers } from "ethers";
import { Toast } from 'vant';
import Big from 'big.js'
const initEth = {
  data() {
    return {
      provider: {},
      signer: {},
      chainId: 0,
      myAddress: '',
      gasPrice: '300'
    }
  },
  async created() {
    if (typeof window.getPrivateKey === 'undefined') {
      if (typeof ethereum == "undefined") {
        // Toast('请安装metamask插件、或者使用qkpay打开')
        await this.waitInject()
      } else {
        window.ethereum.enable();
        let customHttpProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );

        if (window.ethereum.isMetaMask) {
          window.ethereum
            .request({
              method: 'net_version'
            })
            .then((chainId) => {
              //可以把
              if (chainId != "20181205")
                Toast('请使用QKI主网,请切换到QKI主网')
              this.chainId = chainId;
            })
            .catch((error) => {
              // If the request fails, the Promise will reject with an error.
              console.log(error)
            });
        }
        window.ethereum.on('chainChanged', (chainId) => {
          if (chainId != "0x133f0d5") {
            Toast('请使用qki主网')
          }
          // setTimeout(function () {
          //   window.location.reload()
          // }, 2500)
        });

        this.provider = customHttpProvider;
        this.signer = customHttpProvider.getSigner();
        let _gasPrice = await this.provider.getGasPrice();
        _gasPrice = ethers.utils.formatUnits(_gasPrice, "gwei")
        this.gasPrice = _gasPrice;//如果网络当前矿工费高于预设最小值，使用当前值
      }
    } else {
      const privateKey = window.getPrivateKey()
      this.provider = new ethers.providers.JsonRpcProvider({ url: 'https://hz.node.quarkblockchain.cn' })
      this.signer = new ethers.Wallet(privateKey, this.provider)
    }
    await this.getAddress()
  },
  methods: {
    // 等待android注入结果
    async waitInject () {
      clearInterval(this.waitInjectTimer)
      if (typeof window.getPrivateKey === 'undefined') {
        console.log('1111111====233333')
        this.waitInjectTimer = setTimeout(() => {
          this.waitInject()
        }, 1000)
      } else {
        clearInterval(this.waitInjectTimer)
        const privateKey = window.getPrivateKey()
        this.provider = new ethers.providers.JsonRpcProvider({ url: 'https://hz.node.quarkblockchain.cn' })
        this.signer = new ethers.Wallet(privateKey, this.provider)
        await this.getAddress()
      }
    },
    async isQKI() {
      let network = await this.provider.getNetwork();
      let networkVersion = network.chainId;
      if (networkVersion != 20181205) {
        Toast('你当前没有使用QKI主网，请切换主网为QKI');
        return false
      }
      return true;
    },
    to(fnPromise) {
      return fnPromise.then(res => [null, res]).catch(error => [error]);
    },
    // 获取地址
    async getAddress () {
      const [error, address] = await this.to(this.signer.getAddress())
      console.log("getAddress======", address)
      if (error == null) {
        this.myAddress = address
      } else {
        console.log(error)
      }
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
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
          Toast('错误:' + error.error.message)
        } else if (error.code === 'INSUFFICIENT_FUNDS') {
          Toast('矿工费不足')
        } else if (error.code === 4001 || error === 'cancelled') {
          Toast('交易取消')
        } else {
          if (error.data.message.indexOf('gas') > 0) {
            Toast('矿工费不足')
          } else if (error.data.message.indexOf('RPC') > 0) {
            Toast('节点异常，请切换节点')
          } else if (error.data.message.indexOf('reverted') > 0) {
            console.log('=====', error.data, error.data.message)
            Toast('错误:' + error.data.message)
          } else {
            Toast('异常')
          }
        }
        return false;
      }
    },
    // 查询Transaction,完成后回调
    async queryTransation (hash, fnCallback) {
      await this.provider.waitForTransaction(hash).then(async receipt => {
        if (receipt.status === 0) {
          Toast('合约调用失败', receipt)
        } else {
          Toast('合约调用成功', receipt)
        }
        fnCallback && fnCallback()
      })
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
Big.DP = 18
Big.NE = -19

window.Big = Big

const Decimal = {
  add(a, b) {
    try {
      return Big(a).add(Big(b))
    } catch {
      console.log('')
    }
  },
  sub(a, b) {
    try {
      return Big(a).sub(Big(b))
    } catch {
      console.log('')
    }
  },
  mul(a, b) {
    try {
      return Big(a).mul(Big(b))
    } catch {
      console.log('')
    }
  },
  div(a, b) {
    try {
      return Big(a).div(Big(b))
    } catch {
      console.log('')
    }
  },
}

const h5Copy = {
  methods: {
    h5Copy(content) {
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
      Toast('复制成功');

    }
  }
}

export {
  initEth,
  Decimal,
  h5Copy
}