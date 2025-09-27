import { motion } from 'framer-motion';
import RightPanelFrame from '@/assets/images/game/right-frame.webp';
import { useGameLogic } from '@/features/minesweeper/hooks/use-game-logic';
import BoardCell from './board-cell';
import PopoverMarking from '@/components/widgets/popover-marking';
import { useCallback, useMemo, useRef, useState } from 'react';
import GameOverDialog from './game-over-dialog';
import { resetGameAtom } from '@/state/game';
import { useSetAtom } from 'jotai';

const rightPanelVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
};

interface RightClickInfo {
  pos: { x: number; y: number };
  clientPos: { x: number; y: number };
}

export default function GameRightPannel() {
  const {
    board,
    gameOver,
    gameWon,
    handleCellClick,
    handleCellRightClick,
    toggleAllBoardForTest,
    dungeon,
    calculateMonsterPowerSum,
  } = useGameLogic();
  const setResetGame = useSetAtom(resetGameAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rightClickInfo, setRightClickInfo] = useState<RightClickInfo | null>(null);

  // onClick 콜백을 완전히 메모이제이션
  const handleCellClickCallback = useCallback(
    (x: number, y: number) => {
      return () => {
        handleCellClick({ x, y });
      };
    },
    [handleCellClick],
  );

  // onRightClick 콜백을 완전히 메모이제이션
  const handleRightClickCallback = useCallback((x: number, y: number) => {
    return (pos: { x: number; y: number }, clientPos: { x: number; y: number }) => {
      setRightClickInfo({ pos, clientPos });
    };
  }, []);

  // rightClicking 상태를 useMemo로 메모이제이션
  const rightClickingMap = useMemo(() => {
    const map = new Map<string, boolean>();
    if (rightClickInfo) {
      const key = `${rightClickInfo.pos.x}-${rightClickInfo.pos.y}`;
      map.set(key, true);
    }
    return map;
  }, [rightClickInfo]);

  // 시작 위치 정보를 메모이제이션
  const startPosition = useMemo(() => {
    return dungeon?.startPos || { x: -1, y: -1 };
  }, [dungeon?.startPos]);

  // 각 셀의 시작 위치 여부를 미리 계산
  const isStartPositionMap = useMemo(() => {
    const map = new Map<string, boolean>();
    board.forEach((row, y) => {
      row.forEach((_, x) => {
        const key = `${x}-${y}`;
        map.set(key, startPosition.x === x && startPosition.y === y);
      });
    });
    return map;
  }, [board, startPosition]);

  const monsterPowerSumMap = useMemo(() => {
    const map = new Map<string, number | string>();
    board.forEach((row, y) => {
      row.forEach((_, x) => {
        const key = `${x}-${y}`;
        map.set(key, calculateMonsterPowerSum(Number(x), Number(y)));
      });
    });
    return map;
  }, [board, calculateMonsterPowerSum]);

  return (
    <motion.div
      variants={rightPanelVariants}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative flex w-full flex-1 p-6"
    >
      <img
        src={RightPanelFrame}
        alt="Left Panel Frame"
        className="absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
      <div className="relative z-1 flex w-full flex-col gap-0.5" ref={containerRef}>
        {board.map((row, i) => (
          <div className="flex w-full flex-1 items-stretch gap-0.5" key={`${i}`}>
            {row.map((cell, j) => (
              <BoardCell
                className="flex-1"
                key={`${i}-${j}`}
                cell={cell}
                x={j}
                y={i}
                rightClicking={rightClickingMap.has(`${j}-${i}`)}
                onClick={handleCellClickCallback(j, i)}
                onRightClick={handleRightClickCallback(j, i)}
                isStartPosition={isStartPositionMap.get(`${j}-${i}`) || false}
                monsterPowerSum={monsterPowerSumMap.get(`${j}-${i}`) || 0}
              />
            ))}
          </div>
        ))}
        <PopoverMarking
          containerRef={containerRef}
          clientX={rightClickInfo?.clientPos.x ?? 0}
          clientY={rightClickInfo?.clientPos.y ?? 0}
          marked={
            rightClickInfo
              ? board[rightClickInfo.pos.y ?? 0][rightClickInfo.pos.x ?? 0].marked
              : undefined
          }
          onMarking={(value) => {
            handleCellRightClick({
              x: rightClickInfo?.pos.x ?? 0,
              y: rightClickInfo?.pos.y ?? 0,
              marked: value,
            });
          }}
          onOpen={() => {
            setRightClickInfo(null);
          }}
        />
      </div>
      <p className="absolute top-[calc(100%+12px)] right-0 text-right text-sm text-[#828c7c]">
        If the game is interrupted, used resources cannot be refunded.
      </p>
      <button
        className="fixed right-4 bottom-4 z-[9999] h-10 w-60 bg-amber-50 text-black"
        onClick={toggleAllBoardForTest}
      >
        Toggle All Board
      </button>
      {gameOver && (
        <GameOverDialog
          onClick={() => {
            setResetGame();
          }}
        />
      )}
    </motion.div>
  );
}
