import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  // Referencias para animaciones
  const formRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    otherEvent: '',
    guests: '',
    date: '',
    location: '',
    time: '',
    comments: '',
  });

  // Estado para mensaje de éxito/error
  const [formStatus, setFormStatus] = useState<string>('');

  // Forzar scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animaciones GSAP
  useEffect(() => {
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

    // Mostrar mensaje de éxito al regresar
    if (formStatus === '') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success') === 'true') {
        setFormStatus('¡Nos contactaremos contigo a la brevedad para poder darle seguimiento a tu solicitud!');
        // Limpiar URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    // Limpieza de event listeners
    return () => {
      if (scrollTopRef.current) {
        scrollTopRef.current.removeEventListener('mouseenter', () => {});
        scrollTopRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, [formStatus]);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormStatus('');
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, eventType, otherEvent, guests, date, location, time, comments } = formData;

    // Validación
    if (!name || !email || !phone || !eventType || !guests || !date || !location || !time) {
      setFormStatus('Por favor, completa todos los campos requeridos.');
      return;
    }
    if (eventType === 'otro' && !otherEvent) {
      setFormStatus('Por favor, especifica el tipo de evento en el campo "Otro".');
      return;
    }

    // Formatear mensaje para WhatsApp
    const eventDescription = eventType === 'otro' ? otherEvent : eventType;
    const whatsappMessage = `Solicitud de contacto de ${name}\n` +
      `Correo: ${email}\n` +
      `Teléfono: ${phone}\n` +
      `Tipo de evento: ${eventDescription}\n` +
      `Número de personas: ${guests}\n` +
      `Fecha: ${date}\n` +
      `Lugar: ${location}\n` +
      `Hora: ${time}\n` +
      `Comentarios: ${comments || 'Ninguno'}`;
    const whatsappUrl = `https://wa.me/524493980257?text=${encodeURIComponent(whatsappMessage)}`;

    // Abrir WhatsApp y limpiar formulario
    window.open(whatsappUrl + '&success=true', '_blank');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      otherEvent: '',
      guests: '',
      date: '',
      location: '',
      time: '',
      comments: '',
    });
  };

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-rose-50 font-serif overflow-x-hidden">
      {/* Sección de Formulario */}
      <section ref={formRef} className="py-16 sm:py-20 bg-amber-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Contáctanos
          </h2>
          <div className="form-content max-w-2xl mx-auto text-center">
            <p
              className="text-base sm:text-lg mb-6 sm:mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Estamos listos para hacer realidad tu evento. ¡Completa el formulario y comencemos a planificar!
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
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Tu Teléfono"
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <option value="" disabled>Selecciona el Tipo de Evento</option>
                <option value="boda">Boda</option>
                <option value="fiesta">Fiesta</option>
                <option value="bautizo">Bautizo</option>
                <option value="otro">Otro</option>
              </select>
              {formData.eventType === 'otro' && (
                <input
                  type="text"
                  name="otherEvent"
                  value={formData.otherEvent}
                  onChange={handleInputChange}
                  placeholder="Especifica el Tipo de Evento"
                  className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              )}
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                placeholder="Número de Personas"
                min="1"
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Lugar del Evento"
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Comentarios Adicionales"
                rows={5}
                className="w-full p-3 sm:p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                style={{ fontFamily: 'Georgia, serif' }}
              ></textarea>
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
                Enviar Solicitud
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

export default ContactSection;