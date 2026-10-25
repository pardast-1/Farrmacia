import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getOrders,
  addOrder,
  getBlogs
} from '../data/db';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => getProducts());
  const [categories, setCategories] = useState(() => getCategories());
  const [users, setUsers] = useState(() => getUsers());
  const [orders, setOrders] = useState(() => getOrders());
  const [blogs] = useState(() => getBlogs());

  const [cart, setCart] = useState(() => {
    try {
      const saved = window.localStorage.getItem('saludplus_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = window.localStorage.getItem('saludplus_session_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [lastOrder, setLastOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem('saludplus_cart_v2', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (currentUser) {
        window.localStorage.setItem('saludplus_session_v2', JSON.stringify(currentUser));
      } else {
        window.localStorage.removeItem('saludplus_session_v2');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const notify = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 3200);
  };

  // Funciones de Carrito
  const addToCart = (product, quantity = 1) => {
    const unitPrice = product.enOferta ? product.precioOferta : product.precio;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          codigo: product.codigo,
          nombre: product.nombre,
          categoria: product.categoria,
          precio: unitPrice,
          imagen: product.imagen,
          cantidad: quantity
        }
      ];
    });
    notify(`"${product.nombre}" añadido al carrito.`);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, cantidad: Math.max(0, item.cantidad + delta) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  // Autenticación
  const login = (correo, password) => {
    const found = users.find(
      (u) =>
        u.correo.toLowerCase() === correo.trim().toLowerCase() &&
        u.password === password
    );
    if (found) {
      setCurrentUser(found);
      notify(`¡Bienvenido(a), ${found.nombre} ${found.apellidos}!`);
      return { ok: true, user: found };
    }
    return { ok: false, error: 'Credenciales inválidas. Verifica tu correo y contraseña.' };
  };

  const registerUser = (userData) => {
    const exists = users.some(
      (u) => u.correo.toLowerCase() === userData.correo.trim().toLowerCase()
    );
    if (exists) {
      return { ok: false, error: 'El correo electrónico ya se encuentra registrado.' };
    }
    const created = addUser({ ...userData, rol: userData.rol || 'Cliente' });
    setUsers(getUsers());
    setCurrentUser(created);
    notify(`Cuenta creada exitosamente para ${created.nombre}.`);
    return { ok: true, user: created };
  };

  const logout = () => {
    setCurrentUser(null);
    notify('Has cerrado sesión correctamente.');
  };

  // Wrappers CRUD Reactivos
  const handleAddProduct = (prod) => {
    const created = addProduct(prod);
    setProducts(getProducts());
    notify(`Producto "${created.nombre}" creado exitosamente.`);
    return created;
  };

  const handleUpdateProduct = (id, data) => {
    const updated = updateProduct(id, data);
    setProducts(getProducts());
    notify(`Producto actualizado correctamente.`);
    return updated;
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
    notify('Producto eliminado del inventario.');
  };

  const handleAddCategory = (cat) => {
    const created = addCategory(cat);
    setCategories(getCategories());
    notify(`Categoría "${created.nombre}" agregada.`);
    return created;
  };

  const handleUpdateCategory = (id, data) => {
    const updated = updateCategory(id, data);
    setCategories(getCategories());
    notify('Categoría actualizada.');
    return updated;
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id);
    setCategories(getCategories());
    notify('Categoría eliminada.');
  };

  const handleAddUser = (u) => {
    const created = addUser(u);
    setUsers(getUsers());
    notify(`Usuario "${created.nombre}" registrado.`);
    return created;
  };

  const handleUpdateUser = (id, data) => {
    const updated = updateUser(id, data);
    setUsers(getUsers());
    if (currentUser && currentUser.id === id) {
      setCurrentUser(updated);
    }
    notify('Datos de usuario actualizados.');
    return updated;
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
    setUsers(getUsers());
    notify('Usuario eliminado.');
  };

  const processCheckoutOrder = (clienteData, simulatePaymentError = false) => {
    const nro = Math.floor(20260705 + orders.length);
    const orderPayload = {
      id: `ORD-${nro}`,
      codigoOrden: `ORDER${nro}`,
      nroBoleta: `${nro}`,
      fecha: new Date().toLocaleString('es-CL'),
      estado: simulatePaymentError ? 'Rechazado' : 'Pagado',
      cliente: clienteData,
      items: cart.map((i) => ({
        ...i,
        subtotal: i.precio * i.cantidad
      })),
      total: cartTotal
    };

    const savedOrder = addOrder(orderPayload);
    setOrders(getOrders());
    setLastOrder(savedOrder);

    if (!simulatePaymentError) {
      // Descontar stock de cada producto comprado
      cart.forEach((item) => {
        const prod = products.find((p) => p.id === item.id);
        if (prod) {
          updateProduct(prod.id, { stock: Math.max(0, prod.stock - item.cantidad) });
        }
      });
      setProducts(getProducts());
      clearCart();
    }

    return savedOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        users,
        orders,
        blogs,
        cart,
        cartTotal,
        cartCount,
        currentUser,
        lastOrder,
        toastMessage,
        setToastMessage,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        login,
        registerUser,
        logout,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
        handleAddUser,
        handleUpdateUser,
        handleDeleteUser,
        processCheckoutOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore debe utilizarse dentro de un StoreProvider');
  }
  return ctx;
}
