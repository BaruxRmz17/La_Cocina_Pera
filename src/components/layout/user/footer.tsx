import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white py-12 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-base">
        
        {/* Logo y descripción */}
        <div className="text-left">
          <h2 className="text-2xl font-extrabold tracking-wide mb-2 border-b border-gray-500 pb-2">
            Educonnect
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Conectamos estudiantes y docentes con herramientas modernas para potenciar la educación del futuro.
          </p>
        </div>

        {/* Información de contacto */}
        <div className="text-left">
          <h3 className="text-xl font-semibold mb-2 border-b border-gray-500 pb-2">
            Contacto
          </h3>
          <p className="mt-2">
            <a 
              href="mailto:barucramirez0617@gmail.com" 
              className="hover:text-blue-300 transition-colors duration-300"
            >
              barucramirez0617@gmail.com
            </a>
          </p>
          <p className="mt-2">
            <a 
              href="tel:+524651304889" 
              className="hover:text-blue-300 transition-colors duration-300"
            >
              +52 465 130 4889
            </a>
          </p>
        </div>

        {/* Términos y Políticas */}
        <div className="text-left">
          <h3 className="text-xl font-semibold mb-2 border-b border-gray-500 pb-2">
            Legal
          </h3>
          <p className="mt-2">
            <a 
              href="/Terminos" 
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Términos y Condiciones
            </a>
          </p>
          <p className="mt-2">
            <a 
              href="/Politicas" 
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Políticas de Uso
            </a>
          </p>
        </div>

        {/* Derechos de autor */}
        <div className="text-left md:text-right flex flex-col justify-center text-sm text-gray-400">
          <h3 className="text-xl font-semibold mb-2 border-b border-gray-500 pb-2 text-white">
            Derechos
          </h3>
          <p className="mt-2">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Educonnect</span>
          </p>
          <p>Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;