import { motion } from 'framer-motion';
import RightPanelFrame from '@/assets/images/game/right-frame.webp';
import { useGameLogic } from '@/features/minesweeper/hooks/use-game-logic';
import BoardCell from './board-cell';

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

export default function GameRightPannel() {
  const { board, handleCellClick, handleCellRightClick, toggleAllBoardForTest, dungeon } =
    useGameLogic();
  console.log(dungeon);
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
      <div className="relative z-1 flex w-full flex-col gap-0.5">
        {board.map((row, i) => (
          <div className="flex w-full flex-1 items-stretch gap-0.5" key={`${i}`}>
            {row.map((cell, j) => (
              <BoardCell
                className="flex-1"
                key={`${i}-${j}`}
                cell={cell}
                x={j}
                y={i}
                onClick={() => {
                  handleCellClick({ x: j, y: i });
                }}
                onRightClick={() => {
                  handleCellRightClick({ x: j, y: i, marked: cell.marked });
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        className="fixed right-4 bottom-4 z-[9999] h-10 w-60 bg-amber-50 text-black"
        onClick={toggleAllBoardForTest}
      >
        Toggle All Board
      </button>
    </motion.div>
  );
}
