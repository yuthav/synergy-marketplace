const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const SOL_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TX_HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;

export function isValidEthAddress(address: string): boolean {
    return ETH_ADDRESS_REGEX.test(address);
}

export function isValidSolAddress(address: string): boolean {
    return SOL_ADDRESS_REGEX.test(address);
}

export function isValidTxHash(hash: string): boolean {
    return TX_HASH_REGEX.test(hash);
}

export function shortenAddress(address: string, chars = 4): string {
    if (address.length < chars * 2 + 2) return address;
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function getBlockchainExplorerUrl(
    chain: 'ethereum' | 'solana' | 'base' | 'polygon',
    type: 'tx' | 'address',
    value: string,
): string {
    const explorers: Record<string, string> = {
        ethereum: 'https://etherscan.io',
        solana: 'https://solscan.io',
        base: 'https://basescan.org',
        polygon: 'https://polygonscan.com',
    };

    const explorer = explorers[chain];
    if (!explorer) return '#';

    if (chain === 'solana') {
        return type === 'tx'
            ? `${explorer}/tx/${value}`
            : `${explorer}/account/${value}`;
    }

    return `${explorer}/${type}/${value}`;
}
