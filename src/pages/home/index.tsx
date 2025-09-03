import NavLogo from '@/assets/images/landing/nav-logo.webp';
import Characters from '@/assets/images/landing/hero-characters.webp';
import FocusFrame from '@/assets/images/landing/focus-frame.webp';

export default function HomePage() {
  return (
    <main className="relative flex min-h-[1080px] w-full flex-col items-center overflow-hidden">
      <div className="absolute inset-0 -z-1 h-full w-full bg-[url(/src/assets/images/landing/bg-texture.webp)]" />
      <img
        src={NavLogo}
        alt="Nav Logo"
        className="w-desktop-max z-1 h-auto max-w-none select-none"
        draggable={false}
      />
      <img
        src={Characters}
        alt="Characters"
        className="absolute bottom-0 left-1/2 aspect-[1157/1019] h-auto w-[1157px] max-w-none -translate-x-1/2 select-none"
        draggable={false}
      />
      <div className="absolute bottom-[76px] left-1/2 z-1 flex h-[172px] w-105 -translate-x-1/2 items-center justify-center">
        <img src={FocusFrame} alt="Focus Frame" className="absolute inset-0 h-full w-full" />
        <button>connect wallet</button>
      </div>
    </main>
  );
}
