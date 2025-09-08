import { ScaleUpVariants } from '@/lib/config/motion-config';
import { formatTxHash } from '@/lib/utils/format-util';
import { motion } from 'framer-motion';
import { useAccount, useEnsName } from 'wagmi';
import CharacterGrid from '@/assets/images/select/frame-box.webp';
import Icons from '@/components/ui/icons';
import usePagination from '@/lib/hooks/use-pagination';
import { useState } from 'react';
import { MOCK_NFT } from '../lib/mock-nft';
import CharacterCard from './character-card';

export default function CharacterSelectBox() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { page, size } = usePagination();
  const [pagination, setPagination] = useState({ page, size });
  const nfts = MOCK_NFT.slice(
    pagination.page * pagination.size,
    (pagination.page + 1) * pagination.size,
  );

  const handlePagination = (page: number, size: number) => {
    setPagination({ page, size });
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
        className="relative mx-auto h-[690px] w-[1500px] overflow-hidden p-9"
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
          <motion.button
            disabled
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-[#F0FFE6] opacity-35"
          >
            <Icons.ArrowLeft /> BACK
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-[#F0FFE6]"
          >
            NEXT (All 5) <Icons.ArrowRight />
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative z-1 mt-5 flex items-center justify-between rounded-lg"
        >
          {nfts.map((nft) => (
            <CharacterCard
              key={nft.id}
              {...nft}
              isSelected={true}
              onClick={(scheme) => console.log(scheme)}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
