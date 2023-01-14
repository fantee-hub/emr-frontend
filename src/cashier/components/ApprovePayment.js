/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import DropdownButton from '../../common-components/DropdownButton';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { approvePayment } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function ApprovePayment({ user, amount, sessionId, patientId, cashierId }) {
  // eslint-disable-next-line no-unused-vars
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const approvePaymentByCashier = async () => {
    setIsSending(true);
    const requestData = { amount, sessionId, patientId, cashierId };
    if (user) {
      setAuthToken(user.token);
    }

    try {
      const { data } = await approvePayment(requestData);
      setIsSending(false);
      console.log(data);
      toast.success('Payment approved succesfully');
      navigate(`/cashier`)
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
