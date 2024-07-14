// data.js

import { v4 as uuidv4 } from 'uuid';

// モック商品データ
const products = [
  {
    id: uuidv4(),
    name: '特選抹茶',
    description: '最高級の茶葉を使用した濃厚な抹茶です。',
    price: 2500,
    image: '/api/placeholder/300/300',
    category: '抹茶',
    stock: 50,
  },
  {
    id: uuidv4(),
    name: '抹茶ラテ用パウダー',
    description: '簡単に美味しい抹茶ラテが作れるパウダーです。',
    price: 1800,
    image: '/api/placeholder/300/300',
    category: '抹茶',
    stock: 100,
  },
  {
    id: uuidv4(),
    name: '抹茶茶碗セット',
    description: '伝統的な抹茶茶碗と茶筅のセットです。',
    price: 5000,
    image: '/api/placeholder/300/300',
    category: '茶道具',
    stock: 30,
  },
  {
    id: uuidv4(),
    name: '抹茶スイーツ詰め合わせ',
    description: '抹茶を使用した様々なスイーツの詰め合わせです。',
    price: 3500,
    image: '/api/placeholder/300/300',
    category: 'スイーツ',
    stock: 40,
  },
  // さらに商品を追加...
];

// モックユーザーデータ
const users = [
  {
    id: uuidv4(),
    name: '山田太郎',
    email: 'yamada@example.com',
    password: 'hashedpassword123',
  },
  {
    id: uuidv4(),
    name: '佐藤花子',
    email: 'sato@example.com',
    password: 'hashedpassword456',
  },
  // さらにユーザーを追加...
];

// データ取得関数
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    const product = products.find(p => p.id === id);
    setTimeout(() => resolve(product), 300);
  });
};

export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 500);
  });
};

// データ操作関数
export const addToCart = (userId, productId, quantity) => {
  return new Promise((resolve) => {
    // 実際のAPIでは、ここでカートにアイテムを追加する処理を行う
    console.log(`商品ID: ${productId}を${quantity}個カートに追加しました。(ユーザーID: ${userId})`);
    setTimeout(() => resolve({ success: true }), 300);
  });
};

export const removeFromCart = (userId, productId) => {
  return new Promise((resolve) => {
    // 実際のAPIでは、ここでカートからアイテムを削除する処理を行う
    console.log(`商品ID: ${productId}をカートから削除しました。(ユーザーID: ${userId})`);
    setTimeout(() => resolve({ success: true }), 300);
  });
};

export const placeOrder = (userId, cartItems, shippingInfo) => {
  return new Promise((resolve) => {
    // 実際のAPIでは、ここで注文処理を行う
    console.log(`ユーザーID: ${userId}が注文を行いました。`);
    console.log('注文内容:', cartItems);
    console.log('配送情報:', shippingInfo);
    setTimeout(() => resolve({ orderId: uuidv4(), success: true }), 1000);
  });
};

// フィルタリング関数
export const filterProducts = (products, category) => {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
};

// ソート関数
export const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price);
    case 'name-asc':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
};

// 検索関数
export const searchProducts = (products, searchTerm) => {
  const lowercasedTerm = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercasedTerm) ||
    product.description.toLowerCase().includes(lowercasedTerm)
  );
};

// ページネーション関数
export const paginateProducts = (products, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.slice(startIndex, endIndex);
};

// レビュー関連の関数
export const getProductReviews = (productId) => {
  // モックレビューデータ
  const reviews = [
    { id: uuidv4(), productId, userId: users[0].id, rating: 5, comment: '素晴らしい抹茶の味わいです。' },
    { id: uuidv4(), productId, userId: users[1].id, rating: 4, comment: '香りが豊かで満足しています。' },
    // さらにレビューを追加...
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(reviews), 300);
  });
};

export const addProductReview = (productId, userId, rating, comment) => {
  return new Promise((resolve) => {
    const newReview = {
      id: uuidv4(),
      productId,
      userId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    console.log('新しいレビューが追加されました:', newReview);
    setTimeout(() => resolve(newReview), 300);
  });
};

// 在庫管理関数
export const updateProductStock = (productId, quantity) => {
  return new Promise((resolve) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock -= quantity;
      console.log(`商品ID: ${productId}の在庫を${quantity}個減らしました。残り: ${product.stock}`);
      setTimeout(() => resolve({ success: true, newStock: product.stock }), 300);
    } else {
      setTimeout(() => resolve({ success: false, error: '商品が見つかりません' }), 300);
    }
  });
};

// ユーザー認証関連の関数（モック）
export const authenticateUser = (email, password) => {
  return new Promise((resolve) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setTimeout(() => resolve({ success: true, user: { id: user.id, name: user.name, email: user.email } }), 500);
    } else {
      setTimeout(() => resolve({ success: false, error: 'メールアドレスまたはパスワードが正しくありません' }), 500);
    }
  });
};

export const registerUser = (name, email, password) => {
  return new Promise((resolve) => {
    if (users.some(u => u.email === email)) {
      setTimeout(() => resolve({ success: false, error: 'このメールアドレスは既に使用されています' }), 500);
    } else {
      const newUser = {
        id: uuidv4(),
        name,
        email,
        password, // 実際のアプリケーションではパスワードをハッシュ化する
      };
      users.push(newUser);
      setTimeout(() => resolve({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } }), 500);
    }
  });
};

// 注文履歴関連の関数
export const getUserOrders = (userId) => {
  // モック注文データ
  const orders = [
    { id: uuidv4(), userId, products: [products[0], products[1]], totalAmount: 4300, status: '配送済み', orderDate: '2023-05-01' },
    { id: uuidv4(), userId, products: [products[2]], totalAmount: 5000, status: '処理中', orderDate: '2023-05-15' },
    // さらに注文を追加...
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(orders), 500);
  });
};

// お気に入り関連の関数
export const toggleFavorite = (userId, productId) => {
  return new Promise((resolve) => {
    // 実際のAPIでは、ここでお気に入りの追加/削除処理を行う
    console.log(`ユーザーID: ${userId}が商品ID: ${productId}をお気に入りにトグルしました。`);
    setTimeout(() => resolve({ success: true }), 300);
  });
};

export const getUserFavorites = (userId) => {
  // モックお気に入りデータ
  const favorites = [products[0], products[2]];

  return new Promise((resolve) => {
    setTimeout(() => resolve(favorites), 300);
  });
};