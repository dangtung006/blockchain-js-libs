export function Delay(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(); 	      
        }, time);
    });
}