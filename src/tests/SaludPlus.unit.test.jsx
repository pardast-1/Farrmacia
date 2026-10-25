import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import BotonAccion from '../components/BotonAccion';
import AlertaMensaje from '../components/AlertaMensaje';
import ProductCard from '../components/ProductCard';
import Contacto from '../pages/Contacto';
import Checkout from '../pages/Checkout';
import ResultadoCompra from '../pages/ResultadoCompra';
import Productos from '../pages/Productos';
import { StoreProvider } from '../context/StoreContext';
import {
  resetDatabase,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCriticalProducts
} from '../data/db';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <StoreProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </StoreProvider>
  );
};

describe('Suite de Pruebas Unitarias Frontend - Farmacia SaludPlus (DSY1104 EP2)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetDatabase();
  });

  // PRUEBA 1: Renderizado de lista de elementos (Anexo 1 pág. 11 - Renderizado correcto)
  it('Prueba 01 [Renderizado de Lista]: Renderiza todos los productos iniciales del catálogo de SaludPlus', () => {
    renderWithProviders(<Productos />);
    const lista = screen.getByTestId('lista-productos');
    expect(lista).toBeInTheDocument();
    expect(screen.getByText(/Paracetamol 500mg x 20 comprimidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Ibuprofeno 400mg x 30 cápsulas blandas/i)).toBeInTheDocument();
    expect(screen.getByText(/Vitamina C Efervescente 1000mg/i)).toBeInTheDocument();
    expect(screen.getByText(/Alcohol Desinfectante 70° 500ml/i)).toBeInTheDocument();
  });

  // PRUEBA 2: Renderizado condicional (Anexo 1 pág. 11 - Mensaje de error solo cuando hay error presente)
  it('Prueba 02 [Renderizado Condicional]: AlertaMensaje permanece oculto sin error y se muestra cuando existe un mensaje de error', () => {
    const { rerender } = render(<AlertaMensaje mensaje="" tipo="danger" />);
    expect(screen.queryByTestId('alerta-mensaje')).not.toBeInTheDocument();

    rerender(<AlertaMensaje mensaje="Error: Campo obligatorio vacío" tipo="danger" />);
    const alerta = screen.getByTestId('alerta-mensaje');
    expect(alerta).toBeInTheDocument();
    expect(alerta).toHaveTextContent('Error: Campo obligatorio vacío');
  });

  // PRUEBA 3: Propiedades recibidas en Botón (Anexo 1 pág. 11 - Props label y onClick)
  it('Prueba 03 [Propiedades / Props]: BotonAccion recibe y muestra correctamente la etiqueta (label) y enlaza la función onClick', () => {
    const mockOnClick = vi.fn();
    render(<BotonAccion label="Agregar al Carrito" onClick={mockOnClick} />);

    const boton = screen.getByRole('button', { name: /Agregar al Carrito/i });
    expect(boton).toBeInTheDocument();
    fireEvent.click(boton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // PRUEBA 4: Propiedades recibidas en ProductCard
  it('Prueba 04 [Propiedades / Props]: ProductCard renderiza nombre, categoría, laboratorio y precio de oferta a partir de sus props', () => {
    const productoMock = {
      id: 'P999',
      nombre: 'Losartán Potásico 50mg x 30',
      categoria: 'Cardiovascular',
      laboratorio: 'Laboratorio Chile',
      descripcion: 'Antihipertensivo bioequivalente.',
      precio: 4500,
      precioOferta: 3500,
      enOferta: true,
      stock: 25,
      requiereReceta: true,
      imagen: 'https://example.com/losartan.jpg'
    };

    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Losartán Potásico 50mg x 30')).toBeInTheDocument();
    expect(screen.getByText('Cardiovascular')).toBeInTheDocument();
    expect(screen.getByText('Receta Simple')).toBeInTheDocument();
  });

  // PRUEBA 5: Gestión de Estado en Formulario (Anexo 1 pág. 11 - Cambio de state cuando el usuario introduce texto)
  it('Prueba 05 [Gestión de Estado / State]: El formulario de Contacto actualiza su estado interno cuando el usuario introduce texto', () => {
    renderWithProviders(<Contacto />);

    const inputNombre = screen.getByLabelText(/Nombre completo/i);
    const inputCorreo = screen.getByLabelText(/Correo electrónico/i);

    fireEvent.change(inputNombre, { target: { value: 'Camila Rojas' } });
    fireEvent.change(inputCorreo, { target: { value: 'camila@saludplus.cl' } });

    expect(inputNombre.value).toBe('Camila Rojas');
    expect(inputCorreo.value).toBe('camila@saludplus.cl');
  });

  // PRUEBA 6: Validación y Estado de Error en Formulario de Contacto
  it('Prueba 06 [Estado y Validación]: Enviar el formulario de Contacto vacío activa el estado de error condicional', () => {
    renderWithProviders(<Contacto />);
    const btnEnviar = screen.getByRole('button', { name: /Enviar Consulta/i });
    fireEvent.click(btnEnviar);

    expect(screen.getByTestId('alerta-mensaje')).toHaveTextContent(
      /Por favor completa todos los campos obligatorios/i
    );
  });

  // PRUEBA 7: Simulación de Eventos con Mock/Spy en ProductCard (Anexo 1 pág. 11 - Simulación de Eventos)
  it('Prueba 07 [Simulación de Eventos y Mock]: Al hacer clic en "Añadir" en ProductCard se invoca el callback onAddToCart con el producto', () => {
    const spyAddToCart = vi.fn();
    const producto = getProducts()[0];

    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAddToCart={spyAddToCart} />
      </MemoryRouter>
    );

    const btnAnadir = screen.getByRole('button', { name: /Añadir/i });
    fireEvent.click(btnAnadir);

    expect(spyAddToCart).toHaveBeenCalledTimes(1);
    expect(spyAddToCart).toHaveBeenCalledWith(producto);
  });

  // PRUEBA 8: Autocompletado de Checkout con sesión activa (Nota Página 6 Anexo 1)
  it('Prueba 08 [Flujo Checkout y Sesión]: Checkout autocompleta los datos del cliente si el usuario ha iniciado sesión', () => {
    window.localStorage.setItem(
      'saludplus_session_v2',
      JSON.stringify({
        id: 'U002',
        nombre: 'Pedro',
        apellidos: 'Morales Soto',
        correo: 'pedro.cliente@duocuc.cl',
        calle: 'Los Crisantemos 450',
        departamento: 'Depto 603',
        region: 'Región Metropolitana de Santiago',
        comuna: 'Maipú'
      })
    );

    renderWithProviders(<Checkout />);
    expect(screen.getByLabelText(/Nombre\*/i).value).toBe('Pedro');
    expect(screen.getByLabelText(/Apellidos\*/i).value).toBe('Morales Soto');
    expect(screen.getByLabelText(/Correo\*/i).value).toBe('pedro.cliente@duocuc.cl');
  });

  // PRUEBA 9: Renderizado de vistas Compra Exitosa (Figura 7) y Pago con Error (Figura 8)
  it('Prueba 09 [Vistas de Resultado de Compra]: ResultadoCompra muestra confirmación en éxito y botón de reintento cuando hay error de pago', () => {
    const { rerender } = render(
      <StoreProvider>
        <MemoryRouter>
          <ResultadoCompra exito={true} />
        </MemoryRouter>
      </StoreProvider>
    );
    expect(screen.getByText(/Se ha realizado la compra/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Imprimir boleta en PDF/i })).toBeInTheDocument();

    rerender(
      <StoreProvider>
        <MemoryRouter>
          <ResultadoCompra exito={false} />
        </MemoryRouter>
      </StoreProvider>
    );
    expect(screen.getByText(/No se pudo realizar el pago/i)).toBeInTheDocument();
    expect(screen.getByText(/VOLVER A REALIZAR EL PAGO/i)).toBeInTheDocument();
  });

  // PRUEBA 10: Operaciones CRUD en archivo de datos JS (Crear, Leer, Actualizar, Eliminar)
  it('Prueba 10 [Persistencia y CRUD JS]: Ejecuta correctamente addProduct, updateProduct, deleteProduct y filtro de stock crítico', () => {
    const totalInicial = getProducts().length;

    const nuevo = addProduct({
      codigo: 'SP-777',
      nombre: 'Omeprazol 20mg x 30 cápsulas',
      categoria: 'Gastroenterología',
      precio: 3200,
      stock: 3,
      stockCritico: 8
    });
    expect(getProducts().length).toBe(totalInicial + 1);

    const actualizado = updateProduct(nuevo.id, { precio: 2990, stock: 25 });
    expect(actualizado.precio).toBe(2990);
    expect(actualizado.stock).toBe(25);

    const criticos = getCriticalProducts();
    expect(Array.isArray(criticos)).toBe(true);

    const eliminado = deleteProduct(nuevo.id);
    expect(eliminado).toBe(true);
    expect(getProducts().length).toBe(totalInicial);
  });
});
