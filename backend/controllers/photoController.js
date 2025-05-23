const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadsDir = path.join(__dirname, '../uploads');

exports.savePhoto = async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ success: false, message: 'Tidak ada data gambar yang diterima' });
    }

    // Strip prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    
    // Generate unique filename
    const filename = `${uuidv4()}.jpg`;
    const filePath = path.join(uploadsDir, filename);
    
    // Save image to disk
    fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
    
    res.status(200).json({ 
      success: true, 
      filename: filename,
      filePath: `/uploads/${filename}`
    });
  } catch (error) {
    console.error('Error saving photo:', error);
    res.status(500).json({ success: false, message: 'Gagal menyimpan foto' });
  }
};