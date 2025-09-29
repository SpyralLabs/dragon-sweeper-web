export default function useMusic() {
  const playSound = async (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.volume = 1;
    audio.play().catch(console.error);
  };

  return {
    playSound,
  };
}
