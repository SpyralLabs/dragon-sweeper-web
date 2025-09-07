import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import ButtonTopFrame from '@/assets/images/button/top-frame.webp';
import ButtonBottomFrame from '@/assets/images/button/bottom-frame.webp';

import { cn } from '@/lib/utils/tailwind-util';

const buttonVariants = cva(
  'text-black relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg leading-[45px] font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-primary/90',
        link: 'text-white underline-offset-2 hover:underline',
      },
      size: {
        default: 'h-[58px] pl-[42.5px] py-1 min-w-[184px]',
        sm: 'h-fit',
        lg: 'h-[84px] pl-[23px] pr-[25px] pt-4.5 pb-3 rounded-md px-8 text-xl min-w-[184px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <img
          className="absolute bottom-0 left-0 h-[calc(100%-6px)] w-full"
          src={ButtonBottomFrame}
          alt="Button Bottom Frame"
        />
        <img
          className="absolute top-0 left-0 h-[calc(100%-6px)] w-full"
          src={ButtonTopFrame}
          alt="Button Top Frame"
        />
        <div className="relative z-1">{children}</div>
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
