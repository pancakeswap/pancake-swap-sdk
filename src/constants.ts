import JSBI from 'jsbi';

// exports for external consumption
export type BigintIsh = JSBI | number | string;

export enum ChainId {
  BSC_TESTNET = 97
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS_MAP = {
  [ChainId.BSC_TESTNET]: '0x583DD96cD23602979333B98bB81dFd22b55faa46'
};

export const INIT_CODE_HASH_MAP = {
  [ChainId.BSC_TESTNET]: '0xde779d283b8738f357e793b9d75c6a3c198479994ba2b4882e5843d46b762857'
};

export const ETHER_DECIMALS_NAMES_SYMBOLS_MAP = {
  [ChainId.BSC_TESTNET]: {
    decimals: 18,
    name: 'Binance Coin',
    symbol: 'BNB'
  }
};

export const DEFAULT_RPC_URLS_MAP = {
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s3.binance.org:8545'
};

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);
export const THREE = JSBI.BigInt(3);
export const FIVE = JSBI.BigInt(5);
export const TEN = JSBI.BigInt(10);
export const _100 = JSBI.BigInt(100);
export const FEES_NUMERATOR = JSBI.BigInt(9975);
export const FEES_DENOMINATOR = JSBI.BigInt(10000);

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
};
