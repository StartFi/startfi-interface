


import React,{ useCallback } from 'react'
const ethers = require('ethers');


export const useEthPrice = (): (() => Promise<number>) => {
  return useCallback(
    async (

    ) => {
      try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
     const result = await fetch(apiUrl)
     const value= await result.json();
   
     
          return  value.ethereum.usd;
       
      } catch (e) {
        console.log(e)
      }
    },
    []
  )
}

export const useUSDPrice = (): (() => Promise<number>) => {
  return useCallback(
    async (

    ) => {
      try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth`;
     const result = await fetch(apiUrl)
     const value= await result.json();
   
     
          return  value.dai.eth;
       
      } catch (e) {
        console.log(e)
      }
    },
    []
  )
}
// TODO: useMemo hook and fix the issue here 
export const convertToWie=(amount:number|string)=>(value:number|string)=>{
//the value of the unit Ether 
let etherString = amount//"4.2"



//convert units ether in units wei (return value BigNumber) 
 let wei = ethers.utils.parseEther(etherString)



//convert wei a decimal string 
 let weiString = wei.toString()
 console.log(weiString)
 return weiString
}