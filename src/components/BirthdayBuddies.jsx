import React, { useState } from 'react';
import { Cake, ChevronLeft, ChevronRight } from 'lucide-react';

const BIRTHDAY_BUDDIES = [
  {
    id: 1,
    name: 'Nihar Khodke',
    role: 'Associate Consultant-Presales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Shreya Sharma',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
];

// Birthday Buddies Component
function BirthdayBuddies() {
  const [buddyIndex, setBuddyIndex] = useState(0);

  const handlePrevBuddy = () => {
    setBuddyIndex((prev) => (prev === 0 ? BIRTHDAY_BUDDIES.length - 1 : prev - 1));
  };

  const handleNextBuddy = () => {
    setBuddyIndex((prev) => (prev === BIRTHDAY_BUDDIES.length - 1 ? 0 : prev + 1));
  };

  const currentBuddy = BIRTHDAY_BUDDIES[buddyIndex];

  return (
    <div className="dash-card span-3">
      <div className="card-header">
        <h3 className="card-title">
          <Cake size={16} style={{ color: 'var(--primary)' }} />
          Birthday Buddies
        </h3>
        <span className="badge-count" style={{ background: '#e28743' }}>
          {BIRTHDAY_BUDDIES.length}
        </span>
      </div>

      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={handlePrevBuddy}>
          <ChevronLeft size={16} />
        </button>
        
        <div className="buddy-slide">
          <div className="buddy-avatar-ring">
            <img src={currentBuddy.avatar} alt={currentBuddy.name} className="buddy-avatar" />
          </div>
          <div className="buddy-name">{currentBuddy.name}</div>
          <div className="buddy-role">{currentBuddy.role}</div>
        </div>

        <button className="carousel-btn next" onClick={handleNextBuddy}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default BirthdayBuddies;
