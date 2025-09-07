import BackgroundPattern from '@/assets/images/layout/header-bg-pattern.webp';
import AssetLabel from '@/components/ui/asset-label';
import WalletConnectButton from '@/components/widgets/wallet-connect-button';
import { DesktopLogo } from '@/components/ui/logo';
import { MENU_LIST } from '@/lib/config/menu-config';
import { useGameConfig } from '@/lib/hooks/use-game-config';

export function Header() {
  const { status } = useGameConfig();
  const canEnterGame = status.canEnterGame;

  return (
    <header className="max-w-desktop-max relative mx-auto flex h-[180px] w-full flex-col px-5">
      <img
        src={BackgroundPattern}
        alt="Background Pattern"
        className="absolute inset-0 h-full w-full"
      />
      <div className="mx-auto flex h-14 w-full items-center border border-b-[3px] bg-[#261a17]">
        <div className="mr-32 flex items-center justify-end">
          <AssetLabel type="eth" />
          <AssetLabel type="account" />
          <WalletConnectButton />
        </div>
      </div>
      <div className="mx-auto flex w-[1602px] items-center justify-center">
        <DesktopLogo />
        {canEnterGame && (
          <nav className="flex h-20 items-center gap-[5px]">
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
