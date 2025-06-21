import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import ThreeDPrinter from './pages/ThreeDPrinter';
import Council from './pages/Council';
import ContactUs from './pages/ContactUs';
import Editorials from './pages/Editorials';
import Initiatives from './pages/Initiatives';
import BeBeyond from './pages/BeBeyond';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/3dprinter" element={<ThreeDPrinter />} />
            <Route path="/council" element={<Council />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/editorials" element={<Editorials />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/bebeyond" element={<BeBeyond />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;