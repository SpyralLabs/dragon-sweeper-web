import { motion } from 'framer-motion';
import LeftPanelFrame from '@/assets/images/game/left-frame.webp';
import HPFrame from '@/assets/images/game/left-hp-frame.webp';
import { useMemo } from 'react';
import { useGameLogic } from '../hooks/use-game-logic';
import Icons from '@/components/ui/icons';
import { cn } from '@/lib/utils/tailwind-util';
import Character from './character';

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
  const { hp, exp, nextLevelExp, maxHp, previewHp } = useGameLogic();

  const hpRenderer = useMemo(() => {
    let filledHp = hp;
    const _maxHp = previewHp ? maxHp + 1 : maxHp;
    const groupOfMaxHp = Math.ceil(_maxHp / 5);
    const resetOfMaxHp = _maxHp % 5 || 5;
    const hpBar = Array.from({ length: groupOfMaxHp }).map((_, i) => {
      return Array.from({ length: i === groupOfMaxHp - 1 ? resetOfMaxHp : 5 }).map((_, j) => {
        let item =
          filledHp > 0 ? (
            <Icons.HeartFilled key={`${i}-${j}`} />
          ) : (
            <Icons.HeartUsed key={`${i}-${j}`} />
          );
        if (previewHp && i === groupOfMaxHp - 1 && j === resetOfMaxHp - 1) {
          item = <Icons.HeartDisabled key={`${i}-${j}`} />;
        }
        filledHp--;
        return item;
      });
    });
    return hpBar;
  }, [hp, maxHp, previewHp]);

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
      <Character />
      <div className="relative z-1 flex flex-col items-center justify-center">
        <img
          src={HPFrame}
          alt="HP Frame"
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
        />
        <div className="relative z-1 mb-7 flex flex-col items-center justify-center">
          <p className="mt-8 text-center text-lg text-[#F0FFE6]">Aomi</p>
          <div className="mt-4 grid w-full grid-cols-2 gap-x-4.5 gap-y-1">
            {hpRenderer.map((row) => (
              <div className="flex items-center justify-start" key={row.join('-')}>
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
