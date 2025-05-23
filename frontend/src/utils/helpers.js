/**
 * Menformat waktu dalam ms menjadi format yang mudah dibaca
 * @param {number} ms - Waktu dalam milidetik
 * @returns {string} - Waktu dalam format yang mudah dibaca
 */
export const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    return `${hours > 0 ? `${hours}h ` : ''}${minutes % 60 > 0 ? `${minutes % 60}m ` : ''}${seconds % 60}s`;
  };
  
  /**
   * Mendapatkan URL parameter berdasarkan nama
   * @param {string} name - Nama parameter
   * @returns {string|null} - Nilai parameter atau null jika tidak ditemukan
   */
  export const getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  
  /**
   * Memvalidasi bahwa string adalah URL yang valid
   * @param {string} url - URL yang akan divalidasi
   * @returns {boolean} - true jika URL valid, false jika tidak
   */
  export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  /**
   * Membuat delay dengan Promise
   * @param {number} ms - Delay dalam milidetik
   * @returns {Promise} - Promise yang akan resolve setelah delay
   */
  export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  /**
   * Membuat event yang memicu setelah elemen diam (tidak di-resize) 
   * selama waktu tertentu
   * @param {function} callback - Fungsi yang akan dipanggil
   * @param {number} delay - Delay dalam milidetik
   * @returns {function} - Fungsi yang akan dipanggil ketika event terjadi
   */
  export const debounce = (callback, delay = 300) => {
    let timeout;
    
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), delay);
    };
  };