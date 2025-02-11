import { Toaster } from 'react-hot-toast';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import FooterComponent from './components/FooterComponent';
import MainContent from './components/MainContent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const App = () => {
  return (
    <div className="app">
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<h2>Log In</h2>} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
};

export default App;
