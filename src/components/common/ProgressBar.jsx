import React from 'react';
import { Check } from 'lucide-react';

function ProgressBar({ steps, currentStepIndex }) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                    ${isCompleted || isActive ? 'bg-taiba-blue' : 'bg-gray-300'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                </div>
                <p className={`mt-2 text-xs text-center font-medium ${isActive ? 'text-taiba-blue' : 'text-taiba-gray'}`}>{step}</p>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-1 transition-colors duration-300 mx-2
                    ${isCompleted ? 'bg-taiba-blue' : 'bg-gray-300'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
