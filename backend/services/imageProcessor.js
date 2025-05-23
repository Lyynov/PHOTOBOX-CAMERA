const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Menggabungkan beberapa gambar ke dalam template
 * @param {Array} imagePaths - Array path file gambar yang akan digabungkan
 * @param {String} templatePath - Path file template
 * @param {String} outputPath - Path file output
 * @param {Array} positions - Posisi masing-masing gambar pada template
 * @returns {Promise} Promise yang mengembalikan path file output
 */
exports.combineImagesWithTemplate = async (imagePaths, templatePath, outputPath, positions) => {
  try {
    const baseImage = await sharp(templatePath).toBuffer();
    
    const compositeOperations = [];
    
    for (let i = 0; i < imagePaths.length; i++) {
      const resizedPhoto = await sharp(imagePaths[i])
        .resize(positions[i].width, positions[i].height, { fit: 'cover' })
        .toBuffer();
      
      compositeOperations.push({
        input: resizedPhoto,
        top: positions[i].top,
        left: positions[i].left
      });
    }
    
    await sharp(baseImage)
      .composite(compositeOperations)
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Error in image processing:', error);
    throw new Error('Gagal memproses gambar');
  }
};