import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import AlertaMensaje from '../components/AlertaMensaje';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo.trim() || !password.trim()) {
      setError('Debes ingresar tu correo electrónico y contraseña.');
      return;
    }
    const res = login(correo, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    if (res.user.rol === 'Administrador' || res.user.rol === 'Farmacéutico') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const fillDemoUser = (demoEmail, demoPass) => {
    setCorreo(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm p-4">
            <div className="text-center mb-4">
              <span className="sp-cross-badge mb-2">+</span>
              <h3 className="fw-bold">Iniciar Sesión</h3>
              <p className="text-muted small">
                Accede a tu cuenta de paciente o al panel administrativo de SaludPlus
              </p>
            </div>

            <AlertaMensaje mensaje={error} tipo="danger" onClose={() => setError('')} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="login-correo" className="form-label fw-semibold">
                  Correo electrónico
                </label>
                <input
                  id="login-correo"
                  type="email"
                  className="form-control"
                  placeholder="ejemplo@saludplus.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label fw-semibold">
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold py-2 mb-3">
                Ingresar
              </button>
            </form>

            <div className="bg-light rounded-3 p-3 small border mb-3">
              <div className="fw-bold mb-2 text-secondary">Cuentas de prueba rápida:</div>
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => fillDemoUser('admin@saludplus.cl', 'admin123')}
                >
                  Admin (Camila)
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={() => fillDemoUser('pedro.cliente@duocuc.cl', 'cliente123')}
                >
                  Cliente (Pedro - Auto Checkout)
                </button>
              </div>
            </div>

            <div className="text-center small">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="fw-bold text-success">
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
