import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { REGIONES_COMUNAS } from '../data/db';
import AlertaMensaje from '../components/AlertaMensaje';

/**
 * Vista Checkout siguiendo exactamente la Figura 6 del Anexo 1:
 * - Resumen superior del carrito con botón azul "Total a pagar: $ X"
 * - Información del cliente (autocompletada si el usuario ha iniciado sesión - Nota pág. 6)
 * - Dirección de entrega con Región, Comuna e Indicaciones
 * - Opción para probar pago exitoso o fallo de pago (Figuras 7 y 8)
 */
export default function Checkout() {
  const { cart, cartTotal, currentUser, processCheckoutOrder } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: currentUser?.nombre || '',
    apellidos: currentUser?.apellidos || '',
    correo: currentUser?.correo || '',
    calle: currentUser?.calle || '',
    departamento: currentUser?.departamento || '',
    region: currentUser?.region || 'Región Metropolitana de Santiago',
    comuna: currentUser?.comuna || 'Maipú',
    indicaciones: ''
  });

  const [simularFallo, setSimularFallo] = useState(false);
  const [error, setError] = useState('');

  // Nota pág. 6: Si el usuario ha iniciado sesión toda esta información se añadirá de forma automática
  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        nombre: currentUser.nombre || prev.nombre,
        apellidos: currentUser.apellidos || prev.apellidos,
        correo: currentUser.correo || prev.correo,
        calle: currentUser.calle || prev.calle,
        departamento: currentUser.departamento || prev.departamento,
        region: currentUser.region || prev.region,
        comuna: currentUser.comuna || prev.comuna
      }));
    }
  }, [currentUser]);

  const comunasDisponibles =
    REGIONES_COMUNAS[form.region] || ['Maipú', 'Peñaflor', 'Cerrillos'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      const lista = REGIONES_COMUNAS[value] || [];
      setForm((prev) => ({ ...prev, region: value, comuna: lista[0] || '' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.apellidos.trim() || !form.correo.trim() || !form.calle.trim()) {
      setError('Por favor completa todos los campos obligatorios (*) de cliente y dirección.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    const ordenGenerada = processCheckoutOrder(form, simularFallo);
    if (simularFallo) {
      navigate('/checkout/error', { state: { orden: ordenGenerada } });
    } else {
      navigate('/checkout/exito', { state: { orden: ordenGenerada } });
    }
  };

  return (
    <div className="container py-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="checkout-box">
            {/* Encabezado Carrito y Total a Pagar (Figura 6) */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold mb-0">Carrito de compra</h4>
                <small className="text-muted">Completa la siguiente información</small>
              </div>
              <div className="btn btn-primary fw-bold px-3 py-2">
                Total a pagar: $ {cartTotal.toLocaleString('es-CL')}
              </div>
            </div>

            {currentUser && (
              <div className="alert alert-success py-2 small">
                <i className="bi bi-person-check-fill me-2" />
                Sesión activa detectada: tus datos personales y de dirección se han cargado automáticamente.
              </div>
            )}

            {/* Tabla resumen de productos en Checkout (Figura 6) */}
            <div className="table-responsive mb-4">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                          className="rounded border"
                        />
                      </td>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td>{item.cantidad}</td>
                      <td className="fw-semibold">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AlertaMensaje mensaje={error} tipo="danger" onClose={() => setError('')} />

            <form onSubmit={handleSubmit} noValidate>
              {/* Información del cliente (Figura 6) */}
              <h5 className="fw-bold mb-1">Información del cliente</h5>
              <p className="text-muted small mb-3">Completa la siguiente información</p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="checkout-nombre" className="form-label small fw-semibold">
                    Nombre*
                  </label>
                  <input
                    id="checkout-nombre"
                    name="nombre"
                    type="text"
                    className="form-control"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="checkout-apellidos" className="form-label small fw-semibold">
                    Apellidos*
                  </label>
                  <input
                    id="checkout-apellidos"
                    name="apellidos"
                    type="text"
                    className="form-control"
                    value={form.apellidos}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="checkout-correo" className="form-label small fw-semibold">
                    Correo*
                  </label>
                  <input
                    id="checkout-correo"
                    name="correo"
                    type="email"
                    className="form-control"
                    value={form.correo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Dirección de entrega de los productos (Figura 6) */}
              <h5 className="fw-bold mb-1">Dirección de entrega de los productos</h5>
              <p className="text-muted small mb-3">Ingrese dirección de forma detallada</p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-8">
                  <label htmlFor="checkout-calle" className="form-label small fw-semibold">
                    Calle*
                  </label>
                  <input
                    id="checkout-calle"
                    name="calle"
                    type="text"
                    className="form-control"
                    placeholder="Ej: Av. Pajaritos 3150"
                    value={form.calle}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label htmlFor="checkout-depto" className="form-label small fw-semibold">
                    Departamento (opcional)
                  </label>
                  <input
                    id="checkout-depto"
                    name="departamento"
                    type="text"
                    className="form-control"
                    placeholder="Ej: 603"
                    value={form.departamento}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="checkout-region" className="form-label small fw-semibold">
                    Región*
                  </label>
                  <select
                    id="checkout-region"
                    name="region"
                    className="form-select"
                    value={form.region}
                    onChange={handleChange}
                  >
                    {Object.keys(REGIONES_COMUNAS).map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="checkout-comuna" className="form-label small fw-semibold">
                    Comuna*
                  </label>
                  <select
                    id="checkout-comuna"
                    name="comuna"
                    className="form-select"
                    value={form.comuna}
                    onChange={handleChange}
                  >
                    {comunasDisponibles.map((com) => (
                      <option key={com} value={com}>
                        {com}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="checkout-indicaciones" className="form-label small fw-semibold">
                    Indicaciones para la entrega (opcional)
                  </label>
                  <textarea
                    id="checkout-indicaciones"
                    name="indicaciones"
                    rows="2"
                    className="form-control"
                    placeholder="Ej: Entre calles, color del edificio, dejar en conserjería."
                    value={form.indicaciones}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center border-top pt-3">
                <div className="form-check">
                  <input
                    id="simular-fallo-check"
                    type="checkbox"
                    className="form-check-input"
                    checked={simularFallo}
                    onChange={(e) => setSimularFallo(e.target.checked)}
                  />
                  <label htmlFor="simular-fallo-check" className="form-check-label small text-muted">
                    Simular rechazo de pasarela de pago (probar Figura 8: Pago con error)
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg fw-bold px-4"
                >
                  Pagar ahora $ {cartTotal.toLocaleString('es-CL')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
