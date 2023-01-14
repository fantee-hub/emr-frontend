/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Divider } from '@material-ui/core';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { addNewTest } from '../../utils/api';
import TransformButton from '../../common-components/TransformButton';
import { useCurrentUser } from '../../utils/hooks';

// const drugs = JSON.parse(localStorage.getItem('drugsList'));
// const user = JSON.parse(localStorage.getItem('user'));

function LabTestForm({ test, handleChange, inputData, sessionId, testsList }) {
  const user = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { description } = inputData;

  const getSelectedTestInfo = (title, list) => {
    return list.find((test) => test.name === title);
  };

  const onSubmitTestForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const title = test;
    const testInfo = getSelectedTestInfo(test, testsList)
    console.log(testInfo);
    const drugId = testInfo.id;
    const requestBody = { description, sessionId, title, drugId };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      await addNewTest(requestBody);
      setIsLoading(false);
      setIsSuccessful(true);
    } catch (error) {
      toast.error(error.messsage);
      setIsLoading(false);
      setIsSuccessful(false);
    }
  };

  return (
    <form onSubmit={onSubmitTestForm}>
      <li className="flex flex-row justify-evenly mt-2 mb-2">
        <input type="text" name="title" readOnly value={test} disabled={false} />
        <input
          type="text"
          disabled={isSuccessful}
          name="description"
          onChange={handleChange}
          placeholder="description"
        />
        <TransformButton btnText="Add test" isSuccessful={isSuccessful} isLoading={isLoading} />
      </li>
    </form>
  );
}

function LabTest({ sessionId, testsList }) {
  const [testChoice, setTestChoice] = useState([]);
  const [testInputData, setTestInputData] = useState({
    title: '',
    description: ''
  });

  const handleTestFormChange = (e) => {
    setTestInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleTestChoice = (event) => {
    if (event.target.checked && !testChoice.length) {
      setTestChoice([event.target.value]);

      // setTestInputData((prevState) => ({
      //   ...prevState,
      //   title: event.target.value
      // }));
    } else if (event.target.checked && testChoice.length > 0) {
      setTestChoice([...testChoice, event.target.value]);
      // setTestInputData((prevState) => ({
      //   ...prevState,
      //   title: event.target.value
      // }));
    }
    // remove choice from list when you uncheck its checkbox
    if (!event.target.checked) {
      const filterdArr = testChoice.filter((c) => c !== event.target.value);
      setTestChoice([...filterdArr]);
    }
  };

  return (
    <div className="mt-3 ring-2 ring-stone-300 p-4">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Tests</h3>
        <DropdownSearch
          btnText="Add tests"
          menuItems={testsList}
          handleCheckboxChange={handleTestChoice}
        />
      </div>
      <div>
        {testChoice && testChoice.length ? (
          <div>
            {testChoice &&
              testChoice.map((c, index) => {
                return (
                  <>
                    <LabTestForm
                      key={c}
                      test={c}
                      handleChange={handleTestFormChange}
                      inputData={testInputData}
                      sessionId={sessionId}
                      testsList={testsList}
                    />
                    {index === testChoice.length - 1 ? null : (
                      <Divider orientation="horizontal" variant="fullWidth" />
                    )}
                  </>
                );
              })}
          </div>
        ) : (
          <p className="text-lg mb-3 text-red-500">Select from tests options above</p>
        )}
      </div>
    </div>
  );
}

export default LabTest;
