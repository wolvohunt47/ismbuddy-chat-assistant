import React from 'react';
import ISMBuddyLogo from '../components/ISMBuddyLogo';

const LogoPreview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-8">ISMBuddyLogo Component Preview</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Small Size</h2>
            <div className="p-4 border border-gray-200 rounded-md">
              <ISMBuddyLogo size="sm" />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Medium Size (Default)</h2>
            <div className="p-4 border border-gray-200 rounded-md">
              <ISMBuddyLogo />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Large Size</h2>
            <div className="p-4 border border-gray-200 rounded-md">
              <ISMBuddyLogo size="lg" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>The ISMBuddyLogo component consists of a circular logo with "IIT" text inside and "IITBUDDY" text beside it.</p>
        <p>The component accepts a size prop that can be "sm", "md" (default), or "lg".</p>
      </div>
    </div>
  );
};

export default LogoPreview;