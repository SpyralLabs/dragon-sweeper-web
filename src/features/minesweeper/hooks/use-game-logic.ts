import { useEffect, useCallback } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  boardAtom,
  hpAtom,
  expAtom,
  gameOverAtom,
  gameWonAtom,
  resetGameAtom,
  currentUtilityStatsAtom,
  levelAtom,
  canLevelUpAtom,
  maxHpAtom,
  nextLevelExpAtom,
  specialMonstersStatusAtom,
} from '@/state/game';
import { ITEMS, MONSTERS, type GameEntity } from '@/lib/config/game-config';
import type { Cell } from '@/features/minesweeper/entities/dungeon-generator';

// Orb 타입 정의
export enum OrbType {
  INITIAL = 'INITIAL', // 최초 열리는 Orb (13칸, 다이아몬드 모양)
  ITEM = 'ITEM', // 아이템으로 얻는 Orb (9칸, 3x3 정사각형)
}

export const useGameLogic = () => {
  const [board, setBoard] = useAtom(boardAtom);
  const [hp, setHp] = useAtom(hpAtom);
  const [exp, setExp] = useAtom(expAtom);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  const [gameWon, setGameWon] = useAtom(gameWonAtom);
  const setResetGame = useSetAtom(resetGameAtom);
  const [utilityStats] = useAtom(currentUtilityStatsAtom);
  const [level, setLevel] = useAtom(levelAtom);
  const [maxHp, setMaxHp] = useAtom(maxHpAtom);
  const [nextLevelExp] = useAtom(nextLevelExpAtom);
  const [canLevelUp] = useAtom(canLevelUpAtom);
  const [specialMonstersStatus, setSpecialMonstersStatus] = useAtom(specialMonstersStatusAtom);

  const handleMonsterDefeat = useCallback(
    (x: number, y: number, monster: GameEntity) => {
      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];

      let finalMonsterPower = monster.power;
      const effectiveDamage = Math.max(1, finalMonsterPower - utilityStats.shield);

      if (hp > effectiveDamage) {
        setHp((prevHp) => prevHp - effectiveDamage);
        setExp((prevExp) => prevExp + monster.power + utilityStats.damageBoost);

        switch (monster.id) {
          case MONSTERS.magician.id:
            handleMagicianAbility(newBoard);
            break;
          case MONSTERS.bunny.id:
            handleBunnyAbility(newBoard, x, y);
            break;
          case MONSTERS.eye.id:
            handleEyeAbility(newBoard);
            break;
          case MONSTERS.mineSeeker.id:
            handleMineSeekerAbility(newBoard, x, y);
            break;
          case MONSTERS.darkLord.id:
            alert('게임 승리!');
            setGameWon(true);
            break;
          default:
            break;
        }
      } else {
        setHp(0);
        setGameOver(true);
      }
    },
    [board, hp, exp, utilityStats, setHp, setExp, setGameOver, setGameWon],
  );

  const handleMagicianAbility = (currentBoard: Cell[][]) => {
    currentBoard.forEach((row) => {
      row.forEach((targetCell) => {
        if (
          targetCell.entity?.id === MONSTERS.mushroom.id ||
          targetCell.entity?.id === MONSTERS.poisonMushroom.id
        ) {
          targetCell.revealed = true;
        }
      });
    });
  };

  const handleBunnyAbility = (currentBoard: Cell[][], x: number, y: number) => {
    currentBoard[y][x].entity = ITEMS.hpItem;
  };

  const handleMineSeekerAbility = (currentBoard: Cell[][], x: number, y: number) => {
    currentBoard[y][x].entity = ITEMS.mineBuster;
    setSpecialMonstersStatus((prev) => ({ ...prev, isMineSeekerDefeated: true }));
  };

  const handleEyeAbility = (currentBoard: Cell[][]) => {
    currentBoard.forEach((row) => {
      row.forEach((targetCell) => {
        if (targetCell.entity?.id === MONSTERS.spider.id) {
          targetCell.revealed = true;
        }
      });
    });
  };

  const handleItemAcquisition = useCallback(
    (x: number, y: number, item: GameEntity) => {
      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];

      cell.revealed = true;

      switch (item.id) {
        case ITEMS.hpItem.id:
          setHp((prevHp) => Math.min(25, prevHp + 5 + utilityStats.hpRegen));
          cell.entity = null;
          break;
        case ITEMS.pickDefault.id:
          cell.entity = null;
          openArea(x, y, newBoard, OrbType.ITEM);
          break;
        case ITEMS.mineBuster.id:
          handleMineDisarmButton(newBoard, x, y);
          break;
        case ITEMS.expBox.id:
          setExp((prevExp) => prevExp + 3);
          cell.entity = null;
          break;
        default:
          break;
      }
      setBoard(newBoard);
    },
    [board, setBoard, setHp, setExp, utilityStats, specialMonstersStatus, setSpecialMonstersStatus],
  );

  const handleMineDisarmButton = (currentBoard: Cell[][], x: number, y: number) => {
    if (specialMonstersStatus.isMineSeekerDefeated) {
      currentBoard.forEach((row) => {
        row.forEach((targetCell) => {
          if (targetCell.entity?.id === MONSTERS.mine.id) {
            targetCell.entity = ITEMS.expBox;
          }
        });
      });
      currentBoard[y][x].entity = null;
    }
  };

  const handleCellClick = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (gameOver || gameWon) return;

      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];

      const entity = cell.entity;

      if (!entity) {
        cell.revealed = true;
      } else if (entity.type === 'monster') {
        handleMonsterDefeat(x, y, entity);
      } else if (entity.type === 'item') {
        handleItemAcquisition(x, y, entity);
      }
    },
    [board, gameOver, gameWon, handleMonsterDefeat, handleItemAcquisition],
  );

  const handleCellRightClick = useCallback(
    ({ x, y, marked }: { x: number; y: number; marked: number | null }) => {
      if (gameOver || gameWon) return;

      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];

      if (cell.revealed) return;

      cell.marked = marked;
      setBoard(newBoard);
    },
    [board, gameOver, gameWon, setBoard],
  );

  const levelUp = useCallback(() => {
    if (!canLevelUp) {
      return;
    }

    setExp((prevExp) => prevExp - nextLevelExp);

    const newLevel = level + 1;
    setLevel(newLevel);
    if (newLevel % 2 !== 0 && newLevel > 1) {
      setMaxHp((prevMaxHp) => prevMaxHp + 1);
    }
    setHp(maxHp);
  }, [canLevelUp, level, nextLevelExp, maxHp, setExp, setLevel, setMaxHp, setHp]);

  const openArea = (
    x: number,
    y: number,
    currentBoard: Cell[][],
    orbType: OrbType = OrbType.INITIAL,
  ) => {
    if (orbType === OrbType.INITIAL) {
      const orbRadius = 2;
      for (let dy = -orbRadius; dy <= orbRadius; dy++) {
        for (let dx = -orbRadius; dx <= orbRadius; dx++) {
          if (Math.abs(dx) + Math.abs(dy) <= orbRadius) {
            const newX = x + dx;
            const newY = y + dy;
            if (
              newY >= 0 &&
              newY < currentBoard.length &&
              newX >= 0 &&
              newX < currentBoard[0].length
            ) {
              const cell = currentBoard[newY][newX];
              if (!cell.revealed) {
                cell.revealed = true;
                cell.executed = false;
                cell.marked = null;
              }
            }
          }
        }
      }
    } else if (orbType === OrbType.ITEM) {
      // 아이템으로 얻는 Orb: 3x3 정사각형 (9칸)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const newX = x + dx;
          const newY = y + dy;
          if (
            newY >= 0 &&
            newY < currentBoard.length &&
            newX >= 0 &&
            newX < currentBoard[0].length
          ) {
            const cell = currentBoard[newY][newX];
            if (!cell.revealed) {
              cell.revealed = true;
              cell.executed = false;
              cell.marked = null;
            }
          }
        }
      }
    }
  };

  // 게임 시작 시 보드 생성
  useEffect(() => {
    if (board.length === 0) {
      setResetGame();
    }
  }, [board, setResetGame]);

  return {
    board,
    gameOver,
    gameWon,
    hp,
    exp,
    startGame: setResetGame,
    handleCellClick,
    handleCellRightClick,
    levelUp,
  };
};
