# Notes App

## Gambaran Umum

Notes App ini adalah aplikasi web sederhana yang memungkinkan kalian untuk membuat, melihat, mengedit, mengarsipkan, dan menghapus catatan. Desainnya responsif, menggunakan teknologi web modern seperti HTML, CSS, dan JavaScript.

## Fitur

- **Tambah Catatan Baru**: Kalian bisa menambahkan catatan baru melalui formulir yang mudah digunakan.
- **Lihat Catatan**: Menampilkan daftar catatan dengan kemampuan untuk melihat detailnya.
- **Edit Catatan**: Kalian bisa mengedit catatan yang sudah ada.
- **Hapus Catatan**: Kalian bisa menghapus catatan yang tidak diperlukan lagi.
- **Arsipkan Catatan**: Kalian bisa mengarsipkan catatan yang sudah tidak aktif.
- **Cari Catatan**: Kalian bisa mencari catatan berdasarkan judul atau isinya.
- **Desain Responsif**: Tata letak yang bekerja dengan baik di berbagai ukuran layar.
- **Animasi Halus**: Aplikasi memiliki efek pergerakan halus untuk menghilangkan rasa bosan.
- **Feedback Error**: Menampilkan pesan error saat terjadi kegagalan request ke network.
- **Indikator Loading**: Menampilkan indikator loading saat melakukan proses request HTTP.

## Teknologi yang Digunakan

- **HTML**: Untuk struktur aplikasi web.
- **CSS**: Untuk styling aplikasi.
- **JavaScript**: Untuk fungsionalitas dan interaktivitas aplikasi.
- **Web Components**: Elemen kustom untuk mengenkapsulasi komponen catatan dan formulir.
- **Anime.js**: Untuk efek animasi halus.
- **SweetAlert2**: Untuk menampilkan pesan error dan konfirmasi.
- **Prettier**: Untuk memformat kode secara konsisten.

## Struktur Proyek

```
notes-app
├── src
│   ├── index.html       # Dokumen HTML utama untuk aplikasi
│   ├── styles.css       # Gaya untuk aplikasi
│   ├── app.js           # Logika JavaScript utama
│   └── components
│       └── note.js      # Elemen kustom untuk catatan individu
├── .prettierrc          # Konfigurasi Prettier
└── README.md            # Dokumentasi untuk proyek
```

## Instalasi

1. Clone repositori:
   ```
   git clone <repository-url>
   ```
2. Masuk ke direktori proyek:
   ```
   cd notes-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Jalankan aplikasi:
   ```
   npm start
   ```

## Penggunaan

Untuk menjalankan aplikasi, buka `src/index.html` di browser web kalian. Kalian bisa menambahkan catatan menggunakan formulir yang disediakan, dan catatan tersebut akan ditampilkan di bagian utama aplikasi. Kalian juga bisa mengedit, mengarsipkan, atau menghapus catatan dengan mengklik tombol yang sesuai.

## Format Kode dengan Prettier

Untuk memformat kode menggunakan Prettier, jalankan perintah berikut:

```
npx prettier --write .
```

Atau gunakan script yang sudah ditambahkan di `package.json`:

```
npm run format
```

## Tentang Proyek Ini

Tugas ini dibuat oleh saya, Riduan, selaku peserta Coding Camp 2025 by DBS Foundation X Dicoding. Semoga aplikasi ini bermanfaat dan bisa membantu dalam mengelola daftar catatan yang ingin ditambahkan agar tidak lupa mengerjakannya.
