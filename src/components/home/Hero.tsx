
import React from 'react';
import { Link } from 'react-router-dom';
import CalculatorHeader from './CalculatorHeader';
import CalculatorForm from './CalculatorForm';
import DesktopDashboard from './DesktopDashboard';
import MobileDashboard from './MobileDashboard';

interface HeroProps {
  showFullView?: boolean;
}

const Hero: React.FC<HeroProps> = ({ showFullView = false }) => {
  // Only render the calculator example section
  return (
    <div className={`${showFullView ? "" : "aspect-video"} bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden`}>
      <div className="w-full h-full p-3 md:p-8 flex flex-col">
        <CalculatorHeader showFullView={showFullView} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 flex-grow">
          <CalculatorForm />
          <DesktopDashboard />
          <MobileDashboard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
