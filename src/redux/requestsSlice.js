import { createSlice } from '@reduxjs/toolkit';

const initialState = [
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

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.unshift(action.payload);
    },
    updateRequestStatus: (state, action) => {
      const { id, status } = action.payload;
      const existing = state.find(req => req.id === id);
      if (existing) {
        existing.status = status;
      }
    }
  }
});

export const { addRequest, updateRequestStatus } = requestsSlice.actions;
export default requestsSlice.reducer;
