import {
  RectangleGroupIcon,
  SwatchIcon,
  ArchiveBoxIcon,
  HomeModernIcon,
  DocumentCheckIcon,
  GlobeAsiaAustraliaIcon,
  BanknotesIcon,
  UserIcon,
} from '@heroicons/vue/24/solid'

export const menuUser = [
  {
    name: 'Dashboard',
    icon: RectangleGroupIcon,
    to: 'user-dashboard',
  },
  {
    name: '-',
  },
  {
    name: 'Anggaran',
    icon: BanknotesIcon,
    to: 'mak-list',
  },
  {
    name: 'Belanja Perjadin',
    icon: GlobeAsiaAustraliaIcon,
    to: 'perjadin-list',

    // to: 'persediaan',
  },
  {
    name: 'Belanja Non Perjadin',
    icon: DocumentCheckIcon,
    to: 'non-perjadin-list',

    // to: 'persediaan',
  },
]
