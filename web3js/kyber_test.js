// url 
// https://docs.kyberswap.com/Legacy/api-abi/contract-abis/api_abi-abi
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758'));

const kyberAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'trader',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'contract IERC20',
          name: 'src',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'contract IERC20',
          name: 'dest',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'destAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'actualSrcAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'actualDestAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'platformWallet',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'platformFeeBps',
          type: 'uint256',
        },
      ],
      name: 'ExecuteTrade',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'contract ERC20', name: 'src', type: 'address' },
        { internalType: 'contract ERC20', name: 'dest', type: 'address' },
        { internalType: 'uint256', name: 'srcQty', type: 'uint256' },
      ],
      name: 'getExpectedRate',
      outputs: [
        { internalType: 'uint256', name: 'expectedRate', type: 'uint256' },
        { internalType: 'uint256', name: 'worstRate', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'src', type: 'address' },
        { internalType: 'contract IERC20', name: 'dest', type: 'address' },
        { internalType: 'uint256', name: 'srcQty', type: 'uint256' },
        { internalType: 'uint256', name: 'platformFeeBps', type: 'uint256' },
        { internalType: 'bytes', name: 'hint', type: 'bytes' },
      ],
      name: 'getExpectedRateAfterFee',
      outputs: [
        { internalType: 'uint256', name: 'expectedRate', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'src', type: 'address' },
        { internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
        { internalType: 'contract IERC20', name: 'dest', type: 'address' },
        { internalType: 'address payable', name: 'destAddress', type: 'address' },
        { internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
        { internalType: 'uint256', name: 'minConversionRate', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'platformWallet',
          type: 'address',
        },
      ],
      name: 'trade',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract ERC20', name: 'src', type: 'address' },
        { internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
        { internalType: 'contract ERC20', name: 'dest', type: 'address' },
        { internalType: 'address payable', name: 'destAddress', type: 'address' },
        { internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
        { internalType: 'uint256', name: 'minConversionRate', type: 'uint256' },
        { internalType: 'address payable', name: 'walletId', type: 'address' },
        { internalType: 'bytes', name: 'hint', type: 'bytes' },
      ],
      name: 'tradeWithHint',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'src', type: 'address' },
        { internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
        { internalType: 'contract IERC20', name: 'dest', type: 'address' },
        { internalType: 'address payable', name: 'destAddress', type: 'address' },
        { internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
        { internalType: 'uint256', name: 'minConversionRate', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'platformWallet',
          type: 'address',
        },
        { internalType: 'uint256', name: 'platformFeeBps', type: 'uint256' },
        { internalType: 'bytes', name: 'hint', type: 'bytes' },
      ],
      name: 'tradeWithHintAndFee',
      outputs: [{ internalType: 'uint256', name: 'destAmount', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
  ];

// https://etherscan.io/address/0x818e6fecd516ecc3849daf6845e3ec868087b755#code
const kyberAddress = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
// https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#tokenInfo
const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const kyber = new web3.eth.Contract(
    kyberAbi,
    kyberAddress
);

web3.eth.subscribe('newBlockHeaders')
        .on('data', async block => {
            console.log(`new block ${block.number}`);

            const kyberResults = await 
                kyber
                    .methods
                    .getExpectedRate(
                        daiAddress,
                        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                        1000,
                    )
                    .call()
                ;

                console.log('Kyber ETH/DAI');
                console.log(kyberResults);
        });