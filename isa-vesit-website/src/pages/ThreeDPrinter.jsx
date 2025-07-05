import React, { useState } from "react";
import printerimg from "../assets/images/isaprinter.png";


const HudBox = ({ children, style = {}, ...props }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...hudBoxStyle,
        transform: hovered ? "rotateX(4deg) rotateY(-4deg)" : "rotateX(2deg) rotateY(2deg)",
        boxShadow: hovered
          ? "8px 8px 20px rgba(0,0,0,0.6), inset 0 0 8px rgba(96, 165, 250, 0.4)" 
          : "5px 5px 15px rgba(0,0,0,0.5), inset 0 0 5px rgba(96, 165, 250, 0.2)", 
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
      className={`hud-box ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
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
    <div style={{ backgroundColor: "#0f172a", color: "#fff", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          margin: "6rem 0 2rem",
          color: "#60a5fa",
          textShadow: "none",
        }}
      >
        3-D PRINTING PORTAL
      </h1>

    
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
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                letterSpacing: "1.5px",
                color: "#60a5fa",
                textShadow: "none",
              }}
            >
              IMAGINATION TO REALITY
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: "1.6" }}> {/* Increased font size here */}
              <strong>ISA-VESIT’s 3D Printer</strong>, inaugurated on <strong>Jan 14, 2019</strong>, turns virtual ideas
              into real models—empowering students to learn, analyze, and innovate hands-on.
            </p>
          </div>
        </HudBox>
      </div>

 
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

        <HudBox style={{ flex: "1 1 320px", padding: "1.5rem" }}>
          <h3 style={{ ...hudHeading, fontSize: "1.4rem", textShadow: "none" }}>Personal Details</h3>

          <label style={{ fontSize: "0.95rem" }}>Name</label>
          <input type="text" placeholder="e.g. Firstname Lastname" required style={inputStyle} />

          <label style={{ fontSize: "0.95rem" }}>Email</label>
          <input type="email" placeholder="VES email id" required style={inputStyle} />

          <label style={{ fontSize: "0.95rem" }}>Phone Number</label>
          <input type="tel" placeholder="e.g. 9999999999" required style={inputStyle} />

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem", textAlign: "center", color: "#60a5fa", fontSize: "1.4rem", textShadow: "none" }}>
            3D Printing Specifications
          </h3>

          <label style={{ fontSize: "0.95rem" }}>Infill %</label>
          <input type="number" min="0" max="100" placeholder="Preferred: 15%" style={inputStyle} />

          <label style={{ fontSize: "0.95rem" }}>Estimated Time (hrs)</label>
          <input type="text" placeholder="Time in Hours" style={inputStyle} />

          <label style={{ fontSize: "0.95rem" }}>Infill Type</label>
          <input type="text" placeholder="Type" style={inputStyle} />

          <label style={{ fontSize: "0.95rem" }}>Resolution</label>
          <select style={inputStyle}>
            <option>Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label style={{ fontSize: "0.95rem" }}>Color</label>
          <select style={inputStyle}>
            <option>Select</option>
            <option>White</option>
            <option>Black</option>
            <option>Blue</option>
          </select>

          <label style={{ fontSize: "0.95rem" }}>Any Extra Suggestion</label>
          <input type="text" placeholder="e.g. I want 5 copies" style={inputStyle} />

          <label style={{ fontSize: "0.95rem" }}>Job File</label>
          <input type="file" style={inputFileStyle} />

          <button type="submit" style={{ ...submitButton, fontWeight: "600" }}>Submit</button>
        </HudBox>


        <HudBox style={{ flex: "1 1 300px", padding: "1.5rem" }}>
          <h3 style={{ ...hudHeading, fontSize: "1.4rem", textShadow: "none" }}>GUIDELINES</h3>
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


const hudBoxStyle = {
  position: "relative",
  backgroundColor: "#1a202c", 
  padding: "1.5rem",
  color: "#fff",
 
  clipPath: "polygon(5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%, 0 5%)",
  border: "2px solid #4a90e2", 

  backgroundImage: `repeating-linear-gradient(-45deg, rgba(74, 144, 226, 0.05) 0px, rgba(74, 144, 226, 0.05) 2px, transparent 2px, transparent 10px)`,
  backgroundSize: "20px 20px", 
  fontFamily: "sans-serif",
  perspective: "800px",
  transformStyle: "preserve-3d",
  willChange: "transform",
  width: "fit-content",
  maxWidth: "100%",
  overflow: "hidden",
};


const hudHeading = {
  fontSize: "1.2rem", 
  marginBottom: "1.5rem",
  textAlign: "center",
  color: "#60a5fa",
};


const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  margin: "0.5rem 0 1rem",
  borderRadius: "0.4rem",
  border: "1px solid #4a90e2", 
  backgroundColor: "#0f172a", 
  color: "#fff",
};


const inputFileStyle = {
  marginBottom: "1rem",
  backgroundColor: "#0f172a", 
  borderRadius: "4px",
  color: "#fff",
  border: "1px solid #4a90e2", 
  padding: "0.4rem",
  width: "100%",
};

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
