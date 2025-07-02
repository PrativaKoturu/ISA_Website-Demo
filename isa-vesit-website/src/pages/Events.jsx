import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Import all your local images here ---
// ODD SEMESTER IMAGES (from workshopodd folder)
import posterWebAnimationImage from '../assets/images/workshopodd/Poster_Web_animation.jpg';
import chatgptImage from '../assets/images/workshopodd/chatgpt.jpeg';
import ctrlAltDeleteImage from '../assets/images/workshopodd/ctrlaltdelete.jpg';
import pcbDesignWorkshopImage from '../assets/images/workshopodd/PCB_DESIGN_WORKSHOP.png';
import opencvImage from '../assets/images/workshopodd/opencv.png';
import roboticwsImage from '../assets/images/workshopodd/roboticws.jpeg';
import threeJsWsImage from '../assets/images/workshopodd/3jsws.jpeg';
import threeDPrintImage from '../assets/images/workshopodd/3dprint.jpeg';
import pcbImage from '../assets/images/workshopodd/pcb.jpeg';
import eight051Image from '../assets/images/workshopodd/8051.jpeg';
import embeddedSystemImage from '../assets/images/workshopodd/embeddedsystem.jpeg';
import desktopAppImage from '../assets/images/workshopodd/desktopapp.jpeg';
import threeDPrintingFullImage from '../assets/images/workshopodd/3dprinting.jpeg'; // This is different from 3dprint.jpeg
import graphUpImage from '../assets/images/workshopodd/graphup.jpeg';
import elucimateJpg from '../assets/images/workshopodd/elucimate.jpg';
import frontEndImage from '../assets/images/workshopodd/front-end.png';
import webAutomationImage from '../assets/images/workshopodd/web_automation.png';
import elucimatePng from '../assets/images/workshopodd/elucimate.png';
import mbDevImage from '../assets/images/workshopodd/mbdev.png';
import fpgaWorkshopImage from '../assets/images/workshopodd/FPGA_Workshop.jpg';
import wsnWorkshopImage from '../assets/images/workshopodd/WSN_workshop.jpg';
import analogElectronicsImage from '../assets/images/workshopodd/ana_elect.jpg';
import buildAndHitImage from '../assets/images/workshopodd/build_and_hit.png';
import crackTheCodeImage from '../assets/images/workshopodd/crack_the_code.png';
import bluetoothCommunicationImage from '../assets/images/workshopodd/Bluetooth_Communication.jpg';

// EVEN SEMESTER IMAGES (from workshopeven folder, *ALL PATHS CORRECTED*)
import horizon24Image from '../assets/images/workshopeven/horizon_24.jpg';
import vrQuestImage from '../assets/images/workshopeven/vr_quest.jpg';
import threeDPrintingEvenImage from '../assets/images/workshopeven/3d_printing.jpg'; // Matches 3d_printing.jpg
import convergeImage from '../assets/images/workshopeven/converge.jpg';
import articleWritingImage from '../assets/images/workshopeven/article_writing.jpg'; // Matches article_writing.jpg
import sketchItOutImage from '../assets/images/workshopeven/sketchitout.jpg';
import technovationImage from '../assets/images/workshopeven/technovation.jpg';
import techgameQuadImage from '../assets/images/workshopeven/techgame_Quad.jfif'; // Matches techgame_Quad.jfif
import scavangeImage from '../assets/images/workshopeven/scavange.jpg';
import beBeyond13Image from '../assets/images/workshopeven/BE__Beyond13.png'; // Matches BE_Beyond13.png
import webapp1Image from '../assets/images/workshopeven/webapp1.jpeg';
import espisaImage from '../assets/images/workshopeven/espisa.png';
import articleWriting_1 from '../assets/images/workshopeven/ARTICLE_WRITING_1.png'; // Matches ARTICLE_WRITING_1.png
import sketchItOut_1 from '../assets/images/workshopeven/SKETCH_IT_OUT.png'; // Matches SKETCH_IT_OUT.png
import iotBootcampImage from '../assets/images/workshopeven/iotbootcamp.jfif';
import techtalkImage from '../assets/images/workshopeven/techtalk.jfif';
import theHorcruxHuntImage from '../assets/images/workshopeven/the_horcrux_hunt.png';
import bebeyondImage from '../assets/images/workshopeven/bebeyond.jpeg';
import dataAWImage from '../assets/images/workshopeven/dataAW.jpeg';
import pwithapiImage from '../assets/images/workshopeven/pwithapi.jpeg';
import analogElectronicwImage from '../assets/images/workshopeven/analogelectronicw.jpeg';
import iotPosterImage from '../assets/images/workshopeven/IoT_Poster.jpeg';
import bebeyond21Image from '../assets/images/workshopeven/bebeyond21.jfif';
import financialIndependenceWorkshopPosterImage from '../assets/images/workshopeven/Financial_Independance_Workshop_Poster.png';
import threeDAnimationWorkshopPosterImage from '../assets/images/workshopeven/3D_Animation_Workshop_Poster.png';
import eHwHackathonImage from '../assets/images/workshopeven/e_hw_hackathon.png';
import kuchCreativeCoronaImage from '../assets/images/workshopeven/kuch_creative_corona.png';
import appDevImage from '../assets/images/workshopeven/app_dev.jpg';
import dataAnaImage from '../assets/images/workshopeven/data_ana.png';
import threeDPrintingEvenFinalImage from '../assets/images/workshopeven/3-D_printing.jpg'; // Matches 3-D_printing.jpg
import beAndBeyondImage from '../assets/images/workshopeven/BE_and_Beyond.png';
import imageprocessing from '../assets/images/workshopeven/21IPworkshop.jpeg'; // Matches 21IPworkshop.jpeg
import tqgImage from '../assets/images/workshopeven/TGQ.jpg'; // Added new import for TQG.jpg


// --- Embedded CSS Styles (NO CHANGE TO STYLES) ---
const eventsPageStyles = `
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body style */
body {
  min-height: 100vh;
  background-color: #0f172a;
  font-family: 'Montserrat', sans-serif; /* Changed font */
  color: #e2e8f0; /* Changed base text color */
}

/* Main events page container */
.events-page {
  background: #0f172a;
  padding: 2rem;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: #e2e8f0;
  position: relative; /* Needed for absolute positioning of filter menu */
}

/* Section title (e.g., EVEN SEMESTER, ODD SEMESTER) */
.section-title {
  color: white;
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.5rem;
  padding-top: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: #3b82f6;
  border-radius: 2px;
}

/* Slick Carousel Customizations */
.slick-list {
  margin: 0 -10px; /* Counteract slide padding */
}
.slick-slide > div {
  padding: 0 10px; /* Add padding between slides */
}

.slick-prev:before, .slick-next:before {
    color: #3b82f6 !important;
    font-size: 2rem !important;
}
.slick-dots li button:before {
    color: #475569 !important;
}
.slick-dots li.slick-active button:before {
    color: #3b82f6 !important;
}

/* --- 4-Corner Split Image Effect Styles --- */
.split-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.quadrant {
  position: absolute;
  width: 50%;
  height: 50%;
  background-size: 200% 200%;
  transition: transform 0.3s ease;
  background-repeat: no-repeat;
}

.quadrant-1 {
  top: 0;
  left: 0;
  background-position: 0% 0%;
}

.quadrant-2 {
  top: 0;
  right: 0;
  background-position: 100% 0%;
}

.quadrant-3 {
  bottom: 0;
  left: 0;
  background-position: 0% 100%;
}

.quadrant-4 {
  bottom: 0;
  right: 0;
  background-position: 100% 100%;
}

.split-image-container:hover .quadrant-1 {
  transform: translate(-10px, -10px);
}

.split-image-container:hover .quadrant-2 {
  transform: translate(10px, -10px);
}

.split-image-container:hover .quadrant-3 {
  transform: translate(-10px, 10px);
}

.split-image-container:hover .quadrant-4 {
  transform: translate(10px, 10px);
}

/* Styles for individual carousel items (cards) */
.carousel-item-card {
  background: #1e293b;
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.carousel-item-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.workshop-title {
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 0.8rem;
    word-break: break-word;
}

.view-details-btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  color: #fff;
  border-radius: 0.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease;
  margin-top: auto;
}

.view-details-btn.blue {
  background: rgba(59, 130, 246, 0.2);
}
.view-details-btn.blue:hover {
  background: rgba(59, 130, 246, 0.4);
}

.view-details-btn.orange {
  background: rgba(245, 158, 11, 0.2);
}
.view-details-btn.orange:hover {
  background: rgba(245, 158, 11, 0.4);
}

/* Filter Icon and Menu Styles */
.filter-container {
  display: flex;
  justify-content: flex-end; /* Align to the right */
  margin-bottom: 1rem;
  position: relative; /* For dropdown positioning */
  width: 100%;
}

.filter-icon {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  border-radius: 50%; /* Make it circular */
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px; /* Fixed size */
  height: 45px; /* Fixed size */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 100; /* Ensure icon is above other content */
}

.filter-icon:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}

.filter-menu {
  position: absolute;
  top: calc(100% + 10px); /* Position below the icon */
  right: 0;
  background-color: #1e293b;
  border: 1px solid #475569;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 99; /* Below the icon but above other content */
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s;
  padding: 0.5rem 0;
}

.filter-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.filter-option {
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  color: #e2e8f0;
  text-align: left;
  transition: background-color 0.2s ease;
  font-size: 0.95rem;
}

.filter-option:hover {
  background-color: #334155;
}

.filter-option.active {
  background-color: #3b82f6;
  font-weight: bold;
  color: white;
}

@media (max-width: 768px) {
  .events-page {
    padding: 1rem;
  }
  .section-title {
    font-size: 1.3rem;
    margin: 1.5rem 0 0.8rem;
  }
  .filter-icon {
    font-size: 1.2rem;
    width: 40px;
    height: 40px;
  }
  .filter-menu {
    min-width: 180px;
  }
  .filter-option {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
}
`;
// --- End of Embedded CSS Styles ---


// --- Unified Workshop Data ---
// Added 'semester' and 'year' to each workshop entry
const allWorkshops = [

  // ODD SEMESTER 2024
  {
    title: "Web Animations with CSS and jS",
    img: posterWebAnimationImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
  {
    title: "ChatGPT Clone using Django",
    img: chatgptImage,
    theme: "orange",
    link: "#",
    category: "Coding",
    semester: "odd",
    year: 2024
  },
  {
    title: "Ctrl+Alt+Debate",
    img: ctrlAltDeleteImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
  {
    title: "PCB Designing Workshop",
    img: pcbDesignWorkshopImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
  {
    title: "OpenCV Workshop",
    img: opencvImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
  {
    title: "Robotics Workshop",
    img: roboticwsImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
  {
    title: "Three.js Workshop",
    img: threeJsWsImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "3D printing workshop",
    img: threeDPrintImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "PCB Design Workshop",
    img: pcbImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "HORIZON 248051  Workshop",
    img: eight051Image,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "Embedded System Workshop",
    img: embeddedSystemImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "Desktop Application Using Tkinter",
    img: desktopAppImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "3D Printing Workshop",
    img: threeDPrintingFullImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "Graph Up With Chart.js",
    img: graphUpImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "Elucimate",
    img: elucimateJpg,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "Front End Developement",
    img: frontEndImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
   {
    title: "Web Automation Workshop",
    img: webAutomationImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
    {
    title: "Elucimate",
    img: elucimatePng,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
    {
    title: "PCB Designing",
    img: mbDevImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
    {
    title: "FPGA Workshop",
    img: fpgaWorkshopImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
    {
    title: "WSN Workshop",
    img: wsnWorkshopImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
    {
    title: "Analog Electronics Workshop",
    img: analogElectronicsImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
      {
    title: "Build and Hit",
    img: buildAndHitImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
      {
    title: "Crack the Code",
    img: crackTheCodeImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },
      {
    title: "Bluetooth Communication",
    img: bluetoothCommunicationImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "odd",
    year: 2024
  },

  // EVEN SEMESTER 2024 - Images updated here
  {
    title: "HORIZON 24",
    img: horizon24Image,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
  {
    title: "VR QUEST WORKSHOP",
    img: vrQuestImage,
    theme: "blue",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
  {
    title: "3D PRINTING workshop",
    img: threeDPrintingEvenImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
  {
    title: "Converge 2023",
    img: convergeImage,
    theme: "blue",
    link: "#",
    category: "Coding",
    semester: "even",
    year: 2024
  },
  {
    title: "Article Writing 2023",
    img: articleWritingImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Sketch It Out 2023",
    img: sketchItOutImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Technovation Project Exhibition Competition",
    img: technovationImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "The Tech Game Quadrangle",
    img: techgameQuadImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Scavange to build",
    img: scavangeImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
      {
    title: "Be Beyond",
    img: beBeyond13Image,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Esp Workshop",
    img: espisaImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
      {
    title: "WebApp Using Firebase",
    img: webapp1Image,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Sketch It Out ", 
    img: sketchItOut_1,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Article Writing ", 
    img: articleWriting_1,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Quadrangle (TQG)", 
    img: tqgImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
      {
    title: "Iot Bootcamp",
    img: iotBootcampImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Tech Talks",
    img: techtalkImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
      {
    title: "The Horcrux Hunt",
    img: theHorcruxHuntImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Be Beyond Workshop",
    img: bebeyondImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Data Analytics Workshop",
    img: dataAWImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Programming With APIs",
    img: pwithapiImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
   {
    title: "Analog Electronics Workshop",
    img: analogElectronicwImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Image Processing Workshop",
    img: imageprocessing,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
   {
    title: "IoT Workshop Mains",
    img: iotPosterImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Bebeyond Workshop (2021)", 
    img: bebeyond21Image,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
   {
    title: "Financial Independence Workshop",
    img: financialIndependenceWorkshopPosterImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "3D Animation Workshop using Three.Js",
    img: threeDAnimationWorkshopPosterImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
{
    title: "E-Hardware Hackathon",
    img: eHwHackathonImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Kuch Creative Corona",
    img: kuchCreativeCoronaImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
  {
    title: "App Development Workshop",
    img: appDevImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "Data Analytics Workshop", 
    img: dataAnaImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
  {
    title: "3-D Printing Workshop",
    img: threeDPrintingEvenFinalImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
    {
    title: "B.E. and Beyond",
    img: beAndBeyondImage,
    theme: "orange",
    link: "#",
    category: "Technical",
    semester: "even",
    year: 2024
  },
];


const Events = () => {
  // State for the active filter: "all", "2024-even", "2023-odd", etc.
  const [activeFilter, setActiveFilter] = useState("all");
  // State to control visibility of the filter menu
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Ref for the filter menu to detect clicks outside
  const filterMenuRef = useRef(null);
  const filterIconRef = useRef(null);

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current && !filterMenuRef.current.contains(event.target) &&
        filterIconRef.current && !filterIconRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Slick Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: false, centerPadding: '0px' } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false, centerPadding: '0px' } }
    ]
  };

  // --- Generate Filter Options Dynamically ---
  // Get all unique years
  const uniqueYears = [...new Set(allWorkshops.map(w => w.year))].sort((a, b) => b - a); // Sort descending

  // Create filter options like "2024 Even Semester", "2023 Odd Semester"
  const filterOptions = [];
  filterOptions.push({ label: "All", value: "all" });

  uniqueYears.forEach(year => {
    // Check if there are 'even' semester workshops for this year
    if (allWorkshops.some(w => w.year === year && w.semester === 'even')) {
      filterOptions.push({ label: `${year} Even Semester`, value: `${year}-even` });
    }
    // Check if there are 'odd' semester workshops for this year
    if (allWorkshops.some(w => w.year === year && w.semester === 'odd')) { // Corrected: changed w.oyear to w.year
      filterOptions.push({ label: `${year} Odd Semester`, value: `${year}-odd` });
    }
  });

  // Handler for changing the active filter
  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
    setShowFilterMenu(false); // Close menu after selection
  };

  // Function to filter workshops based on the active filter and semester type
  const filterWorkshops = (semesterType) => {
    // Start with all workshops for the specific semester type
    let filteredData = allWorkshops.filter(workshop => workshop.semester === semesterType);

    // Apply year filter if not "all"
    if (activeFilter !== "all") {
      const [year, semester] = activeFilter.split('-'); // e.g., "2024-even" -> year=2024, semester=even
      if (parseInt(year) && semester) {
        filteredData = filteredData.filter(
          workshop => workshop.year === parseInt(year) && workshop.semester === semester
        );
      }
    }
    return filteredData;
  };

  // Renders a section of workshops (e.g., Even Semester, Odd Semester)
  const renderWorkshopSection = (title, semesterType) => {
    const filteredData = filterWorkshops(semesterType);

    // Sort filtered data by year (descending) and then title
    filteredData.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year; // Latest year first
      return a.title.localeCompare(b.title); // Then by title alphabetically
    });

    if (filteredData.length === 0) {
      return (
        <section>
          <h2 className="section-title">{title}</h2>
          <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '1.1rem', marginTop: '1rem' }}>
            No workshops found for the selected filter in this semester.
          </p>
        </section>
      );
    }

    return (
      <section>
        <h2 className="section-title">{title}</h2>
        <Slider {...sliderSettings}>
          {filteredData.map((workshop, index) => (
            <div key={index}>
              <div
                className="carousel-item-card"
                style={{ border: `2px solid ${workshop.theme === "orange" ? "#f59e0b" : "#3b82f6"}` }}
              >
                <div className="split-image-container">
                    <div className="quadrant quadrant-1" style={{ backgroundImage: `url(${workshop.img})` }}></div>
                    <div className="quadrant quadrant-2" style={{ backgroundImage: `url(${workshop.img})` }}></div>
                    <div className="quadrant quadrant-3" style={{ backgroundImage: `url(${workshop.img})` }}></div>
                    <div className="quadrant quadrant-4" style={{ backgroundImage: `url(${workshop.img})` }}></div>
                </div>
                <h3 className="workshop-title">{workshop.title}</h3>
                <a
                  href={workshop.link}
                  className={`view-details-btn ${workshop.theme}`}
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    );
  };

  return (
    <div className="events-page">
      {/* Embed CSS styles directly in the component */}
      <style>{eventsPageStyles}</style>

      {/* Filter Icon and Dropdown Menu */}
      <div className="filter-container">
        <div
          ref={filterIconRef}
          className="filter-icon"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          title="Filter Workshops"
        >
          {/* Simple SVG Filter Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </div>
        <div ref={filterMenuRef} className={`filter-menu ${showFilterMenu ? 'open' : ''}`}>
          {filterOptions.map((option) => (
            <div
              key={option.value}
              className={`filter-option ${activeFilter === option.value ? 'active' : ''}`}
              onClick={() => handleFilterChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>

      {/* Even Semester Section */}
      {renderWorkshopSection("EVEN SEMESTER", "even")}

      {/* Vertical space between sections */}
      <div style={{ height: '4rem' }}></div>

      {/* Odd Semester Section */}
      {renderWorkshopSection("ODD SEMESTER", "odd")}
    </div>
  );
};

export default Events;
