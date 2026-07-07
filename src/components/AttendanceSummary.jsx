import React from 'react';
import { RefreshCw } from 'lucide-react';

// Attendance Summary Component
function AttendanceSummary({ attendanceData, isRefreshing, onRefresh }) {
  return (
    <div className="dash-card span-4">
      <div className="card-header">
        <h3 className="card-title">Attendance Summary (July)</h3>
        <button 
          className="btn-refresh" 
          onClick={onRefresh} 
          disabled={isRefreshing}
          title="Refresh attendance data"
        >
          <RefreshCw size={16} className={isRefreshing ? 'refresh-spin' : ''} />
        </button>
      </div>

      <div className="attendance-summary-list">
        <div className="attendance-summary-item">
          <span className="attendance-summary-label">Attendance (%)</span>
          <span className="attendance-summary-value">{attendanceData.percentage}%</span>
        </div>
        <div className="attendance-summary-item">
          <span className="attendance-summary-label">Present (Days)</span>
          <span className="attendance-summary-value">{attendanceData.presentDays}</span>
        </div>
        <div className="attendance-summary-item">
          <span className="attendance-summary-label">Leave (Days)</span>
          <span className="attendance-summary-value">{attendanceData.leaveDays}</span>
        </div>
        <div className="attendance-summary-item">
          <span className="attendance-summary-label">Late Coming (Days)</span>
          <span className="attendance-summary-value" style={{ color: 'var(--danger)' }}>
            {attendanceData.lateComingDays}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSummary;
