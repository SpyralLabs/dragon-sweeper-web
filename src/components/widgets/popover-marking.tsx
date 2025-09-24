import { useCallback, useEffect, useState } from 'react';
import Icons from '../ui/icons';
import { cn } from '@/lib/utils/tailwind-util';

interface Props<T extends HTMLElement> {
  containerRef: React.RefObject<T | null>;
  onMarking: (value: number | null) => void;
  clientX: number;
  clientY: number;
  marked?: number | null;
  onOpen: () => void;
}

const POPOVER_SIZE = {
  width: 284,
  height: 172,
};

export default function PopoverMarking<T extends HTMLElement>({
  containerRef,
  onMarking,
  onOpen,
  marked,
  clientX,
  clientY,
}: Props<T>) {
  const [popoverPos, setPopoverPos] = useState<{
    x: number;
    y: number;
    dir: 'left' | 'right';
  } | null>(null);
  console.log(`marked:`, marked);

  const handleOpenPopoverMenu = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const clickX = clientX;
    const clickY = clientY;

    const relativeX = clickX - containerRect.left;
    const relativeY = clickY - containerRect.top;

    const isLeftSide = relativeX < POPOVER_SIZE.width / 2;
    const isTopSide = relativeY < POPOVER_SIZE.height / 2;

    let left, top, direction;

    if (isLeftSide) {
      // 왼쪽에서 클릭했으면 오른쪽으로 펼치기
      left = Math.min(relativeX + 10, containerRect.width - POPOVER_SIZE.width - 10);
      direction = 'right' as const;
    } else {
      // 오른쪽에서 클릭했으면 왼쪽으로 펼치기
      left = Math.max(relativeX - POPOVER_SIZE.width - 10, 10);
      direction = 'left' as const;
    }

    // 세로 위치 조정
    if (isTopSide) {
      top = Math.min(relativeY + 40, containerRect.height - POPOVER_SIZE.height - 40);
    } else {
      top = Math.max(relativeY - POPOVER_SIZE.height - 40, 40);
    }

    setPopoverPos({ x: left, y: top, dir: direction });
  }, []);

  const handleClick = useCallback(() => {
    setPopoverPos(null);
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (!clientX || !clientY) return;
    if (!containerRef.current) return;
    handleOpenPopoverMenu(clientX, clientY);
  }, [containerRef, handleOpenPopoverMenu, clientX, clientY]);

  if (!popoverPos || !clientX || !clientY) return null;

  return (
    <div
      className="absolute inset-0 z-[9999] h-full w-full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
    >
      <div
        style={{
          width: POPOVER_SIZE.width,
          height: POPOVER_SIZE.height,
          left: popoverPos.x,
          top: popoverPos.y,
        }}
        className="absolute grid grid-cols-5 border-2 border-[#191312]"
      >
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <button
              className="col-span-1 flex aspect-square items-center justify-center border-2 border-[#191312] bg-[#BDB499] text-xl font-bold text-[#ffde4a] text-shadow-[2px_2px_#000000]"
              key={`${i}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onMarking(i + 1);
                onOpen();
              }}
            >
              {i + 1}
            </button>
          ))}
        <button
          className="col-span-1 flex aspect-square items-center justify-center border-2 border-[#191312] bg-[#BDB499] text-xl font-bold text-[#4FA6F3] text-shadow-[2px_2px_#000000]"
          key={`?`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onMarking(13);
            onOpen();
          }}
        >
          ?
        </button>
        <button
          className="col-span-1 flex aspect-square items-center justify-center border-2 border-[#191312] bg-[#BDB499]"
          key={`mine`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onMarking(14);
            onOpen();
          }}
        >
          <Icons.MarkedMine />
        </button>
        <button
          className={cn(
            'col-span-1 flex aspect-square cursor-default! items-center justify-center border-2 border-[#191312] bg-[#7E7367]',
            typeof marked === 'number' && 'cursor-pointer bg-[#BDB499]',
          )}
          key={marked ? 'Trash' : `blank`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onMarking(null);
            onOpen();
          }}
        >
          <Icons.Trash className={cn(['hidden', typeof marked === 'number' && 'block'])} />
        </button>
      </div>
    </div>
  );
}
