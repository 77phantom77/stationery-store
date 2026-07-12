import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const CallWidget = () => {
  const { settings } = useAppContext();

  return (
    <a href={`tel:${settings.phone}`} className="floating-call-widget" title="Позвонить нам">
      <FiPhoneCall className="call-icon" />
    </a>
  );
};

export default CallWidget;
