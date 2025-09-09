import { useAccount, useEnsName } from 'wagmi';
import { formatTxHash } from '../utils/format-util';

export default function useUsername() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return ensName || formatTxHash(address);
}
