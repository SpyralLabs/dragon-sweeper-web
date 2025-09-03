import Icons from '@/components/icons';

export const BOARD_SIZE = {
  width: 13,
  height: 10,
};

export const INITIAL_HP = 5;
export const INITIAL_EXP = 0;
export const EXP_FOR_LEVEL_UP = 4;
export const MONSTERS = {
  spider: {
    id: 'spider',
    power: 1,
    icon: Icons.Spider,
  },
  poisonSpider: {
    id: 'poison_spider',
    power: 2,
    icon: Icons.PoisonSpider,
  },
  goblin: {
    id: 'goblin',
    power: 3,
    icon: Icons.Shadow, // Using Shadow icon for goblin
  },
  cobra: {
    id: 'cobra',
    power: 4,
    icon: Icons.Shadow, // Using Shadow icon for cobra
  },
  mushroom: {
    id: 'mushroom',
    power: 5,
    icon: Icons.Mushroom,
  },
  giant: {
    id: 'giant',
    power: 6,
    icon: Icons.Giant,
  },
  gargoyle: {
    id: 'gargoyle',
    power: 7,
    icon: Icons.Gargoyle,
  },
  poisonMushroom: {
    id: 'poison_mushroom',
    power: 8,
    icon: Icons.Mushroom, // Using Mushroom icon for poison mushroom
  },
  bunny: {
    id: 'bunny',
    power: 9,
    icon: Icons.Shadow, // Using Shadow icon for bunny
  },
  mineSeeker: {
    id: 'mine_seeker',
    power: 10,
    icon: Icons.Mineseeker,
  },
  eye: {
    id: 'eye',
    power: 5,
    icon: Icons.Shadow, // Using Shadow icon for eye
  },
  magician: {
    id: 'magician',
    power: 1,
    icon: Icons.Magician,
  },
  mimic: {
    id: 'mimic',
    power: 11,
    icon: Icons.Mimic,
  },
  darkLord: {
    id: 'dark_lord',
    power: 13,
    icon: Icons.DarkLord,
  },
  mine: {
    id: 'mine',
    power: 100,
    icon: Icons.Mine,
  },
} as const;

export const ITEMS = {
  boxCloose: {
    id: 'box-close',
    power: 0,
    icon: Icons.BoxClose,
  },
  boxOpen: {
    id: 'box-open',
    power: 0,
    icon: Icons.BoxOpen,
  },
  hpItem: {
    id: 'hp-item',
    power: 0,
    icon: Icons.HP,
  },
  pickDefault: {
    id: 'pick-item',
    power: 0,
    icon: Icons.PickDefault,
  },
  pickShine: {
    id: 'pick-shine',
    power: 0,
    icon: Icons.PickShine,
  },
  darkCrystal: {
    id: 'dark_crystal',
    power: 0,
    icon: Icons.DarkCrystal,
    exp: 3,
  },
  darkCrystalBroken: {
    id: 'dark_crystal_broken',
    power: 0,
    icon: Icons.DarkCrystalBroken,
  },
  mineBuster: {
    id: 'mine_buster',
    power: 0,
    icon: Icons.MineBuster,
  },
  monkey: {
    id: 'monkey',
    power: 0,
    icon: Icons.Monkey,
  },
} as const;
