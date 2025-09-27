import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { type ReactNode } from 'react';
import { Header } from './header';

interface GameLayoutProps {
  children: ReactNode;
}

interface PlayLayoutProps {
  children: ReactNode;
}

interface CharacterLayoutProps {
  children: ReactNode;
}

// 애니메이션 variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    scale: 0.8,
    y: -50,
  },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
};

const headerVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  in: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  in: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Play 레이아웃 컴포넌트
const PlayLayout = ({ children }: PlayLayoutProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="h-full pb-30 bg-[#1a0f0c]"
      >
        {/* Header */}
        <motion.div variants={headerVariants} transition={{ duration: 0.8, delay: 0.2 }}>
          <Header />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="in"
          className="flex h-[min(100dvh,720px)] w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Character 레이아웃 컴포넌트
const CharacterLayout = ({ children }: CharacterLayoutProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-[#1a0f0c] w-max"
      >
        {/* Header */}
        <motion.div variants={headerVariants} transition={{ duration: 0.8, delay: 0.2 }}>
          <Header />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="in"
          className="flex w-full flex-col items-center px-5 py-[55px] pt-[51px]"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// 메인 GameLayout 컴포넌트
export const GameLayout = {
  Play: PlayLayout,
  Character: CharacterLayout,
};

// 기본 레이아웃 (필요시 사용)
export const DefaultGameLayout = ({ children }: GameLayoutProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-[#1a0f0c]"
      >
        <Header />
        <div className="p-6">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};
