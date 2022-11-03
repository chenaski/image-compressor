import React from 'react';

export const Icon: React.FC<{ hideParts: boolean }> = ({ hideParts }) => {
  return (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M56.5417 3.875H10.4583C6.82246 3.875 3.875 6.82246 3.875 10.4583V56.5417C3.875 60.1775 6.82246 63.125 10.4583 63.125H56.5417C60.1775 63.125 63.125 60.1775 63.125 56.5417V10.4583C63.125 6.82246 60.1775 3.875 56.5417 3.875Z"
        stroke="black"
        strokeWidth="6.58333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!hideParts && (
        <>
          <path
            d="M21.9791 26.9165C24.706 26.9165 26.9166 24.7059 26.9166 21.979C26.9166 19.2521 24.706 17.0415 21.9791 17.0415C19.2522 17.0415 17.0416 19.2521 17.0416 21.979C17.0416 24.7059 19.2522 26.9165 21.9791 26.9165Z"
            stroke="black"
            strokeWidth="6.58333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M63.125 43.3748L46.6667 26.9165L10.4584 63.1248"
            stroke="black"
            strokeWidth="6.58333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};
