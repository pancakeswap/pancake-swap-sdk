import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { TokenAmount } from './entities/fractions/tokenAmount';
import { Pair } from './entities/pair';
import { abi as pairAbi } from 'quasar-v1-core/artifacts/contracts/QuasarPair.sol/QuasarPair.json';
import { abi as erc20Abi } from 'quasar-v1-core/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json';
import invariant from 'tiny-invariant';
import { ChainId, DEFAULT_RPC_URLS_MAP } from './constants';
import { Token } from './entities/token';

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {
  [ChainId.BSC_TESTNET]: {
    '0x64544969ed7EBf5f083679233325356EbE738930': 18
  }
};

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: string,
    rpcUrl = DEFAULT_RPC_URLS_MAP[chainId],
    symbol?: string,
    name?: string
  ): Promise<Token> {
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await new Contract(address, erc20Abi, new JsonRpcProvider(rpcUrl) as Provider).decimals().then((decimals: number): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals
              }
            };
            return decimals;
          });
    return new Token(chainId, address, parsedDecimals, symbol, name);
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(tokenA: Token, tokenB: Token, rpcUrl = DEFAULT_RPC_URLS_MAP[tokenA.chainId]): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID');
    const address = Pair.getAddress(tokenA, tokenB);
    const [reserves0, reserves1] = await new Contract(address, pairAbi, new JsonRpcProvider(rpcUrl) as Provider).getReserves();
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
    return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
  }
}
