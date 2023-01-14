/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import setAuthToken from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import { updatePatientBiodata } from '../../utils/api';
import useForm from '../../utils/formValidations/useForm';

function EditBiodataForm({ formInputDetails, info, handleNotEditing, isEditing, handleIsEditing, user, getBiodata, patientId }) {
  const [dateType, setDateType] = useState("text");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePatientBio = async () => {
    setIsLoading(true);

    if (user) {
      setAuthToken(user.token);
    }
    try {
      const requestData = {age, occupation, sex, address, genotype, bloodGroup }
      const patient_id = patientId
      const { data } = await updatePatientBiodata(patient_id, requestData);
      setIsLoading(false);
      getBiodata();
      handleNotEditing()
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }}

    const { handleChange, values, handleSubmit } = useForm(handleUpdatePatientBio);

    const { age, occupation, sex, address, genotype, bloodGroup } = values;

  return (
    <>
      <Button className="mb-4" onClick={handleIsEditing} variant="outlined">
        Edit
      </Button>
      <div>
        <Dialog open={isEditing} onClose={handleNotEditing} fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Edit patient biodata</DialogTitle>
            <DialogContent>
              <div className="flex flex-col p-5 space-y-4">
                {formInputDetails.map((detail) => {
                  const { name, id, label, isSelectInput, options } = detail;
                  return (
                    <div key={id} className="">
                      {isSelectInput ? (
                        <>
                          <TextField
                            required
                            fullWidth
                            defaultValue={info[name]}
                            onChange={handleChange}
                            select
                            options={options}
                            label={label}
                            name={name}
                            id={name}
                            type="text"
                            variant="outlined"
                          >
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.title}
                              </MenuItem>
                            ))}
                          </TextField>
                        </>
                      ) : (
                        <>
                          <TextField
                            required
                            fullWidth
                            defaultValue={info[name]}
                            onChange={handleChange}
                            label={label}
                            name={name}
                            id={name}
                            type="text"
                            variant="outlined"
                          />

                        </>
                      )}

                    </div>
                  );

                })}
                <input
                  name="registration"
                  placeholder="date of registration"
                  type={dateType}
                  onFocus={() => setDateType("date")}
                  onBlur={() => setDateType("text")}
                  defaultValue={info["registration"]}
                  id="registration"
                  max={new Date().toISOString().substring(0, 10)}
                  onChange={handleChange}
                  required
                  className="p-3 py-4 border border-solid border-['#666666']"
                />
                <div className="w-full">
                  <IntuitiveButton text="Edit"  disabled={isLoading}/>
                </div>
              </div>
              <DialogActions>
                <div className="flex mt-6 flex-1 flex-row space-x-3 justify-end">
                  <div className="w-1/4">
                    <Button
                      onClick={handleNotEditing}
                      variant="contained"
                      style={{
                        width: '100%',
                        padding: 12,
                        backgroundColor: '#888888',
                        color: '#000',
                        justifySelf: 'self-end'
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default EditBiodataForm;
