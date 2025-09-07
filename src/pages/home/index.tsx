import { motion, type Variants } from 'framer-motion';
import NavLogo from '@/assets/images/landing/nav-logo.webp';
import Characters from '@/assets/images/landing/hero-characters.webp';
import FocusFrame from '@/assets/images/landing/focus-frame.webp';
import WalletConnectButton from '@/components/widgets/wallet-connect-button';

// 애니메이션 variants
const backgroundVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
};

const logoVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const charactersVariants: Variants = {
  initial: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const buttonContainerVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    y: 50,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

const buttonVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const staggerContainer = {
  in: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export default function HomePage() {
  return (
    <motion.main
      initial="initial"
      animate="in"
      variants={staggerContainer}
      className="relative flex min-h-[1080px] w-full flex-col items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        variants={backgroundVariants}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 -z-1 h-full w-full bg-[url(/src/assets/images/landing/bg-texture.webp)]"
      />

      {/* Logo */}
      <motion.img
        variants={logoVariants}
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
        variants={charactersVariants}
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
        variants={buttonContainerVariants}
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
            connect wallet
          </WalletConnectButton>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
