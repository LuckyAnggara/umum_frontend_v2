import {
  RectangleGroupIcon,
  SwatchIcon,
  ArchiveBoxIcon,
  HomeModernIcon,
  RectangleStackIcon,
  DocumentTextIcon,
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
    name: 'Belanja Perjadin',
    icon: RectangleStackIcon,
    to: 'perjadin-list',

    // to: 'persediaan',
  },
  {
    name: 'Belanja Non Perjadin',
    icon: RectangleStackIcon,
    to: 'list-bmn',

    // to: 'persediaan',
  },
  {
    name: 'Baru',
    icon: ArchiveBoxIcon,
    to: 'perjadin-new',
  },
  {
    name: '-',
  },
]
