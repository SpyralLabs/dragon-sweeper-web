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

const leftPanelVariants = {
  initial: {
    opacity: 0,
    x: -100,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
};

const rightPanelVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
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
        className="min-h-screen bg-[#1a0f0c]"
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
          className="flex h-[calc(100vh-180px)]"
        >
          {/* Left Character Panel */}
          <motion.div
            variants={leftPanelVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-80 flex-shrink-0 p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="h-full rounded-lg border-2 border-[#8b4513] bg-gradient-to-b from-[#2d1b13] to-[#1a0f0c] p-4 shadow-2xl"
            >
              {children}
            </motion.div>
          </motion.div>

          {/* Right Game Board */}
          <motion.div
            variants={rightPanelVariants}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="h-full rounded-lg border-2 border-[#8b4513] bg-gradient-to-br from-[#2d1b13] to-[#1a0f0c] p-6 shadow-2xl"
            >
              {/* Game board content will be rendered here */}
              <div className="flex h-full items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, type: 'spring', bounce: 0.3 }}
                  className="text-center"
                >
                  <div className="mb-4 text-2xl font-bold text-white">Game Board</div>
                  <div className="text-gray-400">Game content will be rendered here</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
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
        className="min-h-screen bg-[#1a0f0c]"
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
