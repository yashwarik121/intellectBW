import React from 'react';
import LeaveForm from '../components/LeaveForm';

// Apply Leave Page Component
function ApplyLeavePage({ onCancel, onSubmit }) {
  return (
    <div style={{ marginTop: '12px' }}>
      <LeaveForm onCancel={onCancel} onSubmit={onSubmit} />
    </div>
  );
}

export default ApplyLeavePage;
