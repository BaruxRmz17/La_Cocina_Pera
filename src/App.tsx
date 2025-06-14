import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import HomeResponsive from './pages/Home';
import GalleryPage from './pages/Galeria';
import TestimonialsSection from './pages/Testimonios';
import ContactSection from './pages/Contacto';
import OurChefSection from './pages/Chef';
import BanquetsSection from './pages/Paquetes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div >
        {/* Navbar fijo en la parte superior */}
        <Navbar />
        
        {/* Contenido principal con padding para evitar solapamiento con Navbar */}
        <main className="flex-grow  "> {/* pt-20 for Navbar, pb-12 for Footer */}
          <Routes>
            <Route path="/" element={<HomeResponsive />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/testi" element={<TestimonialsSection />} />
            <Route path="/contacto" element={< ContactSection/>} />
            <Route path="/chef" element={< OurChefSection/>} />
            <Route path="/paquetes" element={< BanquetsSection/>} />





   
          </Routes>
        </main>
        
        {/* Footer siempre en la parte inferior */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;