const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Dosya yükleme için multer yapılandırması
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Dosyalar bu klasöre kaydedilecek
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Benzersiz dosya adı
    }
});

const upload = multer({ storage: storage });

// Statik dosyaları sunmak için
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dosya yükleme endpoint'i
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Dosya yüklenemedi' });
    }
    res.json({ 
        message: 'Dosya başarıyla yüklendi',
        filename: req.file.filename
    });
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
}); 