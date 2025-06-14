import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const BanquetsSection: React.FC = () => {
  // Referencias para animaciones
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  // Estado para visibilidad del botón de scroll al top
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Forzar scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Manejar visibilidad del botón de scroll al top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animaciones GSAP
  useEffect(() => {
    // Timeline para la sección
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    // Animar título
    tl.fromTo(
      sectionRef.current?.querySelector('.banquets-heading'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animar tarjetas
    tl.fromTo(
      cardRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=0.4'
    );

    // Animar botones
    tl.fromTo(
      buttonRefs.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Animaciones de hover para tarjetas
    cardRefs.current.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
        });
      });
    });

    // Animaciones de hover para botones
    buttonRefs.current.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
        });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: '0px 0px rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      });
    });

    // Animación para el botón de scroll al top
    if (scrollTopRef.current) {
      gsap.fromTo(
        scrollTopRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1 }
      );
      scrollTopRef.current.addEventListener('mouseenter', () => {
        gsap.to(scrollTopRef.current, {
          scale: 1.2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
        });
      });
      scrollTopRef.current.addEventListener('mouseleave', () => {
        gsap.to(scrollTopRef.current, {
          scale: 1,
          boxShadow: '0px 0px rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      });
    }

    // Limpieza de event listeners
    return () => {
      cardRefs.current.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      buttonRefs.current.forEach((button) => {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
      if (scrollTopRef.current) {
        scrollTopRef.current.removeEventListener('mouseenter', () => {});
        scrollTopRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Datos de los banquetes
  const banquets = [
    {
      name: 'Banquete Clásico',
      image: '/assets/images/banquet1.jpg',
      description: 'Un banquete tradicional mexicano, perfecto para eventos familiares con sabores auténticos.',
      details: [
        'Menú: Mole poblano, tacos al pastor, arroz mexicano, frijoles charros.',
        'Postre: Flan napolitano.',
        'Bebidas: Aguas frescas (horchata, jamaica).',
        'Servicio: Meseros, montaje básico.',
      ],
      capacity: '50-100 invitados',
      price: 'Desde $350 por persona',
    },
    {
      name: 'Banquete Premium',
      image: '/assets/images/banquet2.jpg',
      description: 'Una experiencia elevada con platillos sofisticados y presentación moderna.',
      details: [
        'Menú: Cochinita pibil, enchiladas verdes, ensalada de nopales, pozole rojo.',
        'Postre: Pastel de tres leches.',
        'Bebidas: Aguas frescas, refrescos, café.',
        'Servicio: Meseros, montaje elegante, decoración floral.',
      ],
      capacity: '100-200 invitados',
      price: 'Desde $500 por persona',
    },
    {
      name: 'Banquete Gourmet',
      image: '/assets/images/banquet3.jpg',
      description: 'Un banquete de lujo con un menú personalizado para eventos exclusivos.',
      details: [
        'Menú: Personalizado (ej. filete en salsa de chile ancho, ceviche de camarón).',
        'Postre: Postre gourmet a elegir.',
        'Bebidas: Cocteles sin alcohol, aguas frescas, café, té.',
        'Servicio: Chef en sitio, montaje premium, decoración personalizada.',
      ],
      capacity: '50-150 invitados',
      price: 'Desde $800 por persona',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-rose-50 to-teal-100 font-serif overflow-x-hidden">
      {/* Sección Banquetes */}
      <section ref={sectionRef} className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2
            className="banquets-heading text-3xl md:text-4xl font-bold text-amber-800 text-center mb-8 md:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestros Banquetes
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {banquets.map((banquet, index) => (
              <li
                key={index}
                ref={(el) => (cardRefs.current[index] = el!)}
                className="bg-amber-50 rounded-xl shadow-xl overflow-hidden flex flex-col"
              >
                <img
                  src={banquet.image}
                  alt={`Banquete ${banquet.name}`}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3
                    className="text-xl md:text-2xl font-semibold text-amber-800 mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {banquet.name}
                  </h3>
                  <p
                    className="text-base text-gray-700 mb-4"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {banquet.description}
                  </p>
                  <ul className="text-base text-gray-700 mb-4 space-y-2">
                    {banquet.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-amber-600 mr-2 mt-1 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span style={{ fontFamily: 'Georgia, serif' }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className="text-base text-gray-700 mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <span className="font-semibold">Capacidad:</span> {banquet.capacity}
                  </p>
                  <p
                    className="text-base text-gray-700 mb-4"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <span className="font-semibold">Precio:</span> {banquet.price}
                  </p>
                  <button
                    ref={(el) => (buttonRefs.current[index] = el!)}
                    onClick={() => {
                      const message = `Hola, quiero información sobre el banquete ${banquet.name}`;
                      window.open(
                        `https://wa.me/524493980257?text=${encodeURIComponent(message)}`,
                        '_blank'
                      );
                    }}
                    className="mt-auto inline-block bg-amber-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                    aria-label={`Contactar por WhatsApp sobre ${banquet.name}`}
                    style={{ fontFamily: 'Georgia, serif' }}
                    tabIndex={0}
                  >
                    Quiero saber más
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Botón flotante para scroll al top */}
      {showScrollTop && (
        <button
          ref={scrollTopRef}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-amber-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-amber-700 z-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
          aria-label="Volver arriba"
          style={{ fontFamily: 'Georgia, serif' }}
          tabIndex={0}
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BanquetsSection;