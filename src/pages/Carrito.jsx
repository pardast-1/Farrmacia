import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

/**
 * Vista Carrito de Compras siguiendo exactamente la Figura 5 del Anexo 1:
 * Columna izquierda con Lista de productos + Columna derecha con tabla Carrito de Compras,
 * controles - / +, botón Eliminar, Total, botón Limpiar y botón Comprar ahora.
 */
export default function Carrito() {
  const {
    products,
    cart,
    cartTotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
  } = useStore();
  const navigate = useNavigate();

  return (
    <div className="container py-4 fade-in">
      <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
        <div>
          <strong>¡Vista Carrito de Compra!</strong> Gestiona tus medicamentos en tiempo
          real con persistencia en <code>localStorage</code>.
        </div>
        <Link to="/productos" className="btn btn-sm btn-primary">
          Ver catálogo
        </Link>
      </div>

      <div className="row g-4">
        {/* Columna Izquierda: Lista de Productos (Figura 5) */}
        <div className="col-12 col-lg-6">
          <h4 className="fw-bold mb-3">Lista de productos</h4>
          <div className="row g-3">
            {products.slice(0, 4).map((prod) => (
              <div className="col-12 col-sm-6" key={prod.id}>
                <ProductCard producto={prod} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Tabla Carrito de Compras (Figura 5) */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm p-3">
            <h4 className="fw-bold mb-3">Carrito de Compras</h4>

            {cart.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-cart-x display-4 d-block mb-2" />
                Tu carrito está vacío. Añade medicamentos desde la lista de productos.
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle small">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                              className="rounded border"
                            />
                          </td>
                          <td className="fw-semibold">{item.nombre}</td>
                          <td>${item.precio.toLocaleString('es-CL')}</td>
                          <td>
                            <div className="d-inline-flex align-items-center gap-1">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm py-0 px-2"
                                onClick={() => updateCartQuantity(item.id, -1)}
                              >
                                -
                              </button>
                              <span className="px-2 fw-bold">{item.cantidad}</span>
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm py-0 px-2"
                                onClick={() => updateCartQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">
                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-end align-items-center gap-3 border-top pt-3 mt-2">
                  <h5 className="mb-0 fw-bold">
                    Total: ${cartTotal.toLocaleString('es-CL')}
                  </h5>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearCart}
                  >
                    Limpiar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success fw-bold"
                    onClick={() => navigate('/checkout')}
                  >
                    Comprar ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
