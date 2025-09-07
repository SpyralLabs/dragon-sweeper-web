import { atom } from 'jotai';

export enum GameUtility {
  DEFAULT,
  POINT,
  EXP,
  HP,
  MINE,
  SHIELD,
}
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
  utility: {
    key: keyof typeof GameUtility;
    starRate: 0 | 1 | 2 | 3 | 4 | 5;
  } | null;
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
