import React from 'react';
import { useNavigate } from 'react-router';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useCurrentUser } from '../utils/hooks';

function Unauthorized() {
  const user = useCurrentUser();

  if (!user) return (window.location.href = '/');

  const navigate = useNavigate();

  const GoBack = () => navigate(-1);
  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className=" flex flex-col space-y-2 justify-center text-center">
        <div className="">
          <p className="text-4xl font-bold">401: Unauthorized</p>
          <p className="text-2xl font-semibold">
            Ooops! Looks like you are not authorized to access this page.
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <button
            className="w-1/4 py-3 px-4 border-0 rounded-md flex flex-row items-center justify-center space-x-2 text-base cursor-pointer bg-green-500 hover:bg-green-600"
            onClick={GoBack}
          >
            {' '}
            <MdArrowBackIosNew /> <span>Go Back</span>{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
