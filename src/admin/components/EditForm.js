/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function EditForm({
  open,
  handleClickOpen,
  handleClose,
  onSubmit,
  handleChange,
  formDetails,
  isLoading,
  titleText,
  btnText
}) {
  const [dateType, setDateType] = useState("text");

  return (
    <>
      <IconButton className="outline-none" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={onSubmit} className="w-full p-4">
          <DialogTitle>Edit {titleText}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: 5 }}>Edit details below</DialogContentText>
            <div className="flex flex-col space-y-4">
              {formDetails.map((detail, key) => {
                const { isDateInput } = detail;

                return (
                  <>

                    {!isDateInput ? (<>
                      <TextField
                        key={key}
                        name={detail.name}
                        id={detail.id}
                        label={detail.label}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        defaultValue={detail.defaultValue}
                        multiline={true}
                        rows={2}
                      />
                    </>) :
                      <input
                        name={detail.name}
                        id={detail.id} 
                        placeholder={detail.placeholder}
                        type={dateType}
                        onFocus={() => setDateType("date")}
                        onBlur={() => setDateType("text")}
                        max={new Date().toISOString().substring(0, 10)}
                        defaultValue={detail.defaultValue}
                        onChange={handleChange}
                        required
                        className="p-3 text-base w-full"
                      />
                    }
                  </>

                );
              })}
              <div className="w-full">
                <IntuitiveButton text={`Edit ${btnText}`} isLoading={isLoading} />
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
            // className="pt-2 pb-2 pl-4 pr-4 mt-1 bg-green-500 text-[#000] self-end"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditForm;
