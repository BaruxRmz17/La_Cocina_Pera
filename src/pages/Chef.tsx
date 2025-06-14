import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const OurChefSection: React.FC = () => {
  // Referencias para animaciones
  const sectionRef = useRef<HTMLDivElement>(null);
  const inspirationRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const inspirationImageRef = useRef<HTMLImageElement>(null);
  const inspirationTextRef = useRef<HTMLDivElement>(null);
  const inspirationButtonRef = useRef<HTMLAnchorElement>(null);
  const awardsImageRef = useRef<HTMLImageElement>(null);
  const awardsTextRef = useRef<HTMLDivElement>(null);
  const awardsButtonRef = useRef<HTMLAnchorElement>(null);

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
    // Timeline para la sección principal
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
    mainTl
      .fromTo(
        sectionRef.current?.querySelectorAll('.chef-heading, .chef-subtitle'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        textRef.current?.querySelectorAll('p'),
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      );

    // Timeline para la sección de inspiración
    const inspirationTl = gsap.timeline({
      scrollTrigger: {
        trigger: inspirationRef.current,
        start: 'top 80%',
      },
    });
    inspirationTl
      .fromTo(
        inspirationRef.current?.querySelectorAll('.inspiration-heading'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        inspirationImageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        inspirationTextRef.current?.querySelectorAll('p'),
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        inspirationButtonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      );

    // Timeline para la sección de reconocimientos
    const awardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: awardsRef.current,
        start: 'top 80%',
      },
    });
    awardsTl
      .fromTo(
        awardsRef.current?.querySelectorAll('.awards-heading'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        awardsImageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        awardsTextRef.current?.querySelectorAll('p'),
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        awardsRef.current?.querySelectorAll('.gallery-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        awardsButtonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      );

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

    // Animaciones de hover para botones
    [buttonRef, inspirationButtonRef, awardsButtonRef].forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener('mouseenter', () => {
          gsap.to(ref.current, {
            scale: 1.1,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
          });
        });
        ref.current.addEventListener('mouseleave', () => {
          gsap.to(ref.current, {
            scale: 1,
            boxShadow: '0px 0px rgba(0, 0, 0, 0)',
            duration: 0.3,
          });
        });
      }
    });

    // Animaciones de hover para imágenes
    [imageRef, inspirationImageRef, awardsImageRef].forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener('mouseenter', () => {
          gsap.to(ref.current, {
            scale: 1.05,
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
          });
        });
        ref.current.addEventListener('mouseleave', () => {
          gsap.to(ref.current, {
            scale: 1,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
          });
        });
      }
    });

    // Limpieza de event listeners
    return () => {
      if (scrollTopRef.current) {
        scrollTopRef.current.removeEventListener('mouseenter', () => {});
        scrollTopRef.current.removeEventListener('mouseleave', () => {});
      }
      [buttonRef, inspirationButtonRef, awardsButtonRef].forEach((ref) => {
        if (ref.current) {
          ref.current.removeEventListener('mouseenter', () => {});
          ref.current.removeEventListener('mouseleave', () => {});
        }
      });
      [imageRef, inspirationImageRef, awardsImageRef].forEach((ref) => {
        if (ref.current) {
          ref.current.removeEventListener('mouseenter', () => {});
          ref.current.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-rose-50 to-teal-100 font-serif overflow-x-hidden">
      {/* Sección Nuestra Chef */}
      <section ref={sectionRef} className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2
            className="chef-heading text-3xl md:text-4xl font-bold text-amber-800 text-center mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestra Chef: Esperanza "Pera" Pasillas Gonzales
          </h2>
          <h3
            className="chef-subtitle text-xl md:text-2xl text-gray-600 text-center mb-8 md:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            La Maestra del Sabor
          </h3>
          <div className="chef-content flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/3">
              <img
                ref={imageRef}
                src="/assets/images/chef-pera-portrait.jpg"
                alt="Chef Esperanza 'Pera' Pasillas Gonzales en su cocina"
                className="w-full h-80 md:h-96 object-cover rounded-xl shadow-xl cursor-pointer"
              />
            </div>
            <div ref={textRef} className="w-full md:w-2/3 text-center md:text-left">
              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Esperanza "Pera" Pasillas Gonzales, con <span className="font-semibold">más de 20 años de experiencia</span>, es el alma de <span className="font-semibold">La Cocina de Pera</span>. Su apodo, inspirado en su dulzura y creatividad, refleja su talento para fusionar sabores tradicionales mexicanos con un toque moderno, creando banquetes inolvidables para bodas, fiestas y bautizos.
              </p>
              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Formada en la cocina de su abuela, Pera valora los ingredientes frescos y locales, asegurando que cada plato cuente una historia. Su pasión por conectar con las personas a través de la comida hace que cada evento sea único, lleno de amor y sabor.
              </p>
              <Link
                ref={buttonRef}
                to="/contacto"
                className="inline-block bg-amber-600 text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded-full shadow-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                style={{ fontFamily: 'Georgia, serif' }}
                tabIndex={0}
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Su Inspiración Culinaria */}
      <section ref={inspirationRef} className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2
            className="inspiration-heading text-3xl md:text-4xl font-bold text-amber-800 text-center mb-8 md:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Su Inspiración Culinaria
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <img
                ref={inspirationImageRef}
                src="/assets/images/mercado-local.jpg"
                alt="Mercado local con ingredientes frescos"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-xl cursor-pointer"
              />
            </div>
            <div ref={inspirationTextRef} className="w-full md:w-1/2 text-center md:text-left">
              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                La cocina de Pera está profundamente arraigada en las tradiciones de su abuela, quien le enseñó a cocinar con <span className="font-semibold">amor y respeto por los ingredientes</span>. Cada semana, Pera visita mercados locales para seleccionar los productos más frescos, desde chiles vibrantes hasta hierbas aromáticas, asegurando autenticidad en cada plato.
              </p>
              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Su compromiso con la <span className="font-semibold">sostenibilidad</span> la lleva a colaborar con agricultores locales, minimizando el impacto ambiental y apoyando a la comunidad. Esta conexión con la tierra inspira sus creaciones, haciendo que cada bocado sea una celebración de la cultura mexicana.
              </p>
              <Link
                ref={inspirationButtonRef}
                to="/contacto"
                className="inline-block bg-amber-600 text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded-full shadow-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                style={{ fontFamily: 'Georgia, serif' }}
                tabIndex={0}
              >
                Reserva tu evento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Reconocimientos y Pasión */}
      <section ref={awardsRef} className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2
            className="awards-heading text-3xl md:text-4xl font-bold text-amber-800 text-center mb-8 md:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Reconocimientos y Pasión
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <img
                ref={awardsImageRef}
                src="/assets/images/pera-taller.jpg"
                alt="Chef Pera impartiendo un taller de cocina"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-xl cursor-pointer"
              />
            </div>
            <div ref={awardsTextRef} className="w-full md:w-1/2 text-center md:text-left">
              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Pera ha sido galardonada con el premio <span className="font-semibold">Mejor Chef Regional 2023</span> y reconocida por su innovación en la cocina mexicana. Su dedicación a preservar recetas tradicionales mientras experimenta con nuevos sabores la ha convertido en una figura respetada en la gastronomía.
              </p>
              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Más allá de los premios, su verdadera pasión es <span className="font-semibold">compartir conocimiento</span>. A través de talleres de cocina, Pera enseña a otros a crear platos auténticos, inspirando a la próxima generación de cocineros a celebrar la riqueza de la comida mexicana.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  '/assets/images/pera-cocina1.jpg',
                  '/assets/images/pera-cocina2.jpg',
                  '/assets/images/pera-cocina3.jpg',
                ].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Chef Pera en acción ${index + 1}`}
                    className="gallery-item w-full h-24 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
              <Link
                ref={awardsButtonRef}
                to="/contacto"
                className="inline-block bg-amber-600 text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded-full shadow-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                style={{ fontFamily: 'Georgia, serif' }}
                tabIndex={0}
              >
                Reserva tu evento
              </Link>
            </div>
          </div>
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

export default OurChefSection;