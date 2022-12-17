
/* eslint-disable no-console */
declare const Parse: any;
import './generated/evmApi';
import './generated/solApi';
import { requestMessage } from '../auth/authService';
import Moralis from 'moralis';

const serverUrl = "https://metafarmlands.herokuapp.com/server";
const appId = '001';

   
  
Parse.Cloud.define('requestMessage', async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
    address,
    chain,
    networkType,
  });

  return { message };
});

Parse.Cloud.define('getMarketItems', async () => {

  const query = new Parse.Query("BinancelandsLogs");
    const queryResults = await query.find();
    console.log("results "+queryResults)
    const results=[]
    for (let i = 0; i < queryResults.length; ++i) {
      results.push({
      "itemId":queryResults[i].attributes.itemId,
      "price":queryResults[i].attributes.price,
      "seller":queryResults[i].attributes.seller,
      "sold":queryResults[i].attributes.sold,
      });
    } 

     console.log("results "+results)
    return { results }  

});
Parse.Cloud.define("getAllTokenIds", async ({params, user, ip}: any) => {
  try {
    const options = {
      address: "0xe431308cE602Ff13d23e82e92a1fbE0DC2826Ab5",
      chain:'0x61'
      };
      console.log("response2 ")
        let response = await Moralis.EvmApi.nft.getContractNFTs( options );
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    
    console.log("response "+response)
    return {response};
  } 
)

Parse.Cloud.define('getPluginSpecs', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define('getServerTime', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});
