import type { NFTUtilityType } from '@/state/game';
import NFTDefaultFrame from '@/assets/images/hero/hero-card-frame-default.webp';
import NFTActiveFrame from '@/assets/images/hero/hero-card-frame-active.webp';
import NFTNameFrame from '@/assets/images/hero/hero-card-title-frame.webp';
import { cn } from '@/lib/utils/tailwind-util';
import { AnimatePresence, motion } from 'framer-motion';
import Icons from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

interface Props {
  id: number;
  name: string;
  src: string;
  utility: NFTUtilityType;
  isSelected: boolean;
  onClick?: ({
    isFinalized,
    selectedNftId,
    utility,
  }: {
    isFinalized: boolean;
    selectedNftId: number;
    utility: NFTUtilityType;
  }) => void;
}

export default function CharacterCard({ id, name, src, utility, isSelected, onClick }: Props) {
  const handleClick = () => {
    onClick?.({
      isFinalized: isSelected,
      selectedNftId: id,
      utility: { key: 'DEFAULT', starRate: 1 },
    });
  };

  return (
    <div
      className={cn([
        'relative flex aspect-[350/576] max-w-[350px] shrink-0 flex-grow cursor-pointer flex-col items-center',
        isSelected && 'cursor-default',
      ])}
      onClick={
        isSelected
          ? undefined
          : (e) => {
              e.preventDefault();
              handleClick();
            }
      }
    >
      <img src={src} alt={name} className="mx-auto mt-2 w-[328px] object-cover" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn([
          'absolute bottom-0 left-0 hidden h-[calc(50%-10px)] w-full flex-col items-center border-t-[3px] border-t-black bg-[#191816] pb-7',
          isSelected && 'flex',
        ])}
      >
        <header className="relative top-0 left-0 flex w-full items-center justify-center py-[25px]">
          <img
            src={NFTNameFrame}
            alt="NFT Name Frame"
            className="absolute -top-2 left-1/2 w-[324px] -translate-x-1/2"
          />
          <p className={cn(['z-1 -mt-1 text-lg', utility.starRate === 5 && 'text-[#E135E1]'])}>
            {name}
          </p>
        </header>
        <div className="z-1 mx-auto mt-4 flex flex-col items-start justify-center gap-2 px-7">
          <div className={'flex items-center'}>
            Rarity: Common
            <div className="ml-2 flex items-center gap-1">
              {Array.from({ length: utility.starRate }).map((_, i) => (
                <Icons.Star key={i} />
              ))}
            </div>
          </div>
          <p>Utility: {utility.key}</p>
        </div>
        <Button
          variant="default"
          className="absolute bottom-8 left-1/2 z-2 -translate-x-1/2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick();
          }}
        >
          Select
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn([
          'absolute bottom-0 left-0 flex w-full items-center justify-center border-t-[3px] border-t-black bg-[#191816] py-8 pt-5 text-lg',
          utility.starRate === 5 && 'text-[#E135E1]',
          isSelected && 'hidden',
        ])}
      >
        {name}
      </motion.div>
      <motion.img
        initial={{ opacity: 1 }}
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        src={NFTDefaultFrame}
        alt="NFT Default Frame"
        className={cn(['absolute inset-0 h-full w-full select-none', isSelected && 'hidden'])}
        draggable={false}
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        src={NFTActiveFrame}
        alt="NFT Active Frame"
        className={cn(['absolute inset-0 hidden h-full w-full select-none', isSelected && 'block'])}
        draggable={false}
      />
    </div>
  );
}
