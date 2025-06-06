import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TemplateSelector from '../../components/TemplateSelector/TemplateSelector';
import { getTemplates } from '../../services/api';
import './Home.css';

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [layoutOption, setLayoutOption] = useState('horizontal');
  const [loading, setLoading] = useState(true);

  // Fetch templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await getTemplates();
        if (response.success && response.templates.length > 0) {
          setTemplates(response.templates);
          setSelectedTemplate(response.templates[0].id);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleLayoutChange = (event) => {
    setLayoutOption(event.target.value);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Buat Kenangan Dengan PhotoBox</h1>
          <p>Ambil foto dengan kamera laptop Anda dan buat hasil foto yang menarik dengan template photobox.</p>
        </div>
      </div>

      <div className="features-section card">
        <h2 className="section-title">Cara Penggunaan</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">1</div>
            <h3>Pilih Template</h3>
            <p>Pilih template photobox yang Anda sukai dari berbagai pilihan</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">2</div>
            <h3>Ambil Foto</h3>
            <p>Aktifkan kamera dan ambil 3 foto otomatis dengan hitungan mundur</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">3</div>
            <h3>Download Hasil</h3>
            <p>Foto Anda akan digabungkan dengan template dan siap untuk diunduh</p>
          </div>
        </div>
      </div>

      <div className="setup-section card">
        <h2 className="section-title">Pengaturan PhotoBox</h2>
        
        {loading ? (
          <div className="loading">Loading templates...</div>
        ) : (
          <>
            <TemplateSelector 
              templates={templates} 
              selectedTemplate={selectedTemplate} 
              onSelect={handleTemplateSelect} 
            />
            
            <div className="layout-options">
              <h3>Pilih Layout</h3>
              <div className="radio-group">
                <label className="radio-container">
                  <input 
                    type="radio" 
                    name="layout" 
                    value="horizontal" 
                    checked={layoutOption === 'horizontal'} 
                    onChange={handleLayoutChange} 
                  />
                  <span className="radio-label">Horizontal (Berjajar)</span>
                </label>
                <label className="radio-container">
                  <input 
                    type="radio" 
                    name="layout" 
                    value="vertical" 
                    checked={layoutOption === 'vertical'} 
                    onChange={handleLayoutChange} 
                  />
                  <span className="radio-label">Vertikal (Bertumpuk)</span>
                </label>
              </div>
            </div>
            
            <div className="start-button-container">
              <Link 
                to={`/capture?template=${selectedTemplate}&layout=${layoutOption}`} 
                className="btn btn-primary start-button"
              >
                Mulai Photobox
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;