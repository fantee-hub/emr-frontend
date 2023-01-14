import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import { getReceivedQueues } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import { CircularProgress } from '@material-ui/core';

function DoctorPatients() {
  const user = useCurrentUser();

  const { uuid } = useParams();
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const patientsFromDoctor = async () => {
    setIsLoading(true);
    const staffId = uuid;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getReceivedQueues(staffId, 'PENDING');
      setIsLoading(false);
      if (data) {
        const patients = data.rows;
        setPatientsList(patients);
        console.log(patientsList);
      }
    } catch (error) {
      toast.error('an error occured');
    }
  };
  useEffect(() => {
    patientsFromDoctor();
  }, []);
  return (
    <>
      <div className="p-8">
        <h1>Cashier Home</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Cashier</p>
          </div>
          <h2 className="text-xl">{user.user.fullName} </h2>
        </div>

        <section>
          <Paper sx={{ width: '70vw' }} className="p-4">
            <p className="text-xl font-bold">Incoming patients</p>
            <ol>
              {isLoading ? (
                <CircularProgress size={30} />
              ) : !patientsList.length ? (
                <p className="text-lg pl-3 mb-3 text-red-500">
                  No incoming patients for this doctor.
                </p>
              ) : (
                patientsList.map((data, key) => {
                  const { session, Patient } = data;
                  return (
                    <li key={key}>
                      <Link
                        to={`/patient-invoice/${session.id}/${Patient.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {data.Patient.name}
                      </Link>
                    </li>
                  );
                })
              )}
            </ol>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default DoctorPatients;

// 1. get all doctors and their received queues
// 2. see which one has a queue with status in progress and check if they have prescription then display the patient in the queue in a list
// 3. diplay prescription details in cashier invoice
