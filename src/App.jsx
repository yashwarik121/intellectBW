import React, { useState, useEffect } from 'react';
import { Info, Menu } from 'lucide-react';
import Swal from 'sweetalert2';
import './App.css';

import Dashboard from './pages/Dashboard';
import ApplyLeavePage from './pages/ApplyLeavePage';
import PersonalDetailsPage from './pages/PersonalDetailsPage';
import RequestsModal from './components/RequestsModal';
import Sidebar from './components/Sidebar';

// Data Configurations
const INITIAL_REQUESTS = [
  {
    id: 1,
    type: 'Casual Leave',
    fromDate: '2026-06-15',
    toDate: '2026-06-16',
    days: 1.0,
    reason: 'Family function at hometown',
    status: 'approved',
    appliedOn: '2026-06-10'
  },
  {
    id: 2,
    type: 'General Leave',
    fromDate: '2026-06-22',
    toDate: '2026-06-22',
    days: 0.0,
    reason: 'Personal work at bank',
    status: 'rejected',
    appliedOn: '2026-06-20'
  }
];

function App() {
  // Navigation & Drawer States
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  // Unified Profile State
  const [profileData, setProfileData] = useState({
    name: 'Yash Warik',
    id: '10056',
    personalInfo: {
      title: 'Mr.',
      gender: 'Male',
      firstName: 'Yash',
      lastName: 'Warik',
      dob: '1998-02-24',
      placeOfBirth: 'Pune',
      nationality: 'Indian',
      bloodGroup: 'A+',
      maritalStatus: 'Single',
      children: '0'
    },
    addressInfo: {
      currentStreet: '123, Green Avenue',
      currentLine2: 'Kothrud',
      currentCity: 'Pune',
      currentDistrict: 'Pune',
      currentState: 'Maharashtra',
      currentCountry: 'India',
      currentPin: '411038',
      sameAsAbove: true,
      permanentStreet: '123, Green Avenue',
      permanentLine2: 'Kothrud',
      permanentCity: 'Pune',
      permanentDistrict: 'Pune'
    },
    contactInfo: {
      mobile: '+91 9999999999',
      personalEmail: 'yash.warik@gmail.com',
      workEmail: 'yash.w@intellectbizware.com',
      emergencyName: 'Rameez Shaikh',
      emergencyRelation: 'Manager',
      emergencyPhone: '+91 9876543210'
    }
  });

  // Component State
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [attendanceData, setAttendanceData] = useState({
    percentage: 125,
    presentDays: 5,
    leaveDays: 0,
    lateComingDays: 4
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentDateString, setCurrentDateString] = useState('');

  // Life Cycle Hooks
  useEffect(() => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setCurrentDateString(new Date().toLocaleDateString('en-US', options));
  }, []);

  useEffect(() => {
    let interval = null;
    if (isCheckedIn && !isCheckedOut) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCheckedIn, isCheckedOut]);

  // Event Handlers
  const handleApplyLeaveSubmit = (data) => {
    const newRequest = {
      id: Date.now(),
      type: data.leaveType,
      fromDate: data.fromDate,
      toDate: data.toDate,
      days: data.noOfDays,
      reason: data.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    setRequests([newRequest, ...requests]);
    setCurrentRoute('dashboard');
    showToast('Leave applied successfully!');
  };

  const showToast = (message) => {
    Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      confirmButtonColor: '#b08b00'
    }).fire({
      icon: 'success',
      title: message
    });
  };

  const handleRefreshAttendance = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAttendanceData((prev) => ({
        percentage: Math.min(100, Math.round(prev.percentage * 0.95 + Math.random() * 8)),
        presentDays: prev.presentDays + 1,
        leaveDays: prev.leaveDays,
        lateComingDays: Math.max(0, prev.lateComingDays - (Math.random() > 0.5 ? 1 : 0))
      }));
      setIsRefreshing(false);
      showToast('Attendance summary updated successfully!');
    }, 1000);
  };

  const handleCheckIn = () => {
    if (isCheckedIn) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setCheckInTime(timeStr);
    setIsCheckedIn(true);
    showToast('Checked in successfully!');
  };

  const handleCheckOut = () => {
    if (!isCheckedIn || isCheckedOut) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setCheckOutTime(timeStr);
    setIsCheckedOut(true);
    showToast('Checked out successfully!');
  };

  const handleUpdateRequestStatus = (id, newStatus) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
    showToast(`Request marked as ${newStatus}!`);
  };

  const handleSidebarClick = (itemId) => {
    setActiveSidebarItem(itemId);
    if (itemId === 'dashboard') {
      setCurrentRoute('dashboard');
    } else if (itemId === 'leave') {
      setCurrentRoute('apply-leave');
    } else if (itemId === 'personal') {
      setCurrentRoute('personal-details');
    }
  };

  const headerInitials = profileData.name
    ? profileData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'YW';

  // Template Render
  return (
    <div className="dashboard-container">
      {/* Sidebar Drawer Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeItem={activeSidebarItem}
        onItemClick={handleSidebarClick}
      />

      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} title="Open navigation">
            <Menu size={20} />
          </button>
          <div className="company-logo" style={{ cursor: 'pointer' }} onClick={() => setCurrentRoute('dashboard')}>
            <div className="logo-icon">I</div>
            <span className="logo-text">Intellect Dashboard</span>
          </div>
        </div>
        
        <div className="user-nav-profile" style={{ cursor: 'pointer' }} onClick={() => { setCurrentRoute('personal-details'); setActiveSidebarItem('personal'); }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{profileData.name}</span>
          <div className="user-nav-avatar" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: '700'
          }}>
            {headerInitials}
          </div>
        </div>
      </header>

      {currentRoute === 'dashboard' && (
        <Dashboard 
          requests={requests}
          attendanceData={attendanceData}
          isRefreshing={isRefreshing}
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          isCheckedIn={isCheckedIn}
          isCheckedOut={isCheckedOut}
          timerSeconds={timerSeconds}
          currentDateString={currentDateString}
          profileData={profileData}
          onRefreshAttendance={handleRefreshAttendance}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onNavigate={setCurrentRoute}
          onOpenRequestsModal={() => setShowRequestsModal(true)}
        />
      )}

      {currentRoute === 'apply-leave' && (
        <ApplyLeavePage 
          onCancel={() => setCurrentRoute('dashboard')}
          onSubmit={handleApplyLeaveSubmit}
        />
      )}

      {currentRoute === 'personal-details' && (
        <PersonalDetailsPage 
          profileData={profileData}
          onSaveProfile={setProfileData}
          onNavigate={setCurrentRoute}
        />
      )}

      {showRequestsModal && (
        <RequestsModal 
          requests={requests} 
          onClose={() => setShowRequestsModal(false)} 
          onUpdateStatus={handleUpdateRequestStatus} 
        />
      )}
    </div>
  );
}

export default App;
