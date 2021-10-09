
import React from 'react';
import Banner from '../components/Banner';
import IndexPage from '../components/card';
import Navbar from '../components/navbar';

const index = () => {
  return (
    <div>
      <Banner/>
      <Navbar/>
      <div>
      <IndexPage/>
      </div>
        
    </div>
  )
}

export default index;
