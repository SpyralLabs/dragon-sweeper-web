import HeroFrame from '@/assets/images/game/left-hero-frame.webp';
import HeroFrameLeftTop from '@/assets/images/game/left-frame-lt.webp';
import HeroFrameLeftBottom from '@/assets/images/game/left-frame-lb.webp';
import HeroFrameRightTop from '@/assets/images/game/left-frame-rt.webp';
import HeroFrameRightBottom from '@/assets/images/game/left-frame-rb.webp';
import LevelFrame from '@/assets/images/game/level.webp';
import LevelUpEffect from '@/assets/images/gif/effect-level-up.gif';
import LevelupText from '@/assets/images/game/text-levelup.webp';
import { useGameLogic } from '../hooks/use-game-logic';
import { useCharacter, type CharacterState } from '../hooks/use-character';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils/tailwind-util';
import { motion } from 'framer-motion';

export default function Character() {
  const [isLevelUp, setIsLevelUp] = useState(false);
  const { level, canLevelUp, hp, attacked, levelUp } = useGameLogic();
  const { basic, zero, attack, levelup } = useCharacter({ type: 'Aomi' });
  const currentState: CharacterState = useMemo(() => {
    if (canLevelUp) return 'levelup';
    if (hp === 0) return 'zero';
    if (attacked) return 'attack';
    return 'basic';
  }, [canLevelUp, hp, attacked]);

  return (
    <div className="relative z-2 flex flex-col items-center justify-center p-3">
      <img
        src={HeroFrame}
        alt="Hero Frame"
        className="absolute inset-0 h-full w-full select-none"
        draggable={false}
      />

      {/* 모든 캐릭터 이미지를 미리 로드하고 필요에 따라 표시/숨김 */}
      <img
        key={`${currentState}-basic`}
        src={basic}
        alt="Hero Basic"
        className={`z-1 aspect-[372/469] w-full object-cover object-top select-none ${
          currentState === 'basic' ? 'block' : 'hidden'
        }`}
        draggable={false}
      />
      <img
        key={`${currentState}-zero`}
        src={zero}
        alt="Hero Idle"
        className={`z-1 aspect-[372/469] w-full object-cover object-top select-none ${
          currentState === 'zero' ? 'block' : 'hidden'
        }`}
        draggable={false}
      />
      <img
        key={`${currentState}-attack`}
        src={attack}
        alt="Hero Attack"
        className={`z-1 aspect-[372/469] w-full object-cover object-top select-none ${
          currentState === 'attack' ? 'block' : 'hidden'
        }`}
        draggable={false}
      />
      <img
        key={`${currentState}-levelup`}
        src={levelup}
        alt="Hero Level Up"
        className={`z-1 aspect-[372/469] w-full object-cover object-top select-none ${
          currentState === 'levelup' ? 'block' : 'hidden'
        }`}
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
      <motion.img
        initial={{ opacity: 0, scale: 0.3, y: 30, rotate: -10 }}
        animate={{
          opacity: isLevelUp ? 1 : 0,
          scale: isLevelUp ? [0.3, 1.2, 1] : 0.3,
          y: isLevelUp ? 0 : 30,
          rotate: isLevelUp ? [0, 5, 0] : -10,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          times: isLevelUp ? [0, 0.6, 1] : [0, 1],
        }}
        src={LevelupText}
        alt="Levelup Text"
        className="absolute bottom-10 left-1/2 z-2 w-1/2 max-w-none -translate-x-1/2 select-none"
        draggable={false}
      />
      <button
        className={cn([
          'absolute bottom-0 left-1/2 z-2 flex -translate-x-1/2 translate-y-1/2 cursor-default items-center justify-center',
          canLevelUp && 'cursor-pointer',
        ])}
        onClick={() => {
          if (canLevelUp) {
            levelUp();
            setIsLevelUp(true);
            // 애니메이션 완료 후 텍스트 숨김
            setTimeout(() => {
              setIsLevelUp(false);
            }, 2000);
          }
        }}
      >
        {canLevelUp && (
          <img
            src={LevelUpEffect}
            alt="Level Up Effect"
            className="absolute bottom-1/3 left-1/2 z-2 w-[200%] max-w-none -translate-x-1/2 select-none"
            draggable={false}
          />
        )}
        <img
          src={LevelFrame}
          alt="Level Frame"
          className="z-2 w-16 select-none"
          draggable={false}
        />
        <p className="absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 text-sm">
          Lv.{level}
        </p>
      </button>
    </div>
  );
}
