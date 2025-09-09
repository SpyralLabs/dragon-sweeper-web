import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { gameConfigAtom, type GameConfigState, GameUtility } from '@/state/game';

export interface GameConfigStatus {
  missingItems: string[];
  canEnterGame: boolean;
}

export const useGameConfig = () => {
  const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);

  // analyze game config status
  const status = useMemo((): GameConfigStatus => {
    const missingItems: string[] = [];

    // check NFT selection
    if (gameConfig.selectedNFTId === Infinity) {
      missingItems.push('NFT selection');
    }

    // check utility setting
    if (!gameConfig.utility) {
      missingItems.push('Utility setting');
    }
    const canEnterGame = missingItems.length === 0;

    return {
      missingItems,
      canEnterGame,
    };
  }, [gameConfig]);

  // NFT 선택
  const selectNFT = (nftId: number) => {
    setGameConfig((prev) => ({
      ...prev,
      selectedNFTId: nftId,
    }));
  };

  // set utility
  const setUtility = (key: keyof typeof GameUtility, starRate: 0 | 1 | 2 | 3 | 4 | 5) => {
    setGameConfig((prev) => ({
      ...prev,
      utility: {
        key,
        starRate,
      },
    }));
  };

  // set user configs
  const setUserConfigs = (userPoints: number, userPortions: number) => {
    setGameConfig((prev) => ({
      ...prev,
      configs: {
        userPoints,
        userPortions,
      },
    }));
  };

  // reset config
  const resetConfig = () => {
    setGameConfig({
      selectedNFTId: Infinity,
      utility: null,
      configs: null,
    });
  };

  // reset specific config
  const resetUtility = () => {
    setGameConfig((prev) => ({
      ...prev,
      utility: null,
    }));
  };

  const resetUserConfigs = () => {
    setGameConfig((prev) => ({
      ...prev,
      configs: null,
    }));
  };

  return {
    // status
    gameConfig,
    status,

    // action
    selectNFT,
    setUtility,
    setUserConfigs,
    resetConfig,
    resetUtility,
    resetUserConfigs,
  };
};
