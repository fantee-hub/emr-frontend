import httpService from '../axios';

const StaffUrl = '/staff';
const InventoryUrl = '/inventory';
const PatientUrl = '/patients';
const ReceivedQueuesUrl = '/queue/staff/received';
const sendQueueUrl = '/queue/add';
const PrescriptionUrl = '/prescription';
const SessionUrl = '/session';
const PrescriptionInSessionUrl = '/prescription/session/';
const TestsInSessionUrl = '/lab/session/';
const LabUrl = '/lab';
const DiagnosisUrl = '/diagnosis';
const SymptomsUrl = '/symptoms';
const ApprovePaymentUrl = '/approve';

export const addNewStaff = (data) => {
  return httpService.post(StaffUrl, data);
};
export const getAllStaff = (page, size) => {
  return httpService.get(StaffUrl, { params: { page, size } });
};
export const getSingleStaff = (staff_id) => {
  return httpService.get(StaffUrl + '/info/' + staff_id);
};
export const updateStaff = (data, staff_id) => {
  return httpService.patch(StaffUrl + '/' + staff_id, data);
};
export const updateStaffStatus = (staff_id) => {
  return httpService.patch(StaffUrl + '/status/' + staff_id);
};

export const setStaffShiftHours = (data) => {
  return httpService.put(StaffUrl + '/hours', data);
};

export const sendQueue = (data) => {
  return httpService.post(sendQueueUrl, data);
};
export const getReceivedQueues = (staffId, status) => {
  return httpService.get(ReceivedQueuesUrl, { params: { staffId, status } });
};

export const addNewPatients = (data) => {
  return httpService.post(PatientUrl, data);
};
export const addPatientBiodata = (data) => {
  return httpService.post(PatientUrl + '/bios', data);
};
export const getPatientBiodata = (patientId) => {
  return httpService.get(PatientUrl + '/bios' + '/' + patientId);
};
export const updatePatientBiodata = (patient_id, data) => {
  return httpService.put(PatientUrl + '/bios'+ '/' + patient_id, data);
};
export const getAllPatients = (page, size) => {
  return httpService.get(PatientUrl, { params: { page, size } });
};
export const updatePatient = (data, patient_id) => {
  return httpService.put(PatientUrl + '/' + patient_id, data);
};

export const addNewInventory = (data) => {
  return httpService.post(InventoryUrl, data);
};
export const getAllInventoryItems = (page, size) => {
  return httpService.get(InventoryUrl, { params: { page, size } });
};
export const updateInventory = (id, data) => {
  return httpService.patch(InventoryUrl+ '/' + id, data);
};

export const addPrescription = (data) => {
  return httpService.post(PrescriptionUrl, data);
};
export const updatePrescription = (data) => {
  return httpService.patch(PrescriptionUrl, data);
};
export const getSessionPrescriptions = (sessionId) => {
  return httpService.get(PrescriptionInSessionUrl + sessionId, { params: { page: 0, size: 10 } });
};

export const addNewTest = (data) => {
  return httpService.post(LabUrl, data);
};
export const addLabTestResult = (data) => {
  return httpService.patch(LabUrl, data);
};
export const getSessionTests = (sessionId) => {
  return httpService.get(TestsInSessionUrl + sessionId, { params: { page: 0, size: 10 } });
};

export const getSessions = (page, size) => {
  return httpService.get(SessionUrl, { params: { page, size } });
};
export const getAllSessionsForPatient = (patientId) => {
  return httpService.get(SessionUrl + '/' + patientId, { params: { page: 0, size: 5 } });
};

export const addToDiagnosisList = (data) => {
  return httpService.post(StaffUrl + DiagnosisUrl, data);
};
export const addNewDiagnosis = (data) => {
  return httpService.post(DiagnosisUrl, data);
};
export const getDiagnosisList = () => {
  return httpService.get(StaffUrl + DiagnosisUrl);
};
export const updateDiagnosisItem = (data) => {
  return httpService.put(StaffUrl + DiagnosisUrl, data);
};
export const getSessionDiagnosis = (sessionId) => {
  return httpService.get(DiagnosisUrl + '/session/' + sessionId);
};

export const addToSymptomList = (data) => {
  return httpService.post(StaffUrl + SymptomsUrl, data);
};
export const addNewSymptom = (data) => {
  return httpService.post(SymptomsUrl, data);
};
export const getSymptomsList = () => {
  return httpService.get(StaffUrl + SymptomsUrl);
};
export const updateSymptomItem = (data) => {
  return httpService.put(StaffUrl + SymptomsUrl, data);
};
export const getSessionSymptoms = (sessionId) => {
  return httpService.get(SymptomsUrl + '/session/' + sessionId);
};

export const approvePayment = (data) => {
  return httpService.post(ApprovePaymentUrl, data);
};
export const getApprovedPayments = () => {
  return httpService.get(ApprovePaymentUrl);
};
export const getApprovedPaymentsForPatient = (patientId, sessionId) => {
  return httpService.get(ApprovePaymentUrl + '/session/' + sessionId + '/' + patientId);
};

export const StaffInvoiceApproval = (data) => {
  return httpService.put(ApprovePaymentUrl + "/confirm", data);
};
