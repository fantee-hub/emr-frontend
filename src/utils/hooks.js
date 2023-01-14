import { useSelector } from 'react-redux';

export const useCurrentUser = () => {
  return useSelector((state) => state.auth.user);
};

export const useAdminLoginPermission = () => {
  return useSelector((state) => state.adminLoginPermission.isPermitted);
};
export const useSelectedPatientSymptoms = () => {
  const options = useSelector((state) => state.prescription.symptom);
  if (!options) {
    return {};
  }
  return options;
};
export const useSelectedPatientSymptomsChoice = () => {
  const arr = useSelector((state) => state.prescription.symptomChoice);
  if (!arr) {
    return [];
  }
  return arr;
};
