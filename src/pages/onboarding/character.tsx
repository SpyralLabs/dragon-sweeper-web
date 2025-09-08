import { GameLayout } from '@/components/layout/game-layout';
import CharacterSelectBox from '@/features/onboarding/component/character-select-box';

export default function OnboardingCharacterPage() {
  return (
    <GameLayout.Character>
      <CharacterSelectBox />
    </GameLayout.Character>
  );
}
