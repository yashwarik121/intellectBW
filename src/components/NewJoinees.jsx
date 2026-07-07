import React from 'react';

const NEW_JOINEES = [
  {
    id: 1,
    name: 'Amit Patel',
    role: 'Trainee Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    role: 'QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Data Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Pooja Hegde',
    role: 'UI/UX Intern',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Arjun Nair',
    role: 'Associate Consultant',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Divya Rao',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    name: 'Manish Sharma',
    role: 'Cloud Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    name: 'Kavita Krishnan',
    role: 'HR Executive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 9,
    name: 'Aditya Verma',
    role: 'Backend Engineer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    name: 'Riya Sen',
    role: 'Product Manager Intern',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80'
  }
];

// New Joinees Component
function NewJoinees() {
  return (
    <div className="dash-card span-3">
      <div className="card-header">
        <h3 className="card-title">New Joinees</h3>
        <span className="badge-count">{NEW_JOINEES.length}</span>
      </div>
      <div className="joinees-list">
        {NEW_JOINEES.map((joinee) => (
          <div key={joinee.id} className="joinee-item">
            <img src={joinee.avatar} alt={joinee.name} className="joinee-avatar" />
            <div>
              <div className="buddy-name" style={{ fontSize: '13px' }}>{joinee.name}</div>
              <div className="buddy-role" style={{ fontSize: '11px' }}>{joinee.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewJoinees;
