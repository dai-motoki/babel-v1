import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, Lock, Check, X } from 'lucide-react';

const PaymentProcessing = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // 支払い処理のシミュレーション
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80%の確率で成功
      setPaymentStatus(success);
      setIsProcessing(false);
    }, 2000);
  };

  const resetForm = () => {
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setName('');
    setAmount('');
    setPaymentStatus(null);
  };

  useEffect(() => {
    if (paymentStatus !== null) {
      const timer = setTimeout(() => {
        resetForm();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 text-white py-4 px-6">
          <h2 className="text-2xl font-semibold">支払い処理</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              カード番号
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="cardNumber"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                有効期限
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="expiryDate"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="cvv"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              カード名義
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="TARO YAMADA"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              支払い金額
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">¥</span>
              </div>
              <input
                type="number"
                id="amount"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">円</span>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isProcessing}
            >
              {isProcessing ? '処理中...' : '支払いを完了する'}
            </button>
          </div>
        </form>
        {paymentStatus !== null && (
          <div className={`p-4 ${paymentStatus ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {paymentStatus ? (
                  <Check className="h-5 w-5 text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${paymentStatus ? 'text-green-800' : 'text-red-800'}`}>
                  {paymentStatus ? '支払いが完了しました' : '支払いに失敗しました'}
                </h3>
                <div className={`mt-2 text-sm ${paymentStatus ? 'text-green-700' : 'text-red-700'}`}>
                  <p>
                    {paymentStatus
                      ? 'ご購入ありがとうございます。確認メールをお送りしました。'
                      : 'お手数ですが、カード情報を確認の上、再度お試しください。'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">支払い方法</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <img src="/path/to/visa-logo.png" alt="Visa" className="h-8 w-12 object-contain" />
                <span className="ml-2 text-sm text-gray-600">Visa</span>
              </div>
              <div className="flex items-center">
                <img src="/path/to/mastercard-logo.png" alt="Mastercard" className="h-8 w-12 object-contain" />
                <span className="ml-2 text-sm text-gray-600">Mastercard</span>
              </div>
              <div className="flex items-center">
                <img src="/path/to/amex-logo.png" alt="American Express" className="h-8 w-12 object-contain" />
                <span className="ml-2 text-sm text-gray-600">American Express</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;