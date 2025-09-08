import { SUPPORTED_NETWORK } from '@/lib/config/network-config';
import { formatTxHash } from '@/lib/utils/format-util';
import { formatUnits } from 'viem';
import { useAccount, useBalance } from 'wagmi';

interface Props {
  type: 'eth' | 'account';
}

export default function AssetLabel({ type }: Props) {
  const { address } = useAccount();
  const { data: balanceInfo } = useBalance({
    address,
    chainId: SUPPORTED_NETWORK.id,
    query: {
      enabled: type === 'eth',
    },
  });
  const children =
    type === 'eth' && balanceInfo
      ? formatUnits(balanceInfo.value, balanceInfo.decimals) + ' $ETH'
      : formatTxHash(address);

  return (
    <div className="flex min-w-[168px] items-center justify-center bg-black px-5 pt-1 pb-[3px] text-sm">
      {children}
    </div>
  );
}
