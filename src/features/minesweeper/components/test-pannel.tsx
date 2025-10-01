import { hpAtom, maxHpAtom } from '@/state/game';
import { useGameLogic } from '../hooks/use-game-logic';
import { useSetAtom } from 'jotai';

export default function TestPannel() {
  const { toggleAllBoardForTest } = useGameLogic();
  const setHp = useSetAtom(hpAtom);
  const setMaxHp = useSetAtom(maxHpAtom);

  return (
    <div className="fixed bottom-20 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-2">
      <p className="text-sm text-white">For easy test utilty</p>
      <div className="flex items-center gap-2">
        <button
          className="z-[9999] h-10 w-60 bg-amber-50 text-black"
          onClick={toggleAllBoardForTest}
        >
          Toggle All Board
        </button>
        <button
          className="bottom-4 z-[9999] h-10 w-60 bg-amber-50 text-black"
          onClick={() => {
            setHp(15);
            setMaxHp(15);
          }}
        >
          Set HP to 15
        </button>
      </div>
    </div>
  );
}
