import { RectangleGroupIcon, SwatchIcon, ArchiveBoxIcon, HomeModernIcon, RectangleStackIcon, DocumentTextIcon, UserIcon } from '@heroicons/vue/24/solid'

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
    name: 'Perjadin Baru',
    icon: ArchiveBoxIcon,
    to: 'persediaan-admin',
  },

  {
    name: 'Daftar',
    icon: RectangleStackIcon,
    to: 'list-bmn',

    // to: 'persediaan',
  },
]
