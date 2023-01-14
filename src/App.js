import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLayout from './admin/components/AdminLayout';
import Login from './auth/Login';
import ReceptionistHome from './receptionist/pages/ReceptionistHome';
import DoctorHome from './doctor/pages/DoctorHome';
import PatientsPersonalPage from './doctor/pages/PatientsPersonalPage';
import DrugsTestDiagnosis from './doctor/pages/DrugsTestDiagnosis';
import PatientHistory from './doctor/pages/PatientHistory';
import HistoryOverview from './doctor/pages/HistoryOverview';
import CashierHome from './cashier/pages/CashierHome';
import PatientInvoice from './cashier/pages/PatientInvoice';
import PharmacistHome from './pharmacist/pages/PharmacistHome';
import PharmacistInvoice from './pharmacist/pages/PharmacistInvoice';
import LabHome from './lab/pages/LabHome';
import XrayHome from './x-ray/pages/XrayHome';
import LabTests from './lab/pages/LabTests';
import XrayResults from './x-ray/pages/XrayResults';
import DoctorPatients from './cashier/pages/DoctorPatients';
import Unauthorized from './common-components/Unauthorized';
import ProtectedRoutes from './common-components/ProtectedRoutes';
import {
  ADMIN_USER_ROLE,
  DOCTOR_USER_ROLE,
  LAB_USER_ROLE,
  PHARMACIST_USER_ROLE,
  RECEPTIONIST_USER_ROLE,
  XRAY_USER_ROLE,
  CASHIER_USER_ROLE
} from './utils/constants';
import LabResults from './lab/pages/LabResults';
import WorkerLoginDetails from './admin/pages/WorkerLoginDetails';
import AdminLoginDetails from './admin/pages/AdminLoginDetails';
import Inventory from './admin/pages/Inventory';
import PatientsBiodata from './admin/pages/PatientsBiodata';
import PatientDetails from './admin/pages/Patients';
import Symptoms from './admin/pages/Symptoms';
import Diagnosis from './admin/pages/Diagnosis';
import PageNotFound from './common-components/PageNotFound';
import XrayTests from './x-ray/pages/XrayTests';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* public route */}
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoutes allowedRole={ADMIN_USER_ROLE} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="worker-login" element={<WorkerLoginDetails />} />
              <Route path="admin-login" element={<AdminLoginDetails />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="patients-biodata" element={<PatientsBiodata />} />
              <Route path="patient/:id/:name" element={<PatientDetails />} />
              <Route path="symptoms" element={<Symptoms />} />
              <Route path="diagnosis" element={<Diagnosis />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoutes allowedRole={RECEPTIONIST_USER_ROLE} />}>
            <Route path="/receptionist" element={<ReceptionistHome />} />
          </Route>

          {/* doctor routes */}
          <Route element={<ProtectedRoutes allowedRole={DOCTOR_USER_ROLE} />}>
            <Route path="/doctor" element={<DoctorHome />} />
            <Route
              path="/patient/:patientId/:name/:sessionId/:id"
              element={<PatientsPersonalPage />}
            />
            <Route
              path="/prescription/:patientId/:name/:sessionId"
              element={<DrugsTestDiagnosis />}
            />
            <Route path="/history-overview/:patientId" element={<HistoryOverview />} />
            <Route path="/history/:sessionId" element={<PatientHistory />} />
          </Route>

          {/* cashier route */}
          <Route element={<ProtectedRoutes allowedRole={CASHIER_USER_ROLE} />}>
            <Route path="/cashier" element={<CashierHome />} />
            <Route path="/doctor/:uuid" element={<DoctorPatients />} />
            <Route path="/patient-invoice/:sessionId/:patientId" element={<PatientInvoice />} />
          </Route>

          {/* pharmacist routes */}
          <Route element={<ProtectedRoutes allowedRole={PHARMACIST_USER_ROLE} />}>
            <Route path="/pharmacist" element={<PharmacistHome />} />
            <Route path="/approved-invoice/:patientId/:sessionId/:paymentId" element={<PharmacistInvoice />} />
          </Route>

          {/* lab routes */}
          <Route element={<ProtectedRoutes allowedRole={LAB_USER_ROLE} />}>
            <Route path="/lab" element={<LabHome />} />
            <Route path="/lab-tests/:patientId/:sessionId" element={<LabTests />} />
            <Route path="/lab-results/:testId/:testTitle/:testDesc" element={<LabResults />} />
          </Route>

          {/* x-ray routes */}
          <Route element={<ProtectedRoutes allowedRole={XRAY_USER_ROLE} />}>
            <Route path="/xray" element={<XrayHome />} />
            <Route path="/xray-tests/:patientId/:sessionId" element={<XrayTests />} />
            <Route path="/xray-results/:testId/:testTitle/:testDesc" element={<XrayResults />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
// function App() {

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* public route */}
//           <Route path="/" element={<Login />} />

//           <Route element={<ProtectedRoutes allowedRole={ADMIN_USER_ROLE} />}>
//             <Route path="/admin" element={<AdminNav />} />
//           </Route>

//           {/* receptionist route */}
//           <Route path="/receptionist" element={<ReceptionistHome />} />

//           {/* doctor routes */}
//           <Route path="/doctor" element={<DoctorHome />} />
//           <Route path="/patient/:patientId/:name/:sessionId" element={<PatientsPersonalPage />} />
//           <Route
//             path="/prescription/:patientId/:name/:sessionId"
//             element={<DrugsTestDiagnosis />}
//           />
//           <Route path="/history-overview/:patientId" element={<HistoryOverview />} />
//           <Route path="/history/:sessionId" element={<PatientHistory />} />

//           {/* cashier route */}
//           <Route path="/cashier" element={<CashierHome />} />
//           <Route path="/doctor/:uuid" element={<DoctorPatients />} />
//           <Route path="/patient-invoice/:id" element={<PatientInvoice />} />

//           {/* pharmacist routes */}
//           <Route path="/pharmacist" element={<PharmacistHome />} />
//           <Route path="/approved-invoice" element={<PharmacistInvoice />} />

//           {/* lab routes */}
//           <Route path="/lab" element={<LabHome />} />
//           <Route path="/lab-results" element={<LabResults />} />

//           {/* x-ray routes */}
//           <Route path="/xray" element={<XrayHome />} />
//           <Route path="/xray-results" element={<XrayResults />} />

//           <Route path="/unauthorized" element={<Unauthorized />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
