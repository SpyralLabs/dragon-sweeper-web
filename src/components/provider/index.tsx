import { SUPPORTED_NETWORK } from '@/lib/config/network-config';
import { AbstractWalletProvider } from '@abstract-foundation/agw-react';
import WagmiProvider from '@/components/provider/wagmi-provider';
import { createStore, Provider as JotaiProvider } from 'jotai';

const store = createStore();

export default function _Provider({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider store={store}>
      <WagmiProvider>
        <AbstractWalletProvider chain={SUPPORTED_NETWORK}>{children}</AbstractWalletProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
