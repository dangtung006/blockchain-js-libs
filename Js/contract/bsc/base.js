import { Delay } from "../../util/delay.js";

class BASE_CONTRACT_BSC {

    constructor(){
        this._cAbi = opts.cAbi;
		// this._walletHelper = opts.walletHelper;
        this._configs = opts.configs;
        this._minorContract = {};
        this._mainContract = {};
    }

    GetConfigs() {
        return this._configs;
    }

    GetAmountLimit() {
        return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    }

    async _getMainContract(_contract) {
        let self = this;
        let _userAddr =  this.GetActiveUser();
        self._mainContract[_userAddr] = self._mainContract[_userAddr] ? self._mainContract[_userAddr] : {};
        if (self._mainContract[_userAddr][_contract]) {
            return self._mainContract[_userAddr][_contract];
        }
        if (typeof(web3) === 'undefined') {
            await Delay(100);
            return self._getMainContract(_contract);
        }
        try {
            self._mainContract[_userAddr][_contract] = new web3.eth.Contract(self._cAbi, _contract, { from: _userAddr });
        } catch(e) {
            await Delay(3000);
            return self._getMainContract(_contract);
        }
        return self._mainContract[_userAddr][_contract];
    }

    async _getMinorContract(_contract) {
        let self = this;
        let _web3 = this._walletHelper.GetWeb3ToReadData();
        if (self._minorContract[_contract]) {
            return self._minorContract[_contract];
        }
        try {
            self._minorContract[_contract] = new _web3.eth.Contract(self._cAbi, _contract);
        } catch(e) {
            await Delay(3000);
            return self.initContract();
        }
        return self._minorContract[_contract];
    }

}

export default BASE_CONTRACT_BSC;