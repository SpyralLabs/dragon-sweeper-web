import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Usage
 * ```tsx
 * import { cn } from '@/lib/utils/tailwindUtil'
 *
 * return (
 *  <button
 *      className={cn([
 *          'px-4 py-2 rounded',
 *          'bg-blue-500 text-white',
 *          'hover:bg-blue-600',
 *          isDisabled && 'bg-slate-400 text-slate-600 cursor-not-allowed',
 *      )]}
 *  >
 *  Hello
 * </button>;
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
