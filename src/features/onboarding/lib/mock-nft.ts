import HeroSample from '@/assets/images/hero/hero-sample.webp';
import { GameUtility } from '@/state/game';

// id: number;
//   name: string;
//   src: string;
//   utility: NFTUtilityType;
//   isSelected: boolean;
//   onClick?: ({
//     isFinalized,
//     selectedNftId,
//     utility,
//   }: {
//     isFinalized: boolean;
//     selectedNftId: number;
//     utility: NFTUtilityType;
//   }) => void;

export const MOCK_NFT = [
  {
    id: 0,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'DEFAULT', starRate: GameUtility.DEFAULT },
  },
  {
    id: 1,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'POINT', starRate: GameUtility.POINT },
  },
  {
    id: 2,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'EXP', starRate: GameUtility.EXP },
  },
  {
    id: 3,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'HP', starRate: GameUtility.HP },
  },
  {
    id: 4,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'MINE', starRate: GameUtility.MINE },
  },
  {
    id: 5,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'SHIELD', starRate: GameUtility.SHIELD },
  },
] as const;
