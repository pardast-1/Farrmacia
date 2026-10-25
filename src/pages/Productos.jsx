import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Productos() {
  const { products, categories, addToCart } = useStore();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [busqueda, setBusqueda] = useState(initialQuery);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [ordenPrecio, setOrdenPrecio] = useState('relevancia');

  const productosFiltrados = useMemo(() => {
    return products
      .filter((p) => {
        const matchTexto =
          p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.principioActivo?.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.codigo?.toLowerCase().includes(busqueda.toLowerCase());
        const matchCat =
          categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
        return matchTexto && matchCat;
      })
      .sort((a, b) => {
        const pA = a.enOferta ? a.precioOferta : a.precio;
        const pB = b.enOferta ? b.precioOferta : b.precio;
        if (ordenPrecio === 'menor') return pA - pB;
        if (ordenPrecio === 'mayor') return pB - pA;
        return 0;
      });
  }, [products, busqueda, categoriaFiltro, ordenPrecio]);

  return (
    <div className="container py-4 fade-in">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Catálogo de Productos Farmacéuticos</h2>
          <p className="text-muted mb-0">
            Mostrando {productosFiltrados.length} de {products.length} productos disponibles en inventario
          </p>
        </div>
      </div>

      {/* Barra de Filtros Interactivos */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-5">
            <label className="form-label small fw-semibold">
              Buscar por nombre, código o principio activo
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Paracetamol, Ibuprofeno, Vitamina C..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label small fw-semibold">Categoría</label>
            <select
              className="form-select"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c.id} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <label className="form-label small fw-semibold">Ordenar por</label>
            <select
              className="form-select"
              value={ordenPrecio}
              onChange={(e) => setOrdenPrecio(e.target.value)}
            >
              <option value="relevancia">Relevancia</option>
              <option value="menor">Precio: Menor a Mayor</option>
              <option value="mayor">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="alert alert-warning text-center py-4">
          <i className="bi bi-search fs-3 d-block mb-2" />
          No se encontraron medicamentos que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="row g-4" data-testid="lista-productos">
          {productosFiltrados.map((prod) => (
            <div className="col-12 col-sm-6 col-lg-3" key={prod.id}>
              <ProductCard producto={prod} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
