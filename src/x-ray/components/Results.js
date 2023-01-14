import { Paper } from '@material-ui/core';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useCurrentUser } from '../../utils/hooks';
import setAuthToken from '../../utils/setAuthToken';
import TestResultForm from '../../common-components/TestResultForm';
import { addLabTestResult } from '../../utils/api';

// eslint-disable-next-line react/prop-types
function Results({ role, testId, title, description }) {
  const user = useCurrentUser();

  const [resultValue, setResultValue] = useState({
    result: '',
    resultDescription: ''
  });
  const { result, resultDescription } = resultValue;

  const [isAddingTest, setIsAddingTest] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setResultValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  // pass title and description as params in the submit function

  const addTestResult = async () => {
    setIsAddingTest(true);
    const id = testId;
    const requestData = { id, title, description, result, resultDescription };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await addLabTestResult(requestData);
      setIsAddingTest(false);
      if (data) {
        toast.success('Result added successfully');
      }
      navigate(`/${role}-tests/${testId}`);
    } catch (error) {
      setIsAddingTest(false);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Paper className="flex flex-col items-center flex-1 p-3 mt-5">
        <h3>{role} Test Results</h3>
        <p>
          {title}: {description}
        </p>
        <TestResultForm
          isLoading={isAddingTest}
          handleChange={handleChange}
          handleSubmit={addTestResult}
          role={role}
        />
      </Paper>
    </div>
  );
}

export default Results;
