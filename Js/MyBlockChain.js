import CONFIGS from './configs/index.js';
import WALLET_HELPER from './wallets/index.js';
import WALLET_ACTION from './actions/wallet.js';

const MYLIB_NETWORK = 'bsc';
const MYLIB_MODE    = 'development';
const CHAIN_ID      = 97;

const initMyLibBlockChains = function(myLibNetwork = MYLIB_NETWORK){
    console.log("==================INIT BALOCKCHIANS LIBS=================");
    console.log("myLibNetwork : " , myLibNetwork);
    const MYLIB_CONFIGS = {
        networkENV : myLibNetwork,
        modeENV    : MYLIB_MODE,
        network    : new CONFIGS[myLibNetwork].network({ mode : MYLIB_MODE}),
        contract   : new CONFIGS[myLibNetwork].contract({ mode : MYLIB_MODE}),
        token      : new CONFIGS[myLibNetwork].token({ mode : MYLIB_MODE})
    }
    
    const MY_WALLET = new WALLET_HELPER[myLibNetwork]({ networkConfig: MYLIB_CONFIGS.Network, chainId :  CHAIN_ID});
    
    
    window.MyBlockchainLibs = {
        wallet : new WALLET_ACTION({ configs : MYLIB_CONFIGS, walletHelper: MY_WALLET  }),
    }
};
export { initMyLibBlockChains };
