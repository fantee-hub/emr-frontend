/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { getSessionPrescriptions, getSessionTests, getSessionXrays } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import PrescriptionHistory from '../components/PrescriptionHistory';
import TestHistory from '../components/TestHistory';
import XrayHistory from '../components/XrayHistory';
import SymptomsHistory from '../components/SymptomsHistory';
import DiagnosisHistory from '../components/DiagnosisHistory';

const user = JSON.parse(localStorage.getItem('user'));

function PatientHistory() {
  let { sessionId, patientId } = useParams();

  const [isPrescritionLoading, setIsPrescriptionLoading] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [isXrayLoading, setIsXrayLoading] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const [tests, setTests] = useState([]);
  const [xrays, setXrays] = useState([]);

  const getPrescriptionsInSession = async () => {
    setIsPrescriptionLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionPrescriptions(sessionId);
      console.log(data);
      setIsPrescriptionLoading(false);
      if (data) {
        setPrescription(data.data);
      }
    } catch (error) {
      toast.error('an error occured');
    }
  };
  const getTestsInSession = async () => {
    setIsTestLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionTests(sessionId);
      console.log(data);
      setIsTestLoading(false);
      if (data) {
        setTests(data.data);
      }
    } catch (error) {
      toast.error('an error occured');
    }
  };
  const getXraysInSession = async () => {
    setIsXrayLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionXrays(sessionId);
      console.log(data);
      setIsXrayLoading(false);
      if (data) {
        setXrays(data.data);
      }
    } catch (error) {
      toast.error('an error occured');
    }
  };

  useEffect(() => {
    getPrescriptionsInSession();
    getTestsInSession();
    getXraysInSession();
  }, []);

  return (
    <>
      <div className="px-10 pb-8">
        <h1 className="">Patient History</h1>
        <Paper>
          <SymptomsHistory user={user} sessionId={sessionId} patientId={patientId} />
          <DiagnosisHistory user={user} sessionId={sessionId} />
          <PrescriptionHistory isLoading={isPrescritionLoading} prescription={prescription} />
          <TestHistory isLoading={isTestLoading} tests={tests} />
          <XrayHistory isLoading={isXrayLoading} tests={xrays} />
        </Paper>
      </div>
    </>
  );
}

export default PatientHistory;
