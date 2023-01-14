/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import EditForm from './EditForm';
import { toast } from 'react-toastify';
import { updatePatient } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

export default function EditWorkerForm({ selectedPatient, user, getPatients }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    name: selectedPatient.name,
    email: selectedPatient.email,
    phoneNumber: selectedPatient.phoneNumber,
    dob: selectedPatient.dob,
    patient_id: selectedPatient.patient_id,
    PID: selectedPatient.PID
  });
  const { name, email, phoneNumber, dob, PID, patient_id } = inputData;
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add changes made to the patient table
  // const updatedPatient = (id, inputData) => {
  //   setRows(rows.map((row) => (row.patient_id === id ? inputData : row)));
  // };

  const handleUpdatePatientDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const patient_id = selectedPatient.patient_id;
    // const patientFormData = { name, email, phoneNumber, dob, patient_id };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updatePatient(inputData, patient_id);
      // updatedPatient(patient_id, inputData);
      setIsLoading(false);
      setOpen(false);
      getPatients();
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const formDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'FullName',
      defaultValue: name,
      isDateInput: false
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email',
      defaultValue: email,
      isDateInput: false

    },
    {
      name: 'phoneNumber',
      id: 'phoneNumber',
      label: 'Phone No.',
      defaultValue: phoneNumber,
      isDateInput: false

    },
    {
      name: 'dob',
      id: 'dob',
      placeholder: 'Date of birth',
      defaultValue: new Date(dob).toDateString(),
      isDateInput: true

    },
    {
      name: 'PID',
      id: 'PID',
      defaultValue: PID,
      label: 'Patient ID',

    }
  ];

  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdatePatientDetails}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="patient"
        btnText="patient"
      />
    </div>
  );
}
