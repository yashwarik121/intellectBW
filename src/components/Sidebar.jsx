import React, { useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Mail,
  User,
  FolderTree,
  UserMinus,
  ChevronRight
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, hasSubmenu: false },
  { id: 'inbox', label: 'Inbox', icon: Mail, hasSubmenu: false },
  { id: 'personal', label: 'Personal Details', icon: User, hasSubmenu: false },
  { id: 'org', label: 'Organisation Info', icon: FolderTree, hasSubmenu: true },
  { id: 'leave', label: 'Leave', icon: UserMinus, hasSubmenu: true }
];

function Sidebar({ isOpen, setIsOpen, activeItem = 'dashboard', onItemClick }) {
  const sidebarRef = useRef(null);

  // Close sidebar on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.hamburger-btn')
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div 
      ref={sidebarRef}
      className={`sidebar-drawer ${isOpen ? 'open' : ''}`}
      onMouseLeave={() => setIsOpen(false)}
      style={{
        transform: 'none',
        width: isOpen ? '240px' : '70px',
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="sidebar-header-box" style={{ padding: isOpen ? '0 20px 20px 20px' : '0 10px 20px 10px', justifyContent: isOpen ? 'space-between' : 'center' }}>
        <div className="sidebar-logo">
          <div className="logo-icon" style={{ background: '#f3ad15', width: '32px', height: '32px', minWidth: '32px' }}>I</div>
          {isOpen && <span style={{ transition: 'opacity 0.2s', opacity: 1, whiteSpace: 'nowrap' }}>Intellect</span>}
        </div>
      </div>

      <div className="sidebar-nav-list" style={{ padding: isOpen ? '20px 10px' : '20px 6px' }}>
        {MENU_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeItem === item.id;

          return (
            <div
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              title={!isOpen ? item.label : ''}
              onClick={() => {
                onItemClick(item.id);
              }}
              style={{
                justifyContent: isOpen ? 'space-between' : 'center',
                padding: isOpen ? '12px 16px' : '12px 0',
                borderRadius: '8px',
                height: '46px',
                position: 'relative'
              }}
            >
              <div className="sidebar-item-left" style={{ justifyContent: isOpen ? 'flex-start' : 'center', width: '100%' }}>
                <IconComponent size={20} style={{ minWidth: '20px' }} />
                {isOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
              </div>
              {isOpen && item.hasSubmenu && <ChevronRight size={14} style={{ opacity: 0.7 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
