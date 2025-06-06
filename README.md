# Photobox Web App

Aplikasi web Photobox yang memungkinkan pengguna mengambil foto menggunakan kamera laptop dan menggabungkannya dalam template photobox yang menarik.

## Fitur

- Pengambilan foto otomatis menggunakan kamera laptop
- Countdown timer sebelum pengambilan foto
- Pengambilan 3 foto secara otomatis dengan interval beberapa detik
- Berbagai template photobox untuk dipilih
- Penggabungan foto ke dalam template yang dipilih
- Download hasil akhir sebagai satu gambar

## Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- Multer (untuk handling file upload)
- Sharp/Jimp (untuk pemrosesan gambar)
- Cors (untuk cross-origin resource sharing)

### Frontend
- React
- HTML5
- CSS3
- JavaScript ES6+
- MediaDevices API (untuk akses kamera)
- Canvas API (untuk manipulasi gambar)

## Persyaratan Sistem

- Node.js v14.x atau lebih baru
- NPM v6.x atau lebih baru
- Browser modern (Chrome, Firefox, Edge, Safari) dengan dukungan untuk MediaDevices API
- Kamera laptop/webcam yang berfungsi
- Izin browser untuk mengakses kamera

## Instalasi

### Langkah 1: Clone Repository

```bash
git clone https://github.com/username/photobox-app.git
cd photobox-app
```

### Langkah 2: Instalasi Backend

```bash
cd backend
npm install
cp .env.example .env  # Sesuaikan konfigurasi di file .env
```

Sesuaikan file `.env` dengan konfigurasi yang dibutuhkan:

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
UPLOAD_DIR=./uploads
```

### Langkah 3: Instalasi Frontend

```bash
cd ../frontend
npm install
cp .env.example .env  # Sesuaikan konfigurasi di file .env
```

Sesuaikan file `.env` dengan konfigurasi yang dibutuhkan:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Menjalankan Aplikasi

### Backend

```bash
cd backend
npm start
```

Backend akan berjalan di `http://localhost:5000`

### Frontend

```bash
cd frontend
npm start
```

Frontend akan berjalan di `http://localhost:3000`

## Cara Penggunaan

1. Buka aplikasi di browser (http://localhost:3000)
2. Pilih template photobox yang diinginkan
3. Klik tombol "Start" untuk memulai proses pengambilan foto
4. Posisikan diri di depan kamera, pengambilan foto akan dimulai dalam hitungan mundur
5. Aplikasi akan mengambil 3 foto secara otomatis dengan interval beberapa detik
6. Hasil foto akan digabungkan dengan template yang dipilih
7. Klik tombol "Download" untuk menyimpan hasil akhir

## Struktur Project

### Backend

- `config/` - Konfigurasi aplikasi
- `controllers/` - Logika pengendali untuk route API
- `middleware/` - Middleware Express
- `public/templates/` - Template photobox
- `routes/` - Definisi route API
- `services/` - Logika bisnis dan pemrosesan gambar
- `uploads/` - Direktori untuk menyimpan foto sementara
- `server.js` - Entry point aplikasi backend

### Frontend

- `public/` - Aset statis
- `src/components/` - Komponen React yang dapat digunakan kembali
- `src/pages/` - Komponen halaman utama
- `src/services/` - Komunikasi dengan API backend
- `src/utils/` - Fungsi utilitas

## Troubleshooting

### Masalah Kamera

- Pastikan browser memiliki izin untuk mengakses kamera
- Periksa apakah kamera sedang digunakan oleh aplikasi lain
- Coba refresh halaman jika kamera tidak muncul

### Masalah Processing Gambar

- Pastikan backend server berjalan
- Periksa log server untuk pesan error
- Verifikasi bahwa API endpoint dapat dijangkau dari frontend

## Lisensi

MIT

## Kontribusi

Kontribusi selalu diterima! Silakan buat issue atau pull request untuk perbaikan atau fitur baru.
