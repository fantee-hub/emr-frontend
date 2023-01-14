/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Paper from '@material-ui/core/Paper';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { useCurrentUser } from '../../utils/hooks';
import setAuthToken from '../../utils/setAuthToken';
import { addPatientBiodata, getPatientBiodata } from '../../utils/api';
import useForm from '../../utils/formValidations/useForm';
import BiodataForm from '../components/BiodataForm';
import BiodataDetails from '../components/BiodataDetails';
import EditBiodataForm from '../components/EditBiodataForm';

const formInputDetails = [
  {
    name: 'age',
    id: 'age',
    label: 'Age',
    isSelectInput: false,
    defaultValue: '',
    options: []
  },
  {
    name: 'occupation',
    id: 'occupation',
    label: 'Occupation',
    isSelectInput: false,
    defaultValue: '',
    options: []
  },
  {
    name: 'sex',
    id: 'sex',
    label: 'Sex',
    isSelectInput: true,
    options: [
      {
        title: 'Select an option',
        value: 'Select an option'
      },
      {
        title: 'M',
        value: 'M'
      },
      {
        title: 'F',
        value: 'F'
      }
    ]
  },
  {
    name: 'address',
    id: 'address',
    label: 'Address',
    isSelectInput: false,
    defaultValue: '',
    options: []
  },
  {
    name: 'genotype',
    id: 'genotype',
    label: 'Genotype',
    isSelectInput: true,
    options: [
      {
        title: 'Select an option',
        value: 'Select an option'
      },
      {
        title: 'AA',
        value: 'AA'
      },
      {
        title: 'AS',
        value: 'AS'
      },
      {
        title: 'AC',
        value: 'AC'
      },
      {
        title: 'SS',
        value: 'SS'
      },
      {
        title: 'SC',
        value: 'SC'
      }
    ]
  },
  {
    name: 'bloodGroup',
    id: 'bloodGroup',
    label: 'Blood Group',
    isSelectInput: true,
    options: [
      {
        title: 'Select an option',
        value: 'Select an option'
      },
      {
        title: 'A+',
        value: 'A+'
      },
      {
        title: 'A-',
        value: 'A-'
      },
      {
        title: 'B+',
        value: 'B+'
      },
      {
        title: 'B-',
        value: 'B-'
      },
      {
        title: 'O+',
        value: 'O+'
      },
      {
        title: 'O-',
        value: 'O-'
      },
      {
        title: 'AB+',
        value: 'AB+'
      },
      {
        title: 'AB-',
        value: 'AB-'
      }
    ]
  }
];

function PatientDetails() {
  const { id, name } = useParams();
  const user = useCurrentUser();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(null);

  const patientId = id;

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleNotEditing = () => {
    setIsEditing(false);
  };

  const addBiodata = async () => {
    setIsAdding(true);
    const biodata = { age, sex, address, genotype, bloodGroup, occupation, registration, patient_id: patientId };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await addPatientBiodata(biodata);
      setIsAdding(false);
      toast.success(data.message);
      getBiodata();
    } catch (error) {
      setIsAdding(false);
      console.log(error)
      toast.error(error.message);
    }
  };

  const getBiodata = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getPatientBiodata(patientId);
      setIsLoading(false);
      setInfo(data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      // toast.error('an error occured');
    }
  };
console.log(info)
  useEffect(() => {
    getBiodata();
  }, []);

  const { handleChange, values, handleSubmit } = useForm(addBiodata);

  const { age, sex, address, genotype, bloodGroup, occupation, registration } = values;

  return (
    <div className="p-6">
      <p className="text-xl font-bold mb-3">Patient Biodata Details</p>
      <p className="text-lg mb-1">Patient ID: {id}</p>
      <p className="text-lg mb-3">Patient Name: {name}</p>
      {info ? (
        <EditBiodataForm
          info={info}
          formInputDetails={formInputDetails}
          handleIsEditing={handleIsEditing}
          isEditing={isEditing}
          handleNotEditing={handleNotEditing}
          user={user}
          patientId={patientId}
          getBiodata={getBiodata}
        />
      ) : null}

      <Paper style={{ padding: 35 }}>
        {!info ? (
          <BiodataForm
            handleSubmit={handleSubmit}
            formInputDetails={formInputDetails}
            handleChange={handleChange}
          />
        ) : (
          <>
            <BiodataDetails info={info} />
          </>
        )}
      </Paper>
    </div>
  );
}
export default PatientDetails;
