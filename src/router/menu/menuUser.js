import {
  RectangleGroupIcon,
  SwatchIcon,
  ArchiveBoxIcon,
  HomeModernIcon,
  DocumentCheckIcon,
  GlobeAsiaAustraliaIcon,
  BanknotesIcon,
  UserIcon,
  UserGroupIcon,
  HomeIcon,
} from '@heroicons/vue/24/solid'

export const menuUser = [
  {
    name: 'Menu Utama',
    icon: RectangleGroupIcon,
    to: 'user-dashboard',
  },
  {
    name: 'Dashboard User',
    icon: HomeIcon,
    to: 'keuangan-dashboard',
  },
  {
    name: '-',
  },
  {
    name: 'SBM',
    icon: BanknotesIcon,
    to: 'sbm-list',
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
  {
    name: 'Data Pegawai',
    icon: UserGroupIcon,
    to: 'perjadin-list-pegawai',
    // to: 'persediaan',
  },
]
