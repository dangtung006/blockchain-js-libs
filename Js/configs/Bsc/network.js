class NETWORK_CONFIG {
    constructor({ mode }){
        this._mode  = mode;
        this.config = {
            development : {

            },

            test : {

            },

            beta : {

            },
            
            product : {

            }
        }

    }
    getConfig(){

    }
}

export default NETWORK_CONFIG;