import Icons from '@/components/ui/icons';

export default function GameStartDialog({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute inset-0 z-[9999] flex h-full w-full flex-col items-center justify-center">
      <button className="relative flex items-center justify-center gap-1" onClick={onClick}>
        <Icons.PlayIcon />
        <p className="text-4xl text-[#fff5b9] text-shadow-[2px_2px_#000000]">GAME START</p>
      </button>
    </div>
  );
}
