const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const templatesDir = path.join(__dirname, '../public/templates');
const uploadsDir = path.join(__dirname, '../uploads');

// Mendapatkan daftar template yang tersedia
exports.getTemplates = (req, res) => {
  try {
    const templates = fs.readdirSync(templatesDir)
      .filter(file => file.endsWith('.png'))
      .map(file => ({
        id: path.basename(file, '.png'),
        name: path.basename(file, '.png').replace(/([A-Z])/g, ' $1').trim(),
        url: `/templates/${file}`
      }));
    
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil daftar template' });
  }
};

// Menggabungkan foto ke dalam template
exports.combineImages = async (req, res) => {
  try {
    const { photos, templateId, layout } = req.body;
    
    if (!photos || !photos.length || photos.length !== 3) {
      return res.status(400).json({ success: false, message: 'Dibutuhkan 3 foto' });
    }
    
    if (!templateId) {
      return res.status(400).json({ success: false, message: 'ID template tidak ditemukan' });
    }
    
    const templatePath = path.join(templatesDir, `${templateId}.png`);
    
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({ success: false, message: 'Template tidak ditemukan' });
    }
    
    // Buat nama file output yang unik
    const outputFilename = `photobox_${uuidv4()}.png`;
    const outputPath = path.join(uploadsDir, outputFilename);
    
    // Resolusi output
    const outputWidth = 1200;
    const outputHeight = 1800;
    
    // Posisi foto pada template (akan disesuaikan berdasarkan layout)
    let photoPositions;
    
    if (layout === 'vertical') {
      // Layout vertikal - foto bertumpuk
      photoPositions = [
        { left: 150, top: 300, width: 900, height: 400 },
        { left: 150, top: 750, width: 900, height: 400 },
        { left: 150, top: 1200, width: 900, height: 400 }
      ];
    } else {
      // Layout horizontal - foto berjajar
      photoPositions = [
        { left: 100, top: 600, width: 300, height: 400 },
        { left: 450, top: 600, width: 300, height: 400 },
        { left: 800, top: 600, width: 300, height: 400 }
      ];
    }
    
    // Membuat canvas dengan template
    const compositeOperations = [];
    
    // Tambahkan template sebagai dasar
    const baseImage = await sharp(templatePath)
      .resize(outputWidth, outputHeight)
      .toBuffer();
    
    // Tambahkan foto-foto ke posisi yang telah ditentukan
    for (let i = 0; i < photos.length; i++) {
      const photoPath = path.join(uploadsDir, photos[i]);
      
      if (!fs.existsSync(photoPath)) {
        return res.status(404).json({ success: false, message: `Foto ${photos[i]} tidak ditemukan` });
      }
      
      const resizedPhoto = await sharp(photoPath)
        .resize(photoPositions[i].width, photoPositions[i].height, { fit: 'cover' })
        .toBuffer();
      
      compositeOperations.push({
        input: resizedPhoto,
        top: photoPositions[i].top,
        left: photoPositions[i].left
      });
    }
    
    // Gabungkan template dengan foto-foto
    await sharp(baseImage)
      .composite(compositeOperations)
      .toFile(outputPath);
    
    res.status(200).json({
      success: true,
      outputImage: `/uploads/${outputFilename}`,
      downloadUrl: `/api/download/${outputFilename}`
    });
  } catch (error) {
    console.error('Error combining images:', error);
    res.status(500).json({ success: false, message: 'Gagal menggabungkan gambar' });
  }
};