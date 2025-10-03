import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { clearToast } from '../../app/slices/toastSlice';
import { Transition } from '@headlessui/react'; // Assuming @headlessui/react is available for transitions

const GlobalToast: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type, id } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 5000); // Toast disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message, dispatch, id]); // Added id to dependency array to re-trigger effect on new toast with same message

  const getToastClasses = () => {
    let baseClasses = 'fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white z-50';
    switch (type) {
      case 'success':
        return `${baseClasses} bg-success`;
      case 'error':
        return `${baseClasses} bg-danger`;
      case 'info':
        return `${baseClasses} bg-info`;
      case 'warning':
        return `${baseClasses} bg-warning`;
      default:
        return baseClasses;
    }
  };

  return (
    <Transition
      show={!!message}
      as={React.Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-2 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-2 scale-95"
    >
      {message && (
        <div className={getToastClasses()} role="alert" aria-live="assertive" aria-atomic="true">
          <p>{message}</p>
          <button
            onClick={() => dispatch(clearToast())}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close toast"
          >
            &times;
          </button>
        </div>
      )}
    </Transition>
  );
};

export default GlobalToast;
