import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animación para el footer
    gsap.fromTo(
      footerRef.current?.querySelectorAll('.footer-item'),
      { opacity: 0, y: 20, stagger: 0.1 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-amber-800 text-white py-12"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección de Navegación */}
          <div className="footer-item">
            <h3 className="text-xl font-semibold mb-4">Explora</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/banquets" className="hover:text-amber-300 transition-colors">
                  Banquetes
                </Link>
              </li>
              <li>
                <Link to="/chef" className="hover:text-amber-300 transition-colors">
                  Nuestra Chef
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección de Contacto */}
          <div className="footer-item">
            <h3 className="text-xl font-semibold mb-4">Contáctanos</h3>
            <p className="mb-2">Teléfono: +52 449 398 0257</p>
            <p className="mb-2">Email: info@lacocinadepera.com</p>
            <p className="mb-2">Dirección: Centro de la Ciudad, San Francisco, CA</p>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="footer-item">
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/lacocinadepera"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              
              
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-8 border-t border-amber-600 pt-6 text-center footer-item">
          <p>&copy; {new Date().getFullYear()} La Cocina de Pera. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;