import React, { useEffect } from 'react';
import { Cpu, Box, Settings, Zap, Eye, Wifi, Layers, Package, Archive } from 'lucide-react';
import './HardwareInventory.css';

const categories = [
  { icon: <Cpu size={36} />, label: 'Microcontrollers' },
  { icon: <Eye size={36} />, label: 'Sensors' },
  { icon: <Zap size={36} />, label: 'Actuators' },
  { icon: <Layers size={36} />, label: 'LEDs' },
  { icon: <Wifi size={36} />, label: 'Wires & Connectors' },
  { icon: <Box size={36} />, label: 'Raspberry Pi' },
  { icon: <Archive size={36} />, label: 'Webcams' },
  { icon: <Settings size={36} />, label: 'Modules & Shields' },
];

const HardwareInventory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hardware-inventory-page">
    <div className="hardware-inventory-hero">
      <h1>ISA Hardware Inventory</h1>
      <p>
        <strong>ISA-VESIT</strong> boasts its own extensive hardware inventory, providing members with a wide array of components essential for building innovative projects. Our inventory features multiple variations within each category, ensuring you have the right part for your needs.
      </p>
    </div>
    <div className="hardware-inventory-details">
      <h2>What’s in Our Inventory?</h2>
      <div className="hardware-categories-grid">
        {categories.map((cat) => (
          <div className="hardware-category-card" key={cat.label}>
            <div className="hardware-category-icon">{cat.icon}</div>
            <div className="hardware-category-label">{cat.label}</div>
          </div>
        ))}
      </div>
      <div className="hardware-inventory-description">
        <p>
          From <b>microcontrollers</b> and <b>sensors</b> to <b>actuators</b>, <b>LEDs</b>, <b>wires</b>, <b>Raspberry Pi</b>, <b>webcams</b>, and so much more, our inventory is curated to empower your creativity and technical ambitions. Each category contains multiple variations, so you can always find the perfect fit for your project.
        </p>
        <p>
          <b>Members of ISA</b> can issue these components <b>anytime</b> using our exclusive <span className="lumina-highlight">Lumina App</span>. The process is seamless, fast, and designed to support your journey from idea to implementation.
        </p>
      </div>
      <div className="hardware-inventory-cta">
        <span>Ready to build something amazing?</span>
        <a href="https://play.google.com/store" className="lumina-btn" target="_blank" rel="noopener noreferrer">Issue Components via Lumina</a>
      </div>
    </div>
  </div>
  );
};

export default HardwareInventory; 