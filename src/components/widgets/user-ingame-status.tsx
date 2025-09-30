import SideFrame from '@/assets/images/layout/header-divider.webp';
import ProfileFrame from '@/assets/images/layout/frame-character.webp';
import UsernameFrame from '@/assets/images/layout/frame-username.webp';
import Icons from '@/components/ui/icons';
import useUsername from '@/lib/hooks/user-username';
import { formatInGameItemNumber } from '@/lib/utils/ingame-util';

interface Props {
  points?: number;
  portions?: number;
  dotImage: string;
}

export default function UserIngameStatus({ points = 0, portions = Infinity, dotImage }: Props) {
  const userName = useUsername();

  return (
    <div className="relative z-1 flex h-25 items-center gap-2">
      <img
        src={SideFrame}
        alt="side"
        className="absolute -bottom-0 aspect-[27/168] w-[27px] select-none"
        draggable={false}
      />
      <div className="ml-12 flex h-full items-stretch">
        <div className="relative flex size-25 items-center justify-center">
          <img
            src={ProfileFrame}
            alt="frame"
            className="absolute inset-0 z-0 size-full select-none"
            draggable={false}
          />
          <img src={dotImage} alt="dot" className="z-1 size-[70px] select-none" draggable={false} />
        </div>
        <div className="flex h-full w-[290px] flex-col">
          <div className="relative flex h-1/2 items-center px-4.5 py-3">
            <img
              src={UsernameFrame}
              alt="frame"
              className="absolute inset-0 z-0 size-full select-none"
              draggable={false}
            />
            <p className="z-1 px-1.5 py-3 text-sm">{userName}</p>
          </div>
          <div className="flex items-center px-1.5 py-[9px]">
            <Icons.Point />
            <p className="ml-1.5 text-sm">{formatInGameItemNumber(points)}P</p>
            <Icons.Potion className="ml-3.5" />
            <p className="ml-1.5 text-sm">X{formatInGameItemNumber(portions)}</p>
            <button className="ml-1.5">
              <Icons.Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
