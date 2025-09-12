import { GameLayout } from '@/components/layout/game-layout';
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
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-lg border-2 border-[#8b4513] bg-[#2d1b13] p-4">
          <h2 className="mb-4 text-center text-xl font-bold text-white">Dungeon Map</h2>
          <div className="grid gap-1">
            {dungeon.board.map((row, y) => (
              <div key={y} className="flex gap-1">
                {row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`flex h-8 w-8 flex-col items-center justify-center text-xs font-bold ${cell.entity?.id === 'wall' ? 'bg-gray-600 text-white' : ''} ${cell.entity?.id === 'floor' ? 'bg-yellow-200 text-gray-800' : ''} ${cell.entity?.id === 'door' ? 'bg-amber-600 text-white' : ''} ${cell.entity?.id === 'treasure' ? 'bg-yellow-400 text-yellow-900' : ''} ${cell.entity?.id === 'monster' ? 'bg-red-600 text-white' : ''} ${cell.entity?.id === 'player' ? 'bg-blue-600 text-white' : ''} ${!cell.entity ? 'bg-gray-800 text-gray-500' : ''} border border-gray-500`}
                    title={`${x},${y} - ${cell.entity?.id || 'empty'}`}
                  >
                    {cell.entity ? <cell.entity.icon /> : ' '}
                    <p className="text-xs text-white">{cell.entity?.power}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-600"></div>
              <span>Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-yellow-200"></div>
              <span>Floor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-amber-600"></div>
              <span>Door</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-yellow-400"></div>
              <span>Treasure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-red-600"></div>
              <span>Monster</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-blue-600"></div>
              <span>Player</span>
            </div>
          </div>
        </div>
      </div>
    </GameLayout.Play>
  );
}
