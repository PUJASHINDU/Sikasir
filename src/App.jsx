import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePages.jsx';
import NavbarCompenents from './components/NavbarCompenents.jsx';
import PremiumDashboard from './pages/DashboardPages.jsx';
import TransaksiComponents from './components/TransaksiComponents.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/NavbarComponents" element={<NavbarCompenents />} />
        <Route path="/Dashboard" element={<PremiumDashboard/>} />
        <Route path="/Transaksi" element={<TransaksiComponents/>} />   
      </Routes>
    </div>
  );
}

export default App;
