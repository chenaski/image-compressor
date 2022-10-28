import React from 'react';

export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g className={'origin-center animate-[spinner_0.75s_step-end_infinite]'}>
        <rect x="11" y="1" width="2" height="5" opacity=".14"></rect>
        <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29"></rect>
        <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43"></rect>
        <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57"></rect>
        <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71"></rect>
        <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86"></rect>
        <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)"></rect>
      </g>
    </svg>
  );
};
