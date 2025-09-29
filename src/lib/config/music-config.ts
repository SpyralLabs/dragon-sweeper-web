import InGameAttack from '@/assets/sounds/ingame-attack.wav';
import InGameClear from '@/assets/sounds/ingame-clear.wav';
import InGameGacha from '@/assets/sounds/ingame-gacha.wav';
import IngameHpItem from '@/assets/sounds/ingame-hpitem.wav';
import IngameLevelUp from '@/assets/sounds/ingame-levelup.wav';
import IngameOVer from '@/assets/sounds/ingame-over.wav';
import IngameStart from '@/assets/sounds/ingame-start.wav';
import SelectAomi from '@/assets/sounds/select/aomi.wav';

export const SOUNDS = {
  ingame: {
    attack: InGameAttack,
    clear: InGameClear,
    gacha: InGameGacha,
    hpitem: IngameHpItem,
    levelup: IngameLevelUp,
    over: IngameOVer,
    start: IngameStart,
  },
  select: {
    aomi: SelectAomi,
  },
} as const;
