import React from 'react';
import PageWrapper from '@/components/Layout/PageWrapper';
import MasonryImageList from '@/components/Lists/MasonryImageList';
// import HeroSection from '@/components/HeroSection';

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <MasonryImageList />
    </PageWrapper>
  );
};

export default HomePage;
