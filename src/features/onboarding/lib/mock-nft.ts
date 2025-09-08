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
    id: 1,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'EXP', starRate: GameUtility.EXP },
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
    utility: { key: 'SHIELD', starRate: GameUtility.SHIELD },
  },
  {
    id: 4,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'EXP', starRate: GameUtility.EXP },
  },
  {
    id: 5,
    name: 'NFT Namename',
    src: HeroSample,
    utility: { key: 'EXP', starRate: GameUtility.EXP },
  },
] as const;
