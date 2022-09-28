const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758'));

web3.eth.subscribe('newBlockHeaders').on('data', async block => { console.log(`new block ${block.number}`);})

/*
result belike:
[ngocthieu@NT-majaro web3js]$ node get_new_eth_block.js
new block 15629363
new block 15629364
new block 15629365
*/