import { createContext } from 'react';

export const ToastContext = createContext(
  (opt: { msg: string; type?: 'error' | 'success' }) => {}
);
