import React, { useState } from 'react';

// Reusable Tabs Component
function Tabs({ tabs, defaultActiveTab }) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        borderBottom: '1px solid var(--border-color)', 
        marginBottom: '24px', 
        paddingBottom: '12px', 
        overflowX: 'auto' 
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'var(--transition)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-pane-content">
        {activeContent}
      </div>
    </div>
  );
}

export default Tabs;
