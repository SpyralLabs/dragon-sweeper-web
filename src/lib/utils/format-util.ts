export function formatTxHash(txHash?: string) {
  if (!txHash) return '-';
  return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
}
