import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CallWidget from './components/CallWidget';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Catalog from './pages/Catalog';
import Promos from './pages/Promos';
import Reviews from './pages/Reviews';
import Articles from './pages/Articles';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminContent from './pages/admin/AdminContent';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSettings from './pages/admin/AdminSettings';
import AdminStats from './pages/admin/AdminStats';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Админ-панель */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="stats" element={<AdminStats />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <CallWidget />
      </div>
    </Router>
  );
}

export default App;
