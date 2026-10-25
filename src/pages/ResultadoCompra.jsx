import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

/**
 * Vista Resultado de Compra (Figuras 7 y 8 del Anexo 1):
 * - exito = true -> "Se ha realizado la compra. nro #..." + botones "Imprimir boleta en PDF" y "Enviar boleta por email"
 * - exito = false -> "No se pudo realizar el pago. nro #..." + botón "VOLVER A REALIZAR EL PAGO"
 */
export default function ResultadoCompra({ exito = true }) {
  const location = useLocation();
  const { lastOrder, orders } = useStore();
  const [emailSent, setEmailSent] = useState(false);

  const orden = location.state?.orden || lastOrder || orders[0];
  const cliente = orden?.cliente || {
    nombre: 'Pedro',
    apellidos: 'Morales Soto',
    correo: 'pedro.cliente@duocuc.cl',
    calle: 'Los Crisantemos, Edificio Norte 450',
    departamento: 'Depto 603',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Maipú',
    indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
  };
  const items = orden?.items || [];
  const total = orden?.total ?? 0;
  const nro = orden?.nroBoleta || '20260705';
  const codigoOrden = orden?.codigoOrden || 'ORDER12345';

  return (
    <div className="container py-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="checkout-box">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                {exito ? (
                  <h4 className="fw-bold text-success mb-1">
                    <i className="bi bi-check-circle me-2" />
                    Se ha realizado la compra. nro #{nro}
                  </h4>
                ) : (
                  <h4 className="fw-bold text-danger mb-1">
                    <i className="bi bi-x-circle me-2" />
                    No se pudo realizar el pago. nro #{nro}
                  </h4>
                )}
                <small className="text-muted">
                  {exito ? 'Completa la siguiente información' : 'Detalle de compra'}
                </small>
              </div>
              <small className="text-muted fw-semibold">
                Código orden: {codigoOrden}
              </small>
            </div>

            {!exito && (
              <div className="text-center my-3">
                <Link to="/checkout" className="btn btn-success fw-bold px-4">
                  VOLVER A REALIZAR EL PAGO
                </Link>
              </div>
            )}

            {/* Datos del cliente en modo lectura (Figuras 7 y 8) */}
            <div className="row g-2 mb-3">
              <div className="col-12 col-md-4">
                <label className="form-label small text-muted mb-1">Nombre*</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.nombre}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label small text-muted mb-1">Apellidos*</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.apellidos}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label small text-muted mb-1">Correo*</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.correo}
                  readOnly
                />
              </div>
            </div>

            <h6 className="fw-bold mb-2">Dirección de entrega de los productos</h6>
            <div className="row g-2 mb-3">
              <div className="col-12 col-md-6">
                <label className="form-label small text-muted mb-1">Calle*</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.calle}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label small text-muted mb-1">
                  Departamento (opcional)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.departamento || '-'}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label small text-muted mb-1">Región*</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.region}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label small text-muted mb-1">Comuna*</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  value={cliente.comuna}
                  readOnly
                />
              </div>
              <div className="col-12">
                <label className="form-label small text-muted mb-1">
                  Indicaciones para la entrega (opcional)
                </label>
                <textarea
                  rows="2"
                  className="form-control form-control-sm bg-light"
                  value={cliente.indicaciones || 'Sin indicaciones adicionales.'}
                  readOnly
                />
              </div>
            </div>

            {/* Tabla de productos de la orden */}
            <div className="table-responsive mb-3">
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
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                          className="rounded border"
                        />
                      </td>
                      <td>{item.nombre}</td>
                      <td>${item.precio?.toLocaleString('es-CL')}</td>
                      <td>{item.cantidad}</td>
                      <td>${(item.subtotal || item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center py-2 border-top border-bottom mb-3">
              <h5 className="fw-bold mb-0">
                Total pagado: $ {total.toLocaleString('es-CL')}
              </h5>
            </div>

            {exito && (
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-danger btn-sm px-3"
                  onClick={() => window.print()}
                >
                  Imprimir boleta en PDF
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm px-3"
                  onClick={() => setEmailSent(true)}
                >
                  Enviar boleta por email
                </button>
              </div>
            )}

            {emailSent && (
              <div className="alert alert-success mt-3 py-2 small text-center">
                Comprobante electrónico enviado exitosamente a <strong>{cliente.correo}</strong>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
