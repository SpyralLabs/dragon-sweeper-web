import { useCallback, useMemo } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
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
  dungeonGeneratorAtom,
  attackedAtom,
  levelUpTable,
  eyePositionAtom,
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
  const dungeonGenerator = useAtomValue(dungeonGeneratorAtom);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  const [gameWon, setGameWon] = useAtom(gameWonAtom);
  const setResetGame = useSetAtom(resetGameAtom);
  const [utilityStats] = useAtom(currentUtilityStatsAtom);
  const [level, setLevel] = useAtom(levelAtom);
  const [maxHp, setMaxHp] = useAtom(maxHpAtom);
  const [attacked, setAttacked] = useAtom(attackedAtom);
  const [nextLevelExp] = useAtom(nextLevelExpAtom);
  const [canLevelUp] = useAtom(canLevelUpAtom);
  const [specialMonstersStatus, setSpecialMonstersStatus] = useAtom(specialMonstersStatusAtom);
  const [eyePosition, setEyePosition] = useAtom(eyePositionAtom);
  const currentLevelExp = useMemo(() => {
    return levelUpTable[level];
  }, [level]);
  const previewHp = useMemo(() => {
    return level === 1 ? false : level % 2 !== 0;
  }, [level]);

  const handleMonsterDefeat = useCallback(
    (newBoard: Cell[][], x: number, y: number, monster: GameEntity) => {
      let finalMonsterPower = monster.power;
      const effectiveDamage = Math.max(1, finalMonsterPower - utilityStats.shield);

      if (newBoard[y][x].executed && newBoard[y][x].entity !== null) {
        newBoard[y][x].revealed = true;
        newBoard[y][x].marked = null;
        newBoard[y][x].entity = null;
        setBoard(newBoard);
        setAttacked(false);
        setExp((prevExp) => prevExp + monster.power + utilityStats.damageBoost);
        return;
      }

      if (hp >= effectiveDamage) {
        setHp((prevHp) => prevHp - effectiveDamage);
        setAttacked(true);

        switch (monster.id) {
          case MONSTERS.magician.id:
            handleMagicianAbility(newBoard);
            break;
          case MONSTERS.bunny.id:
            handleBunnyAbility(newBoard, x, y);
            break;
          case MONSTERS.shadow.id:
            handleShadowAbility(newBoard);
            break;
          case MONSTERS.eye.id:
            handleEyeAbility(newBoard, x, y);
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

        newBoard[y][x].revealed = true;
        newBoard[y][x].marked = null;
        newBoard[y][x].executed = true;
        setBoard(newBoard);
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

  const handleShadowAbility = (currentBoard: Cell[][]) => {
    currentBoard.forEach((row) => {
      row.forEach((targetCell) => {
        if (targetCell.entity?.id === MONSTERS.spider.id) {
          targetCell.revealed = true;
        }
      });
    });
  };

  const handleEyeAbility = (currentBoard: Cell[][], x: number, y: number) => {
    currentBoard[y][x].entity;
    // TODO: handleEyeDefeat in Atom logic
    const newEyePosition = eyePosition.map((eye) => {
      if (eye.x === x && eye.y === y) {
        return { ...eye, isDefeated: true };
      }
      return eye;
    });
    setEyePosition(newEyePosition);
  };

  const handleItemAcquisition = useCallback(
    (newBoard: Cell[][], x: number, y: number, item: GameEntity) => {
      const cell = newBoard[y][x];
      setAttacked(false);

      switch (item.id) {
        case ITEMS.hpItem.id:
          setHp(maxHp);
          cell.entity = null;
          break;
        case ITEMS.pickDefault.id: {
          cell.entity = null;
          if (dungeonGenerator?.startPos.x === x && dungeonGenerator?.startPos.y === y) {
            openArea(x, y, newBoard, OrbType.INITIAL);
          } else {
            openArea(x, y, newBoard, OrbType.ITEM);
          }
          cell.revealed = true;
          cell.marked = null;
          cell.executed = true;
          break;
        }
        case ITEMS.darkCrystal.id:
        case ITEMS.darkCrystalBroken.id: {
          handleDarkCrystalAcquisition(newBoard, x, y);
          break;
        }
        case ITEMS.wall1.id:
        case ITEMS.wall2.id:
        case ITEMS.wall3.id:
        case ITEMS.wall4.id:
        case ITEMS.expWall.id: {
          handleWallAcquisition(newBoard, x, y, item);
          break;
        }
        case ITEMS.mineBuster.id:
          handleMineDisarmButton(newBoard, x, y);
          cell.revealed = true;
          cell.marked = null;
          cell.executed = true;
          break;
        case ITEMS.boxClose.id:
        case ITEMS.expBox.id:
          handleExpBoxAcquisition(newBoard, x, y, item);
          break;
        default:
          break;
      }
      setBoard(newBoard);
    },
    [
      board,
      maxHp,
      setBoard,
      setHp,
      setExp,
      utilityStats,
      specialMonstersStatus,
      setSpecialMonstersStatus,
    ],
  );

  const handleWallAcquisition = (newBoard: Cell[][], x: number, y: number, item: GameEntity) => {
    if (item.id === ITEMS.expWall.id) {
      setExp((prevExp) => prevExp + 1);
      newBoard[y][x] = {
        entity: null,
        revealed: true,
        marked: null,
        executed: true,
      };
      return;
    }

    if (hp === 0) return;
    if (item.id === ITEMS.wall1.id) {
      setHp((prevHp) => prevHp - 1);
      newBoard[y][x] = {
        entity: ITEMS.wall2,
        revealed: true,
        marked: null,
        executed: false,
      };
      return;
    }

    if (item.id === ITEMS.wall2.id) {
      setHp((prevHp) => prevHp - 1);
      newBoard[y][x] = {
        entity: ITEMS.wall3,
        revealed: true,
        marked: null,
        executed: false,
      };
      return;
    }

    if (item.id === ITEMS.wall3.id) {
      setHp((prevHp) => prevHp - 1);
      newBoard[y][x] = {
        entity: { ...ITEMS.expWall, xp: 1 },
        revealed: true,
        marked: null,
        executed: true,
      };
      return;
    }
  };

  const handleDarkCrystalAcquisition = (newBoard: Cell[][], x: number, y: number) => {
    if (newBoard[y][x].entity?.id === ITEMS.darkCrystal.id) {
      newBoard[y][x] = {
        entity: { ...ITEMS.darkCrystalBroken, xp: 3 },
        revealed: true,
        marked: null,
        executed: true,
      };
    } else if (newBoard[y][x].entity?.id === ITEMS.darkCrystalBroken.id) {
      setExp((prevExp) => prevExp + 3);
      newBoard[y][x] = {
        entity: null,
        revealed: true,
        marked: null,
        executed: true,
      };
    }
  };

  const handleExpBoxAcquisition = (newBoard: Cell[][], x: number, y: number, item: GameEntity) => {
    if (newBoard[y][x].entity?.id === ITEMS.expBox.id && newBoard[y][x].executed) {
      setExp((prevExp) => prevExp + 5);
      newBoard[y][x].entity = null;
    } else if (item.xp > 0) {
      newBoard[y][x].entity = { ...ITEMS.expBox, xp: item.xp };
    } else {
      newBoard[y][x].entity = ITEMS.hpItem;
    }

    newBoard[y][x].revealed = true;
    newBoard[y][x].marked = null;
    newBoard[y][x].executed = true;
  };

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
      console.log(`[${x}, ${y}] 클릭 이벤트 발생`);
      console.log(`현재 hp: ${hp}, 현재 exp: ${exp}, 현재 level: ${level}`);

      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];
      console.log(
        `이 곳엔 ${cell.entity ? `${cell.entity?.id}가 있습니다` : '아무것도 없습니다.'}`,
      );

      const entity = cell.entity;

      if (dungeonGenerator?.startPos.x === x && dungeonGenerator?.startPos.y === y) {
        handleItemAcquisition(newBoard, x, y, entity as GameEntity);
        return;
      }

      // 1. 빈 칸인 경우
      if (!entity) {
        cell.revealed = true;
        cell.executed = true;
        setAttacked(false);
        setBoard(newBoard);
        return;
      }

      // 2. 공개정보인 경우
      if (cell.revealed) {
        if (entity.type === 'monster') {
          console.log(`공개정보 [${x}, ${y}]에 따라 몬스터를 처치!`);
          handleMonsterDefeat(newBoard, x, y, entity);
        } else if (entity.type === 'item') {
          console.log(`공개정보 [${x}, ${y}]에 따라 아이템을 획득!`);
          handleItemAcquisition(newBoard, x, y, entity);
        }
        return;
      }

      // 3. 미공개 정보의 몬스터를 마주한 경우
      if (entity.type === 'monster') {
        console.log(`미공개정보 [${x}, ${y}]를 개방!`);
        console.log(`[${x}, ${y}]는 ${entity.id} 몬스터 타일입니다`);
        handleMonsterDefeat(newBoard, x, y, entity);
        return;
      }

      // 4. 미공개 정보의 아이템을 마주한경우(아이템 타일 공개)
      if (entity.type === 'item') {
        console.log(`미공개정보 [${x}, ${y}]를 개방!`);
        console.log(`[${x}, ${y}]는 ${entity.id} 아이템 타일입니다`);
        cell.revealed = true;
        setAttacked(false);
        setBoard(newBoard);
        return;
      }
    },
    [board, gameOver, gameWon, handleMonsterDefeat, handleItemAcquisition],
  );

  const handleCellRightClick = useCallback(
    ({ x, y, marked }: { x: number; y: number; marked: number | null }) => {
      if (gameOver || gameWon) return;
      console.log(`[${x}, ${y}] 오른쪽 클릭 이벤트 발생`);
      console.log(`marked: ${marked}`);

      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];
      console.log(`cell:`, cell);

      if (cell.revealed) return;

      cell.marked = marked;
      setBoard(newBoard);
    },
    [board, gameOver, gameWon, setBoard],
  );

  const levelUp = useCallback(() => {
    if (!canLevelUp || gameOver || gameWon) {
      return;
    }

    const newLevel = level + 1;
    setExp((prev) => prev - currentLevelExp);
    setLevel(newLevel);
    if (newLevel % 2 !== 0 && newLevel > 1) {
      setMaxHp((prevMaxHp) => prevMaxHp + 1);
    }
    setHp(maxHp);
  }, [
    canLevelUp,
    level,
    currentLevelExp,
    maxHp,
    gameOver,
    gameWon,
    setExp,
    setLevel,
    setMaxHp,
    setHp,
  ]);

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
                cell.marked = null;
                cell.executed = cell.entity === null;
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
              cell.executed = cell.entity === null;
              cell.marked = null;
            }
          }
        }
      }
    }
  };

  const isEyeAbilityActive = (x: number, y: number) => {
    const crossDistances = [1, 3, 5];

    for (const eye of eyePosition) {
      if (eye.isDefeated) continue;

      // 중심 (eye 위치 자체)
      if (eye.x === x && eye.y === y) {
        return true;
      }

      // 십자 범위 검사
      for (const d of crossDistances) {
        // 같은 행에서 좌우 d칸
        if (eye.y === y && (eye.x === x - d || eye.x === x + d)) {
          return true;
        }
        // 같은 열에서 상하 d칸
        if (eye.x === x && (eye.y === y - d || eye.y === y + d)) {
          return true;
        }
      }
    }

    return false;
  };

  const calculateMonsterPowerSum = (x: number, y: number) => {
    if (isEyeAbilityActive(x, y)) {
      return '?';
    }
    const value = dungeonGenerator?.getMonsterPowerSum(x, y) ?? 0;
    return value;
  };

  const toggleAllBoardForTest = () => {
    setBoard((prev) =>
      prev.map((row) => row.map((cell) => ({ ...cell, revealed: !cell.revealed }))),
    );
  };

  // 게임 초기화는 게임 페이지에서 담당

  return {
    board,
    dungeon: dungeonGenerator,
    gameOver,
    gameWon,
    hp,
    level,
    attacked,
    maxHp,
    exp,
    nextLevelExp,
    canLevelUp,
    previewHp,
    startGame: setResetGame,
    handleCellClick,
    handleCellRightClick,
    levelUp,
    calculateMonsterPowerSum,
    toggleAllBoardForTest,
  };
};
