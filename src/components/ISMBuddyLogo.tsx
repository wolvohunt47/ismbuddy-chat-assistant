import React from 'react';
interface ISMBuddyLogoProps {
  size?: 'sm' | 'md' | 'lg';
}
const ISMBuddyLogo: React.FC<ISMBuddyLogoProps> = ({
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  return <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-ism-gold`}>
        {/* Simplified version of IIT ISM Dhanbad logo */}
        <div className="w-full h-full bg-ism-blue flex items-center justify-center text-white font-bold">
          <span className="text-xs">IIT</span>
        </div>
      </div>
      <div className="font-bold">
        <span className="text-ism-gold">IIT</span>
        <span className="font-extrabold text-zinc-950">BUDDY</span>
      </div>
    </div>;
};
export default ISMBuddyLogo;