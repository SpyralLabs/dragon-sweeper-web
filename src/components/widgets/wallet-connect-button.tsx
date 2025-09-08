import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { Button, type ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils/tailwind-util';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router';

interface WalletConnectButtonProps extends ButtonProps {
  explicitAction?: 'connect' | 'disconnect';
  onConnected?: () => void;
  onDisconnected?: () => void;
}
export default function WalletConnectButton({
  explicitAction,
  className,
  onConnected,
  onClick,
  onDisconnected,
  variant,
  size,
  ...props
}: WalletConnectButtonProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout } = useLoginWithAbstract();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const isWalletConnectAction = explicitAction === 'connect';
  const isWalletDisconnectAction = explicitAction === 'disconnect';

  const handleClick = async () => {
    if (!isConnected || isWalletConnectAction) {
      await disconnectAsync();
      login();
      return;
    }

    if (isConnected || isWalletDisconnectAction) {
      logout();
      await disconnectAsync();
      navigate('/', { replace: true });
      return;
    }
  };

  useEffect(() => {
    if (isConnected) {
      setIsLoading(false);
      navigate('/onboarding/character');
    }
  }, [isConnected]);

  return (
    <Button
      variant={variant || (isConnected || isWalletDisconnectAction ? 'link' : 'default')}
      size={size || (isConnected || isWalletDisconnectAction ? 'sm' : 'default')}
      className={cn([
        'font-bold',
        variant === 'link' && 'font-normal',
        className,
        isLoading && 'opacity-50',
      ])}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      {...props}
    />
  );
}
