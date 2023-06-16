import { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface Props {
  onClose: () => void;
  show: boolean;
  message: string;
  type?: 'error' | 'success';
}

const BG = {
  error: 'danger',
  success: 'light',
};

const ToastComponent: FC<Props> = ({ onClose, show, message, type }) => {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
      <Toast
        bg={type ? BG[type] : 'Light'}
        onClose={onClose}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
