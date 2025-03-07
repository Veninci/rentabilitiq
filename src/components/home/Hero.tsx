
import React from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorForm from './CalculatorForm';
import DesktopDashboard from './DesktopDashboard';
import MobileDashboard from './MobileDashboard';

interface HeroProps {
  showFullView?: boolean;
}

const Hero: React.FC<HeroProps> = ({ showFullView = false }) => {
  return (
    <div className={`${showFullView ? "" : "aspect-video"} bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-100/50 backdrop-blur-xl`}>
      <div className="w-full h-full p-3 md:p-8 flex flex-col">
        <CalculatorHeader showFullView={showFullView} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 flex-grow animate-scale-in">
          <CalculatorForm />
          <DesktopDashboard />
          <MobileDashboard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
