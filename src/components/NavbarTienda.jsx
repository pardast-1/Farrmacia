import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

/**
 * Barra de navegación principal siguiendo el Template de la Evaluación 2 (Figura 1)
 * y la identidad visual de Farmacia Comunitaria SaludPlus (Evaluación 1).
 */
export default function NavbarTienda() {
  const { cartTotal, cartCount, currentUser, logout, categories, toastMessage } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/productos?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <div className="sp-topbar text-center">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <span>
            <i className="bi bi-truck me-1" />
            ¡Despachos rápidos en Maipú, Peñaflor y toda la Región Metropolitana!
          </span>
          <span className="d-none d-md-inline">
            <i className="bi bi-telephone-fill me-1" />
            Fono Consulta Farmacéutica: +56 2 2555 8900 | Atención Lun-Dom
          </span>
        </div>
      </div>

      <header className="sp-header">
        <div className="container py-2">
          {/* Fila superior: Logo, Buscador y Botones de Sesión (Figura 1) */}
          <div className="row align-items-center g-2 py-1">
            <div className="col-12 col-md-3 d-flex align-items-center justify-content-between">
              <Link to="/" className="sp-brand-logo">
                <span className="sp-cross-badge">+</span>
                <div>
                  <div className="lh-1">SaludPlus</div>
                  <small className="text-muted fw-normal" style={{ fontSize: '0.72rem' }}>
                    Farmacia Comunitaria
                  </small>
                </div>
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <form className="d-flex gap-2" onSubmit={handleSearchSubmit} role="search">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Buscar medicamento, principio activo o categoría..."
                  aria-label="Buscar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-secondary btn-sm px-3">
                  Buscar
                </button>
              </form>
            </div>

            <div className="col-12 col-md-4 d-flex justify-content-md-end align-items-center gap-2">
              {currentUser ? (
                <>
                  <span className="badge bg-light text-dark border px-2 py-2">
                    <i className="bi bi-person-check-fill text-success me-1" />
                    {currentUser.nombre} ({currentUser.rol})
                  </span>
                  {(currentUser.rol === 'Administrador' ||
                    currentUser.rol === 'Farmacéutico') && (
                    <Link to="/admin" className="btn btn-warning btn-sm fw-semibold">
                      <i className="bi bi-speedometer2 me-1" />
                      Admin
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-secondary btn-sm">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="btn btn-primary btn-sm">
                    Crear Cuenta
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Fila inferior: Menú de Navegación + Botón Verde Carrito $Total (Figura 1) */}
          <nav className="d-flex flex-wrap align-items-center justify-content-between pt-2 mt-1 border-top">
            <div className="d-flex flex-wrap align-items-center gap-1">
              <NavLink to="/" end className="sp-nav-link">
                Home
              </NavLink>
              <NavLink to="/productos" className="sp-nav-link">
                Productos
              </NavLink>
              <div className="dropdown d-inline-block">
                <NavLink
                  to="/categorias"
                  className="sp-nav-link dropdown-toggle"
                >
                  Categorías
                </NavLink>
              </div>
              <NavLink to="/ofertas" className="sp-nav-link">
                Ofertas
              </NavLink>
              <NavLink to="/nosotros" className="sp-nav-link">
                Nosotros
              </NavLink>
              <NavLink to="/blog" className="sp-nav-link">
                Blog
              </NavLink>
              <NavLink to="/contacto" className="sp-nav-link">
                Contacto
              </NavLink>
              <NavLink to="/admin" className="sp-nav-link text-success fw-semibold">
                <i className="bi bi-shield-lock me-1" />
                Panel Admin
              </NavLink>
            </div>

            <div className="my-1">
              <Link to="/carrito" className="sp-cart-btn" data-testid="navbar-cart-btn">
                <i className="bi bi-cart3" />
                <span>
                  Carrito ${cartTotal.toLocaleString('es-CL')} ({cartCount})
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {toastMessage && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1080 }}
        >
          <div className="toast show align-items-center text-bg-success border-0 shadow">
            <div className="d-flex">
              <div className="toast-body fw-semibold">
                <i className="bi bi-check2-circle me-2" />
                {toastMessage}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => {}}
                aria-label="Close"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
