import React from 'react';
import TopBar from '../../Components/TopBar/TopBar';
import Banner from '../../Components/Banner/Banner';


const Buzz = () => {
  const bannerText = 'Creating Buzz around you never been so easy..'
  return (
    <div>
      <TopBar />
      <Banner>{bannerText}</Banner>
    </div>
  );
}

export default Buzz;