import React from 'react';

interface LoaderProps {
  message: string;
}

const FuturisticLoaderIcon: React.FC = () => (
    <svg className="w-24 h-24 text-primary-color" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'var(--accent-color)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'var(--primary-color)', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M50 2.5A47.5 47.5 0 0 1 97.5 50" stroke="url(#grad1)" strokeWidth="5" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M50 97.5A47.5 47.5 0 0 1 2.5 50" stroke="var(--primary-color)" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="35" stroke="var(--primary-color)" strokeOpacity="0.5" strokeWidth="2">
            <animate attributeName="r" from="35" to="40" dur="1.5s" repeatCount="indefinite" begin="0s" values="35;40;35" keyTimes="0;0.5;1"/>
            <animate attributeName="stroke-opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" begin="0s" values="0.5;0;0.5" keyTimes="0;0.5;1"/>
        </circle>
        <circle cx="50" cy="50" r="25" stroke="var(--accent-color)" strokeOpacity="0.8" strokeWidth="1">
             <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="2s" repeatCount="indefinite" />
        </circle>
    </svg>
);


const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-bg-color/80 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
      <FuturisticLoaderIcon />
      <p className="mt-8 text-xl text-primary-color font-bold tracking-wider text-center px-4">{message}</p>
    </div>
  );
};

export default Loader;
