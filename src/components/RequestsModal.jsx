import React from 'react';
import { X } from 'lucide-react';

// Requests Modal Component
function RequestsModal({ requests, onClose, onUpdateStatus }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">All Leave Requests</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <table className="modal-requests-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>
                  <div style={{ fontWeight: '600' }}>{req.type}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                    Reason: {req.reason}
                  </div>
                </td>
                <td>{req.fromDate} to {req.toDate}</td>
                <td>{req.days}</td>
                <td>
                  <span className={`request-status status-${req.status}`}>
                    {req.status}
                  </span>
                </td>
                <td className="modal-actions-cell">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        className="btn-action-small btn-approve"
                        onClick={() => onUpdateStatus(req.id, 'approved')}
                        title="Approve request"
                      >
                        Approve
                      </button>
                      <button
                        className="btn-action-small btn-reject"
                        onClick={() => onUpdateStatus(req.id, 'rejected')}
                        title="Reject request"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestsModal;
