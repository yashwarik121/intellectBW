import React from 'react';
import ProfileCard from '../components/ProfileCard';
import PendingRequests from '../components/PendingRequests';
import BirthdayBuddies from '../components/BirthdayBuddies';
import NewJoinees from '../components/NewJoinees';
import Announcements from '../components/Announcements';
import LeaveSummary from '../components/LeaveSummary';
import AttendanceSummary from '../components/AttendanceSummary';
import AttendanceTracking from '../components/AttendanceTracking';

// Dashboard Page Component
function Dashboard({
  requests,
  attendanceData,
  isRefreshing,
  checkInTime,
  checkOutTime,
  isCheckedIn,
  isCheckedOut,
  timerSeconds,
  currentDateString,
  profileData,
  onRefreshAttendance,
  onCheckIn,
  onCheckOut,
  onNavigate,
  onOpenRequestsModal
}) {
  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const generalLeavesApplied = requests
    .filter((r) => r.status === 'approved' && r.type === 'General Leave')
    .reduce((sum, r) => sum + Number(r.days), 0);

  const casualLeavesApplied = requests
    .filter((r) => r.status === 'approved' && r.type === 'Casual Leave')
    .reduce((sum, r) => sum + Number(r.days), 0);

  return (
    <div className="dashboard-grid">
      <ProfileCard name={profileData.name} id={profileData.id} />
      
      <PendingRequests 
        pendingRequests={pendingRequests} 
        onViewAll={onOpenRequestsModal} 
      />
      
      <BirthdayBuddies />
      
      <NewJoinees />
      
      <Announcements />
      
      <LeaveSummary 
        generalLeavesApplied={generalLeavesApplied} 
        casualLeavesApplied={casualLeavesApplied} 
        onApplyClick={() => onNavigate('apply-leave')} 
      />
      
      <AttendanceSummary 
        attendanceData={attendanceData} 
        isRefreshing={isRefreshing} 
        onRefresh={handleRefresh} 
      />
      
      <AttendanceTracking 
        currentDateString={currentDateString}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        isCheckedIn={isCheckedIn}
        isCheckedOut={isCheckedOut}
        timerSeconds={timerSeconds}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
      />
    </div>
  );

  function handleRefresh() {
    onRefreshAttendance();
  }
}

export default Dashboard;
