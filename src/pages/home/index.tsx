import { AnimatePresence, motion } from 'framer-motion';
import NavLogo from '@/assets/images/landing/nav-logo.webp';
import Characters from '@/assets/images/landing/hero-characters.webp';
import FocusFrame from '@/assets/images/landing/focus-frame.webp';
import WalletConnectButton from '@/components/widgets/wallet-connect-button';
import {
  AppearVariants,
  bottomUpTransitionVariants,
  buttonVariants,
  ScaleDownVariants,
  staggerContainer,
  topDownTransitionVariants,
} from '@/lib/config/motion-config';

export default function HomePage() {
  return (
    <AnimatePresence>
      <motion.main
        initial="initial"
        animate="in"
        variants={staggerContainer}
        className="relative flex min-h-[1080px] w-full flex-col items-center overflow-hidden"
      >
        {/* Background */}
        <motion.div
          variants={ScaleDownVariants}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 -z-1 h-full w-full bg-[url(/src/assets/images/landing/bg-texture.webp)]"
        />

        {/* Logo */}
        <motion.img
          variants={topDownTransitionVariants}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          src={NavLogo}
          alt="Nav Logo"
          className="w-desktop-max z-1 h-auto max-w-none select-none"
          draggable={false}
        />

        {/* Characters */}
        <motion.img
          variants={bottomUpTransitionVariants}
          transition={{
            duration: 1.0,
            delay: 0.6,
            type: 'spring',
            stiffness: 80,
            damping: 20,
          }}
          src={Characters}
          alt="Characters"
          className="absolute bottom-0 left-1/2 aspect-[1157/1019] h-auto w-[1157px] max-w-none -translate-x-1/2 select-none"
          draggable={false}
        />

        {/* Connect Wallet Button Container */}
        <motion.div
          variants={AppearVariants}
          transition={{
            duration: 0.6,
            delay: 0.9,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
          className="absolute bottom-[76px] left-1/2 z-1 flex h-[172px] w-105 -translate-x-1/2 items-center justify-center"
        >
          <motion.img
            variants={buttonVariants}
            transition={{ duration: 0.4, delay: 1.1 }}
            src={FocusFrame}
            alt="Focus Frame"
            className="absolute inset-0 h-full w-full"
          />
          <motion.div
            variants={buttonVariants}
            transition={{ duration: 0.4, delay: 1.2 }}
            whileHover="hover"
            whileTap="tap"
          >
            <WalletConnectButton size="lg" explicitAction="connect">
              CONNECT WALLET
            </WalletConnectButton>
          </motion.div>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
