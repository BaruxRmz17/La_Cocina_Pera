import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const GalleryPage: React.FC = () => {
  window.scrollTo(0, 0);

  // Referencias para animaciones
  const featuredRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);

  // Estado para el modal de imágenes
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Datos para las imágenes destacadas (3 primeras)
  const featuredItems = [
    {
      image: '/assets/images/plato1.jpg',
      title: 'Mole Poblano Tradicional',
      description:
        'Un exquisito mole poblano preparado con una receta familiar de generaciones. Ingredientes frescos como chiles mulatos, pasilla y ancho, combinados con chocolate artesanal, crean un sabor profundo y auténtico. Perfecto para bodas y eventos especiales.',
    },
    {
      image: '/assets/images/plato2.jpg',
      title: 'Tacos de Cochinita Pibil',
      description:
        'Tacos de cochinita pibil marinados en achiote y jugo de naranja agria, cocidos a fuego lento para una textura suave y jugosa. Servidos con cebolla morada encurtida, estos tacos son un favorito en nuestras celebraciones al aire libre.',
    },
    {
      image: '/assets/images/plato3.jpg',
      title: 'Enchiladas Verdes',
      description:
        'Enchiladas rellenas de pollo deshebrado, bañadas en una salsa verde vibrante hecha con tomatillos frescos y chiles serranos. Coronadas con crema, queso fresco y cilantro, son un clásico que nunca falla en nuestros banquetes.',
    },
  ];

  // Imágenes estándar (las restantes)
  const standardImages = [
    '/assets/images/plato4.jpg',
    '/assets/images/plato5.jpg',
    '/assets/images/plato6.jpg',
    '/assets/images/plato7.jpg',
    '/assets/images/plato8.jpg',
    '/assets/images/plato9.jpg',
  ];

  useEffect(() => {
    // Animación para la sección destacada
    gsap.fromTo(
      featuredRef.current?.querySelectorAll('.featured-item'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: featuredRef.current, start: 'top 80%' },
      }
    );

    // Animación para la sección estándar
    gsap.fromTo(
      standardRef.current?.querySelectorAll('.gallery-item'),
      { opacity: 0, y: 50, stagger: 0.2 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: standardRef.current, start: 'top 80%' },
      }
    );

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

    // Efecto para ocultar/mostrar el Navbar cuando el modal está abierto
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

    // Limpieza de event listeners
    return () => {
      if (scrollTopRef.current) {
        scrollTopRef.current.removeEventListener('mouseenter', () => {});
        scrollTopRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, [selectedImage]);

  // Función para abrir el modal
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Función para cerrar el modal
  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  // Función para el scroll al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-serif overflow-x-hidden">
      {/* Sección destacada: 3 imágenes con info alternadas */}
      <section ref={featuredRef} className="py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestros Platos Estrella
          </h2>
          <div className="space-y-12 sm:space-y-16">
            {featuredItems.map((item, index) => (
              <div
                key={index}
                className={`featured-item flex flex-col sm:flex-row${index % 2 === 1 ? '-reverse' : ''} items-center gap-6 sm:gap-12`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => handleImageClick(item.image)}
                  className="w-full sm:w-1/2 h-64 sm:h-80 object-cover rounded-xl shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
                <div className="w-full sm:w-1/2 text-center sm:text-left">
                  <h3
                    className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección estándar: Cuadrícula de imágenes */}
      <section ref={standardRef} className="py-16 sm:py-20 bg-rose-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Más Sabores
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {standardImages.map((image, index) => (
              <li key={index} className="gallery-item overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`Plato ${index + 4}`}
                  onClick={() => handleImageClick(image)}
                  className="w-full h-64 sm:h-72 object-cover rounded-xl shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      {/* Botón flotante para scroll al top */}
      <button
        ref={scrollTopRef}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-amber-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:bg-amber-700 z-50 transition-colors"
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

export default GalleryPage;