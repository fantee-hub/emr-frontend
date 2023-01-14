import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import Nav from '../../common-components/Nav';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import { useCurrentUser } from '../../utils/hooks';
import setAuthToken from '../../utils/setAuthToken';
import { getApprovedPayments } from '../../utils/api';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

function XrayHome() {
  const user = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const loadApprovedPayments = async () => {
    setIsLoading(true);

    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getApprovedPayments();
      setIsLoading(false);
      if (data) {
        setPayments(data);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('an error occured');
    }
  };
  useEffect(() => {
    loadApprovedPayments();
  }, []);
  return (
    <>
      {/* <Nav /> */}
      <div className="p-8">
        <h1>x-ray Home</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">X-ray staff</p>
          </div>
          <h2 className="text-xl">Segun Miller </h2>
        </div>
        <section>
          <Paper sx={{ width: '70vw' }} className="p-4">
            <h3>Incoming approved payments</h3>
            <ol>
              {isLoading ? (
                <CircularProgress size={30} />
              ) : !payments.length ? (
                <p className="text-lg pl-3 mb-3 text-red-500">
                  There are no incoming approved payments.
                </p>
              ) : (
                payments &&
                payments.map((payment, key) => {
                  const { patientId, patient, sessionId } = payment;
                  return (
                    <li key={key}>
                      <Link
                        to={`/xray-tests/${patientId}/${sessionId}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {patient.name}
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

export default XrayHome;
