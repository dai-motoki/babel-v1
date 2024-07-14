import { faker } from '@faker-js/faker';

// 商品データを生成する関数
const generateProductData = (numProducts = 10) => {
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    const productName = faker.commerce.productName();
    const price = faker.commerce.price();
    const imageUrl = faker.image.unsplash.image({
      width: 300,
      height: 300,
      query: 'tea,matcha',
    });

    products.push({
      id: faker.datatype.uuid(),
      name: productName,
      description: faker.lorem.paragraph(),
      price: parseFloat(price),
      imageUrl: imageUrl,
    });
  }

  return products;
};

// チャートデータを生成する関数
const generateChartData = (numPoints = 10) => {
  const data = [];

  for (let i = 0; i < numPoints; i++) {
    data.push({
      name: faker.date.recent().toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
      value: faker.datatype.number({ min: 10, max: 100 }),
    });
  }

  return data;
};

// 商品データとチャートデータを生成
const products = generateProductData();
const chartData = generateChartData();

// 生成したデータをエクスポート
export { products, chartData };
