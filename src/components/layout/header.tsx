import BackgroundPattern from '@/assets/images/layout/header-bg-pattern.webp';
import DotHeroSampleImage from '@/assets/images/hero/hero-sample-dot.webp';
import AssetLabel from '@/components/ui/asset-label';
import WalletConnectButton from '@/components/widgets/wallet-connect-button';
import { DesktopLogo } from '@/components/ui/logo';
import { MENU_LIST } from '@/lib/config/menu-config';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import UserIngameStatus from '@/components/widgets/user-ingame-status';

export function Header() {
  const { status } = useGameConfig();

  const canEnterGame = status.canEnterGame;

  return (
    <header className="relative mx-auto flex h-[180px] w-full min-w-[1350px] max-w-[max(1920px,100dvw)] flex-col overflow-x-hidden">
      <img
        src={BackgroundPattern}
        alt="Background Pattern"
        className="absolute inset-0 z-0 h-full w-[max(1920px,100dvw)] max-w-none! select-none"
        draggable={false}
      />
      <div className="z-2 flex h-14 w-full items-center border-b-[3px] border-b-black bg-[#261a17] px-5">
        <div className="z-1 mr-3 ml-auto flex items-center justify-center gap-2.5">
          <AssetLabel type="eth" />
          <AssetLabel type="account" />
          <WalletConnectButton variant="link" explicitAction="disconnect" className="ml-8">
            Disconnect
          </WalletConnectButton>
        </div>
      </div>
      <div className="z-1 m-auto flex h-25 w-full max-w-[1602px] items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <DesktopLogo />
          {canEnterGame && <UserIngameStatus dotImage={DotHeroSampleImage} />}
        </div>
        {canEnterGame && (
          <nav className="z-1 flex h-20 items-center gap-5">
            {MENU_LIST.map((menu) => (
              <button
                key={menu.modalKey}
                className="flex flex-col items-center justify-between text-xs"
              >
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
