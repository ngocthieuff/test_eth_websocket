const Web3 = require('web3');

const provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758')
const web3 = new Web3(provider);

web3.eth.subscribe('newBlockHeaders').on('data', async block => { console.log(`new block ${block.number}`);})
// https://github.com/web3/web3.js/issues/1354
provider.on('error', e => console.log('WS Error', e));
// https://github.com/web3/web3.js/issues/1354#issuecomment-389722913
provider.on('end', e => {
    console.log('WS closed');
    console.log('Attempting to reconnect...');
    provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);

    provider.on('connect', function () {
        console.log('WSS Reconnected');
    });
    
    web3.setProvider(provider);
});/*
result belike:
[ngocthieu@NT-majaro web3js]$ node get_new_eth_block.js
new block 15629363
new block 15629364
new block 15629365
*/