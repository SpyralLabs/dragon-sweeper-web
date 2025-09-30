export function formatInGameItemNumber(number: number) {
  if (number === Infinity) {
    return ' UNLIMITED';
  }
  if (number > 1_000_000) {
    return `${Math.floor(number / 1_000_000)}M`;
  } else if (number > 1_000) {
    return `${Math.floor(number / 1_000)}K`;
  } else {
    return number.toLocaleString('en-US');
  }
}
