# SaludPlus (Farrmacia) — Tienda Online y Sistema de Gestión en React

**Asignatura:** DSY1104 - Desarrollo Fullstack II (Evaluación Parcial 2)  
**Repositorio React:** [https://github.com/pardast-1/Farrmacia](https://github.com/pardast-1/Farrmacia)  
**Repositorio Evaluación 1 (Base HTML/CSS):** [https://github.com/Datreuss/Fullstack](https://github.com/Datreuss/Fullstack)

---

## 1. Descripción del Proyecto

**SaludPlus** es una aplicación web *Single Page Application (SPA)* desarrollada en **React 19** y **Bootstrap 5** para la gestión integral de una Farmacia Comunitaria ubicada en Maipú, Región Metropolitana. En esta segunda etapa se migró la maqueta original en HTML/CSS/JS hacia una arquitectura modular de componentes reutilizables en React bajo el principio de *Single Responsibility*, conservando la identidad visual institucional de **SaludPlus** e incorporando todos los flujos solicitados en la pauta:

### Vistas Públicas de la Tienda
- **Home (`/`)**: Hero banner promocional, acceso por tarjetas de categorías terapéuticas, productos destacados y ofertas.
- **Catálogo de Productos (`/productos`) y Detalle (`/productos/:id`)**: Buscador reactivo por nombre/principio activo/código, filtro por categoría y ordenamiento por precio.
- **Categorías (`/categorias`)**: Selector visual de categorías que separa los medicamentos dinámicamente (Figura 4).
- **Ofertas (`/ofertas`)**: Vista exclusiva con medicamentos en promoción y porcentaje de descuento (Figura 8).
- **Nosotros (`/nosotros`)**, **Blog (`/blog` y `/blog/:id`)** y **Contacto (`/contacto`)**: Artículos de educación farmacéutica y formulario validado.
- **Autenticación (`/login` y `/registro`)**: Inicio de sesión por roles (`Administrador`, `Farmacéutico`, `Cliente`) y registro de pacientes.
- **Carrito de Compras (`/carrito`) y Checkout (`/checkout`)**: Gestión de cantidades en tiempo real, cálculo automático de subtotales/totales, autocompletado de datos si el usuario tiene sesión activa (Figura 6) y vistas de **Compra Exitosa (`/checkout/exito`)** (Figura 7) y **Pago con Error (`/checkout/error`)** (Figura 8).

### Sistema Administrativo (`/admin`)
- **Dashboard (`/admin`)**: Tarjetas de indicadores clave (Compras, Productos, Usuarios) y grilla de 8 módulos administrativos (Figura 9).
- **Órdenes / Boletas**: Listado de compras realizadas y visor detallado de boleta electrónica.
- **Productos (CRUD)**: Mostrar inventario, crear nuevo producto, editar producto existente y filtro de **Listado de Productos Críticos**.
- **Categorías (CRUD)** y **Usuarios (CRUD + Historial de Compras)**: Administración en tiempo real sincronizada con `localStorage`.

---

## 2. Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (Vite)
npm run dev

# 3. Ejecutar suite de pruebas unitarias (10 pruebas estructuradas)
npm test

# 4. Generar reporte de cobertura de código
npm run coverage
```

---

## 3. Credenciales de Prueba

| Rol | Correo | Contraseña | Funcionalidad Destacada |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@saludplus.cl` | `admin123` | Acceso completo al Panel Administrativo (`/admin`) y CRUDs |
| **Cliente** | `pedro.cliente@duocuc.cl` | `cliente123` | Autocompletado automático de datos y dirección en `/checkout` |
| **Farmacéutico** | `qf.daniela@saludplus.cl` | `qf123` | Control de stock crítico y revisión de boletas |
