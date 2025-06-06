const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Menyimpan foto dari data base64
 * @param {String} base64Data - Data gambar dalam format base64
 * @param {String} uploadDir - Direktori untuk menyimpan foto
 * @returns {Promise} Promise yang mengembalikan nama file yang disimpan
 */
exports.saveBase64Photo = async (base64Data, uploadDir) => {
  try {
    // Strip prefix (e.g., "data:image/jpeg;base64,")
    const strippedBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    
    // Buat nama file yang unik
    const filename = `${uuidv4()}.jpg`;
    const filePath = path.join(uploadDir, filename);
    
    // Simpan gambar ke disk
    fs.writeFileSync(filePath, strippedBase64, { encoding: 'base64' });
    
    return filename;
  } catch (error) {
    console.error('Error saving photo:', error);
    throw new Error('Gagal menyimpan foto');
  }
};