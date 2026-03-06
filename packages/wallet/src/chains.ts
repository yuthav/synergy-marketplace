export interface ChainConfig {
    id: number;
    name: string;
    rpcUrl: string;
    explorerUrl: string;
    nativeCurrency: { name: string; symbol: string; decimals: number };
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
    ethereum: {
        id: 1,
        name: 'Ethereum',
        rpcUrl: process.env.ETH_RPC_URL ?? 'https://eth.llamarpc.com',
        explorerUrl: 'https://etherscan.io',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    base: {
        id: 8453,
        name: 'Base',
        rpcUrl: process.env.BASE_RPC_URL ?? 'https://mainnet.base.org',
        explorerUrl: 'https://basescan.org',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    polygon: {
        id: 137,
        name: 'Polygon',
        rpcUrl: 'https://polygon-rpc.com',
        explorerUrl: 'https://polygonscan.com',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    },
};
