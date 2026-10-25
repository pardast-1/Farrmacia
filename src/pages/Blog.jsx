import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Blog() {
  const { blogs } = useStore();

  return (
    <div className="container py-4 fade-in">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Blog de Salud y Educación Farmacéutica</h2>
        <p className="text-muted">
          Consejos clínicos redactados por nuestros Químicos Farmacéuticos de SaludPlus
        </p>
      </div>

      <div className="row g-4">
        {blogs.map((post) => (
          <div className="col-12 col-md-6" key={post.id}>
            <div className="sp-card overflow-hidden h-100">
              <img
                src={post.imagen}
                alt={post.titulo}
                style={{ height: '220px', objectFit: 'cover', width: '100%' }}
              />
              <div className="p-4 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="sp-category-badge">{post.categoria}</span>
                  <small className="text-muted">{post.fecha}</small>
                </div>
                <h4 className="fw-bold mb-2">{post.titulo}</h4>
                <p className="text-muted flex-grow-1">{post.resumen}</p>
                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <small className="text-secondary fw-semibold">{post.autor}</small>
                  <Link to={`/blog/${post.id}`} className="btn btn-outline-success btn-sm">
                    Leer artículo completo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
