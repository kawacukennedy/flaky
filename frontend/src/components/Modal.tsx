import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ease-standard"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        ref={modalRef}
        className="bg-surface_light dark:bg-surface_dark rounded-lg shadow-lg p-6 w-full max-w-lg transform transition-all duration-150 ease-soft scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        data-state={isOpen ? 'open' : 'closed'}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-text_light dark:text-text_dark">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-text_light dark:hover:text-text_dark">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
