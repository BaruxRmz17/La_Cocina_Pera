import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeResponsive: React.FC = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-rose-100 font-sans">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-50 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            La Cocina de Pera
          </h1>
          <div className="space-x-4">
            <Link to="/menu" className="hover:text-amber-300 transition-colors">Menú</Link>
            <Link to="/contact" className="hover:text-amber-300 transition-colors">Contacto</Link>
            <Link to="/booking" className="hover:text-amber-300 transition-colors">Reservar</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
            Banquetes que Enamoran
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Descubre los sabores únicos de La Cocina de Pera, donde cada plato es una obra maestra para tus eventos especiales.
          </p>
          <motion.a
            href="/booking"
            variants={buttonVariants}
            whileHover="hover"
            className="inline-block bg-amber-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-amber-600 transition-colors"
          >
            Reserva Tu Banquete
          </motion.a>
        </motion.div>
        <motion.img
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80"
          alt="Delicious banquet"
          className="mt-8 mx-auto rounded-lg shadow-xl max-w-full h-auto md:max-w-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </section>

      {/* About Section */}
      <section className="bg-rose-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-red-700 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Sobre La Cocina de Pera
          </motion.h3>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En La Cocina de Pera, transformamos tus eventos en experiencias inolvidables con banquetes llenos de sabor, color y pasión. Desde bodas hasta reuniones íntimas, nuestro equipo crea menús personalizados que deleitan a todos los paladares.
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-16 text-center text-white">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Saborear?</h3>
          <p className="text-lg mb-6">Contáctanos hoy y hagamos de tu evento un festín inolvidable.</p>
          <motion.a
            href="/contact"
            variants={buttonVariants}
            whileHover="hover"
            className="inline-block bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            Contáctanos Ahora
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2025 La Cocina de Pera. Todos los derechos reservados.</p>
          <div className="mt-4 space-x-4">
            <a href="/privacy" className="hover:text-amber-300 transition-colors">Privacidad</a>
            <a href="/terms" className="hover:text-amber-300 transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeResponsive;