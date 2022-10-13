import { ChainId, WETH, Token, Fetcher } from '../src';

describe('data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.BSC_TESTNET, '0x64544969ed7EBf5f083679233325356EbE738930'); // DAI
    expect(token.decimals).toEqual(18);
  });

  it('Token:CACHE', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.BSC_TESTNET, '0x64544969ed7EBf5f083679233325356EbE738930'); // DGD
    expect(token.decimals).toEqual(18);
  });

  it('Pair', async () => {
    const token = new Token(ChainId.BSC_TESTNET, '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18); // DAI
    const pair = await Fetcher.fetchPairData(WETH[ChainId.BSC_TESTNET], token);
    expect(pair.liquidityToken.address.toLowerCase()).toEqual('0xd4e6772e2fc3c90ead9cfc3e3f3027a5a49e0cb9');
  });
});
