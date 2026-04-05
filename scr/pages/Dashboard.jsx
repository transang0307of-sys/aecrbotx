import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Overview from '../components/Overview';
import Moderation from '../components/Moderation';
import AutoModeration from '../components/AutoModeration';
import LandingOverlay from '../components/LandingOverlay';
import Docs from '../components/Docs';
import CommandCenter from '../components/CommandCenter';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [activePage, setActivePage] = useState('overview');
  const [showLanding, setShowLanding] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('zenith_token');
    if (!token) return navigate('/login');

    const payload = parseJwt(token);
    if (!payload || payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('zenith_token');
      return navigate('/login');
    }

    const guilds = payload.allowedGuilds || [];
    
    if (guilds.length > 0 && typeof guilds[0] === 'string') {
      localStorage.removeItem('zenith_token');
      alert('Hệ thống bảo mật đã cập nhật. Vui lòng đăng nhập lại.');
      return navigate('/login');
    }

    if (guilds.length === 0) {
      alert("Truy cập bị từ chối: Bạn không có quyền Quản trị viên trên bất kỳ server Aecr nào.");
      localStorage.removeItem('zenith_token');
      return navigate('/login');
    }

    setUser(payload);

    const savedGuild = localStorage.getItem('zenith_guild_id');
    if (!savedGuild || savedGuild === 'undefined' || !guilds.some(g => g.id === savedGuild)) {
      setShowLanding(true);
    } else {
      setSelectedGuild(savedGuild);
    }
  }, [navigate]);

  const handleGuildSelect = (guildId) => {
    localStorage.setItem('zenith_guild_id', guildId);
    setSelectedGuild(guildId);
    setShowLanding(false);
  };

  const fetchDashboardData = async () => {
    // TODO: Lấy dữ liệu dashboard
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedGuild]);

  const pageTitleMap = {
    overview: 'Tổng Quan Dashboard',
    moderation: 'Quản Lý Server',
    automod: 'Tự Động Quản Lý',
    commands: 'Trung Tâm Lệnh',
    docs: 'Tài Liệu & Hướng Dẫn'
  };

  const requiresGuild = ['overview', 'moderation', 'automod'].includes(activePage);
  const canRenderPage = !showLanding && (!requiresGuild || selectedGuild);

  if (!user) return <div className="login-body"><div className="loader">Đang xác thực...</div></div>;

  return (
    <div className="app-container">
      {showLanding && <LandingOverlay guilds={user.allowedGuilds} onSelectGuild={handleGuildSelect} />}
      
      <Sidebar 
        user={user} 
        selectedGuild={selectedGuild} 
        onSelectGuild={handleGuildSelect} 
        activePage={activePage} 
        setActivePage={setActivePage} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button 
              className="mobile-only" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: '#DBDEE1', fontSize: '1.4rem', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="topbar-title-wrap">
              <p className="topbar-eyebrow">Bảng Điều Khiển Aecr Bot</p>
              <h1 style={{ margin: 0 }}>{pageTitleMap[activePage] || 'Zenith Dashboard'}</h1>
            </div>
          </div>
          <div className="topbar-actions">
            
            {selectedGuild && user && (
              <div className="mobile-guild-selector mobile-only" onClick={() => { localStorage.removeItem('zenith_guild_id'); setShowLanding(true); }}>
                <img 
                  src={user.allowedGuilds.find(g => g.id === selectedGuild)?.icon 
                    ? `https://cdn.discordapp.com/icons/${selectedGuild}/${user.allowedGuilds.find(g => g.id === selectedGuild).icon}.png` 
                    : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                  alt="" 
                />
                <span>{user.allowedGuilds.find(g => g.id === selectedGuild)?.name || 'Server'}</span>
              </div>
            )}
            
            {requiresGuild && (
              <button
                className="btn-icon"
                onClick={() => window.location.reload()}
                title="Tải lại trang"
              >
                <i className="fa-solid fa-rotate-right"></i>
              </button>
            )}
            
          </div>
        </header>

        <div className="content-area">
          {canRenderPage && (
            <>
              {activePage === 'overview' && <Overview selectedGuild={selectedGuild} />}
              {activePage === 'moderation' && <Moderation selectedGuild={selectedGuild} />}
              {activePage === 'automod' && <AutoModeration selectedGuild={selectedGuild} />}
              {activePage === 'commands' && <CommandCenter />}
              {activePage === 'docs' && <Docs />}
            </>
          )}

          {!showLanding && requiresGuild && !selectedGuild && (
            <div className="dashboard-empty-state glass-panel">
              <div className="dashboard-empty-icon">
                <i className="fa-solid fa-building-shield"></i>
              </div>
              <h2>Chọn Server</h2>
              <p>Chọn một server để mở các phân tích quản lý, điều khiển automod và thông tin server cụ thể.</p>
              <button
                className="btn-primary"
                onClick={() => {
                  localStorage.removeItem('zenith_guild_id');
                  setShowLanding(true);
                }}
              >
                Chọn Server
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}