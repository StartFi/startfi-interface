


import React,{ useCallback } from 'react'
const ethers = require('ethers');


export const useStfiUsdPrice = (): (() => Promise<number>) => {
  return useCallback(
    async (

    ) => {
      try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=startfi&vs_currencies=usd`;
     const result = await fetch(apiUrl)
     const value= await result.json();
   
     
          return  value.startfi.usd;
       
      } catch (e) {
        console.log(e)
      }
    },
    []
  )
}
