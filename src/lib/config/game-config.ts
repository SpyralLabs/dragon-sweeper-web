import Icons from '@/components/ui/icons';
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export const BOARD_SIZE = {
  width: 13,
  height: 10,
};

export const INITIAL_HP = 5;
export const INITIAL_EXP = 0;
export const EXP_FOR_LEVEL_UP = 4;

export type GameEntity = {
  id: string;
  type: 'monster' | 'item';
  power: number;
  xp: number;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

export type Monsters =
  | 'spider'
  | 'poisonSpider'
  | 'goblin'
  | 'cobra'
  | 'mushroom'
  | 'giant'
  | 'gargoyle'
  | 'poisonMushroom'
  | 'bunny'
  | 'mineSeeker'
  | 'eye'
  | 'shadow'
  | 'magician'
  | 'mimic'
  | 'darkLord'
  | 'mine';

export type Items =
  | 'boxClose'
  | 'boxOpen'
  | 'hpItem'
  | 'pickDefault'
  | 'pickShine'
  | 'darkCrystal'
  | 'darkCrystalBroken'
  | 'mineBuster'
  | 'monkey'
  | 'wall1'
  | 'wall2'
  | 'wall3'
  | 'wall4'
  | 'expBox'
  | 'expWall';

export const MONSTERS: Record<Monsters, GameEntity> = {
  spider: {
    id: 'spider',
    type: 'monster',
    power: 1,
    xp: 1,
    icon: Icons.Spider,
  },
  poisonSpider: {
    id: 'poison_spider',
    type: 'monster',
    power: 2,
    xp: 2,
    icon: Icons.PoisonSpider,
  },
  goblin: {
    id: 'goblin',
    type: 'monster',
    power: 3,
    xp: 3,
    icon: Icons.Goblin,
  },
  cobra: {
    id: 'cobra',
    type: 'monster',
    power: 4,
    xp: 4,
    icon: Icons.Cobra,
  },
  mushroom: {
    id: 'mushroom',
    type: 'monster',
    power: 5,
    xp: 5,
    icon: Icons.Mushroom,
  },
  giant: {
    id: 'giant',
    type: 'monster',
    power: 6,
    xp: 6,
    icon: Icons.Giant,
  },
  gargoyle: {
    id: 'gargoyle',
    type: 'monster',
    power: 7,
    xp: 7,
    icon: Icons.Gargoyle,
  },
  poisonMushroom: {
    id: 'poison_mushroom',
    type: 'monster',
    power: 8,
    xp: 8,
    icon: Icons.PoisonMushroom,
  },
  bunny: {
    id: 'bunny',
    type: 'monster',
    power: 9,
    xp: 9,
    icon: Icons.Bunny, // Using Shadow icon for bunny
  },
  mineSeeker: {
    id: 'mine_seeker',
    type: 'monster',
    power: 10,
    xp: 10,
    icon: Icons.Mineseeker,
  },
  eye: {
    id: 'eye',
    type: 'monster',
    power: 5,
    xp: 5,
    icon: Icons.Shadow, // Using Shadow icon for eye
  },
  shadow: {
    id: 'shadow',
    type: 'monster',
    power: 5,
    xp: 5,
    icon: Icons.Shadow,
  },
  magician: {
    id: 'magician',
    type: 'monster',
    power: 1,
    xp: 1,
    icon: Icons.Magician,
  },
  mimic: {
    id: 'mimic',
    type: 'monster',
    power: 11,
    xp: 11,
    icon: Icons.Mimic,
  },
  darkLord: {
    id: 'dark_lord',
    power: 13,
    type: 'monster',
    xp: 13,
    icon: Icons.DarkLord,
  },
  mine: {
    id: 'mine',
    type: 'monster',
    xp: 0,
    power: 100,
    icon: Icons.Mine,
  },
} as const;

export const ITEMS: Record<Items, GameEntity> = {
  boxClose: {
    id: 'box-close',
    type: 'item',
    power: 0,
    xp: 0,
    icon: Icons.BoxClose,
  },
  boxOpen: {
    id: 'box-open',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.BoxOpen,
  },
  hpItem: {
    id: 'hp-item',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.HP,
  },
  pickDefault: {
    id: 'pick-item',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.PickDefault,
  },
  pickShine: {
    id: 'pick-shine',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.PickShine,
  },
  darkCrystal: {
    id: 'dark-crystal',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.DarkCrystal,
  },
  darkCrystalBroken: {
    id: 'dark-crystal-broken',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.DarkCrystalBroken,
  },
  mineBuster: {
    id: 'mine-buster',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.MineBuster,
  },
  monkey: {
    id: 'monkey',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.Monkey,
  },
  wall1: {
    id: 'wall1',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.Wall1,
  },
  wall2: {
    id: 'wall2',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.Wall2,
  },
  wall3: {
    id: 'wall3',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.Wall3,
  },
  wall4: {
    id: 'wall4',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.Wall4,
  },
  expBox: {
    id: 'exp-box',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.ExpBox,
  },
  expWall: {
    id: 'exp-wall',
    type: 'item',
    xp: 0,
    power: 0,
    icon: Icons.ExpWall,
  },
};
