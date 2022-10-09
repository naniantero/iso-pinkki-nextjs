import React from 'react';
import { toast, ToastPosition } from 'react-toastify';
import { TranslatedText } from '../components/Typography/hocs/TranslatedText';

const TOAST_BASE_CONFIG = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

class ToastModel {
  getHookMessage = (id: string, isError?: boolean) => {
    const type = isError ? 'error' : 'success';
    return `messages.${type}.hooks.${id}`;
  };

  /**
   * Shows an error toast with a message
   */
  showError = (msg: string, values?: any) => {
    toast.error(
      <TranslatedText text={msg} translateValues={values} />,
      TOAST_BASE_CONFIG
    );
  };

  /**
   * Shows a success toast with a message
   */
  showSuccess = (msg: string, values?: any) => {
    toast.success(
      <TranslatedText text={msg} translateValues={values} />,
      TOAST_BASE_CONFIG
    );
  };
}

const ToastService = new ToastModel();

export default ToastService;
