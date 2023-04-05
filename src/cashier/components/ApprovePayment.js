/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import DropdownButton from '../../common-components/DropdownButton';
import IntuitiveButton from '../../common-components/IntuitiveButton';
// import { approvePayment } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import httpService from '../../utils/axios';

function ApprovePayment({ user, amount, labTests }) {
  // eslint-disable-next-line no-unused-vars
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  // console.log(labId);
  // console.log(labTests !== undefined ? labTests : []);

  const approvePaymentUrl = (id) => {
    return `/cashier/approve/payment/${id}`;
  };

  const getLabTestsIds = () => {
    if (labTests) {
      return labTests.map((tests) =>
        httpService.patch(approvePaymentUrl(tests._id), {
          type:
            tests.drugId && tests.drugId.type === 'drug'
              ? 'prescription'
              : !tests.drugId && tests.test.type === 'test'
              ? 'lab'
              : tests.test.type
        })
      );
    }

    return [];
  };

  // console.log(getLabTestsIds());

  const approvePaymentByCashier = async () => {
    setIsSending(true);
    // const type = types === 'drug' ? 'prescription' : types === 'test' ? 'lab' : types;
    // const requestData = { type };
    if (user) {
      setAuthToken(user.token);
    }

    try {
      const { data } = await Promise.all(getLabTestsIds());
      console.log(data);
      // const { data } = await approvePayment(requestData, labId);
      setIsSending(false);
      console.log(data);
      toast.success('Payment approved succesfully');
      navigate(`/cashier`);
    } catch (error) {
      setIsSending(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full mt-3 mb-3">
      <IntuitiveButton
        onClick={approvePaymentByCashier}
        text={`Approve payment of N ${amount}`}
        isLoading={isSending}
      />
    </div>
  );
}

export default ApprovePayment;
