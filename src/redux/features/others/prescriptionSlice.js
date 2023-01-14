import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symptom: {
    title: '',
    description: ''
  },
  symptomChoice: []
};

export const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    selected_patient_symptom: (state = initialState, action) => {
      state.symptom = {
        title: action.payload.title,
        description: action.payload.description
      };
    },
    selected_patient_symptom_choice: (state, action) => {
      state.symptomChoice = action.payload;
    }
  }
});

export default prescriptionSlice.reducer;
export const { selected_patient_symptom, selected_patient_symptom_choice } =
  prescriptionSlice.actions;
