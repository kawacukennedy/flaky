import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeToast, Toast } from '../../app/slices/toastSlice';

const GlobalToast: React.FC = () => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration || 3000); // Default to 3 seconds

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'info':
        return 'bg-info text-white';
      default:
        return 'bg-muted text-white';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-md shadow-md flex items-center justify-between ${getToastStyles(toast.type)}`}
          role="alert"
        >
          <span>{toast.message}</span>
          <button
            onClick={() => dispatch(removeToast(toast.id))}
            className="ml-4 text-white opacity-75 hover:opacity-100"
            aria-label="Close toast"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default GlobalToast;
