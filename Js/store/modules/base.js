class STORE_HELPER {
	constructor({ name }) {
		this._name = name;
		this._data = {};
	}

	_set(_key, _value) {
        this._data[_key] = _value;
    }

	_get(_key) {
        return this._data[_key];
    }

    _validate(_key, _allowKeys = []) {
    	if (!_key) return false;
    	if (!_allowKeys.includes(_key)) return false;
    	return true;
    }
    
    _require(_status, _message) {
    	if (_status == false) throw new Error(_message);
    }
};
export default STORE_HELPER;