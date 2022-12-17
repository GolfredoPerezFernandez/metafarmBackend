"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./generated/evmApi");
require("./generated/solApi");
const authService_1 = require("../auth/authService");
const moralis_1 = __importDefault(require("moralis"));
const serverUrl = "https://metafarmlands.herokuapp.com/server";
const appId = '001';
Parse.Cloud.define('requestMessage', async ({ params }) => {
    const { address, chain, networkType } = params;
    const message = await (0, authService_1.requestMessage)({
        address,
        chain,
        networkType,
    });
    return { message };
});
Parse.Cloud.define('getMarketItems', async () => {
    const query = new Parse.Query("BinancelandsLogs");
    const queryResults = await query.find();
    console.log("results " + queryResults);
    const results = [];
    for (let i = 0; i < queryResults.length; ++i) {
        results.push({
            "itemId": queryResults[i].attributes.itemId,
            "price": queryResults[i].attributes.price,
            "seller": queryResults[i].attributes.seller,
            "sold": queryResults[i].attributes.sold,
        });
    }
    console.log("results " + results);
    return { results };
});
Parse.Cloud.define('getAllTokenIds', async () => {
    const options = {
        address: "0xe431308cE602Ff13d23e82e92a1fbE0DC2826Ab5",
        chain: '0x61'
    };
    console.log("response2 ");
    let response = await moralis_1.default.Web3API.token.getAllTokenIds(options);
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    console.log("response " + response);
    return { response };
});
Parse.Cloud.define('getPluginSpecs', () => {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return [];
});
Parse.Cloud.define('getServerTime', () => {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return null;
});
//# sourceMappingURL=main.js.map