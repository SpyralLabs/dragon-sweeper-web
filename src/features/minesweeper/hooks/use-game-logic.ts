import { useEffect, useCallback } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  boardAtom,
  hpAtom,
  expAtom,
  gameOverAtom,
  gameWonAtom,
  resetGameAtom,
  gameConfigAtom,
  currentUtilityStatsAtom,
} from '@/state/game';
import { ITEMS, MONSTERS, type GameEntity } from '@/lib/config/game-config';
import type { Cell } from '@/features/minesweeper/entities/dungeon-generator';

export const useGameLogic = () => {
  const [board, setBoard] = useAtom(boardAtom);
  const [hp, setHp] = useAtom(hpAtom);
  const [exp, setExp] = useAtom(expAtom);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  const [gameWon, setGameWon] = useAtom(gameWonAtom);
  const setResetGame = useSetAtom(resetGameAtom);
  const [gameConfig] = useAtom(gameConfigAtom);
  const [utilityStats] = useAtom(currentUtilityStatsAtom);

  // 게임 시작 시 보드 생성
  useEffect(() => {
    if (board.length === 0) {
      setResetGame();
    }
  }, [board, setResetGame]);

  // // 게임 오버/승리 시 메시지 업데이트
  // useEffect(() => {
  //   if (gameOver) {
  //     setMessage('게임 오버! 다시 도전하시겠습니까?');
  //   }
  //   if (gameWon) {
  //     setMessage('축하합니다! 다크로드를 물리쳤습니다!');
  //   }
  // }, [gameOver, gameWon, setMessage]);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (gameOver || gameWon) return;

      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];

      const entity = cell.entity;

      if (!entity) {
        cell.revealed = true;
      } else if (entity.type === 'monster') {
        let finalMonsterPower = entity.power;
        // NFT 유틸리티 적용
        const effectiveDamage = Math.max(1, finalMonsterPower - utilityStats.shield);

        if (hp > effectiveDamage) {
          setHp((prevHp) => prevHp - effectiveDamage);
          setExp((prevExp) => prevExp + entity.power + utilityStats.damageBoost);
          cell.revealed = true;
          if (entity.id === MONSTERS.darkLord.id) {
            cell.entity = null;
            setGameWon(true);
          }
        } else {
          setHp(0);
          setGameOver(true);
        }
        setBoard(newBoard);
      } else if (entity.type === 'item') {
        if (entity.id === ITEMS.hpItem.id) {
          // NFT 유틸리티에 따라 회복량 증가
          setHp((prevHp) => Math.min(25, prevHp + 5 + utilityStats.hpRegen));
          cell.revealed = true;
          cell.entity = null;
          // setMessage('HP를 회복했습니다.');
        } else if (entity.id === ITEMS.pickDefault.id) {
          cell.revealed = true;
          cell.entity = null;
          openArea(x, y, newBoard);
          // setMessage('신비한 오브의 힘으로 주변이 밝혀졌습니다!');
        } else {
          cell.revealed = true;
          // setMessage(`${entity.name}을(를) 획득했습니다.`);
        }
        setBoard(newBoard);
      }
    },
    [board, hp, exp, gameOver, gameWon, setBoard, setHp, setExp, setGameWon, utilityStats],
  );

  const handleCellRightClick = useCallback(
    (x: number, y: number) => {
      if (gameOver || gameWon) return;

      const newBoard = board.map((row) => [...row]);
      const cell = newBoard[y][x];

      if (cell.revealed) return;

      cell.marked = !cell.marked;
      setBoard(newBoard);
      // setMessage(cell.marked ? '칸을 마킹했습니다.' : '마킹을 해제했습니다.');
    },
    [board, gameOver, gameWon, setBoard],
  );

  const openArea = (x: number, y: number, currentBoard: Cell[][]) => {
    const orbRadius = 2; // Orb의 개방 반경
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
              cell.marked = false;
            }
          }
        }
      }
    }
  };

  return {
    board,
    gameOver,
    gameWon,
    hp,
    exp,
    startGame: setResetGame,
    handleCellClick,
    handleCellRightClick,
  };
};
