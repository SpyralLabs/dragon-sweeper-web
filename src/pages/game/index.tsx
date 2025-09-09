import { GameLayout } from '@/components/layout/game-layout';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import { Navigate } from 'react-router';
import { useAccount } from 'wagmi';

export default function GamePage() {
  const { status } = useGameConfig();
  const { isConnected } = useAccount();
  const canEnterGame = status.canEnterGame && isConnected;

  if (!canEnterGame) {
    return <Navigate to="/" replace />;
  }

  return (
    <GameLayout.Play>
      <div>Game Page</div>
    </GameLayout.Play>
  );
}
