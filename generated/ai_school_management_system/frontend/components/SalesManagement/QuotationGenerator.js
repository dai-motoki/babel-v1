import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { X, Plus, Download, Send } from 'lucide-react';

const QuotationGenerator = () => {
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [companyName, setCompanyName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quoteNumber, setQuoteNumber] = useState('');
  const [quoteDate, setQuoteDate] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    const sum = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotal(sum);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const QuotePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>見積書</Text>
          <Text style={styles.text}>会社名: {companyName}</Text>
          <Text style={styles.text}>顧客名: {customerName}</Text>
          <Text style={styles.text}>見積番号: {quoteNumber}</Text>
          <Text style={styles.text}>見積日: {quoteDate}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>項目</Text>
            <Text style={styles.tableHeader}>数量</Text>
            <Text style={styles.tableHeader}>単価</Text>
            <Text style={styles.tableHeader}>金額</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.quantity * item.price}</Text>
            </View>
          ))}
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>合計: ¥{total.toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">見積書生成</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">会社名</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">顧客名</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">見積番号</label>
            <input
              type="text"
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">見積日</label>
            <input
              type="date"
              value={quoteDate}
              onChange={(e) => setQuoteDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">項目</h2>
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                placeholder="項目名"
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                placeholder="数量"
                className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                placeholder="単価"
                className="w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200"
              />
              <button
                onClick={() => handleRemoveItem(index)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddItem}
            className="mt-2 flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            <Plus size={20} />
            <span>項目を追加</span>
          </button>
        </div>
        <div className="text-right text-xl font-bold mb-4">
          合計: ¥{total.toLocaleString()}
        </div>
        <div className="flex justify-end space-x-4">
          <PDFDownloadLink document={<QuotePDF />} fileName="見積書.pdf">
            {({ blob, url, loading, error }) =>
              loading ? (
                '読み込み中...'
              ) : (
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 flex items-center space-x-2">
                  <Download size={20} />
                  <span>PDFダウンロード</span>
                </button>
              )
            }
          </PDFDownloadLink>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
            <Send size={20} />
            <span>メール送信</span>
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">プレビュー</h2>
        <div className="border-2 border-gray-200 p-4 rounded-lg">
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-500">
            見積書プレビュー
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableHeader: { margin: 'auto', fontSize: 12, fontWeight: 'bold', padding: 5, borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', fontSize: 10, padding: 5, borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  total: { marginTop: 20 },
  totalText: { fontSize: 14, fontWeight: 'bold' },
});

export default QuotationGenerator;