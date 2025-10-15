/**
 * useToast Hook
 *
 * PR6.3: Toast Notification System
 *
 * Custom hook for managing toast notifications throughout the app
 * Provides methods to show different types of toasts
 */

import { useCallback, useState } from 'react';
import type { ToastProps, ToastType } from '../components/Toast';

interface UseToastReturn {
  toasts: ToastProps[];
  showToast: (type: ToastType, message: string, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  dismissToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Task 6.3.1: Toast management hook
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  /**
   * Generate unique ID for toast
   */
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Dismiss a specific toast
   */
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Show a toast notification
   */
  const showToast = useCallback(
    (type: ToastType, message: string, duration: number = 5000) => {
      const id = generateId();
      const newToast: ToastProps = {
        id,
        type,
        message,
        duration,
        onDismiss: (toastId: string) => dismissToast(toastId),
      };

      setToasts((prev) => [...prev, newToast]);
    },
    [generateId, dismissToast]
  );

  /**
   * Task 6.3.2: Convenience methods for common toast types
   */
  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      showToast('success', message, duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      showToast('error', message, duration);
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      showToast('warning', message, duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      showToast('info', message, duration);
    },
    [showToast]
  );

  /**
   * Clear all toasts
   */
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    clearAll,
  };
}
