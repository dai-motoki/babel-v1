import { useState, useEffect, useCallback, useContext, createContext } from 'react';

// テーマコンテキスト
const ThemeContext = createContext();

// テーマプロバイダー
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// テーマフック
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ウィンドウサイズフック
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// スクロールフック
export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollPosition;
};

// ローカルストレージフック
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// カートフック
export const useCart = () => {
  const [cart, setCart] = useLocalStorage('cart', []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal };
};

// フィルターフック
export const useFilter = (initialItems) => {
  const [items, setItems] = useState(initialItems);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filteredItems = initialItems.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key] === value;
      });
    });
    setItems(filteredItems);
  }, [filters, initialItems]);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return { items, filters, updateFilter };
};

// ページネーションフック
export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, maxPage)));
  };

  return { currentItems, currentPage, maxPage, changePage };
};

// フォームバリデーションフック
export const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('Form is valid! Submitting...', values);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, values]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

// 画像ローダーフック
export const useImageLoader = (imageSrc) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setLoading(false);
    img.onerror = () => {
      setLoading(false);
      setError('画像の読み込みに失敗しました。');
    };
  }, [imageSrc]);

  return { loading, error };
};

// アニメーションフック
export const useAnimation = (initialState = false) => {
  const [isAnimating, setIsAnimating] = useState(initialState);

  const startAnimation = () => setIsAnimating(true);
  const stopAnimation = () => setIsAnimating(false);

  return { isAnimating, startAnimation, stopAnimation };
};

// 国際化フック
export const useI18n = () => {
  const [language, setLanguage] = useState('ja');
  const [translations, setTranslations] = useState({});

  const changeLanguage = async (lang) => {
    try {
      const response = await fetch(`/api/translations/${lang}.json`);
      const data = await response.json();
      setTranslations(data);
      setLanguage(lang);
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  };

  const t = (key) => translations[key] || key;

  return { language, changeLanguage, t };
};

// エラーハンドリングフック
export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    console.error(err);
    setError(err.message || 'エラーが発生しました。');
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};