import { Button } from '@/components/ui/button';
import FrameGameOver from '@/assets/images/game/frame-gameover.webp';
import { useNavigate } from 'react-router';
import useMusic from '@/lib/hooks/use-music';
import { useEffect } from 'react';
import { SOUNDS } from '@/lib/config/music-config';
import Icons from '@/components/ui/icons';
import GameClear from '@/assets/images/game/game-clear.webp';
import { useSetAtom } from 'jotai';
import { resetGameAtom } from '@/state/game';

export default function GameWonDialog() {
  const navigate = useNavigate();
  const { playSound } = useMusic();
  const resetGame = useSetAtom(resetGameAtom);

  useEffect(() => {
    playSound(SOUNDS.ingame.clear);
  }, []);

  return (
    <div className="absolute inset-0 z-[9999] flex h-full w-full flex-col items-center justify-center bg-black pt-8 pb-[70px]">
      <time className="pb-3.5 text-[#BEC5BA]">00:00:00</time>
      <div className="relative aspect-[790/382] w-[700px]">
        <img
          src={GameClear}
          alt="Game Clear"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute top-0 left-1/2 flex w-[396px] -translate-x-1/2 flex-col items-center gap-4 bg-black p-6 font-bold text-[#BEC5BA]">
          <div className="flex items-center gap-1">
            <p className="text-inherit">Score: </p>
            <p className="text-white">- </p>
            <p className="text-inherit">/ 365</p>
          </div>
          <div className="flex items-center gap-1 font-bold text-[#BEC5BA]">
            <p className="text-inherit">Gold (xN): </p>
            <div className="flex items-center gap-1 text-white">
              <Icons.Point className="size-[22px]" /> -P
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[22px] flex flex-col items-center">
        <h1 className="text-center text-xl leading-10 font-bold text-[#F0FFE6]">
          Congratulations, hero!
        </h1>
        <p className="text-center text-base text-[#BEC5BA]">
          You defeated the Dark Lord and rescued the princess.
          <br />
          You{"'"}ve received Reward Points!
        </p>
        <svg
          width="328"
          height="76"
          viewBox="0 0 328 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ marginTop: 22 }}
        >
          <path d="M313.5 18.5V20.5H315.5V22.5H317.5V75.5H30.5V18.5H313.5Z" stroke="#F0FFE6" />
          <path d="M34 14H318V16H320V18H322V72H34V14Z" fill="#F0FFE6" />
          <path
            d="M72.25 34H74.75V54H72.25V34ZM74.75 36.5H77.25V41.5H74.75V36.5ZM77.25 41.5H79.75V49H77.25V41.5ZM79.75 49H82.25V54H79.75V49ZM82.25 41.5H84.75V49H82.25V41.5ZM84.75 36.5H87.25V41.5H84.75V36.5ZM87.25 34H89.75V54H87.25V34ZM92.25 41.5H94.75V51.5H92.25V41.5ZM94.75 51.4H102.25V54H94.75V51.4ZM102.25 41.5H104.75V51.5H102.25V41.5ZM94.75 39H102.25V41.6H94.75V39ZM107.25 39H109.75V54H107.25V39ZM109.75 41.5H112.25V44H109.75V41.5ZM112.25 39H114.75V41.5H112.25V39ZM117.25 41.5H119.75V51.5H117.25V41.5ZM119.75 51.5H127.25V54H119.75V51.5ZM127.25 49H129.75V51.5H127.25V49ZM119.75 39H127.25V41.6H119.75V39ZM127.25 41.5H129.75V44H127.25V41.5ZM119.75 44H129.75V46.5H119.75V44ZM139.75 34H142.25V54H139.75V34ZM142.25 34H149.75V36.5H142.25V34ZM149.65 36.5H152.25V44H149.65V36.5ZM142.25 44H149.75V46.5H142.25V44ZM154.75 39H157.25V54H154.75V39ZM157.25 41.5H159.75V44H157.25V41.5ZM159.75 39H162.25V41.5H159.75V39ZM164.75 39H167.25V54H164.75V39ZM164.75 34H167.25V36.5H164.75V34ZM169.75 39H172.25V54H169.75V39ZM172.25 39H179.75V41.5H172.25V39ZM179.75 41.5H182.25V54H179.75V41.5ZM184.75 41.5H187.25V51.5H184.75V41.5ZM187.25 51.5H194.75V54H187.25V51.5ZM194.75 49H197.25V51.5H194.75V49ZM187.25 39H194.75V41.5H187.25V39ZM194.75 41.5H197.25V44H194.75V41.5ZM199.75 41.5H202.25V51.5H199.75V41.5ZM202.25 51.5H209.75V54H202.25V51.5ZM209.75 49H212.25V51.5H209.75V49ZM202.25 39H209.75V41.6H202.25V39ZM209.75 41.5H212.25V44H209.75V41.5ZM202.25 44H212.25V46.5H202.25V44ZM214.75 49H217.25V51.5H214.75V49ZM217.25 51.5H224.75V54H217.25V51.5ZM224.75 49H227.25V51.5H224.75V49ZM222.25 46.5H224.75V49H222.25V46.5ZM217.25 44H222.25V46.5H217.25V44ZM214.75 41.5H217.25V44H214.75V41.5ZM217.25 39H224.75V41.5H217.25V39ZM224.75 41.5H227.25V44H224.75V41.5ZM229.75 49H232.25V51.5H229.75V49ZM232.25 51.5H239.75V54H232.25V51.5ZM239.75 49H242.25V51.5H239.75V49ZM237.25 46.5H239.75V49H237.25V46.5ZM232.25 44H237.25V46.5H232.25V44ZM229.75 41.5H232.25V44H229.75V41.5ZM232.25 39H239.75V41.5H232.25V39ZM239.75 41.5H242.25V44H239.75V41.5ZM244.75 41.5H247.25V51.5H244.75V41.5ZM247.25 51.5H254.75V54H247.25V51.5ZM254.75 49H257.25V51.5H254.75V49ZM247.25 39H254.75V41.6H247.25V39ZM254.75 41.5H257.25V44H254.75V41.5ZM247.25 44H257.25V46.5H247.25V44ZM259.75 49H262.25V51.5H259.75V49ZM262.25 51.5H269.75V54H262.25V51.5ZM269.75 49H272.25V51.5H269.75V49ZM267.25 46.5H269.75V49H267.25V46.5ZM262.25 44H267.25V46.5H262.25V44ZM259.75 41.5H262.25V44H259.75V41.5ZM262.25 39H269.75V41.5H262.25V39ZM269.75 41.5H272.25V44H269.75V41.5Z"
            fill="black"
          />
          <path
            d="M300.471 56.6465H284.941V54.7061H300.441V43.7061H302.441V54.7061H300.471V56.6465ZM295.941 39.2061H284.941V54.7061H283V39.1758H284.941V37.2061H295.941V39.2061ZM294 46.9404H292.059V45H294V46.9404ZM295.941 45H294V43.0586H295.941V45ZM299.823 41.1172H297.883V43.0586H295.941V41.1172H297.882V39.1758H299.823V41.1172ZM305 43.0586H303.059V35.9404H296.588V34H305V43.0586ZM301.765 39.1758H299.823V37.2354H301.765V39.1758Z"
            fill="black"
          />
          <rect x="2" width="58" height="74" fill="url(#pattern0_310_125724)" />
          <defs>
            <pattern
              id="pattern0_310_125724"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_310_125724"
                transform="matrix(0.00869565 0 0 0.00681551 0 -0.00434783)"
              />
            </pattern>
            <image
              id="image0_310_125724"
              width="115"
              height="148"
              preserveAspectRatio="none"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
        <button className="mt-10 flex items-end underline">
          <svg
            width="27"
            height="22"
            viewBox="0 0 27 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: 'pointer' }}
            onClick={() => {}}
          >
            <g clip-path="url(#clip0_311_168461)">
              <path
                d="M21.4619 7.79471H24.2314V10.5642H27V13.3338H21.4609V22.3338H15.9229V16.7947H11.0762V22.3338H5.53809V13.3338H0V10.5642H2.76953V7.79471H5.53809V5.02518H8.30762V2.94901H11.0771V0.179474H15.9238V2.94901H18.6914V10.5642H18.6924V0.871857H21.4619V7.79471Z"
                fill="#F0FFE6"
              />
            </g>
            <defs>
              <clipPath id="clip0_311_168461">
                <rect width="27" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <button
            className="ml-1 text-base leading-4 text-[#F0FFE6]"
            onClick={() => {
              navigate('/');
              resetGame();
            }}
          >
            Return Home
          </button>
        </button>
      </div>
    </div>
  );
}
