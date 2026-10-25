import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, categories, addToCart } = useStore();
  const destacados = products.slice(0, 4);
  const enOferta = products.filter((p) => p.enOferta).slice(0, 4);

  return (
    <div className="container py-4 fade-in">
      {/* Banner Principal (Figura 1 - 1200 x 300) */}
      <section className="sp-hero-banner mb-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <span className="badge bg-white text-success fw-bold mb-3 px-3 py-2">
              FARMACIA COMUNITARIA SALUDPLUS • MAIPÚ Y RM
            </span>
            <h1 className="display-6 fw-bold mb-3">
              Nuevos Lanzamientos y Bioequivalentes al Mejor Precio
            </h1>
            <p className="lead mb-4 opacity-90">
              Encuentra medicamentos certificados, suplementos vitamínicos y
              cuidado personal con despacho a domicilio en menos de 2 horas.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/productos" className="btn btn-light btn-lg fw-bold text-success">
                Ver Catálogo Completo
              </Link>
              <Link to="/ofertas" className="btn btn-outline-light btn-lg">
                Ofertas de la Semana
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-5 text-center">
            <div className="bg-white bg-opacity-10 rounded-4 p-4 border border-light border-opacity-25">
              <i className="bi bi-prescription2 display-1 text-white" />
              <h5 className="mt-2 fw-bold">Atención Farmacéutica Online</h5>
              <p className="small mb-0">
                Más de 1.500 pedidos mensuales respaldan nuestro compromiso con la
                salud comunitaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Categorías (Figura 1 - 400 x 200 tarjetas de categoría) */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Categorías</h2>
          <p className="text-muted">
            Explora nuestras áreas terapéuticas y de bienestar familiar
          </p>
        </div>

        <div className="row g-3">
          {categories.slice(0, 6).map((cat) => (
            <div className="col-12 col-sm-6 col-lg-4" key={cat.id}>
              <Link
                to={`/categorias?cat=${encodeURIComponent(cat.nombre)}`}
                className="text-decoration-none"
              >
                <div className="sp-card p-4 text-center h-100">
                  <div className="mb-3">
                    <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success p-3">
                      <i className={`bi ${cat.icono || 'bi-capsule'} fs-2`} />
                    </span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{cat.nombre}</h5>
                  <p className="text-muted small mb-0">{cat.descripcion}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados (Catálogo Base SaludPlus Evaluación 1) */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="fw-bold mb-0">Productos Destacados</h3>
            <small className="text-muted">
              Medicamentos e insumos esenciales de alta rotación en SaludPlus
            </small>
          </div>
          <Link to="/productos" className="btn btn-outline-success btn-sm">
            Ver todos los productos
          </Link>
        </div>

        <div className="row g-4">
          {destacados.map((prod) => (
            <div className="col-12 col-sm-6 col-lg-3" key={prod.id}>
              <ProductCard producto={prod} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      </section>

      {/* Avance de Ofertas */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="fw-bold mb-0 text-danger">
              <i className="bi bi-tag-fill me-2" />
              Ofertas Destacadas
            </h3>
            <small className="text-muted">
              Ahorra en tus tratamientos habituales con descuentos especiales
            </small>
          </div>
          <Link to="/ofertas" className="btn btn-danger btn-sm">
            Ir a Ofertas
          </Link>
        </div>

        <div className="row g-4">
          {enOferta.map((prod) => (
            <div className="col-12 col-sm-6 col-lg-3" key={prod.id}>
              <ProductCard producto={prod} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
