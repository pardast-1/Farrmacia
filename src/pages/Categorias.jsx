import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

/**
 * Vista Categorías siguiendo exactamente la Figura 4 del Anexo 1 de Instrucciones.
 * Muestra las tarjetas de categorías arriba y abajo los productos filtrados por la categoría activa.
 */
export default function Categorias() {
  const { products, categories, addToCart } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCat = searchParams.get('cat');

  const [categoriaActiva, setCategoriaActiva] = useState(
    paramCat || (categories[0]?.nombre ?? 'Analgésicos')
  );

  useEffect(() => {
    if (paramCat) {
      setCategoriaActiva(paramCat);
    }
  }, [paramCat]);

  const handleSelectCategory = (nombreCat) => {
    setCategoriaActiva(nombreCat);
    setSearchParams({ cat: nombreCat });
  };

  const productosCategoria = products.filter(
    (p) => p.categoria.toLowerCase() === categoriaActiva.toLowerCase()
  );

  return (
    <div className="container py-4 fade-in">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Explorar por Categorías</h2>
        <p className="text-muted">
          Selecciona una categoría farmacéutica para visualizar sus medicamentos asociados
        </p>
      </div>

      {/* Selector de tarjetas de categorías superior (Figura 4) */}
      <div className="row g-3 justify-content-center mb-5">
        {categories.map((cat) => {
          const isSelected = cat.nombre === categoriaActiva;
          return (
            <div className="col-6 col-sm-4 col-md-2" key={cat.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelectCategory(cat.nombre)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectCategory(cat.nombre)}
                className={`card h-100 text-center p-3 border-2 ${
                  isSelected
                    ? 'border-success bg-success bg-opacity-10 shadow-sm'
                    : 'border-light-subtle'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="py-2">
                  <i
                    className={`bi ${cat.icono || 'bi-capsule'} fs-2 ${
                      isSelected ? 'text-success' : 'text-secondary'
                    }`}
                  />
                </div>
                <h6 className="fw-bold mb-0 small">{cat.nombre}</h6>
              </div>
            </div>
          );
        })}
      </div>

      {/* Listado de productos de la categoría seleccionada (Figura 4) */}
      <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-2">
        <h3 className="fw-bold mb-0">{categoriaActiva}</h3>
        <span className="badge bg-success">
          {productosCategoria.length} productos disponibles
        </span>
      </div>

      <div className="row g-4">
        {productosCategoria.map((prod) => (
          <div className="col-12 col-sm-6 col-lg-3" key={prod.id}>
            <ProductCard producto={prod} onAddToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
