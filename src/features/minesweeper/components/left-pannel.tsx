import { motion } from 'framer-motion';
import LeftPanelFrame from '@/assets/images/game/left-frame.webp';
import HeroFrame from '@/assets/images/game/left-hero-frame.webp';
import HPFrame from '@/assets/images/game/left-hp-frame.webp';
import Hero from '@/assets/images/hero/hero-sample.webp';
import HeroFrameLeftTop from '@/assets/images/game/left-frame-lt.webp';
import HeroFrameLeftBottom from '@/assets/images/game/left-frame-lb.webp';
import HeroFrameRightTop from '@/assets/images/game/left-frame-rt.webp';
import HeroFrameRightBottom from '@/assets/images/game/left-frame-rb.webp';
import { useMemo } from 'react';
import { useGameLogic } from '../hooks/use-game-logic';
import Icons from '@/components/ui/icons';
import { cn } from '@/lib/utils/tailwind-util';

const leftPanelVariants = {
  initial: {
    opacity: 0,
    x: -100,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
};

export default function GameLeftPannel() {
  const { hp, exp, nextLevelExp, maxHp } = useGameLogic();

  const hpRenderer = useMemo(() => {
    let filledHp = hp;
    const groupOfMaxHp = Math.ceil(maxHp / 5);
    const resetOfMaxHp = maxHp % 5 || 5;
    const hpBar = Array.from({ length: groupOfMaxHp }).map((_, i) => {
      return Array.from({ length: i === groupOfMaxHp - 1 ? resetOfMaxHp : 5 }).map((_, j) => {
        const item =
          filledHp > 0 ? (
            <Icons.HeartFilled key={`${i}-${j}`} />
          ) : (
            <Icons.HeartDisabled key={`${i}-${j}`} />
          );
        filledHp--;
        return item;
      });
    });
    return hpBar;
  }, [hp, maxHp]);

  const expRenderer = useMemo(() => {
    let filledExp = exp;

    return Array.from({ length: nextLevelExp }).map((_, i) => {
      const item =
        filledExp > 0 ? (
          <Icons.ExpFilled
            style={{ left: `${i * 13}px` }}
            className={cn(['absolute top-0 translate-y-2', i % 2 === 0 && '-translate-y-2'])}
            key={`${i}`}
          />
        ) : (
          <Icons.ExpDisabled
            style={{ left: `${i * 13}px` }}
            className={cn(['absolute top-0 translate-y-2', i % 2 === 0 && '-translate-y-2'])}
            key={`${i}`}
          />
        );
      filledExp--;
      return item;
    });
  }, [exp, nextLevelExp]);

  return (
    <motion.div
      variants={leftPanelVariants}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative flex w-100 shrink-0 flex-col gap-[15px] p-6"
    >
      <img
        src={LeftPanelFrame}
        alt="Left Panel Frame"
        className="absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
      <div className="relative z-1 flex flex-col items-center justify-center p-3">
        <img
          src={HeroFrame}
          alt="Hero Frame"
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
        />
        <img
          src={Hero}
          alt="Hero"
          className="z-1 aspect-[372/469] w-full object-cover object-top select-none"
          draggable={false}
        />
        <img
          src={HeroFrameLeftTop}
          alt="Hero Frame Left Top"
          className="absolute top-0 left-0 z-2 aspect-[45/43] w-[45px] object-contain select-none"
          draggable={false}
        />
        <img
          src={HeroFrameLeftBottom}
          alt="Hero Frame Left Bottom"
          className="absolute bottom-0 left-0 z-2 aspect-[45/43] w-[45px] object-contain select-none"
          draggable={false}
        />
        <img
          src={HeroFrameRightTop}
          alt="Hero Frame Right Top"
          className="absolute top-0 right-0 z-2 aspect-[45/43] w-[45px] object-contain select-none"
          draggable={false}
        />
        <img
          src={HeroFrameRightBottom}
          alt="Hero Frame Right Bottom"
          className="absolute right-0 bottom-0 z-2 aspect-[45/43] w-[45px] object-contain select-none"
          draggable={false}
        />
      </div>
      <div className="relative z-1 flex flex-col items-center justify-center">
        <img
          src={HPFrame}
          alt="HP Frame"
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
        />
        <div className="relative z-1 mb-7 flex flex-col items-center justify-center">
          <p className="mt-8 text-center text-lg text-[#F0FFE6]">NFT Name</p>
          <div className="mt-4 grid w-full grid-cols-2 gap-x-4.5 gap-y-1">
            {hpRenderer.map((row) => (
              <div className="flex items-center justify-center" key={row.join('-')}>
                {row.map((item) => item)}
              </div>
            ))}
          </div>
          <div className="relative mt-5 h-[34px] w-full self-start">
            {expRenderer.map((item) => item)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
