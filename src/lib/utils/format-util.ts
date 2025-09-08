export function formatTxHash(txHash?: string) {
  if (!txHash) return '-';
  const lowertxHash = txHash.toLowerCase();
  return `${lowertxHash.slice(0, 6)}...${lowertxHash.slice(-4)}`;
}
