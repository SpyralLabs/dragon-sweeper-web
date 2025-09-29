import { SUPPORTED_NETWORK } from '@/lib/config/network-config';
import { AbstractWalletProvider } from '@abstract-foundation/agw-react';
import WagmiProvider from '@/components/provider/wagmi-provider';
import { Provider as JotaiProvider } from 'jotai';
import store from '@/lib/config/store-config';

export default function _Provider({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider store={store}>
      <WagmiProvider>
        <AbstractWalletProvider chain={SUPPORTED_NETWORK}>{children}</AbstractWalletProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
