const EXCHANGE_RATES: Record<string, number> = {
    ETH: 3500,
    SOL: 150,
    BTC: 95000,
    USDC: 1,
    USDT: 1,
};

export function formatUsd(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatCrypto(amount: number, currency: string): string {
    const decimals = ['USDC', 'USDT'].includes(currency) ? 2 : 6;
    return `${amount.toFixed(decimals)} ${currency}`;
}

export function usdToCrypto(usdAmount: number, currency: string): number {
    const rate = EXCHANGE_RATES[currency];
    if (!rate) throw new Error(`Unsupported currency: ${currency}`);
    return usdAmount / rate;
}

export function cryptoToUsd(cryptoAmount: number, currency: string): number {
    const rate = EXCHANGE_RATES[currency];
    if (!rate) throw new Error(`Unsupported currency: ${currency}`);
    return cryptoAmount * rate;
}

export function formatCompactNumber(num: number): string {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(num);
}

export function formatPercentage(value: number, decimals = 1): string {
    return `${value.toFixed(decimals)}%`;
}
