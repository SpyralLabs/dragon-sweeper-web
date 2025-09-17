import { GameLayout } from '@/components/layout/game-layout';
import GameLeftPannel from '@/features/minesweeper/components/left-pannel';
import GameRightPannel from '@/features/minesweeper/components/right-pannel';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import { useSetAtom } from 'jotai';
import { resetGameAtom } from '@/state/game';
import { Navigate } from 'react-router';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export default function GamePage() {
  const { status } = useGameConfig();
  const { isConnected } = useAccount();
  const canEnterGame = status.canEnterGame && isConnected;
  const setResetGame = useSetAtom(resetGameAtom);

  // 게임 페이지 진입 시 게임 초기화
  useEffect(() => {
    if (canEnterGame) {
      setResetGame();
    }
  }, [canEnterGame, setResetGame]);

  if (!canEnterGame) {
    return <Navigate to="/" replace />;
  }

  return (
    <GameLayout.Play>
      <div className="mx-auto flex w-max min-w-[1300px] items-stretch gap-0.5">
        <GameLeftPannel />
        <GameRightPannel />
      </div>
    </GameLayout.Play>
  );
}
