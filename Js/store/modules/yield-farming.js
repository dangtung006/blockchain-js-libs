import STORE_HELPER from './base.js';
/**
* @Key [{network}.yield-farming-configs] 
* @Type: [CONFIG]
* @CONFIG {
* }
*/
class YIELD_FARMING_HELPER extends STORE_HELPER {
	constructor({ network }) {
		super({ name: 'DB_Yield_Farming' });
		this._network = network;
		this._keys = [
			'yield-farming-configs'
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

export default YIELD_FARMING_HELPER;