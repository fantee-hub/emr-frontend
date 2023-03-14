/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import setAuthToken from '../../utils/setAuthToken';
import { updateSymptomItem } from '../../utils/api';
import EditForm from './EditForm';

export default function EditSymptomForm({ selectedItem, setRows, rows, getSymptom, user }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    title: selectedItem.title,
    id: selectedItem._id
  });
  const { title, id } = inputData;
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      title: e.target.value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add changes made to the table
  const updatedSymptomList = (id, inputData) => {
    setRows(rows.map((row) => (row.id === id ? inputData : row)));
  };

  const handleUpdateSymptom = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const id = selectedItem.id;
    // const SymptomFormData = { id, name };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updateSymptomItem(inputData, id);
      console.log(data);
      updatedSymptomList(id, inputData);
      // console.log(rows);
      setIsLoading(false);
      setOpen(false);
      getSymptom();
      toast.success(data.data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const formDetails = [
    {
      name: 'title',
      id: 'title',
      label: 'Symptom',
      defaultValue: title
    }
  ];

  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdateSymptom}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="Symptoms"
        btnText=""
      />
    </div>
  );
}
