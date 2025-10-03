import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { clearToast } from '../../app/slices/toastSlice';

const GlobalToast: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type, id } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 5000); // Auto-clear after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message, dispatch, id]);

  if (!message) return null;

  let bgColorClass = 'bg-info';
  let textColorClass = 'text-white';

  switch (type) {
    case 'success':
      bgColorClass = 'bg-success';
      break;
    case 'error':
      bgColorClass = 'bg-danger';
      break;
    case 'warning':
      bgColorClass = 'bg-warning';
      break;
    case 'info':
    default:
      bgColorClass = 'bg-info';
      break;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-md flex items-center justify-between space-x-4 ${bgColorClass} ${textColorClass}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => dispatch(clearToast())}
        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Close toast"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default GlobalToast;