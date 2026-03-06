import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: [
        '@synergetics/types',
        '@synergetics/utils',
        '@synergetics/auth',
        '@synergetics/api-client',
        '@synergetics/ui',
    ],
};

export default nextConfig;
