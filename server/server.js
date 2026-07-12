const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// MONGOOSE MODELS
// =======================
const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  image: String,
  packSize: String,
  density: String,
  color: String
});
const Product = mongoose.model('Product', ProductSchema);

const CategorySchema = new mongoose.Schema({ name: String });
const Category = mongoose.model('Category', CategorySchema);

const ReviewSchema = new mongoose.Schema({
  author: String,
  text: String,
  status: { type: String, default: 'approved' }
});
const Review = mongoose.model('Review', ReviewSchema);

const OrderSchema = new mongoose.Schema({
  date: String,
  total: Number,
  status: String,
  items: String
});
const Order = mongoose.model('Order', OrderSchema);

const ArticleSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  status: { type: String, default: 'published' }
});
const Article = mongoose.model('Article', ArticleSchema);

const PromoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  status: { type: String, default: 'published' }
});
const Promo = mongoose.model('Promo', PromoSchema);

const SettingsSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String
});
const Settings = mongoose.model('Settings', SettingsSchema);

// =======================
// DB CONNECTION & SEEDING
// =======================
mongoose.connect('mongodb://127.0.0.1:27017/stationery_store')
  .then(async () => {
    console.log('MongoDB Connected to stationery_store');
    
    // Seed DB if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding initial data...');
      
      await Category.insertMany([
        { name: 'Бумага' }, { name: 'Ручки' }, { name: 'Папки' }, { name: 'Наборы' }
      ]);

      await Product.insertMany([
        { name: 'Бумага офисная A4, 500 листов', brand: 'SvetoCopy', price: 350, image: '/images/1.webp', category: 'Бумага', density: '80 г/м²', packSize: '500 шт' },
        { name: 'Набор шариковых ручек', brand: 'Pilot', price: 250, image: '/images/33312.jpg', category: 'Ручки', color: 'Синий', packSize: '4 шт' },
        { name: 'Папка-регистратор', brand: 'ErichKrause', price: 180, image: '/images/6308221_2_portfel_plastikovyj_matt_ice_metallic_fc_serebrjanyj.jpg', category: 'Папки', color: 'Черный' },
        { name: 'Набор маркеров 4 цвета', brand: 'Stabilo', price: 420, image: '/images/1521202051 (9).jpg', category: 'Наборы', color: 'Разноцветный', packSize: '4 шт' }
      ]);

      await Article.insertMany([
        { title: 'Как выбрать идеальную бумагу для принтера', desc: 'Разбираемся в плотности, белизне и других характеристиках офисной бумаги.', image: '/images/gray_m_1-4.png.webp', status: 'published' },
        { title: 'Топ-5 ручек для тех, кто много пишет', desc: 'Сравниваем шариковые, гелевые и капиллярные ручки.', image: '/images/L_height.webp', status: 'published' }
      ]);

      await Promo.insertMany([
        { title: 'Скидка 15% на всю бумагу SvetoCopy', desc: 'Запаситесь бумагой для офиса с выгодой. Акция действует до конца месяца.', status: 'published' },
        { title: 'Подарок при покупке от 3000 ₽', desc: 'Оформите заказ на сумму от 3000 рублей и получите набор маркеров Stabilo в подарок!', status: 'published' }
      ]);

      await Review.insertMany([
        { text: "Заказывали большую партию бумаги А4 и канцелярских наборов для всего офиса. Менеджер очень быстро обработал заказ, предложил выгодную цену с учетом опта, а доставка была на следующий же день.", author: "Иван С.", status: 'approved' },
        { text: "Нужно было срочно собрать ребенка в школу, а в обычных магазинах уже пустые полки и очереди. Нашла на вашем сайте готовый набор «Школьный базовый» — просто спасение!", author: "Елена П.", status: 'approved' },
        { text: "Постоянно покупаю у вас ручки, маркеры и бумагу для работы. Нравится, что ассортимент всегда актуальный, цены ниже, чем у конкурентов, а сайт очень удобный.", author: "Алексей Р.", status: 'approved' }
      ]);

      await Settings.create({
        phone: '+7 (495) 010-00-10',
        email: 'zakaz@kancmag.ru',
        address: 'г. Москва, ул. Канцелярская, д. 1'
      });
      
      await Order.insertMany([
        { date: '10.08.2023', total: 850, status: 'Доставлен', items: 'Бумага офисная A4, 500 листов (1шт), Набор шариковых ручек (2шт)' },
        { date: '05.09.2023', total: 970, status: 'Передан в службу доставки', items: 'Набор маркеров 4 цвета (1шт), Папка-регистратор (2шт)' }
      ]);
      
      console.log('Seeding completed!');
    }
  })
  .catch(err => console.error('MongoDB Connection Error:', err));


// =======================
// ROUTES API HELPER
// =======================
// Мы можем использовать универсальный хелпер для CRUD
const generateCRUDRoutes = (Model, routeName) => {
  // GET all
  app.get(`/api/${routeName}`, async (req, res) => {
    try {
      const data = await Model.find();
      res.json(data);
    } catch(e) { res.status(500).json({ error: e.message }); }
  });

  // POST create
  app.post(`/api/${routeName}`, async (req, res) => {
    try {
      const doc = new Model(req.body);
      await doc.save();
      res.status(201).json(doc);
    } catch(e) { res.status(400).json({ error: e.message }); }
  });

  // PUT update
  app.put(`/api/${routeName}/:id`, async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(doc);
    } catch(e) { res.status(400).json({ error: e.message }); }
  });

  // DELETE
  app.delete(`/api/${routeName}/:id`, async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted' });
    } catch(e) { res.status(400).json({ error: e.message }); }
  });
};

// Регистрация маршрутов
generateCRUDRoutes(Product, 'products');
generateCRUDRoutes(Review, 'reviews');
generateCRUDRoutes(Order, 'orders');
generateCRUDRoutes(Article, 'articles');
generateCRUDRoutes(Promo, 'promos');

// Категории (простые строки или объекты)
app.get('/api/categories', async (req, res) => {
  const cats = await Category.find();
  res.json(cats.map(c => c.name));
});
app.post('/api/categories', async (req, res) => {
  const cat = new Category({ name: req.body.name });
  await cat.save();
  res.json(cat.name);
});
app.delete('/api/categories/:name', async (req, res) => {
  await Category.findOneAndDelete({ name: req.params.name });
  res.json({ message: 'Deleted' });
});

// Настройки (всегда один документ)
app.get('/api/settings', async (req, res) => {
  let settings = await Settings.findOne();
  res.json(settings);
});
app.put('/api/settings', async (req, res) => {
  let settings = await Settings.findOne();
  if(!settings) {
    settings = new Settings(req.body);
    await settings.save();
  } else {
    settings = await Settings.findByIdAndUpdate(settings._id, req.body, {new:true});
  }
  res.json(settings);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
