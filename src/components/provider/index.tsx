import { SUPPORTED_NETWORK } from '@/lib/config/network-config';
import { AbstractWalletProvider } from '@abstract-foundation/agw-react';
import WagmiProvider from './wagmi-provider';

export default function _Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <AbstractWalletProvider chain={SUPPORTED_NETWORK}>{children}</AbstractWalletProvider>;
    </WagmiProvider>
  );
}
