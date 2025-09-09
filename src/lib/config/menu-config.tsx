import Icons from '@/components/ui/icons';
import Ygg from '@/assets/images/icon/logo-ygg.webp';

export const MENU_LIST = [
  {
    label: 'How to Play',
    modalKey: 'how-to-play',
    icon: <Icons.Playbook />,
  },
  {
    label: 'NFT Shop',
    modalKey: 'nft-shop',
    icon: <Icons.Gacha />,
  },
  {
    label: 'YGG',
    modalKey: 'ygg',
    icon: (
      <img
        style={{ userSelect: 'none' }}
        src={Ygg}
        alt="logo"
        width={59}
        height={61.6}
        draggable={false}
      />
    ),
  },
  {
    label: 'Setting',
    modalKey: 'setting',
    icon: <Icons.Setting />,
  },
] as const;
