import type { Variants } from 'framer-motion';

export const staggerContainer: Variants = {
  in: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const ScaleUpVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
};

export const ScaleDownVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
};

export const topDownTransitionVariants: Variants = {
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

export const bottomUpTransitionVariants: Variants = {
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

export const buttonVariants: Variants = {
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

export const AppearVariants: Variants = {
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
