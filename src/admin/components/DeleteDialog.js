/* eslint-disable react/prop-types */
import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import authHeader from '../../redux/features/auth/authHeader';
import { DialogContent, DialogContentText } from '@material-ui/core';

export default function DeleteDialog({ id, getUpdatedList, item, role }) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const deletedItem = (id, rows) => {
  //   if (role === 'patient' || role === 'staff') {
  //     const filteredRows = rows.filter((row) => row.uuid !== id);
  //     setRows(filteredRows);
  //   } else if (role === 'inventory' || role === 'diagnosis' || role === 'symptoms') {
  //     const filteredRows = rows.filter((row) => row.id !== id);
  //     setRows(filteredRows);
  //   }
  // };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios({
        method: 'delete',
        // url: `https://emr-server.herokuapp.com/${role}/${id}`,
        url: `${process.env.REACT_APP_BASEURL}/${role}/${id}`,
        headers: authHeader()
      }).then((response) => {
        toast.success(response.data.data);
        getUpdatedList()
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form className="w-full p-4" onSubmit={handleDelete}>
          <DialogTitle>{`Are you sure you want to delete "${item}"?`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently remove the details from the system and cannot be reversed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Button
                sx={{ mr: 3 }}
                onClick={handleClose}
                variant="contained"
                style={{
                  width: '50%',
                  padding: 12,
                  backgroundColor: '#888888',
                  color: '#000'
                }}
              >
                Cancel
              </Button>
              <div className="w-1/2">
                <IntuitiveButton isBackgroundRed={true} text="Yes" isLoading={isLoading} />
              </div>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
