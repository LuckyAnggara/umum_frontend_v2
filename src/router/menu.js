import {
  RectangleGroupIcon,
  SwatchIcon,
  ArchiveBoxIcon,
  HomeModernIcon,
  RectangleStackIcon,
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
    icon: RectangleStackIcon,
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

  {
    name: 'Peminjaman Ruangan',
    icon: HomeModernIcon,
    child: [
      {
        name: 'Jadwal',
        to: 'jadwal-tempat',
      },
    ],
  },

  {
    name: 'Pertanggung Jawaban',
    icon: SwatchIcon,
    child: [
      {
        name: 'Daftar',
        to: 'list-bmn',
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
