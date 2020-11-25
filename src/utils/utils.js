import { ethers } from "ethers";
const initEth = {
  data(){
    return {
      provider: {},
      signer: {},
    }
  },
  async created() {
    if (typeof ethereum == "undefined") {
      console.log("请安装metamask插件、或者使用qkpay打开");
    } else {
      // const qkiUrk = 'https://hz.node.quarkblockchain.cn ';
      // let customHttpProvider = new ethers.providers.JsonRpcProvider(qkiUrk);
      window.ethereum.enable();
      let customHttpProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      
      this.provider = customHttpProvider;
      this.signer = customHttpProvider.getSigner();
    }
  },
}

export {
  initEth
}