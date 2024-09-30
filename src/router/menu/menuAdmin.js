import {
  HomeIcon,
  RectangleGroupIcon,
  SwatchIcon,
  ArchiveBoxIcon,
  HomeModernIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/vue/24/solid'

export const menuAdmin = [
  {
    name: 'Dashboard User',
    icon: HomeIcon,
    to: 'user-dashboard',
  },

  {
    name: '-',
  },
  {
    name: 'Dashboard Admin',
    icon: RectangleGroupIcon,
    to: 'admin-dashboard',
  },

  {
    name: '-',
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
        name: 'Daftar Data',
        to: 'list-bmn',
      },
      {
        name: 'Layanan BMN',
        to: 'permintaan-layanan-bmn-admin',
      },
      {
        name: 'Peminjaman BMN',
        to: 'peminjaman-bmn-admin',
      },
    ],
    // to: 'persediaan',
  },

  {
    name: 'Agenda',
    icon: HomeModernIcon,
    child: [
      {
        name: 'Peminjaman Tempat',
        to: 'jadwal-tempat',
      },
      {
        name: 'Agenda Pimpinan',
        to: 'list-agenda-pimpinan',
      },
    ],
  },
  {
    name: 'Arsip',
    icon: DocumentTextIcon,
    child: [
      {
        name: 'Tambah',
        to: 'tambah-arsip',
      },
      {
        name: 'Daftar',
        to: 'list-arsip',
      },
    ],
    // to: 'persediaan',
  },

  {
    name: 'Keuangan',
    icon: SwatchIcon,
    child: [
      {
        name: 'Anggaran',
        to: 'mak-list',
      },
      {
        name: 'Belanja Perjalanan Dinas',
        to: 'perjadin-list',
      },
      {
        name: 'Belanja Perjalanan non Dinas',
        to: 'permintaan-admin',
      },
    ],
  },

  // {
  //   name: 'Pertanggung Jawaban',
  //   icon: SwatchIcon,
  //   child: [
  //     {
  //       name: 'Daftar',
  //       to: 'list-ptj',
  //     },
  //   ],
  //   // to: 'persediaan',
  // },

  {
    name: '-',
  },

  {
    name: 'User Management',
    icon: UserIcon,
    to: 'user-management',
    // to: 'persediaan',
  },

  // {
  //   id: 3,
  //   name: 'Invoice',
  //   // icon: BriefcaseIcon,
  //   to: 'invoice',
  // },
]
