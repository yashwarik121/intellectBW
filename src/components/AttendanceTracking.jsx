import React from 'react';
import { Calendar, MapPin, LogIn, LogOut, Clock } from 'lucide-react';

// Attendance Tracking Component
function AttendanceTracking({
  currentDateString,
  checkInTime,
  checkOutTime,
  isCheckedIn,
  isCheckedOut,
  timerSeconds,
  onCheckIn,
  onCheckOut
}) {
  const formatWorkingHours = (secCount) => {
    if (!secCount) return 'NA';
    const hrs = Math.floor(secCount / 3600);
    const mins = Math.floor((secCount % 3600) / 60);
    const secs = secCount % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="dash-card span-4">
      <div className="card-header">
        <h3 className="card-title">Attendance Tracking</h3>
      </div>

      <div className="attendance-info-meta">
        <div className="attendance-date">
          <Calendar size={14} style={{ color: 'var(--primary)' }} />
          <span>{currentDateString || 'July 6, Monday'}</span>
        </div>
        <div className="attendance-location">
          <MapPin size={14} style={{ color: 'var(--primary)' }} />
          <span>Mumbai</span>
        </div>
      </div>

      <div className="attendance-actions-grid">
        <div 
          className={`attendance-btn-box ${isCheckedIn ? 'disabled' : ''}`}
          onClick={onCheckIn}
        >
          <LogIn className="attendance-btn-icon" size={24} />
          <span className="attendance-btn-time">{checkInTime || 'NA'}</span>
          <span className="attendance-btn-label">Check In</span>
        </div>

        <div 
          className={`attendance-btn-box ${(!isCheckedIn || isCheckedOut) ? 'disabled' : ''}`}
          onClick={onCheckOut}
        >
          <LogOut className="attendance-btn-icon" size={24} style={{ color: '#e28743' }} />
          <span className="attendance-btn-time">{checkOutTime || 'NA'}</span>
          <span className="attendance-btn-label">Check Out</span>
        </div>

        <div className="attendance-btn-box disabled">
          <Clock className="attendance-btn-icon" size={24} style={{ color: '#718096' }} />
          <span className="attendance-btn-time">
            {isCheckedIn ? formatWorkingHours(timerSeconds) : 'NA'}
          </span>
          <span className="attendance-btn-label">Working Hours</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTracking;
