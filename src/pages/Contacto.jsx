import React, { useState } from 'react';
import AlertaMensaje from '../components/AlertaMensaje';
import BotonAccion from '../components/BotonAccion';

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    asunto: 'Consulta Farmacéutica',
    mensaje: ''
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.correo.trim() || !form.mensaje.trim()) {
      setError('Por favor completa todos los campos obligatorios del formulario.');
      setExito('');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      setError('El correo electrónico ingresado no tiene un formato válido.');
      setExito('');
      return;
    }

    setError('');
    setExito(
      `¡Gracias ${form.nombre}! Nuestro Químico Farmacéutico de turno responderá a ${form.correo} a la brevedad.`
    );
    setForm({ nombre: '', correo: '', asunto: 'Consulta Farmacéutica', mensaje: '' });
  };

  return (
    <div className="container py-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 p-md-5">
            <h2 className="fw-bold mb-2">Contacto y Orientación Farmacéutica</h2>
            <p className="text-muted mb-4">
              ¿Tienes dudas sobre interacciones medicamentosas, disponibilidad de stock o despachos en Maipú? Escríbenos.
            </p>

            <AlertaMensaje mensaje={error} tipo="danger" onClose={() => setError('')} />
            <AlertaMensaje mensaje={exito} tipo="success" onClose={() => setExito('')} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="contacto-nombre" className="form-label fw-semibold">
                    Nombre completo *
                  </label>
                  <input
                    id="contacto-nombre"
                    name="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Ej: María González"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="contacto-correo" className="form-label fw-semibold">
                    Correo electrónico *
                  </label>
                  <input
                    id="contacto-correo"
                    name="correo"
                    type="email"
                    className="form-control"
                    placeholder="usuario@correo.cl"
                    value={form.correo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="contacto-asunto" className="form-label fw-semibold">
                    Tipo de consulta
                  </label>
                  <select
                    id="contacto-asunto"
                    name="asunto"
                    className="form-select"
                    value={form.asunto}
                    onChange={handleChange}
                  >
                    <option value="Consulta Farmacéutica">Consulta Farmacéutica</option>
                    <option value="Estado de Despacho">Estado de Despacho a Domicilio</option>
                    <option value="Cotización de Receta">Cotización de Receta Médica</option>
                    <option value="Sugerencia o Reclamo">Sugerencia o Felicitación</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="contacto-mensaje" className="form-label fw-semibold">
                    Mensaje o consulta *
                  </label>
                  <textarea
                    id="contacto-mensaje"
                    name="mensaje"
                    rows="4"
                    className="form-control"
                    placeholder="Escribe aquí tu consulta..."
                    value={form.mensaje}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <BotonAccion
                    type="submit"
                    label="Enviar Consulta"
                    icon="bi-send"
                    variant="success"
                    className="px-4"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
