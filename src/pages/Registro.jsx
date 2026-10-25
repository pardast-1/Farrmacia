import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { REGIONES_COMUNAS } from '../data/db';
import AlertaMensaje from '../components/AlertaMensaje';

export default function Registro() {
  const { registerUser } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Maipú'
  });
  const [error, setError] = useState('');

  const comunasDisponibles = REGIONES_COMUNAS[form.region] || ['Maipú'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      const nuevasComunas = REGIONES_COMUNAS[value] || [];
      setForm((prev) => ({
        ...prev,
        region: value,
        comuna: nuevasComunas[0] || ''
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellidos.trim() || !form.correo.trim() || !form.password.trim()) {
      setError('Por favor completa todos los campos obligatorios (*).');
      return;
    }
    const res = registerUser(form);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate('/');
  };

  return (
    <div className="container py-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 p-md-5">
            <h3 className="fw-bold mb-1">Registro de Usuario SaludPlus</h3>
            <p className="text-muted small mb-4">
              Crea tu cuenta para autocompletar tus datos de despacho en futuras compras.
            </p>

            <AlertaMensaje mensaje={error} tipo="danger" onClose={() => setError('')} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">RUN</label>
                  <input
                    name="run"
                    type="text"
                    className="form-control"
                    placeholder="19.234.567-8"
                    value={form.run}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">Nombre *</label>
                  <input
                    name="nombre"
                    type="text"
                    className="form-control"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">Apellidos *</label>
                  <input
                    name="apellidos"
                    type="text"
                    className="form-control"
                    value={form.apellidos}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Correo Electrónico *</label>
                  <input
                    name="correo"
                    type="email"
                    className="form-control"
                    value={form.correo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Contraseña *</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-8">
                  <label className="form-label fw-semibold">Calle y Número</label>
                  <input
                    name="calle"
                    type="text"
                    className="form-control"
                    placeholder="Ej: Av. Pajaritos 3150"
                    value={form.calle}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">Depto / Casa (Opcional)</label>
                  <input
                    name="departamento"
                    type="text"
                    className="form-control"
                    placeholder="Ej: Depto 603"
                    value={form.departamento}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Región</label>
                  <select
                    name="region"
                    className="form-select"
                    value={form.region}
                    onChange={handleChange}
                  >
                    {Object.keys(REGIONES_COMUNAS).map((reg) => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Comuna</label>
                  <select
                    name="comuna"
                    className="form-select"
                    value={form.comuna}
                    onChange={handleChange}
                  >
                    {comunasDisponibles.map((com) => (
                      <option key={com} value={com}>{com}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12 pt-2">
                  <button type="submit" className="btn btn-success fw-bold px-4">
                    Registrar Cuenta
                  </button>
                  <Link to="/login" className="btn btn-link text-secondary">
                    Ya tengo una cuenta
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
