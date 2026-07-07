import React from 'react';
import { User, ShieldAlert, CheckCircle, Clock, Plus } from 'lucide-react';

function ProfileCard({ name, id }) {
  // Get initials
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'YW';

  return (
    <div className="dash-card span-3 profile-card">
      <div className="profile-avatar-container">
        <div className="profile-avatar" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'var(--primary-light)', 
          color: 'var(--primary)', 
          fontSize: '24px', 
          fontWeight: '700',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: 'var(--shadow-md)'
        }}>
          {initials}
        </div>
        <button className="profile-edit-btn" title="Edit avatar">
          <Plus size={14} />
        </button>
      </div>
      <h2 className="profile-name">{name || 'Yash Warik'}</h2>
      <div className="profile-id" style={{ color: 'var(--text-muted)' }}>{id || '10056'}</div>
      
      <div className="profile-details-list" style={{ marginTop: '10px' }}>
        <div className="profile-detail-item">
          <User size={16} />
          <span>Rameez Shaikh</span>
        </div>
        <div className="profile-detail-item">
          <ShieldAlert size={16} />
          <span>No Allocation</span>
        </div>
        <div className="profile-detail-item">
          <CheckCircle size={16} />
          <span>NA</span>
        </div>
        <div className="profile-detail-item">
          <Clock size={16} />
          <span>Sat-Sun (Week-off) / 09:00 - 18:00</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
