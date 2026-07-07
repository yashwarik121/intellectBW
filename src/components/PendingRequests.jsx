import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// Pending Requests Component
function PendingRequests({ pendingRequests, onViewAll }) {
  return (
    <div className="dash-card span-3">
      <div className="card-header">
        <h3 className="card-title">Pending Requests</h3>
        {pendingRequests.length > 0 && (
          <span className="badge-count">{pendingRequests.length}</span>
        )}
      </div>
      
      {pendingRequests.length === 0 ? (
        <div className="no-requests">
          <CheckCircle2 size={36} style={{ color: 'var(--text-light)' }} />
          <span>No Pending Requests Found</span>
        </div>
      ) : (
        <div className="requests-list">
          {pendingRequests.map((req) => (
            <div key={req.id} className="request-item">
              <div className="request-info">
                <span className="request-type">{req.type}</span>
                <span className="request-dates">{req.fromDate} to {req.toDate} ({req.days} days)</span>
              </div>
              <span className="request-status status-pending">Pending</span>
            </div>
          ))}
        </div>
      )}

      <button className="btn-view-all" onClick={onViewAll}>
        View All Requests
      </button>
    </div>
  );
}

export default PendingRequests;
