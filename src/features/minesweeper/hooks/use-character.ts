export type Character =
  | 'Naki'
  | 'Aomi'
  | 'Sayaka'
  | 'Yume'
  | 'Shiori'
  | 'Hana'
  | 'Rika'
  | 'Aoi'
  | 'Yui'
  | 'Reina'
  | 'Shinobu'
  | 'Claire';

export interface CharacterAssets {
  zero: string;
  attack: string;
  basic: string;
  levelup: string;
}

export type CharacterState = 'zero' | 'attack' | 'basic' | 'levelup';

export function useCharacter({ type }: { type: Character }): CharacterAssets {
  const getAssetPath = (filename: string) => {
    // Vite가 빌드 시 asset을 처리할 수 있도록 import.meta.url을 사용
    return new URL(`/src/assets/images/game/characters/${type}/${filename}`, import.meta.url).href;
  };

  return {
    zero: getAssetPath('0.gif'),
    attack: getAssetPath('attack.gif'),
    basic: getAssetPath('basic.webp'),
    levelup: getAssetPath('levelup.gif'),
  };
}
