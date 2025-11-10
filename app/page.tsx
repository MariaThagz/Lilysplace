import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';

import Services from './components/Services';
import Reservation from './components/reservation';

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
    
      <Services />
      <Reservation />
      {/* Other sections */}
    </>
  );
}