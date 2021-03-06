import React from 'react';

import './TextButton.scss';

export const TextButton: React.FC<{
  disabled?: boolean;
  onClick?: () => void;
}> = ({ disabled, onClick, children }) => {
  return (
    <button
      className="CSVImporter_TextButton"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
