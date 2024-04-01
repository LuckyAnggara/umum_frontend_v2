import { RectangleGroupIcon, SwatchIcon, ArchiveBoxIcon, HomeModernIcon, RectangleStackIcon, DocumentTextIcon } from '@heroicons/vue/24/solid'

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
    name: 'Pertanggung Jawaban',
    icon: SwatchIcon,
    child: [
      {
        name: 'Daftar',
        to: 'list-ptj',
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
