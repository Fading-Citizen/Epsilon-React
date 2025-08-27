import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Search, 
  X, 
  ExternalLink, 
  Play, 
  Clock, 
  Eye, 
  Check,
  Video,
  Youtube,
  ArrowLeft
} from 'lucide-react';

const VideoEmbed = ({ onSelect, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestedVideos] = useState([
    {
      id: 'yt-1',
      title: 'Introducción al Cálculo Diferencial',
      duration: '15:32',
      views: '45,232',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      description: 'Video introductorio sobre los conceptos básicos del cálculo diferencial.'
    },
    {
      id: 'yt-2',
      title: 'Límites y Continuidad',
      duration: '22:15',
      views: '38,421',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      description: 'Explicación detallada de límites matemáticos y continuidad de funciones.'
    },
    {
      id: 'vm-1',
      title: 'Algebra Lineal - Vectores',
      duration: '18:43',
      views: '29,183',
      platform: 'Vimeo',
      url: 'https://vimeo.com/123456789',
      thumbnail: 'https://i.vimeocdn.com/video/123456789-295x166.jpg',
      description: 'Conceptos fundamentales de vectores en algebra lineal.'
    },
    {
      id: 'yt-3',
      title: 'Derivadas - Regla de la Cadena',
      duration: '12:28',
      views: '52,109',
      platform: 'YouTube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      description: 'Tutorial sobre la aplicación de la regla de la cadena en derivadas.'
    }
  ]);

  const [filteredVideos, setFilteredVideos] = useState(suggestedVideos);

  useEffect(() => {
    if (searchTerm) {
      const filtered = suggestedVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(suggestedVideos);
    }
  }, [searchTerm, suggestedVideos]);

  const extractVideoId = (url) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return { id: youtubeMatch[1], platform: 'youtube' };
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return { id: vimeoMatch[1], platform: 'vimeo' };
    }

    return null;
  };

  const validateVideoUrl = async (url) => {
    setLoading(true);
    setVideoInfo(null);

    try {
      const videoData = extractVideoId(url);
      
      if (!videoData) {
        throw new Error('URL de video no válida. Solo se soportan YouTube y Vimeo.');
      }

      // Simular información del video (en producción se haría con APIs reales)
      const mockVideoInfo = {
        id: videoData.id,
        platform: videoData.platform,
        title: videoData.platform === 'youtube' ? 'Video de YouTube' : 'Video de Vimeo',
        duration: '10:35',
        thumbnail: videoData.platform === 'youtube' 
          ? `https://img.youtube.com/vi/${videoData.id}/mqdefault.jpg`
          : `https://i.vimeocdn.com/video/${videoData.id}-295x166.jpg`,
        url: url
      };

      setVideoInfo(mockVideoInfo);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      alert('Por favor ingresa una URL de video');
      return;
    }
    validateVideoUrl(videoUrl);
  };

  const handleVideoSelect = (video) => {
    onSelect({
      url: video.url,
      title: video.title,
      platform: video.platform || 'youtube',
      duration: video.duration,
      thumbnail: video.thumbnail
    });
  };

  const handleCustomVideoSelect = () => {
    if (!videoInfo) {
      alert('Por favor valida la URL del video primero');
      return;
    }
    handleVideoSelect(videoInfo);
  };

  const tabs = [
    { id: 'url', label: 'URL Personalizada', icon: <ExternalLink size={16} /> },
    { id: 'library', label: 'Biblioteca de Videos', icon: <Video size={16} /> }
  ];

  return (
    <StyledWrapper>
      <div className="video-embed-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <button className="back-btn" onClick={onCancel}>
              <ArrowLeft size={20} />
              Volver
            </button>
            <h2>Seleccionar Video</h2>
          </div>
          <button className="close-btn" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${selectedTab === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="modal-content">
          {selectedTab === 'url' && (
            <div className="url-section">
              <div className="url-info">
                <h3>Agregar Video desde URL</h3>
                <p>Soportamos videos de YouTube y Vimeo. Simplemente pega la URL del video.</p>
              </div>

              <div className="url-input">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <button 
                  className="validate-btn"
                  onClick={handleUrlSubmit}
                  disabled={loading || !videoUrl.trim()}
                >
                  {loading ? 'Validando...' : 'Validar'}
                </button>
              </div>

              {videoInfo && (
                <div className="video-preview">
                  <div className="preview-card">
                    <div className="preview-thumbnail">
                      <img src={videoInfo.thumbnail} alt={videoInfo.title} />
                      <div className="platform-badge">
                        {videoInfo.platform === 'youtube' ? <Youtube size={16} /> : <Video size={16} />}
                        {videoInfo.platform}
                      </div>
                    </div>
                    <div className="preview-info">
                      <h4>{videoInfo.title}</h4>
                      <div className="preview-meta">
                        <span className="duration">
                          <Clock size={14} />
                          {videoInfo.duration}
                        </span>
                        <span className="platform">{videoInfo.platform}</span>
                      </div>
                      <div className="preview-actions">
                        <button className="select-video-btn" onClick={handleCustomVideoSelect}>
                          <Check size={16} />
                          Seleccionar este Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="supported-platforms">
                <h4>Plataformas Soportadas:</h4>
                <div className="platforms-list">
                  <div className="platform-item">
                    <Youtube size={20} color="#FF0000" />
                    <span>YouTube</span>
                  </div>
                  <div className="platform-item">
                    <Video size={20} color="#1AB7EA" />
                    <span>Vimeo</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'library' && (
            <div className="library-section">
              <div className="library-header">
                <h3>Biblioteca de Videos</h3>
                <div className="search-container">
                  <Search size={16} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar videos..."
                  />
                </div>
              </div>

              <div className="videos-grid">
                {filteredVideos.map(video => (
                  <div key={video.id} className="video-card">
                    <div className="card-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="play-overlay">
                        <Play size={20} />
                      </div>
                      <div className="duration-badge">{video.duration}</div>
                      <div className="platform-indicator">
                        {video.platform === 'YouTube' ? 
                          <Youtube size={14} /> : 
                          <Video size={14} />
                        }
                      </div>
                    </div>
                    <div className="card-content">
                      <h4>{video.title}</h4>
                      <p>{video.description}</p>
                      <div className="card-meta">
                        <span className="views">
                          <Eye size={12} />
                          {video.views}
                        </span>
                        <span className="platform">{video.platform}</span>
                      </div>
                      <button 
                        className="select-btn"
                        onClick={() => handleVideoSelect(video)}
                      >
                        <Check size={16} />
                        Seleccionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="no-results">
                  <Video size={48} />
                  <h4>No se encontraron videos</h4>
                  <p>Intenta con otros términos de búsqueda o agrega un video desde URL.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  .video-embed-modal {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  /* Header */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    background: #f1f5f9;
  }

  .modal-header h2 {
    margin: 0;
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .close-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #64748b;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    background: #f1f5f9;
  }

  /* Tabs */
  .tabs-container {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    color: #64748b;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .tab:hover {
    color: #3b82f6;
    background: #f1f5f9;
  }

  .tab.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
    background: white;
  }

  /* Content */
  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
  }

  /* URL Section */
  .url-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .url-info h3 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.2rem;
  }

  .url-info p {
    margin: 0;
    color: #64748b;
    line-height: 1.6;
  }

  .url-input {
    display: flex;
    gap: 1rem;
  }

  .url-input input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .url-input input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .validate-btn {
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .validate-btn:hover:not(:disabled) {
    background: #2563eb;
  }

  .validate-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  /* Video Preview */
  .video-preview {
    margin-top: 1rem;
  }

  .preview-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #f8fafc;
  }

  .preview-thumbnail {
    position: relative;
    flex-shrink: 0;
  }

  .preview-thumbnail img {
    width: 160px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
  }

  .platform-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 4px;
    font-size: 0.7rem;
    text-transform: capitalize;
  }

  .preview-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .preview-info h4 {
    margin: 0;
    color: #1e293b;
    font-size: 1rem;
  }

  .preview-meta {
    display: flex;
    gap: 1rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .duration {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .select-video-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    margin-top: auto;
    align-self: flex-start;
    transition: all 0.3s ease;
  }

  .select-video-btn:hover {
    background: #059669;
  }

  /* Supported Platforms */
  .supported-platforms {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
  }

  .supported-platforms h4 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1rem;
  }

  .platforms-list {
    display: flex;
    gap: 1.5rem;
  }

  .platform-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-weight: 500;
  }

  /* Library Section */
  .library-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .library-header h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1.2rem;
  }

  .search-container {
    position: relative;
    min-width: 300px;
  }

  .search-container svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  .search-container input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .search-container input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Videos Grid */
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .video-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .video-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-thumbnail {
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
  }

  .card-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.75rem;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .video-card:hover .play-overlay {
    opacity: 1;
  }

  .duration-badge {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
  }

  .platform-indicator {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.25rem;
    border-radius: 4px;
  }

  .card-content {
    padding: 1rem;
  }

  .card-content h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-content p {
    margin: 0 0 1rem 0;
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    color: #64748b;
  }

  .views {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .select-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .select-btn:hover {
    background: #2563eb;
  }

  /* No Results */
  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    text-align: center;
    color: #64748b;
  }

  .no-results h4 {
    margin: 0;
    color: #1e293b;
  }

  .no-results p {
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .modal-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .tabs-container {
      overflow-x: auto;
    }

    .library-header {
      flex-direction: column;
      align-items: stretch;
    }

    .search-container {
      min-width: auto;
    }

    .videos-grid {
      grid-template-columns: 1fr;
    }

    .preview-card {
      flex-direction: column;
    }

    .preview-thumbnail img {
      width: 100%;
    }

    .url-input {
      flex-direction: column;
    }
  }
`;

export default VideoEmbed;
