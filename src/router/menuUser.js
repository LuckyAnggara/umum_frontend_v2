import { RectangleGroupIcon, SwatchIcon, ArchiveBoxIcon, HomeModernIcon, RectangleStackIcon, DocumentTextIcon, UserIcon } from '@heroicons/vue/24/solid'

export const menuUser = [
  {
    name: 'Dashboard',
    icon: RectangleGroupIcon,
    to: 'dashboard-user',
  },
  {
    name: 'Daftar',
    icon: RectangleStackIcon,
    to: 'list-bmn',

    // to: 'persediaan',
  },
  {
    name: 'Perjadin Baru',
    icon: ArchiveBoxIcon,
    to: 'perjadin-new',
  },
]
