import React from 'react';

import LandingHeader from '@/components/pages/landing/components/LandingHeader';
import LandingMain from '@/components/pages/landing/components/LandingMain';
import LandingTarifs from '@/components/pages/landing/components/LandingTarifs';
import SectionFeatures from '@/components/pages/landing/components/SectionFeatures';
import SectionOverview from '@/components/pages/landing/components/SectionOverview';
import SectionWhy from '@/components/pages/landing/components/SectionWhy';
import Tops from '@/components/pages/landing/components/Tops';

function LandingPage() {
  return (
    <div className='w-screen'>
      <LandingHeader />
      <LandingMain />
      <SectionOverview />
      <SectionWhy />
      <SectionFeatures />
      <Tops />
      <LandingTarifs />
    </div>
  );
}

export default LandingPage;
