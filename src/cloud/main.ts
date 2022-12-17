
/* eslint-disable no-console */
declare const Parse: any;
import './generated/evmApi';
import './generated/solApi';
import { requestMessage } from '../auth/authService';

   
  
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

Parse.Cloud.define('getPluginSpecs', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define('getServerTime', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});
