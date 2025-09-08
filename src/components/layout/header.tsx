import BackgroundPattern from '@/assets/images/layout/header-bg-pattern.webp';
import AssetLabel from '@/components/ui/asset-label';
import WalletConnectButton from '@/components/widgets/wallet-connect-button';
import { DesktopLogo } from '@/components/ui/logo';
import { MENU_LIST } from '@/lib/config/menu-config';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import { useAccount } from 'wagmi';

export function Header() {
  const { status } = useGameConfig();
  const { address } = useAccount();

  const canEnterGame = status.canEnterGame;

  return (
    <header className="max-w-desktop-max relative mx-auto flex h-[180px] w-full flex-col overflow-x-hidden">
      <img
        src={BackgroundPattern}
        alt="Background Pattern"
        className="w-desktop-max absolute inset-0 z-0 h-full max-w-none! select-none"
        draggable={false}
      />
      <div className="z-1 flex h-14 w-full items-center border-b-[3px] border-b-black bg-[#261a17] px-5">
        <div className="z-1 mr-32 ml-auto flex items-center justify-center gap-2.5">
          <AssetLabel type="eth" />
          <AssetLabel type="account" />
          <WalletConnectButton variant="link" explicitAction="disconnect" className="ml-8">
            Disconnect
          </WalletConnectButton>
        </div>
      </div>
      <div className="z-1 mx-auto flex w-[1602px] flex-1 items-center justify-between px-5">
        <DesktopLogo />
        {canEnterGame && (
          <nav className="z-1 flex h-20 items-center gap-[5px]">
            {MENU_LIST.map((menu) => (
              <button key={menu.modalKey} className="flex flex-col items-center justify-between">
                {menu.icon}
                {menu.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
