import React from 'react';
import { Link } from 'react-router-dom';
import BotonAccion from './BotonAccion';

/**
 * Componente reutilizable para mostrar una tarjeta de producto farmacéutico.
 */
export default function ProductCard({ producto, onAddToCart }) {
  if (!producto) return null;

  const precioFinal = producto.enOferta ? producto.precioOferta : producto.precio;
  const descuentoPct =
    producto.enOferta && producto.precio > 0
      ? Math.round(((producto.precio - producto.precioOferta) / producto.precio) * 100)
      : 0;

  return (
    <div className="sp-card" data-testid={`product-card-${producto.id}`}>
      <div className="sp-card-img-wrapper">
        {producto.enOferta && (
          <span className="sp-offer-badge">-{descuentoPct}% OFERTA</span>
        )}
        {producto.requiereReceta && (
          <span className="sp-rx-badge">Receta Simple</span>
        )}
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </div>

      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="sp-category-badge">{producto.categoria}</span>
          <small className="text-muted">{producto.laboratorio}</small>
        </div>

        <h6 className="fw-bold mb-1">
          <Link
            to={`/productos/${producto.id}`}
            className="text-decoration-none text-dark"
          >
            {producto.nombre}
          </Link>
        </h6>

        <p className="text-muted small mb-2 flex-grow-1">
          {producto.descripcion.length > 75
            ? `${producto.descripcion.slice(0, 75)}...`
            : producto.descripcion}
        </p>

        <div className="mt-auto pt-2 border-top">
          <div className="d-flex align-items-baseline justify-content-between mb-2">
            <div>
              {producto.enOferta && (
                <span className="sp-price-old">
                  ${producto.precio.toLocaleString('es-CL')}
                </span>
              )}
              <span className="sp-price-current">
                ${precioFinal.toLocaleString('es-CL')}
              </span>
            </div>
            <small
              className={`fw-semibold ${
                producto.stock <= (producto.stockCritico || 5)
                  ? 'text-danger'
                  : 'text-success'
              }`}
            >
              Stock: {producto.stock}
            </small>
          </div>

          <div className="d-flex gap-2">
            <Link
              to={`/productos/${producto.id}`}
              className="btn btn-outline-secondary btn-sm w-50"
            >
              Ver detalle
            </Link>
            <BotonAccion
              label="Añadir"
              icon="bi-cart-plus"
              variant="success"
              className="btn-sm w-50"
              disabled={producto.stock <= 0}
              onClick={() => onAddToCart && onAddToCart(producto)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
