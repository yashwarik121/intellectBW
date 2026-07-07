import React, { useState } from 'react';
import { Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Work Anniversary 🎉',
    content: 'Suprit Patil has completed 11 years in this company. Congratulations and thank you for your dedication!'
  },
  {
    id: 2,
    title: 'System Maintenance ⚙️',
    content: 'The internal portal will undergo scheduled maintenance on Saturday, July 12, from 10:00 PM to 2:00 AM. Please save your work.'
  },
  {
    id: 3,
    title: 'New Policy Update 📝',
    content: 'The updated hybrid work guidelines have been uploaded to the portal. Please review the documentation in the resources section.'
  }
];

// Announcements Carousel Component
function Announcements() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === ANNOUNCEMENTS.length - 1 ? 0 : prev + 1));
  };

  const current = ANNOUNCEMENTS[index];

  return (
    <div className="dash-card span-12">
      <div className="card-header">
        <h3 className="card-title">
          <Megaphone size={16} style={{ color: 'var(--primary)' }} />
          Announcements
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="carousel-btn-small" onClick={handlePrev} title="Previous Announcement">
            <ChevronLeft size={14} />
          </button>
          <button className="carousel-btn-small" onClick={handleNext} title="Next Announcement">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="announcement-banner" style={{ minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="announcement-header">{current.title}</span>
        <p className="announcement-text">{current.content}</p>
      </div>
    </div>
  );
}

export default Announcements;
