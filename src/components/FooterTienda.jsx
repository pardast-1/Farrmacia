import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterTienda() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="sp-cross-badge">+</span>
              <h5 className="mb-0 fw-bold text-white">Farmacia SaludPlus</h5>
            </div>
            <p className="text-secondary small">
              Más de 8 años cuidando la salud de las familias de Maipú y la Región
              Metropolitana. Medicamentos bioequivalentes, suplementos y atención
              farmacéutica certificada.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Inicio</Link></li>
              <li className="mb-2"><Link to="/productos" className="text-secondary text-decoration-none">Productos</Link></li>
              <li className="mb-2"><Link to="/categorias" className="text-secondary text-decoration-none">Categorías</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="text-secondary text-decoration-none">Ofertas</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-white mb-3">Atención al Paciente</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/nosotros" className="text-secondary text-decoration-none">Sobre SaludPlus</Link></li>
              <li className="mb-2"><Link to="/blog" className="text-secondary text-decoration-none">Blog Farmacéutico</Link></li>
              <li className="mb-2"><Link to="/contacto" className="text-secondary text-decoration-none">Contacto y Consultas</Link></li>
              <li className="mb-2"><Link to="/admin" className="text-secondary text-decoration-none">Acceso Funcionarios</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="fw-bold text-white mb-3">Casa Matriz Maipú</h6>
            <p className="text-secondary small mb-1">
              <i className="bi bi-geo-alt-fill text-success me-2" />
              Av. Pajaritos 3150, Maipú, RM
            </p>
            <p className="text-secondary small mb-1">
              <i className="bi bi-envelope-fill text-success me-2" />
              contacto@saludplus.cl
            </p>
            <p className="text-secondary small mb-0">
              <i className="bi bi-shield-check text-success me-2" />
              Resolución Sanitaria SEREMI RM
            </p>
          </div>
        </div>

        <hr className="border-secondary my-4" />
        <div className="d-flex flex-wrap justify-content-between align-items-center small text-secondary">
          <span>© 2026 SaludPlus Farmacia Comunitaria — DSY1104 Desarrollo Fullstack II (Evaluación Parcial 2)</span>
          <span>Desarrollado con React 19 & Bootstrap 5</span>
        </div>
      </div>
    </footer>
  );
}
