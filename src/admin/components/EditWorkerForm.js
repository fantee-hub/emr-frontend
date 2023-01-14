/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updateStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import EditForm from './EditForm';

export default function EditWorkerForm({ selectedWorker, getStaff, user }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    fullName: selectedWorker.fullName,
    username: selectedWorker.username,
    role: selectedWorker.role,
    staff_id: selectedWorker.staff_id
    // TODO change uuid to staff_id and remove this updatedStaff function
  });
  const { fullName, username, role, staff_id } = inputData;
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


  const handleUpdateStaffDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updateStaff(inputData, staff_id);
      getStaff()
      setIsLoading(false);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  const formDetails = [
    {
      name: 'fullName',
      id: 'fullname',
      label: 'Name',
      defaultValue: fullName
    },
    {
      name: 'username',
      id: 'username',
      label: 'Username',
      defaultValue: username
    },
    {
      name: 'role',
      id: 'role',
      label: 'Role',
      defaultValue: role
    }
  ];
  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdateStaffDetails}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="staff"
        btnText="staff"
      />
    </div>
  );
}
