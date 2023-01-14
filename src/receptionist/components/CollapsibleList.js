/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { sendQueue } from '../../utils/api';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import DropdownButton from '../../common-components/DropdownButton';
import setAuthToken from '../../utils/setAuthToken';
import { Typography, Divider } from '@material-ui/core';
import { useCurrentUser } from '../../utils/hooks';

// const user = JSON.parse(localStorage.getItem('user'));

const CustomizedListItem = ({ patient, doctorsList }) => {
  const user = useCurrentUser();

  const [open, setOpen] = useState(false);
  const [staffName, setStaffName] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const doctorNames = doctorsList.map((doctor) => doctor.fullName);
  // eslint-disable-next-line no-unused-vars
  const arr = () => doctorNames.map((i) => false);

  const handleDoctorChoice = (event) => {
    setStaffName(event.target.value);
  };

  const getSelectedDoctorInfo = (name, doctorsList) => {
    return doctorsList.find((doctor) => doctor.fullName === name);
  };

  const handleSendToDoctor = async (event, patientId) => {
    event.preventDefault();
    setIsSending(true);
    const doctor = getSelectedDoctorInfo(staffName, doctorsList);
    const toStaffId = doctor.uuid;
    const requestData = { patientId, toStaffId };
    console.log(requestData);
    if (user) {
      setAuthToken(user.token);
    }

    try {
      await sendQueue(requestData);
      setIsSending(false);
      toast.success('Patient succesfully sent to doctor');
    } catch (error) {
      setIsSending(false);
      toast.error(error.message);
    }
  };
  const dob = new Date(patient.dob).toDateString();

  return (
    <form onSubmit={() => handleSendToDoctor(event, patient.uuid)}>
      <ListItem button key={patient.id} onClick={handleClick}>
        <ListItemText primary={<Typography variant="h5">{patient.name}</Typography>} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="li" disablePadding key={patient.id}>
          <ListItem button>
            <ListItemIcon>{<FolderSharedIcon />}</ListItemIcon>
            <ListItemText primary="Email" secondary={patient.email} />
            <ListItemText primary="ID" secondary={patient.id} />
            <ListItemText primary="Date of birth" secondary={dob} />
            <ListItemText primary="Phone number" secondary={patient.phoneNumber} />
          </ListItem>
        </List>
        <div className="w-full flex flex-row space-x-6 justify-start mt-3 mb-3">
          <div className="w-1/2">
            <DropdownButton
              choice={staffName}
              menuItems={doctorNames}
              onChange={handleDoctorChoice}
            />
          </div>
          <IntuitiveButton text="send to doctor" isLoading={isSending} />
        </div>
      </Collapse>
    </form>
  );
};

export default function CollapsibleList({ patientsList, doctorsList, doctorNames }) {
  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {patientsList &&
          patientsList.map((patient, index) => {
            return (
              <>
                <CustomizedListItem
                  key={patient.id}
                  patient={patient}
                  doctorsList={doctorsList}
                  doctorNames={doctorNames}
                />
                {index === patientsList.length - 1 ? null : (
                  <Divider orientation="horizontal" variant="fullWidth" />
                )}
              </>
            );
          })}
      </List>
    </div>
  );
}
