import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Handle window resize to toggle mobile/desktop behavior
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false); // Close mobile menu on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    // Initial animation for nav items
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('.nav-item');
      gsap.fromTo(
        navItems,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
      );

      // Hover animations
      navItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.1,
            color: '#fcd34d', // amber-300
            duration: 0.3,
          });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            color: '#ffffff',
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    if (menuRef.current && isMobile) {
      const menuEl = menuRef.current;
      const menuItems = menuEl.querySelectorAll('.nav-item');

      // Create or reset GSAP timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      timelineRef.current = gsap.timeline({ paused: true });

      if (isMenuOpen) {
        // Open animation
        menuEl.style.display = 'flex';
        timelineRef.current
          .set(menuEl, { opacity: 0, y: '-20%', pointerEvents: 'none' })
          .to(menuEl, {
            opacity: 1,
            y: '0%',
            duration: 0.5,
            ease: 'power4.out',
            pointerEvents: 'auto',
          })
          .fromTo(
            menuItems,
            { opacity: 0, x: -30, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power3.out',
              stagger: 0.05,
            },
            '-=0.3'
          );

        timelineRef.current.play();
      } else {
        // Close animation
        timelineRef.current
          .to(menuEl, {
            opacity: 0,
            y: '-20%',
            duration: 0.4,
            ease: 'power4.in',
            pointerEvents: 'none',
          })
          .set(menuEl, { display: 'none' });

        timelineRef.current.play();
      }
    } else if (menuRef.current && !isMobile) {
      // Ensure desktop menu is visible and reset styles
      menuRef.current.style.display = 'flex';
      gsap.set(menuRef.current, { opacity: 1, y: '0%', pointerEvents: 'auto' });
    }

    // Cleanup on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isMenuOpen, isMobile]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-amber-800 text-white shadow-lg z-50"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold hover:text-amber-300 transition-colors"
          onClick={handleLinkClick}
        >
          La Cocina de Pera
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-2xl focus:outline-none hover:text-amber-300 transition-colors focus:ring-2 focus:ring-amber-300 rounded"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '×' : '☰'}
        </button>

        {/* Navigation menu */}
        <ul
          ref={menuRef}
          className={`flex flex-col md:flex-row md:space-x-6 lg:space-x-8 absolute md:static top-14 left-0 w-full md:w-auto bg-amber-900/95 backdrop-blur-sm md:bg-transparent p-4 sm:p-6 md:p-0 overflow-hidden z-40 ${
            isMenuOpen && isMobile ? 'flex' : 'hidden md:flex'
          }`}
        >
          {[
            { to: '/', label: 'Inicio' },
            { to: '/galeria', label: 'Galería' },
            { to: '/paquetes', label: 'Banquetes' },
            { to: '/chef', label: 'Nuestra Chef' },
            { to: '/testi', label: 'Testimonios' },
            { to: '/contacto', label: 'Contáctanos' },
          ].map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.to}
                className="block py-2 md:py-0 text-base sm:text-lg hover:text-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
                onClick={handleLinkClick}
                tabIndex={0}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;