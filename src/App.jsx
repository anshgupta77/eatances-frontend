import './App.css'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import DishPage from './pages/DishesPage';
function Layout(element){
  return (
    <>
      <Header />
      <Navbar />
      {element} 
      <Connect />
      <Footer />
    </>
  )}

function App() { 
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dish/counter/:id" element={<DishPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
