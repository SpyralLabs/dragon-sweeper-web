import Icons from '@/components/ui/icons';
import type { Cell } from '@/features/minesweeper/entities/dungeon-generator';
import React, { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils/tailwind-util';
import { ITEMS, MONSTERS } from '@/lib/config/game-config';

interface BoardCellProps {
  className?: string;
  x: number;
  y: number;
  isStarted: boolean;
  cell: Cell;
  rightClicking: boolean;
  onClick: (cell: Cell) => void;
  onRightClick: (pos: { x: number; y: number }, clientPos: { x: number; y: number }) => void;
  isStartPosition: boolean;
  monsterPowerSum: number | string;
}

const BoardCell = ({
  x,
  y,
  isStarted,
  cell,
  onClick,
  onRightClick,
  className,
  rightClicking,
  isStartPosition: _isStartPosition,
  monsterPowerSum,
}: BoardCellProps) => {
  const { entity, revealed: _revealed, marked, executed } = cell;
  const revealed = isStarted ? _revealed : false;
  const isStartPosition = isStarted ? _isStartPosition : false;

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
          rightClicking && 'bg-[#E1A941]',
          className,
        )}
        onClick={handleOnClick}
        onContextMenu={(e) => {
          e.preventDefault();
          onRightClick({ x, y }, { x: e.clientX, y: e.clientY });
        }}
      >
        <Tile className="absolute top-1/2 left-1/2 h-[calc(100%-1px)] w-[calc(100%-1px)] -translate-x-1/2 -translate-y-1/2" />
        {marked && (
          <p className="text-stroke-482615 z-1 text-base font-bold text-[#ffde4a]">
            {marked === 13 ? (
              '?'
            ) : marked === 14 ? (
              <Icons.MarkedMine className="mx-auto w-4/5" />
            ) : (
              marked
            )}
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
        <Tile className="absolute top-1/2 left-1/2 h-[calc(100%-1px)] w-[calc(100%-1px)] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col items-center">
          {entity ? (
            <>
              <entity.icon />
              {entity.xp > 0 && ![ITEMS.boxClose.id, MONSTERS.mimic.id].includes(entity.id) && (
                <p className="text-stroke-4d3e36 absolute bottom-0 left-1/2 -translate-x-1/2 text-base font-bold text-[#ffaa20]">
                  {entity.xp}
                </p>
              )}
              {entity && entity.id === MONSTERS.mine.id && (
                <p className="text-stroke-4d3e36 absolute bottom-0 left-1/2 -translate-x-1/2 text-base font-bold text-[#ffaa20]">
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
  if (revealed && executed && entity) {
    return (
      <button
        className={cn(
          'relative flex cursor-default flex-col items-center justify-center bg-[#454644] p-[9px]',
          className,
        )}
        onClick={handleOnClick}
      >
        {entity.xp === 0 ? (
          <Icons.Tile className="absolute top-1/2 left-1/2 h-[calc(100%-1px)] w-[calc(100%-1px)] -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <Icons.TileBrown className="absolute top-1/2 left-1/2 h-[calc(100%-1px)] w-[calc(100%-1px)] -translate-x-1/2 -translate-y-1/2" />
        )}
        <div className="absolute top-0 left-1/2 flex h-full w-full -translate-x-1/2 flex-col items-center">
          {entity.id === ITEMS.boxClose.id ? <Icons.BoxOpen /> : <entity.icon />}
          <div
            className={cn([
              'absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1',
              entity.xp === 0 && 'hidden',
            ])}
          >
            <Icons.ExpFilled className="size-5" />
            <p className="text-stroke-482615 text-base font-bold text-[#ffde4a]">{entity.xp}</p>
          </div>
        </div>
      </button>
    );
  }
  // Case 4. Opened Tile
  return (
    <button
      className={cn(
        'relative flex cursor-default! flex-col items-center justify-center bg-[#454644] p-[9px]',
        className,
      )}
    >
      <Icons.TileDisabled className="absolute inset-0 h-full w-full" />
      <div className="z-[1] flex h-full w-full flex-col items-center justify-center font-bold">
        <p className="text-[#D2CDC5]">{monsterPowerSum === 0 ? '' : monsterPowerSum}</p>
      </div>
    </button>
  );
};

export default React.memo(BoardCell, (prev, next) => {
  return (
    prev.x === next.x &&
    prev.y === next.y &&
    prev.isStarted === next.isStarted &&
    prev.cell.entity === next.cell.entity &&
    prev.cell.revealed === next.cell.revealed &&
    prev.cell.executed === next.cell.executed &&
    prev.cell.marked === next.cell.marked &&
    prev.rightClicking === next.rightClicking &&
    prev.isStartPosition === next.isStartPosition &&
    prev.monsterPowerSum === next.monsterPowerSum &&
    prev.onClick === next.onClick &&
    prev.onRightClick === next.onRightClick
  );
});
