import { GameLayout } from '@/components/layout/game-layout';
import CharacterSelectBox from '@/features/onboarding/component/character-select-box';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAccount } from 'wagmi';

export default function OnboardingCharacterPage() {
  const { isConnected } = useAccount();
  const { resetConfig, resetUtility, resetUserConfigs } = useGameConfig();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    resetConfig();
    resetUtility();
    resetUserConfigs();
  }, []);

  return (
    <GameLayout.Character>
      <CharacterSelectBox />
    </GameLayout.Character>
  );
}
