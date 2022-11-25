import STORE_HELPER from './base.js';
/**
* @Key [{network}.wallet-info] 
* @Type: Object {
    Connect: Int, // 0 | 1
    Data: Object {
        Address   : String,
        Token     : String,
        ValidNetwork: Int // 0|1
    }
}
*/
class WALLET_HELPER extends STORE_HELPER {
	constructor({ network }) {
		super({ name: 'DB_Wallet' });
		this._network = network;
		this._keys = [
			'wallet-info',
            "wallet-signature"
		];
	}
	Set(_key, _value) {
		this._require(this._validate(_key, this._keys), `[Invalid Key]:: ${_key}`);
        this._set(`${this._network}.${_key}`, _value);
    }
	Get(_key) {
		this._require(this._validate(_key, this._keys), `[Invalid Key]:: ${_key}`);
        return this._get(`${this._network}.${_key}`);
    }
};
export default WALLET_HELPER;
