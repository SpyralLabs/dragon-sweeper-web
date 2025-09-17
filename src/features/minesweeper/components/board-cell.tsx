import Icons from '@/components/ui/icons';
import type { Cell } from '@/features/minesweeper/entities/dungeon-generator';
import React, { useCallback, useMemo } from 'react';
import { useGameLogic } from '../hooks/use-game-logic';
import { cn } from '@/lib/utils/tailwind-util';
import { ITEMS } from '@/lib/config/game-config';

interface BoardCellProps {
  className?: string;
  x: number;
  y: number;
  cell: Cell;
  onClick: (cell: Cell) => void;
  onRightClick: (cell: Cell) => void;
}

const BoardCell = ({ x, y, cell, onClick, onRightClick, className }: BoardCellProps) => {
  const { calculateMonsterPowerSum, dungeon } = useGameLogic();
  const { entity, revealed, marked, executed } = cell;
  const isStartPosition = dungeon?.startPos.x === x && dungeon?.startPos.y === y;

  const Tile = useMemo(() => {
    const random = Math.random();
    if (random <= 0.7) {
      return Icons.Tile;
    }
    if (random <= 0.8) {
      return Icons.TileCracked1;
    }
    return Icons.TileCracked2;
  }, []);

  const handleOnClick = useCallback(() => {
    onClick(cell);
  }, [onClick, cell]);

  // Case 0. start position
  if (isStartPosition && entity) {
    return (
      <button
        className={cn(
          'relative flex cursor-default flex-col items-center justify-center bg-[#454644] p-[9px]',
          className,
        )}
        onClick={handleOnClick}
      >
        <Tile className="absolute inset-0 h-full w-full" />
        <div className="absolute bottom-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col items-center">
          <Icons.PickDefault />
        </div>
      </button>
    );
  }

  // Case 1: Not revealed and not opened info
  if (!revealed && !executed) {
    return (
      <button
        className={cn(
          'relative flex cursor-default flex-col items-center justify-center bg-[#454644] p-[9px]',
          className,
        )}
        onClick={handleOnClick}
      >
        <Tile className="absolute inset-0 h-full w-full" />
        {marked && (
          <p className="text-base font-bold text-[#ffde4a] [text-shadow:2px_2px_#482615]">
            {marked}
          </p>
        )}
      </button>
    );
  }

  // Case 2: Revealed and opened info
  if (revealed && !executed) {
    return (
      <button
        className={cn(
          'relative flex cursor-default flex-col items-center justify-center bg-[#454644] p-[9px]',
          className,
        )}
        onClick={handleOnClick}
      >
        <Tile className="absolute inset-0 h-full w-full" />
        <div className="absolute top-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col items-center">
          {entity ? (
            <>
              <entity.icon />
              {entity.type === 'monster' && (
                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-base font-bold text-[#ffaa20] [text-shadow:2px_2px_#4d3e36]">
                  {entity.power}
                </p>
              )}
            </>
          ) : null}
        </div>
      </button>
    );
  }

  // Case 3: Executed but not claimed exp
  if (executed && entity) {
    return (
      <button
        className={cn(
          'relative flex cursor-default flex-col items-center justify-center bg-[#454644] p-[9px]',
          className,
        )}
        onClick={handleOnClick}
      >
        <Icons.TileBrown className="absolute inset-0 h-full w-full" />
        <div className="absolute top-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col items-center">
          {entity ? (
            <>
              {entity.type === 'monster' ? (
                <entity.icon />
              ) : entity.id === ITEMS.boxClose.id ? (
                <Icons.BoxOpen />
              ) : null}
              {entity.type === 'monster' ? (
                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-base font-bold text-[#ffaa20] [text-shadow:2px_2px_#4d3e36]">
                  {entity.power}
                </p>
              ) : (
                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1">
                  <Icons.ExpFilled className="size-5" />
                  <p className="text-base font-bold text-[#ffde4a] [text-shadow:2px_2px_#482615]">
                    {entity.power}
                  </p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </button>
    );
  }
  // Case 4. Opened Tile
  return (
    <button
      className={cn(
        'relative flex cursor-default flex-col items-center justify-center bg-[#454644] p-[9px]',
        className,
      )}
    >
      <Icons.TileDisabled className="absolute inset-0 h-full w-full" />
      <div className="z-[1] flex h-full w-full flex-col items-center justify-center font-bold">
        <p>{calculateMonsterPowerSum(x, y)}</p>
      </div>
    </button>
  );
};

export default React.memo(BoardCell);
