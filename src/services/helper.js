// export const storageUrl = 'http://192.168.46.163:8000/'
// export const storageUrl = 'http://192.168.10.127:8000'
// export const storageUrl = 'https://de.bbmakmur.com/public'
export const storageUrl = 'https://seru.itjenkumham.id/backend/storage'
// export const storageUrl = 'http://127.0.0.1:8000/storage'

// export const storageUrl = 'http://192.168.16.128:8000/'

export const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

export function getLastDayOfMonth(year, month) {
  // Membuat objek Date untuk tanggal awal bulan berikutnya
  var nextMonthDate = new Date(year, month, 1)
  // Mengatur tanggalnya menjadi 0, yang akan menggeser ke tanggal terakhir dari bulan sebelumnya
  var lastDay = new Date(nextMonthDate - 1)
  return lastDay.getDate()
}
