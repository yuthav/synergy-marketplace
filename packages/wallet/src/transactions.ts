export interface TransactionRequest {
    to: string;
    value: string;
    chainId: number;
    data?: string;
}

export function buildEthTransaction(
    to: string,
    amountWei: string,
    chainId: number,
    data?: string,
): TransactionRequest {
    return { to, value: amountWei, chainId, data };
}
