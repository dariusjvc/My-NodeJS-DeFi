import Web3 from 'web3';
import {ST_CONTACT_ADDRESS} from '../abis/stakingTokenConf.js'; 
import {ST_CONTACT_ABI} from '../abis/stakingTokenConf.js'; 

import {RT_CONTACT_ADDRESS} from '../abis/rewardTokenConfig.js'; 
import {RT_CONTACT_ABI} from '../abis/rewardTokenConfig.js'; 

import {MT_CONTACT_ADDRESS} from '../abis/mainTokenConfig.js'; 

import "dotenv/config.js";



if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider); 
    } else {
        var web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_INTERNAL_HOST));
    }

//Add the account from which to send the transaction into a wallet
web3.eth.accounts.wallet.add(process.env.ADMIN_PRIVATE_KEY)

const stToken = new web3.eth.Contract(ST_CONTACT_ABI, ST_CONTACT_ADDRESS );
const rtToken = new web3.eth.Contract(RT_CONTACT_ABI, RT_CONTACT_ADDRESS );

var decimals = await stToken.methods.getDecimals().call();

function getSpenderSTBalance(){ 
    return stToken.methods.balanceOf(MT_CONTACT_ADDRESS).call((error, balance) => {
        if (error) {
            console.log("An error occurred", error)
          }
          console.log("The balance is: ", balance/Math.pow(10, decimals))
          });
}

function getSpenderRTBalance(){ 
    return rtToken.methods.balanceOf(MT_CONTACT_ADDRESS).call((error, balance) => {
        if (error) {
            console.log("An error occurred", error)
          }
          console.log("The balance is: ", balance/Math.pow(10, decimals))
          });
}

export {
    getSpenderSTBalance,
    getSpenderRTBalance
  };