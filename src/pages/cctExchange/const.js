export const NORMAL_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'base',
    outputs: [
      {
        name: 'base',
        type: 'uint256',
      },
      // {
      //   internalType: 'string',
      //   name: '',
      //   type: 'string',
      // },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{
      internalType: 'uint8',
      name: '',
      type: 'uint8',
    }],
    stateMutability: 'view',
    type: 'function',
  },

  {
    inputs: [{
      internalType: 'address',
      name: '_spender',
      type: 'address',
    }, {
      internalType: 'uint256',
      name: '_value',
      type: 'uint256',
    }],
    name: 'approve',
    outputs: [{
      internalType: 'bool',
      name: 'success',
      type: 'bool',
    }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { "inputs": [ { "internalType": "uint256", "name": "wad", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
]

export const WCCT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"uint256","name":"initialSupply","internalType":"uint256"},{"type":"string","name":"tokenName","internalType":"string"},{"type":"uint8","name":"decimalUnits","internalType":"uint8"},{"type":"string","name":"tokenSymbol","internalType":"string"}]},{"type":"event","name":"Burn","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"dst","internalType":"address","indexed":true},{"type":"uint256","name":"wad","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Freeze","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Unfreeze","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawal","inputs":[{"type":"address","name":"src","internalType":"address","indexed":true},{"type":"uint256","name":"wad","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"_spender","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"burn","inputs":[{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositToken","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"exchangelist","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"freeze","inputs":[{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"freezeOf","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"miner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address payable"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMiner","inputs":[{"type":"address","name":"newMiner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOwner","inputs":[{"type":"address","name":"newOwner","internalType":"address payable"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setWhitelist","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setexchangelist","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token_cct","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalBurn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"_from","internalType":"address"},{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"fee","internalType":"uint256"}],"name":"transfer_fee","inputs":[{"type":"address","name":"_from","internalType":"address"},{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"unfreeze","inputs":[{"type":"uint256","name":"_value","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"whitelist","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawQKI","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawToken","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]

export const BASE_URL = process.env.NODE_ENV == 'development' ? 'http://exchange.siru.com/api/' : "https://api.web3defi.io/api/";