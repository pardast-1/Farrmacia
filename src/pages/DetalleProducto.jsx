import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function DetalleProducto() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const [cantidad, setCantidad] = useState(1);

  const producto = products.find((p) => p.id === id || p.codigo === id);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold">Producto no encontrado</h3>
        <p className="text-muted">El medicamento solicitado no existe en el catálogo actual.</p>
        <Link to="/productos" className="btn btn-success">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const precioUnitario = producto.enOferta ? producto.precioOferta : producto.precio;
  const relacionados = products
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  return (
    <div className="container py-4 fade-in">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item">
            <Link to={`/categorias?cat=${encodeURIComponent(producto.categoria)}`}>
              {producto.categoria}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm p-4 mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-5 text-center">
            <div className="p-4 bg-light rounded-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded"
                style={{ maxHeight: '320px', objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="col-12 col-md-7">
            <div className="d-flex flex-wrap gap-2 mb-2">
              <span className="sp-category-badge">{producto.categoria}</span>
              <span className="badge bg-secondary">Código: {producto.codigo}</span>
              {producto.requiereReceta ? (
                <span className="badge bg-info text-dark">Requiere Receta Médica</span>
              ) : (
                <span className="badge bg-success">Venta Directa (OTC)</span>
              )}
            </div>

            <h2 className="fw-bold mb-2">{producto.nombre}</h2>
            <p className="text-muted mb-3">
              <strong>Laboratorio:</strong> {producto.laboratorio} |{' '}
              <strong>Principio Activo:</strong> {producto.principioActivo}
            </p>

            <div className="p-3 bg-light rounded-3 mb-3">
              {producto.enOferta && (
                <div className="text-muted text-decoration-line-through small">
                  Precio Normal: ${producto.precio.toLocaleString('es-CL')}
                </div>
              )}
              <div className="d-flex align-items-baseline gap-3">
                <span className="display-6 fw-bold text-success">
                  ${precioUnitario.toLocaleString('es-CL')}
                </span>
                {producto.enOferta && (
                  <span className="badge bg-danger">Precio Oferta SaludPlus</span>
                )}
              </div>
            </div>

            <p className="mb-4">{producto.descripcion}</p>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <div className="input-group" style={{ width: '140px' }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={cantidad}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setCantidad((q) => Math.min(producto.stock, q + 1))
                  }
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-success btn-lg px-4"
                disabled={producto.stock <= 0}
                onClick={() => addToCart(producto, cantidad)}
              >
                <i className="bi bi-cart-plus me-2" />
                Añadir al carrito
              </button>
            </div>

            <div className="small text-muted">
              <i className="bi bi-box-seam me-1" />
              Disponibilidad en sucursal Maipú: <strong>{producto.stock} unidades</strong>
            </div>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section>
          <h4 className="fw-bold mb-3">Productos Relacionados en {producto.categoria}</h4>
          <div className="row g-4">
            {relacionados.map((item) => (
              <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
                <ProductCard producto={item} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
