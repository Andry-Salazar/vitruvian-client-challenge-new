import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from '../app/store';
import ToastComponent from '../components/ToastComponent';
import { useState } from 'react';
import { ToastContext } from '../context';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');

  return (
    <Provider store={store}>
      <ToastContext.Provider
        value={(opt: { msg: string; type?: 'error' | 'success' }) => {
          setShow(true);
          setMsg(opt.msg);
          setType(opt.type ?? '');
        }}
      >
        <Component {...pageProps} />
        <ToastComponent
          onClose={() => setShow(false)}
          show={show}
          message={msg}
          type={type}
        />
      </ToastContext.Provider>
    </Provider>
  );
}
