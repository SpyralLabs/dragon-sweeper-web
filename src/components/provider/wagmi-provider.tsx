import { SUPPORTED_NETWORK } from '@/lib/config/network-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { abstract, abstractTestnet } from 'viem/chains';
import { createConfig, createStorage, http, WagmiProvider } from 'wagmi';

export const queryClient = new QueryClient();
export const wagmiConfig = createConfig({
  storage: createStorage({ storage: window.localStorage }),
  chains: [SUPPORTED_NETWORK],
  transports: {
    [abstract.id]: http(),
    [abstractTestnet.id]: http(),
  },
});

export default function _WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
