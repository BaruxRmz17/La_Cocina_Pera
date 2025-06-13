import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarLan: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle navigation for SPA routing
  const handleNavigate = (path: string) => {
    setIsOpen(false); // Close mobile menu on navigation
    if (path.startsWith('#')) {
      const sectionId = path.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-900 text-white shadow-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1
              className="text-2xl font-extrabold tracking-tight cursor-pointer hover:text-indigo-200 transition-colors duration-200"
              onClick={() => handleNavigate('#home')}
            >
              EduConnect
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/');
              }}
              className="relative px-3 py-2 text-sm font-medium hover:text-indigo-200 transition-colors duration-200 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/Landing/SobreEdu"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/Landing/SobreEdu');
              }}
              className="relative px-3 py-2 text-sm font-medium hover:text-indigo-200 transition-colors duration-200 group"
            >
              ¿Qué es EduConnect?
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/Landing/Paquetes"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/Landing/Paquetes');
              }}
              className="relative px-3 py-2 text-sm font-medium hover:text-indigo-200 transition-colors duration-200 group"
            >
              Planes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/Landing/Contratar"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/Landing/Contratar');
              }}
              className="relative px-3 py-2 text-sm font-medium hover:text-indigo-200 transition-colors duration-200 group"
            >
              Cómo contratar
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              onClick={() => handleNavigate('/login')}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              Entra Ahora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-indigo-900/95 backdrop-blur-sm`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/');
            }}
            className="block px-4 py-2 text-base font-medium hover:bg-indigo-700 rounded-md transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/Landing/SobreEdu"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/Landing/SobreEdu');
            }}
            className="block px-4 py-2 text-base font-medium hover:bg-indigo-700 rounded-md transition-colors duration-200"
          >
            ¿Qué es EduConnect?
          </a>
          <a
            href="/Landing/Paquetes"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/Landing/Paquetes');
            }}
            className="block px-4 py-2 text-base font-medium hover:bg-indigo-700 rounded-md transition-colors duration-200"
          >
            Planes
          </a>
          <a
            href="/Landing/Contratar"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/Landing/Contratar');
            }}
            className="block px-4 py-2 text-base font-medium hover:bg-indigo-700 rounded-md transition-colors duration-200"
          >
            Cómo contratar
          </a>
          <button
            onClick={() => handleNavigate('/login')}
            className="block w-full text-left px-4 py-2 text-base font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition-all duration-200"
          >
            Entra Ahora
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLan;