import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

// Leave Form Component
function LeaveForm({ onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      leaveType: '',
      fromDate: '',
      toDate: '',
      noOfDays: '',
      rejoiningDate: '',
      site: '',
      clientAcceptance: '',
      reason: ''
    }
  });

  const watchedFromDate = watch('fromDate');
  const watchedToDate = watch('toDate');
  const watchedReason = watch('reason') || '';

  useEffect(() => {
    if (watchedFromDate && watchedToDate) {
      const from = new Date(watchedFromDate);
      const to = new Date(watchedToDate);

      if (to >= from) {
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setValue('noOfDays', diffDays);

        const rejoins = new Date(to);
        rejoins.setDate(rejoins.getDate() + 1);
        const rejoinsStr = rejoins.toISOString().split('T')[0];
        setValue('rejoiningDate', rejoinsStr);
      } else {
        setValue('noOfDays', 0);
        setValue('rejoiningDate', 'NA');
      }
    } else {
      setValue('noOfDays', '');
      setValue('rejoiningDate', '');
    }
  }, [watchedFromDate, watchedToDate, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="leave-form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="form-header-title">Apply Leave</h3>
        <button className="modal-close" onClick={onCancel}>
          <X size={20} />
        </button>
      </div>

      <div className="balances-grid">
        <div className="balance-item-box">
          <span className="balance-item-label">GL Balance:</span>
          <span className="balance-item-value">7 Days</span>
        </div>
        <div className="balance-item-box">
          <span className="balance-item-label">CL Balance:</span>
          <span className="balance-item-value">2.5 Days</span>
        </div>
        <div className="balance-item-box">
          <span className="balance-item-label">Compensatory Balance:</span>
          <span className="balance-item-value">0 Day</span>
        </div>
        <div className="balance-item-box">
          <span className="balance-item-label">Approver 1:</span>
          <span className="balance-item-value" style={{ fontSize: '13px', color: 'var(--text-main)' }}>Rameez Shaikh</span>
        </div>
        <div className="balance-item-box">
          <span className="balance-item-label">Approver 2:</span>
          <span className="balance-item-value" style={{ fontSize: '13px', color: 'var(--text-main)' }}>Rameez Shaikh</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-grid">
          
          <div className="form-group">
            <label className="form-label">
              Type Of leave <span className="required">*</span>
            </label>
            <select
              className="form-select"
              {...register('leaveType', { required: 'Please select a leave type' })}
            >
              <option value="">Select</option>
              <option value="General Leave">General Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Compensatory Leave">Compensatory Leave</option>
            </select>
            {errors.leaveType && <span className="form-error">{errors.leaveType.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Last Leave Date</label>
            <input className="form-input" type="text" value="NA" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">
              From Date <span className="required">*</span>
            </label>
            <input
              className="form-input"
              type="date"
              {...register('fromDate', { required: 'From Date is required' })}
            />
            {errors.fromDate && <span className="form-error">{errors.fromDate.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              To Date <span className="required">*</span>
            </label>
            <input
              className="form-input"
              type="date"
              {...register('toDate', { 
                required: 'To Date is required',
                validate: (value) => {
                  if (!watchedFromDate) return true;
                  return new Date(value) >= new Date(watchedFromDate) || 'To Date must be on or after From Date';
                }
              })}
            />
            {errors.toDate && <span className="form-error">{errors.toDate.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">No. Of Days</label>
            <input
              className="form-input"
              type="text"
              placeholder="Calculated automatically"
              readOnly
              {...register('noOfDays')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rejoining Date</label>
            <input
              className="form-input"
              type="text"
              placeholder="Calculated automatically"
              readOnly
              {...register('rejoiningDate')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Site <span className="required">*</span>
            </label>
            <select
              className="form-select"
              {...register('site', { required: 'Please select a site' })}
            >
              <option value="">Select</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Office - Mumbai HQ">Office - Mumbai HQ</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.site && <span className="form-error">{errors.site.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Client Acceptance <span className="required">*</span>
            </label>
            <select
              className="form-select"
              {...register('clientAcceptance', { required: 'Please select client acceptance option' })}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Required">Not Required</option>
            </select>
            {errors.clientAcceptance && <span className="form-error">{errors.clientAcceptance.message}</span>}
          </div>

          <div className="form-group form-field-full">
            <label className="form-label">
              Reason <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              placeholder="Please state the reason for leave"
              maxLength={200}
              {...register('reason', { 
                required: 'Reason is required',
                maxLength: { value: 200, message: 'Reason cannot exceed 200 characters' }
              })}
            />
            <div className="char-counter">{watchedReason.length} / 200</div>
            {errors.reason && <span className="form-error">{errors.reason.message}</span>}
          </div>

        </div>

        <div className="form-actions">
          <button 
            className="btn-form-cancel" 
            type="button" 
            onClick={() => { reset(); onCancel(); }}
          >
            Cancel
          </button>
          <button className="btn-form-submit" type="submit">
            Submit Leave Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaveForm;
