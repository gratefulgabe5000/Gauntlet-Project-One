/**
 * Toast Container Component
 *
 * PR6.3: Toast Notification System
 *
 * Manages and displays multiple toast notifications
 * Positioned in the top-right corner of the screen
 */

import type { ToastProps } from './Toast';
import Toast from './Toast';

export interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
}

const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-20 right-6 z-[60] flex flex-col items-end"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
