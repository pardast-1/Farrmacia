import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getCriticalProducts } from '../data/db';

/**
 * Sistema Administrativo Completo según Figuras 9 y 10 del Anexo 1 de Instrucciones.
 */
export default function Admin() {
  const {
    products,
    categories,
    users,
    orders,
    currentUser,
    logout,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser
  } = useStore();

  const [seccionActiva, setSeccionActiva] = useState('dashboard');
  const [subVistaProducto, setSubVistaProducto] = useState('lista'); // lista | nuevo | editar | criticos
  const [productoEditando, setProductoEditando] = useState(null);
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);
  const [usuarioHistorial, setUsuarioHistorial] = useState(null);

  // Estado formulario Producto
  const [formProd, setFormProd] = useState({
    codigo: '',
    nombre: '',
    categoria: categories[0]?.nombre || 'Analgésicos',
    precio: '',
    precioOferta: '',
    enOferta: false,
    stock: '',
    stockCritico: 10,
    requiereReceta: false,
    laboratorio: '',
    principioActivo: '',
    descripcion: ''
  });

  // Estado formulario Categoría
  const [formCat, setFormCat] = useState({ id: null, nombre: '', descripcion: '' });

  // Estado formulario Usuario
  const [formUser, setFormUser] = useState({
    id: null,
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    rol: 'Cliente',
    comuna: 'Maipú'
  });

  const productosCriticos = getCriticalProducts();
  const inventarioTotal = products.reduce((acc, p) => acc + Number(p.stock || 0), 0);

  const iniciarEdicionProducto = (prod) => {
    setProductoEditando(prod);
    setFormProd({
      codigo: prod.codigo,
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: prod.precio,
      precioOferta: prod.precioOferta,
      enOferta: prod.enOferta,
      stock: prod.stock,
      stockCritico: prod.stockCritico || 10,
      requiereReceta: prod.requiereReceta,
      laboratorio: prod.laboratorio,
      principioActivo: prod.principioActivo,
      descripcion: prod.descripcion
    });
    setSubVistaProducto('editar');
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    if (!formProd.nombre.trim()) return;
    if (subVistaProducto === 'editar' && productoEditando) {
      handleUpdateProduct(productoEditando.id, formProd);
    } else {
      handleAddProduct(formProd);
    }
    setFormProd({
      codigo: '',
      nombre: '',
      categoria: categories[0]?.nombre || 'Analgésicos',
      precio: '',
      precioOferta: '',
      enOferta: false,
      stock: '',
      stockCritico: 10,
      requiereReceta: false,
      laboratorio: '',
      principioActivo: '',
      descripcion: ''
    });
    setProductoEditando(null);
    setSubVistaProducto('lista');
  };

  const guardarCategoria = (e) => {
    e.preventDefault();
    if (!formCat.nombre.trim()) return;
    if (formCat.id) {
      handleUpdateCategory(formCat.id, formCat);
    } else {
      handleAddCategory(formCat);
    }
    setFormCat({ id: null, nombre: '', descripcion: '' });
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (!formUser.nombre.trim() || !formUser.correo.trim()) return;
    if (formUser.id) {
      handleUpdateUser(formUser.id, formUser);
    } else {
      handleAddUser(formUser);
    }
    setFormUser({
      id: null,
      run: '',
      nombre: '',
      apellidos: '',
      correo: '',
      rol: 'Cliente',
      comuna: 'Maipú'
    });
  };

  return (
    <div className="sp-admin-wrapper fade-in">
      {/* Sidebar Izquierdo según Figura 9 */}
      <aside className="sp-admin-sidebar">
        <div className="px-2 pb-3 mb-3 border-bottom border-secondary">
          <div className="fw-bold text-white fs-5">SaludPlus Admin</div>
          <small className="text-secondary">Gestión Farmacéutica</small>
        </div>

        <nav className="nav flex-column flex-grow-1">
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'dashboard' ? 'active' : ''
            }`}
            onClick={() => setSeccionActiva('dashboard')}
          >
            <i className="bi bi-grid-1x2-fill" /> Dashboard
          </button>
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'ordenes' ? 'active' : ''
            }`}
            onClick={() => setSeccionActiva('ordenes')}
          >
            <i className="bi bi-receipt" /> Órdenes / Boletas
          </button>
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'productos' ? 'active' : ''
            }`}
            onClick={() => {
              setSeccionActiva('productos');
              setSubVistaProducto('lista');
            }}
          >
            <i className="bi bi-capsule" /> Productos
          </button>
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'categorias' ? 'active' : ''
            }`}
            onClick={() => setSeccionActiva('categorias')}
          >
            <i className="bi bi-tags" /> Categorías
          </button>
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'usuarios' ? 'active' : ''
            }`}
            onClick={() => setSeccionActiva('usuarios')}
          >
            <i className="bi bi-people" /> Usuarios
          </button>
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'reportes' ? 'active' : ''
            }`}
            onClick={() => setSeccionActiva('reportes')}
          >
            <i className="bi bi-bar-chart-line" /> Reportes
          </button>
          <button
            type="button"
            className={`nav-link border-0 bg-transparent text-start ${
              seccionActiva === 'perfil' ? 'active' : ''
            }`}
            onClick={() => setSeccionActiva('perfil')}
          >
            <i className="bi bi-person-badge" /> Perfil
          </button>
        </nav>

        <div className="pt-3 border-top border-secondary d-grid gap-2">
          <Link to="/" className="btn btn-dark btn-sm text-start">
            <i className="bi bi-shop me-2" /> Ir a la Tienda
          </Link>
          <button type="button" onClick={logout} className="btn btn-danger btn-sm text-start">
            <i className="bi bi-box-arrow-left me-2" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal Administrativo */}
      <main className="flex-grow-1 p-4">
        {/* 1. VISTA DASHBOARD (Figura 9) */}
        {seccionActiva === 'dashboard' && (
          <div>
            <div className="mb-4">
              <h3 className="fw-bold mb-0">Dashboard</h3>
              <small className="text-muted">Resumen de las actividades diarias de Farmacia SaludPlus</small>
            </div>

            {/* 3 Tarjetas Superiores Coloreadas (Figura 9) */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="sp-kpi-card-blue shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 opacity-90">Compras</h6>
                      <h3 className="fw-bold mb-1">{orders.length}</h3>
                      <small className="opacity-75">Probabilidad de aumento: 20%</small>
                    </div>
                    <i className="bi bi-cart-check display-5 opacity-75" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="sp-kpi-card-green shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 opacity-90">Productos</h6>
                      <h3 className="fw-bold mb-1">{products.length}</h3>
                      <small className="opacity-75">Inventario actual: {inventarioTotal} uds.</small>
                    </div>
                    <i className="bi bi-box-seam display-5 opacity-75" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="sp-kpi-card-amber shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 opacity-90">Usuarios</h6>
                      <h3 className="fw-bold mb-1">{users.length}</h3>
                      <small className="opacity-75">Pacientes registrados activos</small>
                    </div>
                    <i className="bi bi-people-fill display-5 opacity-75" />
                  </div>
                </div>
              </div>
            </div>

            {/* 8 Tarjetas de Módulos del Sistema Administrativo (Figura 9) */}
            <div className="row g-3">
              {[
                { id: 'dashboard', icon: 'bi-speedometer2', title: 'Dashboard', desc: 'Visión general de todas las métricas y estadísticas clave del sistema.' },
                { id: 'ordenes', icon: 'bi-cart3', title: 'Órdenes', desc: 'Gestión y seguimiento de todas las órdenes y boletas de compra realizadas.' },
                { id: 'productos', icon: 'bi-capsule', title: 'Productos', desc: 'Administrar inventario, precios, stock crítico y detalles de medicamentos.' },
                { id: 'categorias', icon: 'bi-tags', title: 'Categorías', desc: 'Organizar productos en categorías terapéuticas para facilitar su navegación.' },
                { id: 'usuarios', icon: 'bi-people', title: 'Usuarios', desc: 'Gestión de cuentas de usuario, historial de compras y roles dentro del sistema.' },
                { id: 'reportes', icon: 'bi-graph-up-arrow', title: 'Reportes', desc: 'Generación de informes detallados sobre las operaciones e inventario.' },
                { id: 'perfil', icon: 'bi-person-circle', title: 'Perfil', desc: 'Administración de la información personal y configuraciones de cuenta.' },
                { id: 'tienda', icon: 'bi-shop', title: 'Tienda', desc: 'Visualiza tu tienda SaludPlus en tiempo real como cliente público.' }
              ].map((mod) => (
                <div className="col-12 col-sm-6 col-lg-3" key={mod.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => mod.id !== 'tienda' && setSeccionActiva(mod.id)}
                    className="card border-0 shadow-sm h-100 p-4 text-center"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={`bi ${mod.icon} fs-2 text-primary mb-2`} />
                    <h6 className="fw-bold">{mod.title}</h6>
                    <p className="text-muted small mb-0">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. VISTA ÓRDENES / BOLETAS (Figura 10) */}
        {seccionActiva === 'ordenes' && (
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Órdenes y Boletas Emitidas</h4>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Código Boleta</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Comuna</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="fw-bold">{o.codigoOrden}</td>
                      <td>{o.fecha}</td>
                      <td>{o.cliente?.nombre} {o.cliente?.apellidos}</td>
                      <td>{o.cliente?.comuna}</td>
                      <td>
                        <span className={`badge ${o.estado === 'Pagado' ? 'bg-success' : 'bg-danger'}`}>
                          {o.estado}
                        </span>
                      </td>
                      <td className="fw-bold">${o.total.toLocaleString('es-CL')}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setBoletaSeleccionada(o)}
                        >
                          Mostrar Boleta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {boletaSeleccionada && (
              <div className="mt-4 p-3 bg-light rounded border">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">
                    Detalle Boleta #{boletaSeleccionada.codigoOrden}
                  </h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setBoletaSeleccionada(null)}
                  />
                </div>
                <p className="small mb-2">
                  <strong>Cliente:</strong> {boletaSeleccionada.cliente?.nombre}{' '}
                  {boletaSeleccionada.cliente?.apellidos} ({boletaSeleccionada.cliente?.correo}) |{' '}
                  <strong>Dirección:</strong> {boletaSeleccionada.cliente?.calle},{' '}
                  {boletaSeleccionada.cliente?.comuna}
                </p>
                <ul className="small mb-0">
                  {boletaSeleccionada.items?.map((it) => (
                    <li key={it.id}>
                      {it.nombre} x {it.cantidad} = ${(it.precio * it.cantidad).toLocaleString('es-CL')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 3. VISTA PRODUCTOS (Figura 10: Mostrar, Nuevo, Editar, Críticos) */}
        {seccionActiva === 'productos' && (
          <div className="card border-0 shadow-sm p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
              <h4 className="fw-bold mb-0">Gestión de Inventario Farmacéutico</h4>
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${subVistaProducto === 'lista' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setSubVistaProducto('lista')}
                >
                  Mostrar Productos ({products.length})
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${subVistaProducto === 'nuevo' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => {
                    setProductoEditando(null);
                    setSubVistaProducto('nuevo');
                  }}
                >
                  Nuevo Producto
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${subVistaProducto === 'criticos' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setSubVistaProducto('criticos')}
                >
                  Stock Crítico ({productosCriticos.length})
                </button>
              </div>
            </div>

            {(subVistaProducto === 'nuevo' || subVistaProducto === 'editar') && (
              <form onSubmit={guardarProducto} className="bg-light p-3 rounded border mb-4">
                <h6 className="fw-bold mb-3">
                  {subVistaProducto === 'editar' ? 'Editar Producto' : 'Registrar Nuevo Producto'}
                </h6>
                <div className="row g-3">
                  <div className="col-12 col-md-3">
                    <label className="form-label small fw-semibold">Código</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="SP-011"
                      value={formProd.codigo}
                      onChange={(e) => setFormProd({ ...formProd, codigo: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-5">
                    <label className="form-label small fw-semibold">Nombre del Medicamento *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: Amoxicilina 500mg x 21"
                      value={formProd.nombre}
                      onChange={(e) => setFormProd({ ...formProd, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Categoría</label>
                    <select
                      className="form-select form-select-sm"
                      value={formProd.categoria}
                      onChange={(e) => setFormProd({ ...formProd, categoria: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.nombre}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Precio ($)</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={formProd.precio}
                      onChange={(e) => setFormProd({ ...formProd, precio: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Stock Actual</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={formProd.stock}
                      onChange={(e) => setFormProd({ ...formProd, stock: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Laboratorio</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formProd.laboratorio}
                      onChange={(e) => setFormProd({ ...formProd, laboratorio: e.target.value })}
                    />
                  </div>
                  <div className="col-6 col-md-3 d-flex align-items-end">
                    <div className="form-check">
                      <input
                        id="chk-oferta"
                        type="checkbox"
                        className="form-check-input"
                        checked={formProd.enOferta}
                        onChange={(e) => setFormProd({ ...formProd, enOferta: e.target.checked })}
                      />
                      <label htmlFor="chk-oferta" className="form-check-label small">
                        En Oferta
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-success btn-sm me-2">
                      Guardar Producto
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSubVistaProducto('lista')}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="table-responsive">
              <table className="table table-hover align-middle small">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(subVistaProducto === 'criticos' ? productosCriticos : products).map((p) => (
                    <tr key={p.id}>
                      <td>{p.codigo}</td>
                      <td className="fw-semibold">{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>${p.precio.toLocaleString('es-CL')}</td>
                      <td className={p.stock <= (p.stockCritico || 10) ? 'text-danger fw-bold' : ''}>
                        {p.stock}
                      </td>
                      <td>
                        {p.stock <= (p.stockCritico || 10) ? (
                          <span className="badge bg-danger">Stock Crítico</span>
                        ) : (
                          <span className="badge bg-success">Óptimo</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => iniciarEdicionProducto(p)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. VISTA CATEGORÍAS (Figura 10) */}
        {seccionActiva === 'categorias' && (
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Gestión de Categorías Terapéuticas</h4>
            <form onSubmit={guardarCategoria} className="row g-2 mb-4 bg-light p-3 rounded border">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nombre categoría"
                  value={formCat.nombre}
                  onChange={(e) => setFormCat({ ...formCat, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 col-md-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Descripción"
                  value={formCat.descripcion}
                  onChange={(e) => setFormCat({ ...formCat, descripcion: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-success btn-sm w-100">
                  {formCat.id ? 'Actualizar Categoría' : 'Nueva Categoría'}
                </button>
              </div>
            </form>

            <div className="table-responsive">
              <table className="table align-middle small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td className="fw-bold">{c.nombre}</td>
                      <td>{c.descripcion}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => setFormCat(c)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteCategory(c.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. VISTA USUARIOS E HISTORIAL DE COMPRAS (Figura 10) */}
        {seccionActiva === 'usuarios' && (
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Gestión de Usuarios y Pacientes</h4>
            <form onSubmit={guardarUsuario} className="row g-2 mb-4 bg-light p-3 rounded border">
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nombre *"
                  value={formUser.nombre}
                  onChange={(e) => setFormUser({ ...formUser, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Apellidos"
                  value={formUser.apellidos}
                  onChange={(e) => setFormUser({ ...formUser, apellidos: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Correo *"
                  value={formUser.correo}
                  onChange={(e) => setFormUser({ ...formUser, correo: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-success btn-sm w-100">
                  {formUser.id ? 'Actualizar Usuario' : 'Nuevo Usuario'}
                </button>
              </div>
            </form>

            <div className="table-responsive">
              <table className="table align-middle small">
                <thead>
                  <tr>
                    <th>RUN</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Comuna</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.run}</td>
                      <td className="fw-semibold">{u.nombre} {u.apellidos}</td>
                      <td>{u.correo}</td>
                      <td><span className="badge bg-secondary">{u.rol}</span></td>
                      <td>{u.comuna}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-info btn-sm me-1"
                          onClick={() => setUsuarioHistorial(u)}
                        >
                          Historial
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => setFormUser(u)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {usuarioHistorial && (
              <div className="mt-3 p-3 bg-light rounded border">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold">
                    Historial de Compras de {usuarioHistorial.nombre} {usuarioHistorial.apellidos}
                  </h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setUsuarioHistorial(null)}
                  />
                </div>
                {orders.filter((o) => o.cliente?.correo === usuarioHistorial.correo).length === 0 ? (
                  <p className="small text-muted mb-0">Sin compras registradas.</p>
                ) : (
                  <ul className="small mb-0">
                    {orders
                      .filter((o) => o.cliente?.correo === usuarioHistorial.correo)
                      .map((o) => (
                        <li key={o.id}>
                          Orden <strong>{o.codigoOrden}</strong> ({o.fecha}) — Total: ${o.total.toLocaleString('es-CL')}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {/* 6. VISTA REPORTES */}
        {seccionActiva === 'reportes' && (
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Reportes Operativos de Farmacia SaludPlus</h4>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="p-3 border rounded bg-light">
                  <h6 className="fw-bold">Valorización de Inventario</h6>
                  <p className="mb-1">
                    Unidades Totales en Bodega: <strong>{inventarioTotal} uds.</strong>
                  </p>
                  <p className="mb-0">
                    Productos en Alerta de Stock Crítico:{' '}
                    <strong className="text-danger">{productosCriticos.length} productos</strong>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 border rounded bg-light">
                  <h6 className="fw-bold">Ventas Acumuladas</h6>
                  <p className="mb-1">
                    Órdenes procesadas: <strong>{orders.length}</strong>
                  </p>
                  <p className="mb-0">
                    Recaudación total:{' '}
                    <strong className="text-success">
                      ${orders.reduce((a, b) => a + b.total, 0).toLocaleString('es-CL')}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. VISTA PERFIL */}
        {seccionActiva === 'perfil' && (
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Perfil del Funcionario / Administrador</h4>
            <p className="mb-1">
              <strong>Nombre:</strong> {currentUser?.nombre || 'Camila'}{' '}
              {currentUser?.apellidos || 'Vargas Rojas'}
            </p>
            <p className="mb-1">
              <strong>Correo institucional:</strong> {currentUser?.correo || 'admin@saludplus.cl'}
            </p>
            <p className="mb-0">
              <strong>Rol asignado:</strong> {currentUser?.rol || 'Administrador'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
