import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import SymptomsCard from '../components/SymptomsCard';
import DiagnosisCard from '../components/DiagnosisCard';
import { getAllInventoryItems, getDiagnosisList, getSymptomsList } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import Prescription from '../components/Prescription';
import LabTest from '../components/LabTest';
import { useCurrentUser } from '../../utils/hooks';

function DrugsTestDiagnosis() {
  const { patientId, sessionId } = useParams();
  const user = useCurrentUser();

  const [drugsList, setDrugsList] = useState([]);
  const [testsList, setTestsList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [symptomsList, setSymptomsList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [diagnosisList, setDiagnosisList] = useState([]);

  const getInventory = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllInventoryItems(page, size);
      if (data) {
        const drugs = data.rows.filter((item) => item.type === 'DRUG');
        const tests = data.rows.filter((item) => item.type === 'TEST');
        setDrugsList(drugs);
        setTestsList(tests);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getSymptoms = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSymptomsList();
      setSymptomsList(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDiagnosis = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getDiagnosisList();
      setDiagnosisList(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getInventory();
    getSymptoms();
    getDiagnosis();
  }, []);

  return (
    <div>
      <div className="px-10 pb-8">
        <h1>Prescription</h1>
        <p className="text-xs italic text-gray-600">
          (See patient history for previously added drugs, tests, symptoms and diagnosis)
        </p>

        <section className="flex space-x-3">
          <div className="w-1/2">
            <SymptomsCard sessionId={sessionId} symptomsList={symptomsList} patientId={patientId} />
          </div>

          <div className="w-1/2">
            <DiagnosisCard
              sessionId={sessionId}
              diagnosisList={diagnosisList}
              patientId={patientId}
            />
          </div>
        </section>

        <section className="mt-3">
          <div className="w-full">
            <Paper sx={{ flexGrow: 1 }} className="p-3">
              <div className="flex justify-center">
                <h3 className="text-lg mb-3">Drugs and Tests</h3>
              </div>
              <section className="flex flex-col space-y-3">
                <Prescription drugsList={drugsList} sessionId={sessionId} patientId={patientId} />
                <LabTest testsList={testsList} sessionId={sessionId} />
              </section>
            </Paper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DrugsTestDiagnosis;
