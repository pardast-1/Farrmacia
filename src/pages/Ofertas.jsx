import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

/**
 * Vista Ofertas según página 8 del Anexo 1: Muestra todos los productos en oferta.
 */
export default function Ofertas() {
  const { products, addToCart } = useStore();
  const productosEnOferta = products.filter((p) => p.enOferta);

  return (
    <div className="container py-4 fade-in">
      <div className="p-4 rounded-4 bg-danger text-white mb-4 shadow-sm">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <span className="badge bg-white text-danger fw-bold mb-2">
              CAMPAÑA DE AHORRO SALUDPLUS
            </span>
            <h2 className="fw-bold mb-1">Productos en Oferta</h2>
            <p className="mb-0 opacity-90">
              Descuentos exclusivos en medicamentos bioequivalentes, vitaminas y equipos médicos.
            </p>
          </div>
          <div className="fs-1 fw-bold">
            <i className="bi bi-percent" />
          </div>
        </div>
      </div>

      <div className="row g-4">
        {productosEnOferta.map((prod) => (
          <div className="col-12 col-sm-6 col-lg-3" key={prod.id}>
            <ProductCard producto={prod} onAddToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
