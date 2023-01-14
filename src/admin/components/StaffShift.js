/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { AlarmAdd } from '@mui/icons-material';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import setAuthToken from '../../utils/setAuthToken';
import { setStaffShiftHours } from '../../utils/api';

function StaffShift({ user, selectedStaff, getStaff, name }) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [staffClock, setStaffClock] = useState({
    clockIn: selectedStaff.clockIn ? selectedStaff.clockIn : '09:00',
    clockOut: selectedStaff.clockOut ? selectedStaff.clockOut : '00:00',
    id: selectedStaff.uuid
  });
  const { clockIn, clockOut, id } = staffClock;
  const handleStaffClockChange = (e) => {
    setStaffClock((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const setStaffTimes = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const uuid = selectedWorker.uuid;
    const requestData = { clockIn, clockOut, id };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await setStaffShiftHours(requestData);
      setIsLoading(false);
      setOpen(false);
      toast.success(data.message);
      getStaff();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton className="outline-none" onClick={handleClickOpen}>
        <AlarmAdd />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={setStaffTimes} className="w-full">
          <DialogTitle>Set {`${name}'s`} clock in and clock out hours </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: 5 }}>Edit details below</DialogContentText>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="clockIn" className="font-semibold">
                  Clock In:
                </label>
                <input
                  className="p-2 text-lg"
                  type="time"
                  name="clockIn"
                  defaultValue={clockIn}
                  required
                  onChange={handleStaffClockChange}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="clockOut" className="font-semibold">
                  Clock Out:
                </label>
                <input
                  className="p-2 text-lg"
                  type="time"
                  name="clockOut"
                  defaultValue={clockOut}
                  required
                  onChange={handleStaffClockChange}
                />
              </div>
              <div className="w-full">
                <IntuitiveButton text="Set shift" isLoading={isLoading} />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{
                width: '30%',
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: '#888888',
                color: '#000',
                justifySelf: 'self-end'
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default StaffShift;
