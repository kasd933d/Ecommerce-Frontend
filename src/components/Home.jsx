import React from 'react';
import Navbar from './Navbar';
import FirstSection from './FirstSection';
import AboutMe from './Aboutme';
import FAQ from './Faq';
import WhyUs from './WhyUs';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      
      <Navbar />
      <FirstSection />
     
      
      {/* Target IDs for smooth scroll */}
      <div id="about"><AboutMe /></div>
      <div id="why-us"><WhyUs /></div>
      <div id="faq"><FAQ /></div>
       <Footer/>
    </div>
  );
};

export default Home;