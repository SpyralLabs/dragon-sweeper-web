import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { Button, type ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils/tailwind-util';

interface WalletConnectButtonProps extends ButtonProps {
  onConnected?: () => void;
  onDisconnected?: () => void;
}
export default function WalletConnectButton({
  className,
  onConnected,
  onClick,
  onDisconnected,
  ...props
}: WalletConnectButtonProps) {
  const { login } = useLoginWithAbstract();

  const handleClick = () => {
    login();
  };

  return (
    <Button
      className={cn(['font-bold uppercase', className])}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      {...props}
    />
  );
}
