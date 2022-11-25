import STORE_HELPER from './base.js';
/**
* @Key [{network}.user-farming-nfts-info-{UserAddres}] 
* @Type: [mapping(TokenName => NFT_INFO)]
* @NFT_INFO {
*		Miner: Address
*		TokenId: Int
*		Locked: Int (0 | 1) 
* 		PendingInterest: Float
*		Apy: Float
*		WithdrawFee: Float
* }
*/

// var Wallet = {
// 	Connect:"",
// 	Data: {
// 		address   : "",
// 		token     : "",
// 		validNetwork  : "0"
// 	}
// };

class USER_HELPER extends STORE_HELPER {
	constructor({ network }) {
		super({ name: 'DB_User' });
		this._network = network;
		this._keys = [
			'user-farming-nfts-info',
			'user-balance-info',
			'user-allow-transfer'
		];
	}

	Set(_user, _key, _value) {
		this._require(this._validate(_key, this._keys), `[Invalid Key]:: ${_key}`);
        this._set(`${this._network}.${_key}-${_user}`, _value);
    }

	Get(_user, _key) {
		this._require(this._validate(_key, this._keys), `[Invalid Key]:: ${_key}`);
        return this._get(`${this._network}.${_key}-${_user}`);
    }
};
export default USER_HELPER;