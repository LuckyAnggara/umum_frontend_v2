import {
  RectangleGroupIcon,
  BriefcaseIcon,
  ArchiveBoxIcon,
} from '@heroicons/vue/24/solid'

export const menu = [
  {
    name: 'Dashboard',
    icon: RectangleGroupIcon,
    to: 'dashboard',
  },

  {
    name: 'Persediaan',
    icon: ArchiveBoxIcon,
    child: [
      {
        name: 'Produk',
        to: 'persediaan-admin',
      },
      {
        name: 'Data Permintaan',
        to: 'permintaan-admin',
      },
    ],
  },

  {
    name: 'BMN',
    icon: BriefcaseIcon,
    child: [
      {
        name: 'Daftar',
        to: 'list-bmn',
      },
      {
        name: 'Layanan',
        to: 'permintaan-layanan-bmn-admin',
      },
    ],
    // to: 'persediaan',
  },

  // {
  //   id: 3,
  //   name: 'Invoice',
  //   // icon: BriefcaseIcon,
  //   to: 'invoice',
  // },
]
