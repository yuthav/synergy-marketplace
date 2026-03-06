export interface WalletBalance {
    address: string;
    chain: string;
    nativeBalance: string;
    nativeSymbol: string;
    usdValue: number;
}

export async function getEthBalance(address: string, _rpcUrl?: string): Promise<WalletBalance> {
    // In production: use viem's publicClient.getBalance()
    // Stubbed for local development
    return {
        address,
        chain: 'ethereum',
        nativeBalance: '0.00',
        nativeSymbol: 'ETH',
        usdValue: 0,
    };
}

export async function getSolBalance(address: string, _rpcUrl?: string): Promise<WalletBalance> {
    // In production: use @solana/web3.js Connection.getBalance()
    // Stubbed for local development
    return {
        address,
        chain: 'solana',
        nativeBalance: '0.00',
        nativeSymbol: 'SOL',
        usdValue: 0,
    };
}
