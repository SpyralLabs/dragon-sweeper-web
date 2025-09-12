import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { Button, type ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils/tailwind-util';
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router';

interface WalletConnectButtonProps extends ButtonProps {
  explicitAction?: 'connect' | 'disconnect';
}
export default function WalletConnectButton({
  explicitAction,
  className,
  onClick,
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
    setIsLoading(true);
    try {
      if (isWalletConnectAction) {
        await disconnectAsync();
        login();
        return;
      }

      if (isWalletDisconnectAction) {
        logout();
        await disconnectAsync();
        navigate('/', { replace: true });
        return;
      }

      if (!isConnected) {
        await disconnectAsync();
        login();
        return;
      } else {
        logout();
        await disconnectAsync();
        navigate('/', { replace: true });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      disabled={isLoading}
      variant={variant || (isConnected || isWalletDisconnectAction ? 'link' : 'default')}
      size={size || (isConnected || isWalletDisconnectAction ? 'sm' : 'default')}
      className={cn([
        'font-bold',
        variant === 'link' && 'font-normal',
        className,
        isLoading && 'opacity-75',
      ])}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      {...props}
    />
  );
}
