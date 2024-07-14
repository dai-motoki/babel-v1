// data.js

import { useState, useEffect } from 'react';

// モックデータ
const products = [
  { id: 1, name: '抹茶パウダー', price: 1200, category: '抹茶', image: '/api/placeholder/300/300', description: '高品質な抹茶パウダーです。' },
  { id: 2, name: '玉露', price: 2000, category: '茶葉', image: '/api/placeholder/300/300', description: '最高級の玉露です。' },
  { id: 3, name: '煎茶', price: 800, category: '茶葉', image: '/api/placeholder/300/300', description: '爽やかな香りの煎茶です。' },
  { id: 4, name: '抹茶ラテ', price: 500, category: '飲料', image: '/api/placeholder/300/300', description: '濃厚な抹茶ラテです。' },
  { id: 5, name: '茶道セット', price: 15000, category: '茶道具', image: '/api/placeholder/300/300', description: '伝統的な茶道セットです。' },
  // 他の商品データ...
];

const users = [
  { id: 1, name: '山田太郎', email: 'yamada@example.com' },
  { id: 2, name: '佐藤花子', email: 'sato@example.com' },
  // 他のユーザーデータ...
];

// データ処理関数
export const useProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // 非同期データ取得をシミュレート
    setTimeout(() => {
      setProductList(products);
    }, 500);
  }, []);

  return productList;
};

export const useProductDetails = (productId) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 非同期データ取得をシミュレート
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      setProduct(foundProduct);
    }, 300);
  }, [productId]);

  return product;
};

export const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // ローカルストレージからカートデータを取得
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const existingItem = updatedCart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }
      // ローカルストレージに保存
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      // ローカルストレージに保存
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      // ローカルストレージに保存
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return { cart, addToCart, removeFromCart, updateQuantity };
};

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ユーザー認証をシミュレート
    setTimeout(() => {
      setUser(users[0]); // 仮のユーザーデータ
    }, 1000);
  }, []);

  return user;
};

export const useCheckout = () => {
  const submitOrder = (orderData) => {
    // 注文処理をシミュレート
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('注文データ:', orderData);
        resolve({ success: true, orderId: 'ORD-' + Date.now() });
      }, 1500);
    });
  };

  return { submitOrder };
};

export const useProductFilter = (products) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ category: '', minPrice: 0, maxPrice: Infinity });

  useEffect(() => {
    const filtered = products.filter(product => {
      return (
        (filters.category === '' || product.category === filters.category) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
      );
    });
    setFilteredProducts(filtered);
  }, [products, filters]);

  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return { filteredProducts, updateFilters };
};

// 他のデータ処理関数やモックデータ...