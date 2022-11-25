import { initMyLibBlockChains } from './MyBlockChain.js';

document.querySelector('button').addEventListener('click', function(){
    var e     = document.getElementById("ddlViewBy");
    var value = e.value ? e.value : "bsc";
    var text  = e.options[e.selectedIndex].text;
    initMyLibBlockChains(value);
});