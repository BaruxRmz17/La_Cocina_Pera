import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const HomeResponsive: React.FC = () => {
  // Referencias para animaciones
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryButtonRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const chefRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Estado para la galería de imágenes ampliadas
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Animación para la sección Hero
    gsap.fromTo(
      heroRef.current?.querySelector('h1'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      heroRef.current?.querySelector('p'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: 'back.out(1.7)' }
    );

    // Animación de hover para cada letra de "La Cocina de Pera"
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');
      letters.forEach((letter) => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            color: '#f59e0b', // amber-300
            cursor: 'pointer',
            duration: 0.3,
            ease: 'power3.out',
          });
        });
        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            color: '#ffffff', // white
            duration: 0.3,
            ease: 'power3.out',
          });
        });
      });
    }

    // Animación para la galería y el botón
    gsap.fromTo(
      [
        ...(galleryRef.current?.querySelectorAll('.gallery-item') || []),
        galleryButtonRef.current,
      ],
      { opacity: 0, y: 50, stagger: 0.2 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' },
      }
    );

    // Animación para la sección Sobre Nosotros
    gsap.fromTo(
      aboutRef.current?.querySelectorAll('.about-content'),
      { opacity: 0, x: 0 },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        ease: 'linear',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' },
      }
    );

    // Animación para la sección Nuestra Chef
    gsap.fromTo(
      chefRef.current?.querySelectorAll('.chef-content'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: chefRef.current, start: 'top 80%' },
      }
    );

    // Animación para la sección Ubicación
    gsap.fromTo(
      locationRef.current?.querySelectorAll('.location-content'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: locationRef.current, start: 'top 80%' },
      }
    );

    // Animación para la sección de Contacto
    gsap.fromTo(
      contactRef.current?.querySelectorAll('.contact-content'),
      { opacity: 0, y: 30, stagger: 0.2 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: contactRef.current, start: 'top 80%' },
      }
    );

    // Animación de hover para el botón de reserva
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
        });
      });
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: '0px 0px rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      });
    }

    // Animación inicial y hover para el botón de scroll al top
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

    // Animación de hover para el botón de galería
    if (galleryButtonRef.current) {
      galleryButtonRef.current.addEventListener('mouseenter', () => {
        gsap.to(galleryButtonRef.current, {
          scale: 1.1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
        });
      });
      galleryButtonRef.current.addEventListener('mouseleave', () => {
        gsap.to(galleryButtonRef.current, {
          scale: 1,
          boxShadow: '0px 0px rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      });
    }

    // Limpieza de event listeners
    return () => {
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll('.letter');
        letters.forEach((letter) => {
          letter.removeEventListener('mouseenter', () => {});
          letter.removeEventListener('mouseleave', () => {});
        });
      }
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', () => {});
        buttonRef.current.removeEventListener('mouseleave', () => {});
      }
      if (scrollTopRef.current) {
        scrollTopRef.current.removeEventListener('mouseenter', () => {});
        scrollTopRef.current.removeEventListener('mouseleave', () => {});
      }
      if (galleryButtonRef.current) {
        galleryButtonRef.current.removeEventListener('mouseenter', () => {});
        galleryButtonRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  // Efecto para ocultar/mostrar el Navbar cuando el modal de la galería está abierto
  useEffect(() => {
    const navElement = document.querySelector('nav');
    if (navElement) {
      if (selectedImage) {
        gsap.to(navElement, {
          opacity: 0,
          duration: 0.3,
          ease: 'power3.out',
          onComplete: () => {
            navElement.style.display = 'none';
          },
        });
      } else {
        gsap.to(navElement, {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
          onStart: () => {
            navElement.style.display = 'block';
          },
        });
      }
    }
  }, [selectedImage]);

  // Función para manejar la apertura de imágenes en la galería
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Función para cerrar la imagen ampliada
  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const whatsappMessage = `Hola, soy ${name}. Correo de ${email}. Mensaje de ${message}`;
    const whatsappUrl = `https://wa.me/524493980257?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', message: '' });
  };

  // Función para el scroll al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-rose-50 to-teal-100 font-serif overflow-x-hidden">
      {/* Sección Heroica: Inicio con Información del Restaurante */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('../assets/back.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center z-10">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {'La Cocina de Pera'.split('').map((char, index) => (
              <span key={index} className="letter inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white mb-8 max-w-3xl mx-auto">
            Banquetes con amor y tradición. Transformamos tus eventos en momentos inolvidables con sabores únicos.
          </p>
          <a
            ref={buttonRef}
            href="/booking"
            className="inline-block bg-amber-600 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Reserva Ahora
          </a>
        </div>
      </section>

      {/* Sección de Galería */}
      <section ref={galleryRef} className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Galería de Sabores
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              '/assets/images/plato1.jpg',
              '/assets/images/plato2.jpg',
              '/assets/images/plato3.jpg',
            ].map((image, index) => (
              <li key={index} className="gallery-item overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`Plato ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  className="w-full h-64 sm:h-72 object-cover rounded-xl shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
              </li>
            ))}
          </ul>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              ref={galleryButtonRef}
              to="/galeria"
              className="inline-block bg-amber-600 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Ver Galería Completa
            </Link>
          </div>
        </div>

        {/* Modal para la imagen ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-60 overflow-hidden"
            onClick={handleCloseImage}
          >
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl sm:text-4xl font-bold"
              onClick={handleCloseImage}
            >
              ×
            </button>
          </div>
        )}
      </section>

      {/* Sección Sobre Nosotros */}
      <section ref={aboutRef} className="py-16 sm:py-20 bg-rose-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestra Historia
          </h2>
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center about-content">
              <div>
                <h3
                  className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Esperanza "Pera", Nuestra Chef
                </h3>
                <p className="text-base sm:text-lg text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                  Esperanza, mejor conocida como "Pera", fundó La Cocina de Pera hace más de 5 años con un sueño:
                  compartir los sabores de su infancia a través de platos llenos de amor. Criada en una familia donde
                  la cocina era el corazón del hogar, Pera perfeccionó recetas tradicionales mexicanas, añadiendo su
                  toque creativo para crear banquetes únicos. Su pasión por los ingredientes frescos y locales se refleja
                  en cada evento, desde bodas majestuosas hasta reuniones íntimas.
                </p>
              </div>
              <img
                src="/assets/images/chef-pera.jpg"
                alt="Esperanza 'Pera'"
                className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Nuestra Chef */}
      <section ref={chefRef} className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestra Chef
          </h2>
          <div className="chef-content grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <img
              src="/assets/images/chef-pera-portrait.jpg"
              alt="Esperanza 'Pera'"
              className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-xl"
            />
            <div>
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Esperanza "Pera"
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Esperanza "Pera" es el alma de La Cocina de Pera. Con más de 20 años de experiencia en la cocina, ha
                transformado la gastronomía de eventos en un arte. Su enfoque en ingredientes frescos y técnicas
                tradicionales mexicanas, combinado con un toque moderno, ha ganado el corazón de clientes en todo el
                país.
              </p>
              <p className="text-base sm:text-lg text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                Pera ha sido reconocida con varios premios culinarios y es una apasionada defensora de la cocina
                sostenible. Cuando no está en la cocina, la puedes encontrar explorando mercados locales en busca de los
                mejores ingredientes o impartiendo talleres de cocina para compartir su amor por la gastronomía.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Ubicación */}
      <section ref={locationRef} className="py-16 sm:py-20 bg-teal-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestra Ubicación
          </h2>
          <div className="location-content">
            <p
              className="text-base sm:text-lg text-gray-700 text-center mb-6 sm:mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Encuéntranos en el centro de la ciudad, listos para ayudarte a planificar tu próximo evento especial.
            </p>
            <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.278685958913!2d-102.31472102526708!3d22.229502579737556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8682093afe413591%3A0xd866fab9c87b218f!2sGral.%20%C3%81lvaro%20Obreg%C3%B3n%2C%20Aguascalientes!5e0!3m2!1ses!2smx!4v1749853043463!5m2!1ses!2smx"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Ubicación de La Cocina de Pera"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Contáctanos */}
      <section ref={contactRef} className="py-16 sm:py-20 bg-amber-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Contáctanos
          </h2>
          <div className="contact-content max-w-2xl mx-auto text-center">
            <p className="text-base sm:text-lg mb-6 sm:mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Estamos listos para hacer realidad tu evento. ¡Envíanos tus datos y comencemos a planificar!
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu Nombre"
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu Correo Electrónico"
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tu Mensaje"
                rows={5}
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              ></textarea>
              <button
                type="submit"
                className="inline-block bg-white text-amber-700 font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Botón flotante para scroll al top */}
      <button
        ref={scrollTopRef}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-amber-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:bg-amber-700 z-50"
        aria-label="Volver arriba"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default HomeResponsive;