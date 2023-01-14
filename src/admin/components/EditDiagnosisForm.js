/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import setAuthToken from '../../utils/setAuthToken';
import { updateDiagnosisItem } from '../../utils/api';
import EditForm from './EditForm';

export default function EditDiagnosisForm({ selectedItem, setRows, rows, user }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    name: selectedItem.name,
    id: selectedItem.id
  });
  const { name, id } = inputData;
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

  // add changes made to the table
  const updatedDiagnosisList = (id, inputData) => {
    setRows(rows.map((row) => (row.id === id ? inputData : row)));
  };

  const handleUpdateDiagnosis = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const id = selectedItem.id;
    // const DiagnosisFormData = { id, name };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updateDiagnosisItem(inputData);
      updatedDiagnosisList(id, inputData);
      setIsLoading(false);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const formDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Diagnosis',
      defaultValue: name
    }
  ];

  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdateDiagnosis}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="Diagnosis"
        btnText=""
      />
    </div>
  );
}
