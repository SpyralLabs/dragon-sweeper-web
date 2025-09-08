import { ScaleUpVariants } from '@/lib/config/motion-config';
import { formatTxHash } from '@/lib/utils/format-util';
import { motion } from 'framer-motion';
import { useAccount, useEnsName } from 'wagmi';
import CharacterGrid from '@/assets/images/select/frame-box.webp';

export default function CharacterSelectBox() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
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
        className="relative mx-auto h-[690px] w-[1500px] overflow-hidden"
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
          className="z-1 rounded-lg p-6 shadow-2xl"
        ></motion.div>
      </motion.div>
      {/* Navigation */}
      {/* <motion.div variants={staggerItem} className="mt-8 flex items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border-2 border-[#8b4513] bg-[#2d1b13] px-6 py-3 text-white transition-colors hover:bg-[#3d2b23]"
          >
            ← BACK
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border-2 border-[#8b4513] bg-[#2d1b13] px-6 py-3 text-white transition-colors hover:bg-[#3d2b23]"
          >
            NEXT (All 5) →
          </motion.button>
        </motion.div> */}
    </>
  );
}
