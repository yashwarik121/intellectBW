import React from 'react';
import { Plus } from 'lucide-react';

function LeaveSummary({ generalLeavesApplied, casualLeavesApplied, onApplyClick }) {
  const generalAvailable = 7 - generalLeavesApplied;
  const casualAvailable = 3.5 - casualLeavesApplied;

  return (
    <div className="dash-card span-4">
      <div className="card-header">
        <h3 className="card-title">Leave Summary</h3>
      </div>

      <div className="leave-progress-container">
        <div className="leave-progress-item">
          <div className="leave-progress-label">
            <span>General Leaves</span>
            <span>{generalAvailable}/{7}</span>
          </div>
          <div className="leave-progress-bar-bg">
            <div 
              className="leave-progress-bar-fill" 
              style={{ width: `${(generalAvailable / 7) * 100}%` }}
            />
          </div>
        </div>

        <div className="leave-progress-item">
          <div className="leave-progress-label">
            <span>Casual Leaves</span>
            <span>{casualAvailable}/{3.5}</span>
          </div>
          <div className="leave-progress-bar-bg">
            <div 
              className="leave-progress-bar-fill" 
              style={{ 
                width: `${(casualAvailable / 3.5) * 100}%`,
                background: '#e28743' 
              }}
            />
          </div>
        </div>
      </div>

      <button className="btn-apply-leave" onClick={onApplyClick}>
        <Plus size={16} />
        Apply Leave
      </button>
    </div>
  );
}

export default LeaveSummary;
