import { type Cell, DungeonGenerator } from '@/features/minesweeper/entities/dungeon-generator';
import { atom } from 'jotai';

export enum GameUtility {
  DEFAULT,
  POINT,
  EXP,
  HP,
  MINE,
  SHIELD,
}

export type NFTUtilityType = {
  key: keyof typeof GameUtility;
  starRate: 0 | 1 | 2 | 3 | 4 | 5;
};

export const dungeonGeneratorAtom = atom<DungeonGenerator | null>(null);
export const boardAtom = atom<Cell[][]>([]);

// 플레이어 상태를 위한 atom
export const hpAtom = atom(25); // 초기 HP
export const expAtom = atom(0); // 초기 EXP
export const levelAtom = atom(1); // 초기 레벨
export const maxHpAtom = atom(25); // 최대 HP
export const pointsAtom = atom(0); // 유저 포인트
export const gameOverAtom = atom(false);
export const gameWonAtom = atom(false);

/**
 * @param selectedNFTId - if `Infinity`, then user must select NFT
 * @param utility - The key label of GameUtility
 * @param starRate - The star rate of the selected NFT
 * @param userPoints - The user's current points
 * @param userPortions - The user's current portions
 *
 */
export interface GameConfigState {
  selectedNFTId: number;
  utility: NFTUtilityType | null;
  configs: {
    userPoints: number;
    userPortions: number;
  } | null;
}
export const gameConfigAtom = atom<GameConfigState>({
  selectedNFTId: Infinity,
  utility: null,
  configs: null,
});

export const currentUtilityStatsAtom = atom((get) => {
  const config = get(gameConfigAtom);
  if (!config.utility) return { damageBoost: 0, hpRegen: 0, shield: 0 };

  // NFT starRate에 따른 스탯 계산 로직
  const starRate = config.utility.starRate;
  switch (config.utility.key) {
    case 'POINT':
      return { damageBoost: 0, hpRegen: 0, shield: 0 }; // 포인트는 게임 플레이 후 정산
    case 'EXP':
      return { damageBoost: starRate * 1, hpRegen: 0, shield: 0 }; // 예시: 경험치 획득량 증가
    case 'HP':
      return { damageBoost: 0, hpRegen: starRate * 2, shield: 0 }; // 예시: HP 회복량 증가
    case 'MINE':
      return { damageBoost: starRate * 2, hpRegen: 0, shield: 0 }; // 예시: 지뢰 공격력 감소 or 회피율 증가
    case 'SHIELD':
      return { damageBoost: 0, hpRegen: 0, shield: starRate * 3 }; // 예시: 방어력 증가
    default:
      return { damageBoost: 0, hpRegen: 0, shield: 0 };
  }
});

// 새로운 게임을 시작할 때 모든 상태를 리셋하는 함수
export const resetGameAtom = atom(null, (get, set) => {
  const generator = new DungeonGenerator();
  generator.generateBoard();
  const newBoard = generator.board;

  set(dungeonGeneratorAtom, generator);
  set(boardAtom, newBoard);
  set(hpAtom, 25);
  set(expAtom, 0);
  set(levelAtom, 1);
  set(maxHpAtom, 25);
  set(pointsAtom, 0);
  set(gameOverAtom, false);
  set(gameWonAtom, false);

  // 게임 시작 시 NFT 유틸리티에 따라 초기 HP 또는 다른 스탯 설정
  const utilityStats = get(currentUtilityStatsAtom);
  if (utilityStats.hpRegen > 0) {
    set(hpAtom, (prev) => Math.min(get(maxHpAtom), prev + utilityStats.hpRegen));
  }
});
