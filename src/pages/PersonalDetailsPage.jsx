// Personal Details Page - Refactored to React Hook Form Multi-Stepper Form
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Mail, Phone, Clock, X, Plus, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

function PersonalDetailsPage({ profileData, onSaveProfile }) {
  const [step, setStep] = useState(1); // Steps 1 to 4
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

  // Retrieve data from Redux
  const reduxProfile = useSelector((state) => state.profile);

  // Single Master Form for Multi-Stepper
  const { register, handleSubmit, trigger, watch, setValue, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      ...reduxProfile.personalInfo,
      ...reduxProfile.addressInfo,
      ...reduxProfile.contactInfo
    }
  });

  // Synchronize form default values when Redux store updates
  React.useEffect(() => {
    reset({
      ...reduxProfile.personalInfo,
      ...reduxProfile.addressInfo,
      ...reduxProfile.contactInfo
    });
  }, [reduxProfile, reset]);

  // Modal form
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

  // Watch for Address autofill
  const watchSameAsAbove = watch('sameAsAbove');
  const watchCurrentStreet = watch('currentStreet');
  const watchCurrentLine2 = watch('currentLine2');
  const watchCurrentCity = watch('currentCity');
  const watchCurrentDistrict = watch('currentDistrict');

  React.useEffect(() => {
    if (watchSameAsAbove) {
      setValue('permanentStreet', watchCurrentStreet || '');
      setValue('permanentLine2', watchCurrentLine2 || '');
      setValue('permanentCity', watchCurrentCity || '');
      setValue('permanentDistrict', watchCurrentDistrict || '');
    }
  }, [watchSameAsAbove, watchCurrentStreet, watchCurrentLine2, watchCurrentCity, watchCurrentDistrict, setValue]);

  // Console log Redux data on step change
  React.useEffect(() => {
    console.log(`[Tab ${step}] Current Redux Profile Data:`, reduxProfile);
  }, [step, reduxProfile]);

  // Save current step data to Redux helper
  const handleSaveStepData = () => {
    const data = getValues();
    const firstName = data.firstName !== undefined ? data.firstName : (reduxProfile.personalInfo?.firstName || '');
    const lastName = data.lastName !== undefined ? data.lastName : (reduxProfile.personalInfo?.lastName || '');
    const name = `${firstName} ${lastName}`.trim() || reduxProfile.name;

    const updatedProfile = {
      ...reduxProfile,
      name: name,
      personalInfo: {
        title: data.title ?? reduxProfile.personalInfo?.title,
        gender: data.gender ?? reduxProfile.personalInfo?.gender,
        firstName: firstName,
        lastName: lastName,
        dob: data.dob ?? reduxProfile.personalInfo?.dob,
        placeOfBirth: data.placeOfBirth ?? reduxProfile.personalInfo?.placeOfBirth,
        nationality: data.nationality ?? reduxProfile.personalInfo?.nationality,
        bloodGroup: data.bloodGroup ?? reduxProfile.personalInfo?.bloodGroup,
        maritalStatus: data.maritalStatus ?? reduxProfile.personalInfo?.maritalStatus,
        children: data.children ?? reduxProfile.personalInfo?.children
      },
      addressInfo: {
        currentStreet: data.currentStreet ?? reduxProfile.addressInfo?.currentStreet,
        currentLine2: data.currentLine2 ?? reduxProfile.addressInfo?.currentLine2,
        currentCity: data.currentCity ?? reduxProfile.addressInfo?.currentCity,
        currentDistrict: data.currentDistrict ?? reduxProfile.addressInfo?.currentDistrict,
        currentState: data.currentState ?? reduxProfile.addressInfo?.currentState,
        currentCountry: data.currentCountry ?? reduxProfile.addressInfo?.currentCountry,
        currentPin: data.currentPin ?? reduxProfile.addressInfo?.currentPin,
        sameAsAbove: data.sameAsAbove ?? reduxProfile.addressInfo?.sameAsAbove,
        permanentStreet: data.permanentStreet ?? reduxProfile.addressInfo?.permanentStreet,
        permanentLine2: data.permanentLine2 ?? reduxProfile.addressInfo?.permanentLine2,
        permanentCity: data.permanentCity ?? reduxProfile.addressInfo?.permanentCity,
        permanentDistrict: data.permanentDistrict ?? reduxProfile.addressInfo?.permanentDistrict
      },
      contactInfo: {
        mobile: data.mobile ?? reduxProfile.contactInfo?.mobile,
        personalEmail: data.personalEmail ?? reduxProfile.contactInfo?.personalEmail,
        workEmail: data.workEmail ?? reduxProfile.contactInfo?.workEmail,
        emergencyName: data.emergencyName ?? reduxProfile.contactInfo?.emergencyName,
        emergencyRelation: data.emergencyRelation ?? reduxProfile.contactInfo?.emergencyRelation,
        emergencyPhone: data.emergencyPhone ?? reduxProfile.contactInfo?.emergencyPhone
      }
    };
    onSaveProfile(updatedProfile);
  };

  // Validation function per step
  const validateStep = async (currentStep) => {
    let fields = [];
    if (currentStep === 1) {
      fields = ['title', 'gender', 'firstName', 'lastName', 'dob', 'placeOfBirth', 'nationality', 'bloodGroup', 'maritalStatus'];
    } else if (currentStep === 2) {
      fields = ['currentStreet', 'currentCity', 'currentDistrict', 'currentState', 'currentCountry', 'currentPin'];
      if (!watchSameAsAbove) {
        fields.push('permanentStreet', 'permanentCity', 'permanentDistrict');
      }
    } else if (currentStep === 4) {
      fields = ['mobile', 'personalEmail', 'workEmail', 'emergencyName', 'emergencyRelation', 'emergencyPhone'];
    }
    return await trigger(fields);
  };

  // Navigations
  const handleNext = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      handleSaveStepData(); // Update redux state on next click
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    handleSaveStepData(); // Ensure state is saved when going back too
    setStep(step - 1);
  };

  const handleTabClick = async (targetStep) => {
    if (targetStep === step) return;
    if (targetStep > step) {
      // Validate all steps in between
      for (let s = step; s < targetStep; s++) {
        const isValid = await validateStep(s);
        if (!isValid) return; // Stop if validation fails
      }
    }
    handleSaveStepData(); // Update redux state on direct tab click
    setStep(targetStep);
  };

  // Final Submit
  const onSubmitAll = (data) => {
    // Structure back into profile categories
    const updatedProfile = {
      ...profileData,
      name: `${data.firstName} ${data.lastName}`,
      personalInfo: {
        title: data.title,
        gender: data.gender,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        placeOfBirth: data.placeOfBirth,
        nationality: data.nationality,
        bloodGroup: data.bloodGroup,
        maritalStatus: data.maritalStatus,
        children: data.children
      },
      addressInfo: {
        currentStreet: data.currentStreet,
        currentLine2: data.currentLine2,
        currentCity: data.currentCity,
        currentDistrict: data.currentDistrict,
        currentState: data.currentState,
        currentCountry: data.currentCountry,
        currentPin: data.currentPin,
        sameAsAbove: data.sameAsAbove,
        permanentStreet: data.permanentStreet,
        permanentLine2: data.permanentLine2,
        permanentCity: data.permanentCity,
        permanentDistrict: data.permanentDistrict
      },
      contactInfo: {
        mobile: data.mobile,
        personalEmail: data.personalEmail,
        workEmail: data.workEmail,
        emergencyName: data.emergencyName,
        emergencyRelation: data.emergencyRelation,
        emergencyPhone: data.emergencyPhone
      }
    };

    onSaveProfile(updatedProfile);
    Swal.fire({
      icon: 'success',
      title: 'Saved Successfully',
      text: 'All personal details and form steps saved successfully.',
      confirmButtonColor: '#b08b00'
    });
  };

  // Family Helpers
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

      {/* Right Column: Multi-Stepper Form */}
      <div className="dash-card" style={{ padding: '24px' }}>
        
        {/* Step Indicator Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          borderBottom: '1px solid var(--border-color)', 
          marginBottom: '24px', 
          paddingBottom: '12px', 
          overflowX: 'auto' 
        }}>
          {[
            { id: 1, label: 'Personal Info' },
            { id: 2, label: 'Address' },
            { id: 3, label: 'Family' },
            { id: 4, label: 'Contact' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                color: step === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: step === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'var(--transition)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Master Form Wrapper */}
        <form onSubmit={handleSubmit(onSubmitAll)}>
          
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Personal Info</h3>
              <div className="form-grid">
                
                <div className="form-group">
                  <label className="form-label">Title <span className="required">*</span></label>
                  <select className="form-select" {...register('title', { required: true })}>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                  {errors.title && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Gender <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="radio" value="Male" {...register('gender', { required: true })} /> Male
                    </label>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="radio" value="Female" {...register('gender', { required: true })} /> Female
                    </label>
                  </div>
                  {errors.gender && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">First Name <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('firstName', { required: true })} />
                  {errors.firstName && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('lastName', { required: true })} />
                  {errors.lastName && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Date of Birth <span className="required">*</span></label>
                  <input className="form-input" type="date" {...register('dob', { required: true })} />
                  {errors.dob && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Place of Birth <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('placeOfBirth', { required: true })} />
                  {errors.placeOfBirth && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Nationality <span className="required">*</span></label>
                  <select className="form-select" {...register('nationality', { required: true })}>
                    <option value="Indian">Indian</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.nationality && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Blood Group <span className="required">*</span></label>
                  <select className="form-select" {...register('bloodGroup', { required: true })}>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                    <option value="AB-">AB-</option>
                  </select>
                  {errors.bloodGroup && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Marital Status <span className="required">*</span></label>
                  <select className="form-select" {...register('maritalStatus', { required: true })}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                  {errors.maritalStatus && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">No of Children</label>
                  <input className="form-input" type="number" {...register('children')} />
                </div>

              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Current Address Details</h3>
              <div className="form-grid" style={{ marginBottom: '24px' }}>
                <div className="form-group form-field-full">
                  <label className="form-label">Street and House No <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('currentStreet', { required: true })} />
                  {errors.currentStreet && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group form-field-full">
                  <label className="form-label">Line 2</label>
                  <input className="form-input" type="text" {...register('currentLine2')} />
                </div>
                <div className="form-group">
                  <label className="form-label">City <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('currentCity', { required: true })} />
                  {errors.currentCity && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">District <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('currentDistrict', { required: true })} />
                  {errors.currentDistrict && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">State <span className="required">*</span></label>
                  <select className="form-select" {...register('currentState', { required: true })}>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                  {errors.currentState && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Country <span className="required">*</span></label>
                  <select className="form-select" {...register('currentCountry', { required: true })}>
                    <option value="India">India</option>
                  </select>
                  {errors.currentCountry && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Pin Code <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('currentPin', { required: true })} />
                  {errors.currentPin && <span className="form-error">Please fill this field</span>}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <input type="checkbox" id="sameAsAbove" {...register('sameAsAbove')} />
                <label htmlFor="sameAsAbove" style={{ fontSize: '13px', fontWeight: '600' }}>Same as Above</label>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Permanent Address Details</h3>
              <div className="form-grid">
                <div className="form-group form-field-full">
                  <label className="form-label">Street and House No <span className="required">*</span></label>
                  <input className="form-input" type="text" disabled={watchSameAsAbove} {...register('permanentStreet', { required: !watchSameAsAbove })} />
                  {!watchSameAsAbove && errors.permanentStreet && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group form-field-full">
                  <label className="form-label">Line 2</label>
                  <input className="form-input" type="text" disabled={watchSameAsAbove} {...register('permanentLine2')} />
                </div>
                <div className="form-group">
                  <label className="form-label">City <span className="required">*</span></label>
                  <input className="form-input" type="text" disabled={watchSameAsAbove} {...register('permanentCity', { required: !watchSameAsAbove })} />
                  {!watchSameAsAbove && errors.permanentCity && <span className="form-error">Please fill this field</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">District <span className="required">*</span></label>
                  <input className="form-input" type="text" disabled={watchSameAsAbove} {...register('permanentDistrict', { required: !watchSameAsAbove })} />
                  {!watchSameAsAbove && errors.permanentDistrict && <span className="form-error">Please fill this field</span>}
                </div>
              </div>

              {/* Redux Data display for Tab 2 */}
              <div style={{ marginTop: '20px', padding: '12px', background: 'var(--primary-light)', borderRadius: '8px', border: '1px solid var(--primary-border)' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>Redux Store Value (Tab 2):</h4>
                <p style={{ margin: '2px 0', fontSize: '12px', color: 'var(--text-main)' }}>
                  <strong>Current City:</strong> {reduxProfile.addressInfo?.currentCity}
                </p>
                <p style={{ margin: '2px 0', fontSize: '12px', color: 'var(--text-main)' }}>
                  <strong>Pin Code:</strong> {reduxProfile.addressInfo?.currentPin}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Family */}
          {step === 3 && (
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
                            type="button"
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
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Contact Info</h3>
              <div className="form-grid">
                
                <div className="form-group">
                  <label className="form-label">Mobile Number <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('mobile', { required: true })} />
                  {errors.mobile && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Personal Email <span className="required">*</span></label>
                  <input className="form-input" type="email" {...register('personalEmail', { required: true })} />
                  {errors.personalEmail && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Work Email <span className="required">*</span></label>
                  <input className="form-input" type="email" {...register('workEmail', { required: true })} />
                  {errors.workEmail && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Emergency Contact Name <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('emergencyName', { required: true })} />
                  {errors.emergencyName && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Emergency Relation <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('emergencyRelation', { required: true })} />
                  {errors.emergencyRelation && <span className="form-error">Please fill this field</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Emergency Contact No <span className="required">*</span></label>
                  <input className="form-input" type="text" {...register('emergencyPhone', { required: true })} />
                  {errors.emergencyPhone && <span className="form-error">Please fill this field</span>}
                </div>

              </div>
            </div>
          )}

          {/* Single Category-Specific Redux Store Value Card */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'var(--bg-main)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '13px',
            color: 'var(--text-main)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '16px'
          }}>
            <h4 style={{ fontWeight: '700', marginBottom: '10px', color: '#b08b00', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#b08b00', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                {step}
              </span>
              Redux Store Value ({step === 1 ? 'Personal Info' : step === 2 ? 'Address' : step === 3 ? 'Family Members' : 'Contact Info'}):
            </h4>

            {step === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                <div><strong>Profile Name:</strong> {reduxProfile.name}</div>
                <div><strong>Title:</strong> {reduxProfile.personalInfo?.title || 'Mr.'}</div>
                <div><strong>First Name:</strong> {reduxProfile.personalInfo?.firstName || 'Yash'}</div>
                <div><strong>Last Name:</strong> {reduxProfile.personalInfo?.lastName || 'Warik'}</div>
                <div><strong>Gender:</strong> {reduxProfile.personalInfo?.gender || 'Male'}</div>
                <div><strong>Date of Birth:</strong> {reduxProfile.personalInfo?.dob || 'NA'}</div>
                <div><strong>Place of Birth:</strong> {reduxProfile.personalInfo?.placeOfBirth || 'NA'}</div>
                <div><strong>Blood Group:</strong> {reduxProfile.personalInfo?.bloodGroup || 'NA'}</div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                <div><strong>Current Street:</strong> {reduxProfile.addressInfo?.currentStreet || 'NA'}</div>
                <div><strong>City:</strong> {reduxProfile.addressInfo?.currentCity || 'NA'}</div>
                <div><strong>District:</strong> {reduxProfile.addressInfo?.currentDistrict || 'NA'}</div>
                <div><strong>State:</strong> {reduxProfile.addressInfo?.currentState || 'NA'}</div>
                <div><strong>Country:</strong> {reduxProfile.addressInfo?.currentCountry || 'NA'}</div>
                <div><strong>Pin Code:</strong> {reduxProfile.addressInfo?.currentPin || 'NA'}</div>
                <div style={{ gridColumn: 'span 2' }}>
                  <strong>Permanent Address:</strong> {reduxProfile.addressInfo?.permanentStreet || 'Same as current'}
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>Total Family Members:</strong> {familyMembers.length}</div>
                <div>
                  <strong>Members List:</strong>{' '}
                  {familyMembers.map(m => `${m.name} (${m.relation})`).join(', ') || 'No members added'}
                </div>
              </div>
            )}

            {step === 4 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                <div><strong>Mobile Number:</strong> {reduxProfile.contactInfo?.mobile || 'NA'}</div>
                <div><strong>Work Email:</strong> {reduxProfile.contactInfo?.workEmail || 'NA'}</div>
                <div><strong>Personal Email:</strong> {reduxProfile.contactInfo?.personalEmail || 'NA'}</div>
                <div><strong>Emergency Contact:</strong> {reduxProfile.contactInfo?.emergencyName || 'NA'} ({reduxProfile.contactInfo?.emergencyRelation || 'NA'})</div>
                <div><strong>Emergency Phone:</strong> {reduxProfile.contactInfo?.emergencyPhone || 'NA'}</div>
              </div>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '24px', 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '20px' 
          }}>
            {step > 1 && (
              <button type="button" className="btn-form-cancel" onClick={handleBack}>
                Back
              </button>
            )}
            <div style={{ marginLeft: 'auto' }}>
              {step < 4 ? (
                <button type="button" className="btn-form-submit" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button type="submit" className="btn-form-submit">
                  Submit & Save All
                </button>
              )}
            </div>
          </div>

        </form>

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

