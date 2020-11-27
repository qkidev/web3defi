import { ethers } from "ethers";
import {Toast} from 'vant';
const initEth = {
  data(){
    return {
      provider: {},
      signer: {},
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

      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have a very good reason not to.
        if(chainId != "0x539")
        {
          Toast('请使用qki主网')
        }
        setTimeout(function(){
          window.location.reload()
        }, 2500)
      });
      
      this.provider = customHttpProvider;
      this.signer = customHttpProvider.getSigner();
    }
  },
}

export {
  initEth
}