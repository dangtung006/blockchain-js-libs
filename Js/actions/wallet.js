class WALLET_ACTION {

    constructor({ configs, walletHelper }) {
		this._configs      = configs;
		this._walletHelper = walletHelper;
		this._storeHelper  = {};

        this._walletDefault = {
            Connect: 0,
            Data: {
                Message: '',
                Nickname: '',
                Signature: ''
            }
        };

        this._signatureDefault = {
            Connect: 0,
            Data: {
                Message: '',
                Nickname: '',
                Signature: ''
            }
        };

        // this._setWallet(this._walletDefault);
	}   

    connect(){
        console.log("bnbnbbnbnbnb");
    }

}

export default WALLET_ACTION;