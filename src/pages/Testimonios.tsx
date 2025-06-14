import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection: React.FC = () => {
  // Referencias para animaciones
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 0,
  });

  // Estado para mensaje de éxito/error
  const [formStatus, setFormStatus] = useState<string>('');

  // Testimonios estáticos (puedes reemplazar con datos dinámicos)
  const testimonials = [
    {
      name: 'María González',
      comment:
        '¡La Cocina de Pera hizo de mi boda un día inolvidable! Los platillos fueron exquisitos y el servicio impecable.',
      rating: 5,
    },
    {
      name: 'Juan Pérez',
      comment:
        'Organizamos una cena empresarial y todos quedaron encantados con el mole y los tacos. ¡Altamente recomendado!',
      rating: 4,
    },
    {
      name: 'Ana López',
      comment:
        'El banquete para el bautizo de mi hija fue perfecto. Los sabores auténticos y la presentación hermosa.',
      rating: 5,
    },
    {
      name: 'Luis Ramírez',
      comment:
        'Contratamos el servicio para una fiesta familiar y superó nuestras expectativas. Todo estaba delicioso y a tiempo.',
      rating: 5,
    },
    {
      name: 'Carolina Méndez',
      comment:
        'Me encantó la atención personalizada y la variedad de platillos. Mis invitados no paraban de elogiar la comida.',
      rating: 5,
    },
    {
      name: 'Roberto Díaz',
      comment:
        'El menú vegetariano fue un éxito en nuestra reunión. La calidad y el sabor fueron excepcionales.',
      rating: 4,
    },
  ];
  

  // Forzar scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animaciones GSAP
  useEffect(() => {
    // Animación para testimonios
    gsap.fromTo(
      testimonialsRef.current?.querySelectorAll('.testimonial-item'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' },
      }
    );

    // Animación para el formulario
    gsap.fromTo(
      formRef.current?.querySelectorAll('.form-content'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      }
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

    // Limpieza de event listeners
    return () => {
      if (scrollTopRef.current) {
        scrollTopRef.current.removeEventListener('mouseenter', () => {});
        scrollTopRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormStatus('');
  };

  // Manejar selección de estrellas
  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, comment, rating } = formData;

    if (!name || !email || !comment || rating === 0) {
      setFormStatus('Por favor, completa todos los campos y selecciona una calificación.');
      return;
    }

    const whatsappMessage = `Nuevo comentario de ${name}\nCorreo: ${email}\nComentario: ${comment}\nCalificación: ${rating} estrellas`;
    const whatsappUrl = `https://wa.me/524493980257?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Limpiar formulario
    setFormData({ name: '', email: '', comment: '', rating: 0 });
    setFormStatus('¡Comentario enviado con éxito!');
  };

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderizar estrellas
  const renderStars = (rating: number, isEditable = false) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="flex justify-center sm:justify-start">
        {stars.map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              star <= rating ? 'text-amber-500' : 'text-gray-300'
            } ${isEditable ? 'cursor-pointer' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={isEditable ? () => handleRatingChange(star) : undefined}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-rose-50 font-serif overflow-x-hidden">
      {/* Sección de Testimonios */}
      <section ref={testimonialsRef} className="py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Lo que Dicen Nuestros Clientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-item bg-white p-6 rounded-xl shadow-xl text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <h3
                  className="text-lg sm:text-xl font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {testimonial.name}
                </h3>
                <p
                  className="text-base sm:text-lg text-gray-700 mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "{testimonial.comment}"
                </p>
                {renderStars(testimonial.rating)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Formulario */}
      <section ref={formRef} className="py-16 sm:py-20 bg-amber-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Deja tus Comentarios y Recomendaciones
          </h2>
          <div className="form-content max-w-2xl mx-auto text-center">
            <p
              className="text-base sm:text-lg mb-6 sm:mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Tu opinión es importante para nosotros. ¡Comparte tu experiencia con La Cocina de Pera!
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
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Tu Comentario"
                rows={5}
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              ></textarea>
              <div className="mb-4">
                <p
                  className="text-base sm:text-lg mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Tu Calificación:
                </p>
                {renderStars(formData.rating, true)}
              </div>
              {formStatus && (
                <p
                  className={`text-base sm:text-lg ${
                    formStatus.includes('éxito') ? 'text-green-300' : 'text-red-300'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {formStatus}
                </p>
              )}
              <button
                type="submit"
                className="inline-block bg-white text-amber-700 font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Enviar Comentario
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

export default TestimonialsSection;