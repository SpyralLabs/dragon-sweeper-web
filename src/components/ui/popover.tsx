import * as React from 'react';

import { cn } from '@/lib/utils/tailwind-util';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (value: number) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  parentRef: React.RefObject<HTMLDivElement>;
}

export default function Popover({
  isOpen,
  onClose,
  onSelect,
  triggerRef,
  parentRef,
}: PopoverProps) {
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0, direction: 'right' });
  const numbers = Array.from({ length: 14 }, (_, index) => index + 1);

  React.useEffect(() => {
    if (isOpen && triggerRef.current && parentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();

      const relativeX = triggerRect.left - parentRect.left;
      const relativeY = triggerRect.top - parentRect.top;

      const popoverWidth = 284;
      const wouldOverflowRight =
        relativeX + triggerRect.width + 5 + popoverWidth > parentRect.width;
      const wouldOverflowLeft = relativeX - 5 - popoverWidth < 0;

      let direction = 'right';
      let x = relativeX + triggerRect.width + 5;

      if (wouldOverflowRight && !wouldOverflowLeft) {
        direction = 'left';
        x = relativeX - 5 - popoverWidth;
      }
      setPosition({ x, y: relativeY, direction });
    }
  }, [isOpen, triggerRef, parentRef]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        ref={popoverRef}
        className="absolute z-50 bg-[#242424] shadow-lg"
        style={{
          left: position.x,
          top: position.y,
          minWidth: '160px',
        }}
      >
        <div className="grid grid-cols-5 p-0.5">
          {numbers.map((number) => (
            <button
              key={number}
              className={cn([
                'flex items-center justify-center border-2 border-[#191312] bg-[#bdb499]',
                number === 15 && 'bg-[#7e7367]',
              ])}
            >
              <p
                className={cn(
                  'text-xl font-bold text-[#ffde4a] [text-shadow:2px_2px_#000]',
                  number === 13 && 'text-[#4FA6F3]',
                  number === 14 && 'hidden',
                )}
              >
                {number}
              </p>
              {number === 14 && (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="9" y="9" width="4" height="4" fill="#8B0000" />
                  <rect x="9" y="34" width="4" height="4" fill="#8B0000" />
                  <rect x="35" y="9" width="4" height="4" fill="#8B0000" />
                  <rect x="35" y="9" width="4" height="4" fill="#8B0000" />
                  <rect x="35" y="34" width="4" height="4" fill="#8B0000" />
                  <rect x="16" y="13" width="13" height="13" fill="#8B0000" />
                  <rect x="13" y="18" width="19" height="3" fill="#8B0000" />
                  <rect
                    x="24"
                    y="10"
                    width="19"
                    height="3"
                    transform="rotate(90 24 10)"
                    fill="#8B0000"
                  />
                  <rect
                    x="16"
                    y="26"
                    width="3"
                    height="3"
                    transform="rotate(90 16 26)"
                    fill="#8B0000"
                  />
                  <rect
                    x="32"
                    y="26"
                    width="3"
                    height="3"
                    transform="rotate(90 32 26)"
                    fill="#8B0000"
                  />
                  <rect x="18" y="15" width="9" height="9" fill="#8B0000" />
                  <rect
                    x="18"
                    y="15"
                    width="2"
                    height="2"
                    transform="rotate(180 18 15)"
                    fill="#8B0000"
                  />
                  <rect
                    x="18"
                    y="26"
                    width="2"
                    height="2"
                    transform="rotate(180 18 26)"
                    fill="#8B0000"
                  />
                  <rect
                    x="29"
                    y="15"
                    width="2"
                    height="2"
                    transform="rotate(180 29 15)"
                    fill="#8B0000"
                  />
                  <rect
                    x="29"
                    y="26"
                    width="2"
                    height="2"
                    transform="rotate(180 29 26)"
                    fill="#8B0000"
                  />
                  <rect x="16" y="16" width="7" height="7" fill="#C0C0C0" />
                  <rect
                    x="27"
                    y="29"
                    width="3"
                    height="3"
                    transform="rotate(90 27 29)"
                    fill="#8B0000"
                  />
                  <rect
                    x="21"
                    y="29"
                    width="3"
                    height="3"
                    transform="rotate(90 21 29)"
                    fill="#8B0000"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
