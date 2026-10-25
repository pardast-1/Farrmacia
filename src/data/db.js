/**
 * ============================================================================
 * ARCHIVO DE DATOS Y PERSISTENCIA SIMULADA (src/data/db.js)
 * SaludPlus - Farmacia Comunitaria (Evaluación Parcial 2 - DSY1104)
 * ============================================================================
 * Incluye:
 * - Catálogo inicial reciclado de SaludPlus (Evaluación 1) + nuevos productos y ofertas
 * - Categorías de farmacia, Usuarios (Admin, Farmacéutico, Clientes), Blogs y Órdenes
 * - Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) sincronizadas con localStorage
 */

const STORAGE_KEYS = {
  PRODUCTS: 'saludplus_products_v2',
  CATEGORIES: 'saludplus_categories_v2',
  USERS: 'saludplus_users_v2',
  ORDERS: 'saludplus_orders_v2',
  BLOGS: 'saludplus_blogs_v2',
  CART: 'saludplus_cart_v2',
  SESSION: 'saludplus_session_v2'
};

export const initialCategories = [
  {
    id: 'cat-1',
    nombre: 'Analgésicos',
    descripcion: 'Medicamentos para el alivio rápido del dolor de cabeza, muscular y estados febriles.',
    icono: 'bi-capsule'
  },
  {
    id: 'cat-2',
    nombre: 'Antiinflamatorios',
    descripcion: 'Tratamientos efectivos para reducir la inflamación articular, muscular y dental.',
    icono: 'bi-bandaid'
  },
  {
    id: 'cat-3',
    nombre: 'Suplementos',
    descripcion: 'Vitaminas, minerales y refuerzos nutricionales para fortalecer el sistema inmune.',
    icono: 'bi-shield-plus'
  },
  {
    id: 'cat-4',
    nombre: 'Cuidado Personal',
    descripcion: 'Productos de higiene, antisepsia, alcohol gel y cuidado dermatológico diario.',
    icono: 'bi-heart-pulse'
  },
  {
    id: 'cat-5',
    nombre: 'Resfrío y Alergias',
    descripcion: 'Descongestionantes, jarabes y antihistamínicos para el cuidado respiratorio.',
    icono: 'bi-lungs'
  },
  {
    id: 'cat-6',
    nombre: 'Botiquín y Equipos',
    descripcion: 'Insumos de primeros auxilios, termómetros digitales y tensiómetros de hogar.',
    icono: 'bi-hospital'
  }
];

export const initialProducts = [
  {
    id: 'P001',
    codigo: 'SP-001',
    nombre: 'Paracetamol 500mg x 20 comprimidos',
    categoria: 'Analgésicos',
    precio: 2990,
    precioOferta: 2390,
    enOferta: true,
    stock: 45,
    stockCritico: 10,
    requiereReceta: false,
    laboratorio: 'Laboratorio Chile',
    principioActivo: 'Paracetamol 500 mg',
    descripcion: 'Analgésico y antipirético de primera línea para el alivio sintomático del dolor leve a moderado y estados febriles.',
    imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P002',
    codigo: 'SP-002',
    nombre: 'Ibuprofeno 400mg x 30 cápsulas blandas',
    categoria: 'Antiinflamatorios',
    precio: 3890,
    precioOferta: 3290,
    enOferta: true,
    stock: 32,
    stockCritico: 10,
    requiereReceta: false,
    laboratorio: 'Mintlab',
    principioActivo: 'Ibuprofeno 400 mg',
    descripcion: 'Antiinflamatorio no esteroideo (AINE) de rápida absorción para dolores musculares, dentales y articulares.',
    imagen: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P003',
    codigo: 'SP-003',
    nombre: 'Vitamina C Efervescente 1000mg x 20 tab',
    categoria: 'Suplementos',
    precio: 4500,
    precioOferta: 3790,
    enOferta: true,
    stock: 28,
    stockCritico: 8,
    requiereReceta: false,
    laboratorio: 'Bago',
    principioActivo: 'Ácido Ascórbico 1000 mg',
    descripcion: 'Suplemento antioxidante efervescente sabor naranja que fortalece las defensas naturales del organismo.',
    imagen: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P004',
    codigo: 'SP-004',
    nombre: 'Alcohol Desinfectante 70° 500ml',
    categoria: 'Cuidado Personal',
    precio: 2490,
    precioOferta: 2490,
    enOferta: false,
    stock: 60,
    stockCritico: 15,
    requiereReceta: false,
    laboratorio: 'Difem Pharma',
    principioActivo: 'Alcohol Etílico 70%',
    descripcion: 'Solución antiséptica de uso tópico para higienización de manos, piel sana y superficies clínicas del hogar.',
    imagen: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P005',
    codigo: 'SP-005',
    nombre: 'Loratadina 10mg x 30 comprimidos',
    categoria: 'Resfrío y Alergias',
    precio: 3490,
    precioOferta: 2790,
    enOferta: true,
    stock: 6,
    stockCritico: 10,
    requiereReceta: false,
    laboratorio: 'Saval',
    principioActivo: 'Loratadina 10 mg',
    descripcion: 'Antihistamínico de acción prolongada sin efecto sedante para el control de rinitis alérgica y alergias estacionales.',
    imagen: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P006',
    codigo: 'SP-006',
    nombre: 'Ketoprofeno 100mg Recubiertos x 20',
    categoria: 'Antiinflamatorios',
    precio: 5990,
    precioOferta: 5990,
    enOferta: false,
    stock: 4,
    stockCritico: 8,
    requiereReceta: true,
    laboratorio: 'Sanofi',
    principioActivo: 'Ketoprofeno 100 mg',
    descripcion: 'Potente antiinflamatorio y antirreumático indicado para traumatismos, lumbagos y procesos inflamatorios agudos.',
    imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P007',
    codigo: 'SP-007',
    nombre: 'Termómetro Clínico Digital Infrarrojo',
    categoria: 'Botiquín y Equipos',
    precio: 14990,
    precioOferta: 11990,
    enOferta: true,
    stock: 12,
    stockCritico: 5,
    requiereReceta: false,
    laboratorio: 'Omron Health',
    principioActivo: 'Sensor Infrarrojo Clínico',
    descripcion: 'Medición precisa de temperatura corporal en 1 segundo sin contacto, con pantalla retroiluminada y alarma febril.',
    imagen: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P008',
    codigo: 'SP-008',
    nombre: 'Complejo Vitamínico B + Magnesio x 60 cap',
    categoria: 'Suplementos',
    precio: 8990,
    precioOferta: 8990,
    enOferta: false,
    stock: 7,
    stockCritico: 10,
    requiereReceta: false,
    laboratorio: 'Nutrapharm',
    principioActivo: 'Vitaminas B1, B6, B12 + Citrato de Magnesio',
    descripcion: 'Fórmula neuroprotectora y energizante que disminuye la fatiga muscular y apoya el sistema nervioso.',
    imagen: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P009',
    codigo: 'SP-009',
    nombre: 'Protector Solar Dermocosmético FPS 50+ 100ml',
    categoria: 'Cuidado Personal',
    precio: 12990,
    precioOferta: 9990,
    enOferta: true,
    stock: 19,
    stockCritico: 6,
    requiereReceta: false,
    laboratorio: 'Eucerin / ISDIN',
    principioActivo: 'Filtros UVA/UVB Toque Seco',
    descripcion: 'Fotoprotección facial y corporal de amplio espectro, hipoalergénico y resistente al agua.',
    imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'P010',
    codigo: 'SP-010',
    nombre: 'Tensiómetro Digital de Brazo Automático',
    categoria: 'Botiquín y Equipos',
    precio: 29990,
    precioOferta: 24990,
    enOferta: true,
    stock: 3,
    stockCritico: 5,
    requiereReceta: false,
    laboratorio: 'Omron Health',
    principioActivo: 'Monitor Presión Arterial',
    descripcion: 'Monitor clínico validado para control domiciliario de hipertensión arterial con memoria de 60 lecturas.',
    imagen: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=500&q=80'
  }
];

export const initialUsers = [
  {
    id: 'U001',
    run: '18.456.789-K',
    nombre: 'Camila',
    apellidos: 'Vargas Rojas',
    correo: 'admin@saludplus.cl',
    password: 'admin123',
    rol: 'Administrador',
    calle: 'Av. Pajaritos 3150',
    departamento: 'Oficina 204',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Maipú'
  },
  {
    id: 'U002',
    run: '19.876.543-2',
    nombre: 'Pedro',
    apellidos: 'Morales Soto',
    correo: 'pedro.cliente@duocuc.cl',
    password: 'cliente123',
    rol: 'Cliente',
    calle: 'Los Crisantemos, Edificio Norte 450',
    departamento: 'Depto 603',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Maipú'
  },
  {
    id: 'U003',
    run: '17.234.567-8',
    nombre: 'Daniela',
    apellidos: 'Fuentes Pino',
    correo: 'qf.daniela@saludplus.cl',
    password: 'qf123',
    rol: 'Farmacéutico',
    calle: 'Av. Vicuña Mackenna 1280',
    departamento: 'Casa 12',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Peñaflor'
  }
];

export const initialBlogs = [
  {
    id: 'blog-1',
    titulo: 'Uso responsable de analgésicos y antiinflamatorios en el hogar',
    fecha: '15 de Octubre, 2026',
    autor: 'Q.F. Daniela Fuentes - Dirección Técnica SaludPlus',
    categoria: 'Educación Farmacéutica',
    resumen: 'Conoce las diferencias clave entre el Paracetamol y el Ibuprofeno, sus dosis seguras y por qué debes evitar la automedicación prolongada.',
    imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    contenido: [
      'En nuestra farmacia comunitaria SaludPlus de Maipú recibimos diariamente consultas sobre qué medicamento elegir frente a un dolor de cabeza, fiebre o molestia muscular. Aunque tanto el Paracetamol como el Ibuprofeno son medicamentos de venta directa en sus dosis habituales, actúan de forma distinta en nuestro organismo.',
      'El Paracetamol (500mg) es principalmente analgésico y antipirético: resulta ideal para bajar la fiebre y aliviar dolores leves a moderados sin irritar la mucosa gástrica. Por su parte, el Ibuprofeno (400mg) pertenece a la familia de los antiinflamatorios no esteroideos (AINEs), por lo que se recomienda cuando existe un componente inflamatorio evidente, como dolor dental, esguinces o inflamación articular.',
      'Recuerda siempre respetar el intervalo de dosificación (cada 6 u 8 horas según indicación), no superar los 4 gramos diarios de paracetamol y consultar con nuestro equipo de Químicos Farmacéuticos si presentas hipertensión arterial o antecedentes gástricos.'
    ]
  },
  {
    id: 'blog-2',
    titulo: 'Guía práctica para fortalecer tu sistema inmune en cambios de estación',
    fecha: '22 de Octubre, 2026',
    autor: 'Equipo Clínico Farmacia SaludPlus Maipú',
    categoria: 'Prevención y Bienestar',
    resumen: 'Descubre cómo la Vitamina C, el Complejo B con Magnesio y una correcta hidratación ayudan a prevenir cuadros respiratorios y alergias estacionales.',
    imagen: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    contenido: [
      'Los cambios bruscos de temperatura en la Región Metropolitana suelen incrementar la circulación de virus respiratorios y crisis de rinitis alérgica. Preparar el sistema inmunológico de manera preventiva es clave para toda la familia.',
      'La suplementación con Vitamina C efervescente (1000 mg) aporta antioxidantes esenciales para el funcionamiento de los leucocitos y favorece la absorción de hierro. Asimismo, combinar vitaminas del Complejo B con Magnesio ayuda a reducir el cansancio físico y mejorar la calidad del descanso nocturno.',
      'En SaludPlus contamos con despacho rápido en Maipú, Peñaflor, Cerrillos y toda la Región Metropolitana para que recibas tus suplementos y antihistamínicos con asesoría farmacéutica personalizada.'
    ]
  }
];

export const initialOrders = [
  {
    id: 'ORD-20260701',
    codigoOrden: 'ORDER202601',
    fecha: '2026-10-20 14:30',
    estado: 'Pagado',
    cliente: {
      nombre: 'Pedro',
      apellidos: 'Morales Soto',
      correo: 'pedro.cliente@duocuc.cl',
      calle: 'Los Crisantemos, Edificio Norte 450',
      departamento: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Maipú',
      indicaciones: 'Entregar en conserjería torre norte.'
    },
    items: [
      { id: 'P001', nombre: 'Paracetamol 500mg x 20 comprimidos', precio: 2390, cantidad: 2, subtotal: 4780 },
      { id: 'P003', nombre: 'Vitamina C Efervescente 1000mg x 20 tab', precio: 3790, cantidad: 1, subtotal: 3790 }
    ],
    total: 8570
  },
  {
    id: 'ORD-20260702',
    codigoOrden: 'ORDER202602',
    fecha: '2026-10-23 18:15',
    estado: 'Pagado',
    cliente: {
      nombre: 'Daniela',
      apellidos: 'Fuentes Pino',
      correo: 'qf.daniela@saludplus.cl',
      calle: 'Av. Vicuña Mackenna 1280',
      departamento: 'Casa 12',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Peñaflor',
      indicaciones: 'Llamar al llegar a portón verde.'
    },
    items: [
      { id: 'P007', nombre: 'Termómetro Clínico Digital Infrarrojo', precio: 11990, cantidad: 1, subtotal: 11990 }
    ],
    total: 11990
  }
];

// Memoria interna respaldada por localStorage para entorno navegador y pruebas unitarias
let memoryProducts = [...initialProducts];
let memoryCategories = [...initialCategories];
let memoryUsers = [...initialUsers];
let memoryOrders = [...initialOrders];
let memoryBlogs = [...initialBlogs];

function loadFromStorage(key, fallback) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        return JSON.parse(raw);
      }
      window.localStorage.setItem(key, JSON.stringify(fallback));
    }
  } catch {
    // Fallback silencioso en modo test
  }
  return [...fallback];
}

function saveToStorage(key, data) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  } catch {
    // Fallback en modo test
  }
}

// Inicialización desde persistencia
memoryProducts = loadFromStorage(STORAGE_KEYS.PRODUCTS, initialProducts);
memoryCategories = loadFromStorage(STORAGE_KEYS.CATEGORIES, initialCategories);
memoryUsers = loadFromStorage(STORAGE_KEYS.USERS, initialUsers);
memoryOrders = loadFromStorage(STORAGE_KEYS.ORDERS, initialOrders);
memoryBlogs = loadFromStorage(STORAGE_KEYS.BLOGS, initialBlogs);

/**
 * Reinicia la base de datos a su estado original (útil en pruebas unitarias)
 */
export function resetDatabase() {
  memoryProducts = [...initialProducts];
  memoryCategories = [...initialCategories];
  memoryUsers = [...initialUsers];
  memoryOrders = [...initialOrders];
  memoryBlogs = [...initialBlogs];
  saveToStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
  saveToStorage(STORAGE_KEYS.CATEGORIES, memoryCategories);
  saveToStorage(STORAGE_KEYS.USERS, memoryUsers);
  saveToStorage(STORAGE_KEYS.ORDERS, memoryOrders);
  saveToStorage(STORAGE_KEYS.BLOGS, memoryBlogs);
  return {
    products: memoryProducts,
    categories: memoryCategories,
    users: memoryUsers,
    orders: memoryOrders
  };
}

// ============================================================================
// 1. CRUD DE PRODUCTOS
// ============================================================================
export function getProducts() {
  return [...memoryProducts];
}

export function getProductById(id) {
  return memoryProducts.find((p) => p.id === id || p.codigo === id) || null;
}

export function getCriticalProducts() {
  return memoryProducts.filter((p) => Number(p.stock) <= Number(p.stockCritico || 10));
}

export function getOfferProducts() {
  return memoryProducts.filter((p) => Boolean(p.enOferta));
}

export function addProduct(nuevoProducto) {
  if (!nuevoProducto || !nuevoProducto.nombre) {
    throw new Error('El nombre del producto es obligatorio');
  }
  const id = nuevoProducto.id || 'P' + Date.now();
  const codigo = nuevoProducto.codigo || 'SP-' + Math.floor(100 + Math.random() * 900);
  const precio = Number(nuevoProducto.precio) || 0;
  const enOferta = Boolean(nuevoProducto.enOferta);
  const precioOferta = enOferta
    ? Number(nuevoProducto.precioOferta) || Math.round(precio * 0.85)
    : precio;

  const productoCreado = {
    id,
    codigo,
    nombre: nuevoProducto.nombre.trim(),
    categoria: nuevoProducto.categoria || 'Analgésicos',
    precio,
    precioOferta,
    enOferta,
    stock: Number(nuevoProducto.stock ?? 10),
    stockCritico: Number(nuevoProducto.stockCritico ?? 5),
    requiereReceta: Boolean(nuevoProducto.requiereReceta),
    laboratorio: nuevoProducto.laboratorio || 'SaludPlus Lab',
    principioActivo: nuevoProducto.principioActivo || 'Fórmula Farmacéutica',
    descripcion: nuevoProducto.descripcion || 'Producto farmacéutico garantizado por SaludPlus.',
    imagen:
      nuevoProducto.imagen ||
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80'
  };

  memoryProducts.push(productoCreado);
  saveToStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
  return productoCreado;
}

export function updateProduct(id, datosActualizados) {
  const index = memoryProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const actual = memoryProducts[index];
  const precio = datosActualizados.precio !== undefined ? Number(datosActualizados.precio) : actual.precio;
  const enOferta = datosActualizados.enOferta !== undefined ? Boolean(datosActualizados.enOferta) : actual.enOferta;
  const precioOferta = enOferta
    ? Number(datosActualizados.precioOferta ?? actual.precioOferta ?? Math.round(precio * 0.85))
    : precio;

  memoryProducts[index] = {
    ...actual,
    ...datosActualizados,
    id: actual.id,
    precio,
    enOferta,
    precioOferta,
    stock: datosActualizados.stock !== undefined ? Number(datosActualizados.stock) : actual.stock,
    stockCritico:
      datosActualizados.stockCritico !== undefined ? Number(datosActualizados.stockCritico) : actual.stockCritico
  };
  saveToStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
  return memoryProducts[index];
}

export function deleteProduct(id) {
  const index = memoryProducts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  memoryProducts.splice(index, 1);
  saveToStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
  return true;
}

// ============================================================================
// 2. CRUD DE CATEGORÍAS
// ============================================================================
export function getCategories() {
  return [...memoryCategories];
}

export function addCategory(nuevaCategoria) {
  if (!nuevaCategoria || !nuevaCategoria.nombre) {
    throw new Error('El nombre de la categoría es obligatorio');
  }
  const creada = {
    id: nuevaCategoria.id || 'cat-' + Date.now(),
    nombre: nuevaCategoria.nombre.trim(),
    descripcion: nuevaCategoria.descripcion || 'Categoría farmacéutica SaludPlus.',
    icono: nuevaCategoria.icono || 'bi-capsule'
  };
  memoryCategories.push(creada);
  saveToStorage(STORAGE_KEYS.CATEGORIES, memoryCategories);
  return creada;
}

export function updateCategory(id, datos) {
  const idx = memoryCategories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  memoryCategories[idx] = { ...memoryCategories[idx], ...datos, id };
  saveToStorage(STORAGE_KEYS.CATEGORIES, memoryCategories);
  return memoryCategories[idx];
}

export function deleteCategory(id) {
  const idx = memoryCategories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  memoryCategories.splice(idx, 1);
  saveToStorage(STORAGE_KEYS.CATEGORIES, memoryCategories);
  return true;
}

// ============================================================================
// 3. CRUD DE USUARIOS
// ============================================================================
export function getUsers() {
  return [...memoryUsers];
}

export function addUser(nuevoUsuario) {
  if (!nuevoUsuario || !nuevoUsuario.correo) {
    throw new Error('El correo del usuario es obligatorio');
  }
  const creado = {
    id: nuevoUsuario.id || 'U' + Date.now(),
    run: nuevoUsuario.run || '19.000.000-1',
    nombre: nuevoUsuario.nombre || 'Usuario',
    apellidos: nuevoUsuario.apellidos || 'SaludPlus',
    correo: nuevoUsuario.correo.trim(),
    password: nuevoUsuario.password || '123456',
    rol: nuevoUsuario.rol || 'Cliente',
    calle: nuevoUsuario.calle || 'Av. Pajaritos 1000',
    departamento: nuevoUsuario.departamento || '',
    region: nuevoUsuario.region || 'Región Metropolitana de Santiago',
    comuna: nuevoUsuario.comuna || 'Maipú'
  };
  memoryUsers.push(creado);
  saveToStorage(STORAGE_KEYS.USERS, memoryUsers);
  return creado;
}

export function updateUser(id, datos) {
  const idx = memoryUsers.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  memoryUsers[idx] = { ...memoryUsers[idx], ...datos, id };
  saveToStorage(STORAGE_KEYS.USERS, memoryUsers);
  return memoryUsers[idx];
}

export function deleteUser(id) {
  const idx = memoryUsers.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  memoryUsers.splice(idx, 1);
  saveToStorage(STORAGE_KEYS.USERS, memoryUsers);
  return true;
}

// ============================================================================
// 4. CRUD DE ÓRDENES / BOLETAS Y BLOGS
// ============================================================================
export function getOrders() {
  return [...memoryOrders];
}

export function getOrdersByUserEmail(correo) {
  if (!correo) return [];
  return memoryOrders.filter((o) => o.cliente?.correo?.toLowerCase() === correo.toLowerCase());
}

export function addOrder(nuevaOrden) {
  const nro = Math.floor(20260705 + memoryOrders.length);
  const ordenCreada = {
    id: nuevaOrden.id || `ORD-${nro}`,
    codigoOrden: nuevaOrden.codigoOrden || `ORDER${nro}`,
    fecha: nuevaOrden.fecha || new Date().toLocaleString('es-CL'),
    estado: nuevaOrden.estado || 'Pagado',
    cliente: nuevaOrden.cliente || {},
    items: nuevaOrden.items || [],
    total: Number(nuevaOrden.total || 0)
  };
  memoryOrders.unshift(ordenCreada);
  saveToStorage(STORAGE_KEYS.ORDERS, memoryOrders);
  return ordenCreada;
}

export function getBlogs() {
  return [...memoryBlogs];
}

export function getBlogById(id) {
  return memoryBlogs.find((b) => b.id === id) || null;
}

// Regiones y comunas para el formulario de Checkout (Figura 6)
export const REGIONES_COMUNAS = {
  'Región Metropolitana de Santiago': [
    'Maipú',
    'Peñaflor',
    'Cerrillos',
    'Santiago Centro',
    'Providencia',
    'Las Condes',
    'Ñuñoa',
    'Pudahuel',
    'La Florida',
    'Puente Alto',
    'Talagante',
    'Padre Hurtado'
  ],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio'],
  'Región del Libertador Gral. Bernardo O’Higgins': ['Rancagua', 'Machalí', 'San Fernando', 'Rengo'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chillán']
};
