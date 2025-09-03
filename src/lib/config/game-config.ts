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
    icon: '',
  },
  goblin: {
    id: 'goblin',
    power: 3,
    icon: '',
  },
  cobra: {
    id: 'cobra',
    power: 4,
    icon: '',
  },
  mushroom: {
    id: 'mushroom',
    power: 5,
    icon: '',
  },
  giant: {
    id: 'giant',
    power: 6,
    icon: '',
  },
  gargoyle: {
    id: 'gargoyle',
    power: 7,
    icon: '',
  },
  poisonMushroom: {
    id: 'poison_mushroom',
    power: 8,
    icon: '',
  },
  bunny: {
    id: 'bunny',
    power: 9,
    icon: '',
  },
  mineSeeker: {
    id: 'mine_seeker',
    power: 10,
    icon: '',
  },
  eye: {
    id: 'eye',
    power: 5,
    icon: '',
  },
  magician: {
    id: 'magician',
    power: 1,
    icon: '',
  },
  mimic: {
    id: 'mimic',
    power: 11,
    icon: '',
  },
  darkLord: {
    id: 'dark_lord',
    power: 13,
    icon: '',
  },
  mine: {
    id: 'mine',
    power: 100,
    icon: '',
  },
};

export const ITEMS = {
  box: {
    id: 'box',
    power: 0,
    icon: '',
  },
  hpItem: {
    id: 'hp_item',
    power: 0,
    icon: '',
  },
  pickItem: {
    id: 'pick_item',
    power: 0,
    icon: '',
  },
  darkCrystal: {
    id: 'dark_crystal',
    power: 0,
    icon: '',
    exp: 3,
  },
  mineBuster: {
    id: 'mine_buster',
    power: 0,
    icon: '',
  },
  monkey: {
    id: 'monkey',
    power: 0,
    icon: '',
  },
};
