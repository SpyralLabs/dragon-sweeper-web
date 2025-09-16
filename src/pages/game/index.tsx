import { GameLayout } from '@/components/layout/game-layout';
import GameLeftPannel from '@/features/minesweeper/components/left-pannel';
import GameRightPannel from '@/features/minesweeper/components/right-pannel';
import { DungeonGenerator } from '@/features/minesweeper/entities/dungeon-generator';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import { Navigate } from 'react-router';
import { useAccount } from 'wagmi';

export default function GamePage() {
  const { status } = useGameConfig();
  const { isConnected } = useAccount();
  const canEnterGame = status.canEnterGame && isConnected;
  const dungeon = new DungeonGenerator();
  dungeon.generateBoard();

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
