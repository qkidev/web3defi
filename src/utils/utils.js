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

      ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have a very good reason not to.
        window.location.reload();
      });
      
      this.provider = customHttpProvider;
      this.signer = customHttpProvider.getSigner();
    }
  },
}

export {
  initEth
}