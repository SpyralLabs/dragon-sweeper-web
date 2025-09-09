import { ScaleUpVariants } from '@/lib/config/motion-config';
import { formatTxHash } from '@/lib/utils/format-util';
import { AnimatePresence, motion } from 'framer-motion';
import { useAccount, useEnsName } from 'wagmi';
import CharacterGrid from '@/assets/images/select/frame-box.webp';
import Icons from '@/components/ui/icons';
import usePagination from '@/lib/hooks/use-pagination';
import { useState } from 'react';
import { MOCK_NFT } from '@/features/onboarding/lib/mock-nft';
import CharacterCard from '@/features/onboarding/component/character-card';
import type { NFTInfo } from '@/features/onboarding/types/nft';
import { useGameConfig } from '@/lib/hooks/use-game-config';
import { useNavigate } from 'react-router';

export default function CharacterSelectBox() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { page, size } = usePagination();
  const [pagination, setPagination] = useState({ page, size });
  const { selectNFT, setUtility } = useGameConfig();
  const nfts = MOCK_NFT.slice(
    pagination.page * pagination.size,
    (pagination.page + 1) * pagination.size,
  );
  const [focusedNFTInfo, setFocusedNFTInfo] = useState<NFTInfo | null>(null);

  const handleNFTCardClick = (scheme: NFTInfo & { isFinalized: boolean }) => {
    if (scheme.isFinalized) {
      setUtility(scheme.utility.key, scheme.utility.starRate);
      selectNFT(scheme.selectedNftId);
      navigate('/game');
    } else {
      setFocusedNFTInfo({
        selectedNftId: scheme.selectedNftId,
        utility: scheme.utility,
      });
    }
  };

  return (
    <>
      <motion.div
        variants={{
          initial: {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          in: {
            opacity: 1,
            y: 0,
            scale: 1,
          },
        }}
        className="mb-8 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gold text-xl leading-[35px]"
        >
          Welcome, {ensName || formatTxHash(address)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl leading-[35px] text-gray-300"
        >
          Select your character
        </motion.p>
      </motion.div>
      <motion.div
        variants={ScaleUpVariants}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative mx-auto aspect-[1500/690] w-full max-w-[1500px] overflow-hidden p-9"
      >
        <img
          src={CharacterGrid}
          alt="Character Grid"
          className="absolute inset-0 z-0 h-full w-full select-none"
          draggable={false}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative z-1 flex items-center justify-between rounded-lg"
        >
          {/* LEFT BUTTON */}
          <motion.button
            disabled={pagination.page === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-[#F0FFE6] disabled:opacity-35"
            onClick={() =>
              setPagination({ page: Math.max(pagination.page - 1, 0), size: pagination.size })
            }
          >
            <Icons.ArrowLeft /> BACK
          </motion.button>

          {/* RIGHT BUTTON */}
          <motion.button
            disabled={pagination.page === Math.floor(MOCK_NFT.length / pagination.size)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-[#F0FFE6] disabled:opacity-35"
            onClick={() =>
              setPagination({
                page: Math.min(pagination.page + 1, Math.floor(MOCK_NFT.length / pagination.size)),
                size: pagination.size,
              })
            }
          >
            NEXT (All 5) <Icons.ArrowRight />
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative z-1 mt-5 flex items-center justify-start gap-2.5 rounded-lg"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pagination.page}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex items-center justify-start gap-2.5"
            >
              {nfts.map((nft, i) => (
                <motion.div
                  key={`${pagination.page}-${nft.id}-${i}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 50,
                      scale: 0.8,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                      },
                    },
                  }}
                >
                  <CharacterCard
                    {...nft}
                    isSelected={focusedNFTInfo?.selectedNftId === nft.id}
                    onClick={handleNFTCardClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
