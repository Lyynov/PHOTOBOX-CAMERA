const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get available templates
export const getTemplates = async () => {
  try {
    const response = await fetch(`${API_URL}/templates`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

// Save photo to server
export const savePhoto = async (imageData) => {
  try {
    const response = await fetch(`${API_URL}/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving photo:', error);
    throw error;
  }
};

// Combine images with template
export const combineImages = async (photos, templateId, layout) => {
  try {
    const response = await fetch(`${API_URL}/combine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photos,
        templateId,
        layout,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error combining images:', error);
    throw error;
  }
};