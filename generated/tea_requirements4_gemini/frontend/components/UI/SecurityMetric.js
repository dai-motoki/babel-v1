import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const SecurityMetric = ({ title, score, description }) => {
  const color = score >= 75 ? '#006400' : score >= 50 ? '#FFD700' : '#FF4500';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-64 h-64 flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-4">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: '#e0e0e0',
          })}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <LockClosedIcon className={`h-12 w-12 text-${score >= 75 ? 'green-500' : score >= 50 ? 'yellow-500' : 'red-500'}`} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default SecurityMetric;
