import React from 'react';
import {
  LayoutDashboard,
  Mail,
  User,
  FolderTree,
  UserMinus,
  UploadCloud,
  History,
  Briefcase,
  HelpCircle,
  Calendar,
  CreditCard,
  MoreHorizontal,
  X,
  ChevronRight
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, hasSubmenu: false },
  { id: 'inbox', label: 'Inbox', icon: Mail, hasSubmenu: false },
  { id: 'personal', label: 'Personal Details', icon: User, hasSubmenu: false },
  { id: 'org', label: 'Organisation Info', icon: FolderTree, hasSubmenu: true },
  { id: 'leave', label: 'Leave', icon: UserMinus, hasSubmenu: true },
  { id: 'request', label: 'Request', icon: UploadCloud, hasSubmenu: true },
  { id: 'logs', label: 'Daily Logs', icon: History, hasSubmenu: true },
  { id: 'payroll', label: 'Payroll', icon: Briefcase, hasSubmenu: false },
  { id: 'hr', label: 'Ask HR', icon: HelpCircle, hasSubmenu: true },
  { id: 'calendar', label: 'Holiday Calendar', icon: Calendar, hasSubmenu: false },
  { id: 'mediclaim', label: 'Mediclaim', icon: CreditCard, hasSubmenu: false },
  { id: 'misc', label: 'Miscellaneous', icon: MoreHorizontal, hasSubmenu: true }
];

function Sidebar({ isOpen, onClose, activeItem = 'dashboard', onItemClick }) {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}
      
      <div className={`sidebar-drawer ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header-box">
          <div className="sidebar-logo">
            <div className="logo-icon" style={{ background: '#f3ad15' }}>I</div>
            <span>Intellect S-bar</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} title="Close sidebar">
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-nav-list">
          {MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onItemClick(item.id);
                  onClose();
                }}
              >
                <div className="sidebar-item-left">
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && <ChevronRight size={14} style={{ opacity: 0.7 }} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
