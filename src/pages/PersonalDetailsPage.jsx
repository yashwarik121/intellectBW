import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, Clock, X, Plus, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Tabs from '../components/Tabs';

function PersonalDetailsPage({ profileData, onSaveProfile }) {
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'Sunita Warik',
      gender: 'Female',
      relation: 'Mother',
      dob: '1975-08-12',
      education: 'Graduate',
      occupation: 'Homemaker',
      contact: '9876543210'
    }
  ]);
  const [showFamilyModal, setShowFamilyModal] = useState(false);

  // Forms
  const { register: regPersonal, handleSubmit: handlePersonalSubmit } = useForm({
    defaultValues: profileData.personalInfo
  });

  const { register: regAddress, handleSubmit: handleAddressSubmit, watch: watchAddress, setValue: setAddressValue } = useForm({
    defaultValues: profileData.addressInfo
  });

  const { register: regContact, handleSubmit: handleContactSubmit } = useForm({
    defaultValues: profileData.contactInfo
  });

  const { register: regFamilyModal, handleSubmit: handleFamilyModalSubmit, reset: resetFamilyModal } = useForm({
    defaultValues: {
      name: '',
      gender: '',
      relation: '',
      dob: '',
      education: '',
      occupation: '',
      contact: ''
    }
  });

  // Watch for Address checkbox
  const watchSameAsAbove = watchAddress('sameAsAbove');
  const watchCurrentStreet = watchAddress('currentStreet');
  const watchCurrentLine2 = watchAddress('currentLine2');
  const watchCurrentCity = watchAddress('currentCity');
  const watchCurrentDistrict = watchAddress('currentDistrict');

  React.useEffect(() => {
    if (watchSameAsAbove) {
      setAddressValue('permanentStreet', watchCurrentStreet || '');
      setAddressValue('permanentLine2', watchCurrentLine2 || '');
      setAddressValue('permanentCity', watchCurrentCity || '');
      setAddressValue('permanentDistrict', watchCurrentDistrict || '');
    }
  }, [watchSameAsAbove, watchCurrentStreet, watchCurrentLine2, watchCurrentCity, watchCurrentDistrict, setAddressValue]);

  // Submit Handlers
  const onSavePersonalInfo = (data) => {
    onSaveProfile({
      ...profileData,
      name: `${data.firstName} ${data.lastName}`,
      personalInfo: data
    });
    Swal.fire({
      icon: 'success',
      title: 'Saved Successfully',
      text: 'Personal info has been updated.',
      confirmButtonColor: '#b08b00'
    });
  };

  const onSaveAddressInfo = (data) => {
    onSaveProfile({
      ...profileData,
      addressInfo: data
    });
    Swal.fire({
      icon: 'success',
      title: 'Address Saved',
      text: 'Address details have been updated.',
      confirmButtonColor: '#b08b00'
    });
  };

  const onSaveContactInfo = (data) => {
    onSaveProfile({
      ...profileData,
      contactInfo: data
    });
    Swal.fire({
      icon: 'success',
      title: 'Contacts Saved',
      text: 'Contact details have been updated.',
      confirmButtonColor: '#b08b00'
    });
  };

  const onAddFamilyMember = (data) => {
    const newMember = {
      id: Date.now(),
      ...data
    };
    setFamilyMembers([...familyMembers, newMember]);
    setShowFamilyModal(false);
    resetFamilyModal();
    Swal.fire({
      icon: 'success',
      title: 'Member Added',
      text: 'Family member detail has been recorded.',
      confirmButtonColor: '#b08b00'
    });
  };

  const onDeleteFamilyMember = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this family member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b08b00',
      cancelButtonColor: '#718096',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.isConfirmed) {
        setFamilyMembers(familyMembers.filter(m => m.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'Family member detail has been removed.',
          confirmButtonColor: '#b08b00'
        });
      }
    });
  };

  // Reusable Tabs Config
  const tabsConfig = [
    {
      id: 'personal-info',
      label: 'Personal Info',
      content: (
        <form onSubmit={handlePersonalSubmit(onSavePersonalInfo)}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Personal Info</h3>
          <div className="form-grid">
            
            <div className="form-group">
              <label className="form-label">Title <span className="required">*</span></label>
              <select className="form-select" {...regPersonal('title', { required: true })}>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Gender <span className="required">*</span></label>
              <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="radio" value="Male" {...regPersonal('gender', { required: true })} /> Male
                </label>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="radio" value="Female" {...regPersonal('gender', { required: true })} /> Female
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">First Name <span className="required">*</span></label>
              <input className="form-input" type="text" {...regPersonal('firstName', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name <span className="required">*</span></label>
              <input className="form-input" type="text" {...regPersonal('lastName', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth <span className="required">*</span></label>
              <input className="form-input" type="date" {...regPersonal('dob', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Place of Birth <span className="required">*</span></label>
              <input className="form-input" type="text" {...regPersonal('placeOfBirth', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Nationality <span className="required">*</span></label>
              <select className="form-select" {...regPersonal('nationality', { required: true })}>
                <option value="Indian">Indian</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Blood Group <span className="required">*</span></label>
              <select className="form-select" {...regPersonal('bloodGroup', { required: true })}>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Marital Status <span className="required">*</span></label>
              <select className="form-select" {...regPersonal('maritalStatus', { required: true })}>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">No of Children</label>
              <input className="form-input" type="number" {...regPersonal('children')} />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className="btn-form-submit" type="submit">Save Info</button>
          </div>
        </form>
      )
    },
    {
      id: 'address',
      label: 'Address',
      content: (
        <form onSubmit={handleAddressSubmit(onSaveAddressInfo)}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Current Address Details</h3>
          <div className="form-grid" style={{ marginBottom: '24px' }}>
            <div className="form-group form-field-full">
              <label className="form-label">Street and House No <span className="required">*</span></label>
              <input className="form-input" type="text" {...regAddress('currentStreet', { required: true })} />
            </div>
            <div className="form-group form-field-full">
              <label className="form-label">Line 2</label>
              <input className="form-input" type="text" {...regAddress('currentLine2')} />
            </div>
            <div className="form-group">
              <label className="form-label">City <span className="required">*</span></label>
              <input className="form-input" type="text" {...regAddress('currentCity', { required: true })} />
            </div>
            <div className="form-group">
              <label className="form-label">District <span className="required">*</span></label>
              <input className="form-input" type="text" {...regAddress('currentDistrict', { required: true })} />
            </div>
            <div className="form-group">
              <label className="form-label">State <span className="required">*</span></label>
              <select className="form-select" {...regAddress('currentState', { required: true })}>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Country <span className="required">*</span></label>
              <select className="form-select" {...regAddress('currentCountry', { required: true })}>
                <option value="India">India</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Pin Code <span className="required">*</span></label>
              <input className="form-input" type="text" {...regAddress('currentPin', { required: true })} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <input type="checkbox" id="sameAsAbove" {...regAddress('sameAsAbove')} />
            <label htmlFor="sameAsAbove" style={{ fontSize: '13px', fontWeight: '600' }}>Same as Above</label>
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Permanent Address Details</h3>
          <div className="form-grid">
            <div className="form-group form-field-full">
              <label className="form-label">Street and House No <span className="required">*</span></label>
              <input className="form-input" type="text" disabled={watchSameAsAbove} {...regAddress('permanentStreet', { required: !watchSameAsAbove })} />
            </div>
            <div className="form-group form-field-full">
              <label className="form-label">Line 2</label>
              <input className="form-input" type="text" disabled={watchSameAsAbove} {...regAddress('permanentLine2')} />
            </div>
            <div className="form-group">
              <label className="form-label">City <span className="required">*</span></label>
              <input className="form-input" type="text" disabled={watchSameAsAbove} {...regAddress('permanentCity', { required: !watchSameAsAbove })} />
            </div>
            <div className="form-group">
              <label className="form-label">District <span className="required">*</span></label>
              <input className="form-input" type="text" disabled={watchSameAsAbove} {...regAddress('permanentDistrict', { required: !watchSameAsAbove })} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className="btn-form-submit" type="submit">Save Address</button>
          </div>
        </form>
      )
    },
    {
      id: 'family',
      label: 'Family',
      content: (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Family Members</h3>
            <button 
              type="button" 
              className="btn-apply-leave" 
              style={{ margin: 0, padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setShowFamilyModal(true)}
            >
              <Plus size={14} /> Add Member
            </button>
          </div>

          <table className="modal-requests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Relation</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Education</th>
                <th>Occupation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {familyMembers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-light)' }}>No family details added yet.</td>
                </tr>
              ) : (
                familyMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.relation}</td>
                    <td>{member.gender}</td>
                    <td>{member.dob}</td>
                    <td>{member.education || 'NA'}</td>
                    <td>{member.occupation || 'NA'}</td>
                    <td>
                      <button 
                        className="btn-action-small btn-reject" 
                        onClick={() => onDeleteFamilyMember(member.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      content: (
        <form onSubmit={handleContactSubmit(onSaveContactInfo)}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Contact Info</h3>
          <div className="form-grid">
            
            <div className="form-group">
              <label className="form-label">Mobile Number <span className="required">*</span></label>
              <input className="form-input" type="text" {...regContact('mobile', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Personal Email <span className="required">*</span></label>
              <input className="form-input" type="email" {...regContact('personalEmail', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Work Email <span className="required">*</span></label>
              <input className="form-input" type="email" {...regContact('workEmail', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Contact Name <span className="required">*</span></label>
              <input className="form-input" type="text" {...regContact('emergencyName', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Relation <span className="required">*</span></label>
              <input className="form-input" type="text" {...regContact('emergencyRelation', { required: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Contact No <span className="required">*</span></label>
              <input className="form-input" type="text" {...regContact('emergencyPhone', { required: true })} />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className="btn-form-submit" type="submit">Save Contacts</button>
          </div>
        </form>
      )
    }
  ];

  return (
    <div className="personal-details-container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', textAlign: 'left', marginTop: '16px' }}>
      
      {/* Left Column: Summary Card */}
      <div className="dash-card" style={{ height: 'fit-content', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '32px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid white',
            boxShadow: 'var(--shadow-md)'
          }}>
            {profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '8px 0 2px 0' }}>{profileData.name}</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Project Trainee</span>
          <span className="request-status status-approved" style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '12px', marginTop: '4px' }}>Active</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} style={{ color: 'var(--primary)' }} />
            <span>{profileData.contactInfo.workEmail || 'yash.w@intellect.com'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} style={{ color: 'var(--primary)' }} />
            <span>{profileData.contactInfo.mobile || '+91 9999999999'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} style={{ color: 'var(--primary)' }} />
            <span>09:00 - 18:00</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '500' }}>Department:</span>
            <span>Trainee</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '500' }}>Line Manager:</span>
            <span>Rameez Shaikh</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '500' }}>Location:</span>
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>

      {/* Right Column: Multi-tab Profile View */}
      <div className="dash-card" style={{ padding: '24px' }}>
        <Tabs tabs={tabsConfig} defaultActiveTab="personal-info" />
      </div>

      {/* Family Member Add Modal */}
      {showFamilyModal && (
        <div className="overlay" onClick={() => setShowFamilyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Add Family Member</h3>
              <button className="modal-close" onClick={() => setShowFamilyModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFamilyModalSubmit(onAddFamilyMember)}>
              <div className="form-grid" style={{ gap: '16px' }}>
                
                <div className="form-group">
                  <label className="form-label">Name <span className="required">*</span></label>
                  <input className="form-input" placeholder="Enter name" type="text" {...regFamilyModal('name', { required: true })} />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="radio" value="Female" {...regFamilyModal('gender', { required: true })} /> Female
                    </label>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="radio" value="Male" {...regFamilyModal('gender', { required: true })} /> Male
                    </label>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="radio" value="Others" {...regFamilyModal('gender', { required: true })} /> Others
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Relation <span className="required">*</span></label>
                  <select className="form-select" {...regFamilyModal('relation', { required: true })}>
                    <option value="">Select</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Date Of Birth <span className="required">*</span></label>
                  <input className="form-input" type="date" {...regFamilyModal('dob', { required: true })} />
                </div>

                <div className="form-group">
                  <label className="form-label">Education</label>
                  <input className="form-input" placeholder="Enter education" type="text" {...regFamilyModal('education')} />
                </div>

                <div className="form-group">
                  <label className="form-label">Occupation</label>
                  <input className="form-input" placeholder="Enter occupation" type="text" {...regFamilyModal('occupation')} />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact No.</label>
                  <input className="form-input" placeholder="Enter contact no" type="text" {...regFamilyModal('contact')} />
                </div>

              </div>

              <div className="form-actions" style={{ marginTop: '24px' }}>
                <button type="button" className="btn-form-cancel" onClick={() => setShowFamilyModal(false)}>Close</button>
                <button type="submit" className="btn-form-submit" style={{ background: '#b08b00' }}>Save</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default PersonalDetailsPage;
