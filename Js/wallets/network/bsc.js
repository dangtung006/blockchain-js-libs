/*
* create by falcon
*/
class WALLET_BSC {
    constructor(opts) {
        this._chainName = opts.chainName ? opts.chainName : 'BinanceSmart';
        this._chainID = opts.chainId ? opts.chainId : 56;
        this._networkConfig = opts.networkConfig
        this._providerConnect = null;
        this._isConnected = false;
        this._accountAddr = '';
        this._defaultAccount = '';
    }
    /**
     * @Public
     * @Function connect
     * @Dev
     */
    async Connect(_wallet) {
        try {
            let self = this;
            let _provider = self._getProvider();
            if (!_provider) {
                return false;
            }

            let accounts = await _provider.request({ method: 'eth_requestAccounts' });
            if(!accounts[0]) {
                return false
            }
            _provider.selectedAddress = accounts[0];
            await self._initUserWeb3();
            await self.SwitchNetWork();
            return true;


        } catch(e) {
            console.log("connect", e);
            return false;
        }
    }
    /**
     * @Public
     * @Function disconnect
     * @Dev
     */
    async Disconnect() {
        try {
            let self = this;
            let _provider = self._getProvider();
            if (!_provider) {
                return false;
            }
            if (self._isConnected == false) {
                return false;
            }
            self._providerConnect = null;
            self._isConnected = false;
            return true;
        } catch(e) {
            console.log("Wallet:disconnect", e);
        }
    }
    /**
     * @Public
     * @Function GetChainId
     * @Dev
     */
    async GetChainId() {
        let self = this;
        try{
            let _provider = self._getProvider();

            if (!_provider) {
                return false;
            }

            if (self.IsConnected() == false) {
                return false;
            }
            let chainId = await _provider.request({ method: 'eth_chainId' });

            if(`${chainId.charAt(0)}${chainId.charAt(1)}` == '0x'){
                return parseInt(chainId.slice(2), 16);
            }else{
                return parseInt(chainId, 16);
            }

        }catch(e){
            return false;
        }
    }
    /**
	 * @Public
	 * @Function GetActiveUser
	 * @Dev
	 */
	GetActiveUser() {
        return window.ethereum && window.ethereum.selectedAddress ? window.ethereum.selectedAddress : this._defaultAccount;
    }
    /**
     * @Public
     * @Function GetAccount
     * @Dev
     */
    async GetAccount() {
        let _default = "";
        try {
            let _provider = this._getProvider();
            if (!_provider) {
                return _default;
            }
            let _account = _provider.selectedAddress;
            if (this._isConnected && (!_account || _account == '')) {
                let _accountList = await _provider.request({method: 'eth_accounts'});
                _account = _accountList[0];
            }
            return _account;
        } catch(e) {
            return _default;
        }
    }
    /**
     * @Public
     * @Function IsConnected
     * @Dev
     */
    IsConnected() {
        if (this.GetActiveUser() == this._defaultAccount) return false;
        return true;
    }
    /**
     * @Public
     * @Function IsValidNode
     * @Dev
     */
    async IsValidNode(){
        let chainId          = await this.GetChainId();
        let chainIdAlowed    = this._chainID;

        if(chainId != chainIdAlowed) {
            return false;
        }
        return true;
    }
    /**
     * @Public
     * @Function SwitchNetWork
     * @Dev
     */
    async SwitchNetWork(){
        if(window.ethereum){
            if(await this.IsValidNode() == false) {
                await this._switchToBinanceChain();
            }
        }
    }
    /**
     * @Public
     * @Function GetWeb3ToReadData
     * @Dev
     */
    GetWeb3ToReadData() {
        try {
            if (
                1 == 1 ||
                typeof(web3) === 'undefined' ||
                !this._isConnected
                ) {
                let _rpcUrl = this._networkConfig.GetRPC();
                let _web3 = new Web3(_rpcUrl);
                return _web3;
            }
            return web3;
        } catch(e) {
            return null;
        }
    }
    /**
     * @Private
     * @Function _switchToBinanceChain
     * @Dev
     */
    async _switchToBinanceChain(){
        let _self = this;
        let _provider          = this._getProvider();
        let _chainId           = this._convertChainIdToHex();
        let _rpcUrls           = this._networkConfig.GetConfig('rpcList');
        let _blockExplorerUrls = this._networkConfig.GetConfig('blockExplorerUrls');
        
        let _params = [{ 
            "chainId": _chainId,
            "chainName": _self._chainName,
            "nativeCurrency": {
                "name": 'Binance Coin',
                "symbol": 'BNB',
                "decimals": 18
            },
            "rpcUrls": _rpcUrls,
            "blockExplorerUrls": _blockExplorerUrls
        }];

        try{
            await _provider.request({ method: 'wallet_addEthereumChain', _params, }); 
        }
        catch(e){
            console.log('[_switchToBinanceChain]', e);
        }
    }
    /**
     * @Private
     * @Function _initUserWeb3
     * @Dev
     */
    async _initUserWeb3() {
        let self = this;
        try {
            let _provider = this._getProvider();
            if (!_provider) {
                return false;
            }
            window.web3 = new Web3(_provider);
            self._providerConnect = _provider;
            self._isConnected = true;
             return true;
        } catch(e) {
            return false;
        }
    }
    /**
     * @Private
     * @Function _convertChainIdToHex
     * @Dev
     */
    _convertChainIdToHex() {
        let _chain = this._chainID; // 56: main: 97: test
        return `0x${parseInt(_chain, 10).toString(16)}`;
    }
    /**
     * @Private
     * @Function _getProvider
     * @Dev
     */
    _getProvider() {
        // set chainID will connect
        if (this._providerConnect) {
            if (this._providerConnect.isCoin98 == true) {
                this._providerConnect = this._customProvider(this._providerConnect);
            }
            return this._providerConnect;
        }

        let _provider;
        if (window.ethereum) {
           _provider = window.ethereum;
        } else if (window.BinanceChain) {
            _provider = window.BinanceChain;
        }
        if (!_provider) {
            return false;
        }
        _provider = this._customProvider(_provider);

        return _provider;
    }
    /**
     * @Private
     * @Function _setupNetwork
     * @Dev
     */
    _customProvider(_provider) {
        _provider.chain    = this._chainName;
        if(window.isCoin98){
            _provider.chainId  = this._chainID;
        }
        _provider.autoRefreshOnNetworkChange = false;

        return _provider;
    }
};
export default WALLET_BSC;