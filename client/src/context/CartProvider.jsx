import { useState, useEffect, useMemo } from 'react';
import { CartContext } from './CartContext.js';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts.js';

const CART_STORAGE_KEY = 'quickkart_cart_items';
const ORDERS_STORAGE_KEY = 'quickkart_demo_orders';

export function CartProvider({ children }) {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load initial orders history from localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // LocalStorage write failed
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage error
    }
  }, [orders]);

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const incrementItem = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrementItem = (productId) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: current - 1,
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // Detailed items list with full product data
  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
        if (!product) return null;
        return {
          product,
          quantity,
          lineTotal: product.price * quantity,
          lineOriginalTotal: (product.originalPrice || product.price) * quantity,
        };
      })
      .filter(Boolean);
  }, [cart]);

  // Total quantity count
  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  // Subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [cartItems]);

  // Total savings
  const totalSavings = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.lineOriginalTotal - item.lineTotal);
    }, 0);
  }, [cartItems]);

  // Delivery & handling fees
  // Free delivery above ₹199, otherwise ₹15
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 199 ? 0 : 15;
  const handlingFee = subtotal === 0 ? 0 : 4;
  const grandTotal = subtotal + deliveryFee + handlingFee;

  // Place a demo order
  const placeOrder = (customerDetails) => {
    const orderId = `QK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Order Placed',
      estimatedDeliveryTime: '10-15 mins',
      customer: customerDetails,
      items: cartItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        unit: item.product.unit,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
      pricing: {
        subtotal,
        deliveryFee,
        handlingFee,
        grandTotal,
        totalSavings,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const value = {
    cart,
    cartItems,
    totalCartCount,
    subtotal,
    deliveryFee,
    handlingFee,
    grandTotal,
    totalSavings,
    orders,
    addToCart,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
