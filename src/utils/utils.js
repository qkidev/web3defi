import { ethers } from "ethers";
import { Toast } from 'vant';
const initEth = {
  data() {
    return {
      provider: {},
      signer: {},
      chainId: 0
    }
  },
  async created() {
    if (typeof ethereum == "undefined") {
      Toast('请安装metamask插件、或者使用qkpay打开')
    } else {
      // const qkiUrk = 'https://hz.node.quarkblockchain.cn ';
      // let customHttpProvider = new ethers.providers.JsonRpcProvider(qkiUrk);
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
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have a very good reason not to.
        if (chainId != "0x133f0d5") {
          Toast('请使用qki主网')
        }
        setTimeout(function () {
          window.location.reload()
        }, 2500)
      });

      this.provider = customHttpProvider;
      this.signer = customHttpProvider.getSigner();
    }
  },
  methods: {
    async isQKI() {
      let network = await this.provider.getNetwork();
      let networkVersion = network.chainId;
      if (networkVersion != 20181205) {
        Toast('你当前没有使用QKI主网，请切换主网为QKI');
        return false
      }
      return true;
    },
    to(fnPromise){
      return fnPromise.then(res => [null, res]).catch(error => [error]);
    },
  }
}

export {
  initEth
}