import React, { useState } from "react";
import printerimg from "../assets/images/isaprinter.png";

// 3D Glow Box Wrapper with hover tilt effect and edge glow
const HudBox = ({ children, style = {}, ...props }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...hudBoxStyle,
        transform: hovered ? "rotateX(4deg) rotateY(-4deg)" : "rotateX(2deg) rotateY(2deg)",
        boxShadow: hovered
          ? "0 0 15px #3b82f6, 0 0 30px #3b82f655, 8px 8px 20px rgba(0,0,0,0.6), inset 0 0 6px #3b82f6"
          : "0 0 10px #3b82f6, 0 0 25px #3b82f655, 5px 5px 15px rgba(0,0,0,0.5), inset 0 0 5px #3b82f6",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
      className={`hud-box ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {/* Glowing edge overlay */}
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #3b82f6, #60a5fa, #3b82f6)",
          opacity: hovered ? 0.6 : 0,
          filter: "blur(15px)",
          zIndex: -1,
          transition: "opacity 0.4s ease",
        }}
      />
      {children}
    </div>
  );
};

const ThreeDPrinterPortal = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * 15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div style={{ backgroundColor: "#0f172a", color: "#fff", padding: "2rem", fontFamily: "'Orbitron', sans-serif" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          margin: "3rem 0 2rem",
          color: "#60a5fa",
          textShadow: "0 0 10px #3b82f6",
        }}
      >
        3-D PRINTING PORTAL
      </h1>

      {/* Top Section */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
        <div
          style={{ flex: "1 1 300px", textAlign: "center", perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              display: "inline-block",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: "transform 0.2s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            <img src={printerimg} alt="3D Printer" style={{ width: "250px", height: "auto", margin: "0 auto" }} />
          </div>
        </div>

        <HudBox style={{ flex: "1 1 350px", justifyContent: "center" }}>
          <div style={{ padding: "1.5rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem", letterSpacing: "1.5px", color: "#60a5fa" }}>
              IMAGINATION TO REALITY
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: "1.6" }}>
              <strong>ISA-VESIT’s 3D Printer</strong>, inaugurated on <strong>Jan 14, 2019</strong>, turns virtual ideas
              into real models—empowering students to learn, analyze, and innovate hands-on.
            </p>
          </div>
        </HudBox>
      </div>

      {/* Form & Guidelines */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Form */}
        <HudBox style={{ flex: "1 1 320px", padding: "1.5rem" }}>
          <h3 style={hudHeading}>Personal Details</h3>

          <label>Name</label>
          <input type="text" placeholder="e.g. Firstname Lastname" required style={inputStyle} />

          <label>Email</label>
          <input type="email" placeholder="VES email id" required style={inputStyle} />

          <label>Phone Number</label>
          <input type="tel" placeholder="e.g. 9999999999" required style={inputStyle} />

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem", textAlign: "center", color: "#60a5fa" }}>
            3D Printing Specifications
          </h3>

          <label>Infill %</label>
          <input type="number" min="0" max="100" placeholder="Preferred: 15%" style={inputStyle} />

          <label>Estimated Time (hrs)</label>
          <input type="text" placeholder="Time in Hours" style={inputStyle} />

          <label>Infill Type</label>
          <input type="text" placeholder="Type" style={inputStyle} />

          <label>Resolution</label>
          <select style={inputStyle}>
            <option>Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Color</label>
          <select style={inputStyle}>
            <option>Select</option>
            <option>White</option>
            <option>Black</option>
            <option>Blue</option>
          </select>

          <label>Any Extra Suggestion</label>
          <input type="text" placeholder="e.g. I want 5 copies" style={inputStyle} />

          <label>Job File</label>
          <input type="file" style={inputFileStyle} />

          <button type="submit" style={submitButton}>Submit</button>
        </HudBox>

        {/* Guidelines */}
        <HudBox style={{ flex: "1 1 300px", padding: "1.5rem" }}>
          <h3 style={hudHeading}>GUIDELINES</h3>
          <ol style={{ lineHeight: "1.8", fontSize: "0.9rem", paddingLeft: "1rem" }}>
            <li>
              <strong>File Format</strong>
              <br />
              • Save your design as <code>.STL</code>
              <br />• Ensure the mesh is manifold (watertight, no holes)
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong>Printer & Slicer</strong>
              <br />
              • Use software like FlashPrint (for FlashForge printers)
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong>Time & Material Constraints</strong>
              <br />
              • Max print time: ≤ 6 hours
              <br />
              • Max object weight: ≤ 25 grams
              <br />
              • Use PLA for fast, lightweight prints
            </li>
          </ol>
        </HudBox>
      </div>
    </div>
  );
};

// Glow Box Style
const hudBoxStyle = {
  position: "relative",
  backgroundColor: "#0f172a",
  padding: "1.5rem",
  color: "#fff",
  clipPath:
    "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)",
  border: "2px solid #3b82f6",
  backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 75%, transparent 75%, transparent)`,
  backgroundSize: "40px 40px",
  fontFamily: "'Orbitron', sans-serif",
  perspective: "800px",
  transformStyle: "preserve-3d",
  willChange: "transform",
  width: "fit-content",
  maxWidth: "100%",
  overflow: "hidden",
};

// Heading Style
const hudHeading = {
  fontSize: "1.2rem",
  marginBottom: "1.5rem",
  textAlign: "center",
  color: "#60a5fa",
  textShadow: "0 0 8px #3b82f6",
};

// Input Fields
const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  margin: "0.5rem 0 1rem",
  borderRadius: "0.4rem",
  border: "1px solid #3b82f6",
  backgroundColor: "#1e293b",
  color: "#fff",
};

// File Upload
const inputFileStyle = {
  marginBottom: "1rem",
  backgroundColor: "#1e293b",
  borderRadius: "4px",
  color: "#fff",
  border: "1px solid #3b82f6",
  padding: "0.4rem",
  width: "100%",
};

// Submit Button
const submitButton = {
  width: "100%",
  padding: "0.6rem",
  backgroundColor: "#3b82f6",
  border: "none",
  borderRadius: "0.5rem",
  fontWeight: "bold",
  cursor: "pointer",
  color: "#fff",
};

export default ThreeDPrinterPortal;
