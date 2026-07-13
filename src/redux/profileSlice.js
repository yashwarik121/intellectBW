import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
