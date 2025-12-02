// src/Developers.jsx
import React from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./animated-bg.css";

const developers = [
  {
    name: "Shubham Mirashi",
      img: "/devs/dev1.jpg",
    desc: "FullStack developer with a passion for creating seamless digital experiences.\nBelieves in the power of code to transform ideas into reality.",
    whatsapp: "https://wa.me/917259544987",
    instagram: "https://instagram.com/shubham_mirashi",
    linkedin: "https://www.linkedin.com/in/shubham-mirashi/",
    email: "mailto:shubhammirashi303@gmail.com",
  },
  {
    name: "Pranav Kadagadakai",
   img: "/devs/dev3.png",
    desc: "Backend magician turning data into powerful solutions.\nPassionate about scalable systems and clean architecture.",
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:someone@example.com",
  },
  {
    name: "Ojus Welangi",
    img: "/devs/dev2.jpg",
    desc: "UI/UX designer creating visually stunning digital journeys.\nHer designs merge art and logic effortlessly.",
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:someone@example.com",
  },
  {
    name: "Sakshi Pattanashetti",
    img: "/devs/dev4.jpg",
    desc: "Full-stack innovator with a futuristic vision.\nDreams in code and builds what others imagine.",
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:someone@example.com",
  },
];

export default function Developers({ backToForm }) {
  return (
    <div style={styles.wrapper}>
      <div className="dynamic-bg"></div>

      <button onClick={backToForm} style={styles.backBtn}>← Back to Form</button>

      <h1 style={styles.title}>Meet Our Developers</h1>
      <p style={styles.subtitle}>The futuristic minds behind this innovation</p>

      <div style={styles.grid}>
        {developers.map((dev, idx) => (
          <div key={idx} style={styles.card} className="dev-card">
            <img src={dev.img} alt={dev.name} style={styles.img} />
            <h2 style={styles.name}>{dev.name}</h2>
            <p style={styles.desc}>{dev.desc}</p>

            <div style={styles.socials}>
              <a href={dev.whatsapp} target="_blank" className="icon"><FaWhatsapp /></a>
              <a href={dev.instagram} target="_blank" className="icon"><FaInstagram /></a>
              <a href={dev.linkedin} target="_blank" className="icon"><FaLinkedin /></a>
              <a href={dev.email} target="_blank" className="icon"><FaEnvelope /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🔥 Polished Futuristic Styles
const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    padding: "60px 20px",
    color: "white",
    textAlign: "center",
    fontFamily: "Orbitron, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: "8px 14px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(5px)",
    transition: "0.3s",
  },
  title: {
    fontSize: "48px",
    marginBottom: "8px",
    textShadow: "0 0 18px cyan",
  },
  subtitle: {
    fontSize: "17px",
    opacity: 0.8,
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "34px",
    maxWidth: "1200px",
    width: "100%",
  },
  card: {
    padding: "26px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.09)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0px 0px 25px rgba(0,255,255,0.35)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
 img: {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  marginLeft: "auto",
  marginRight: "auto",   // explicitly centering horizontally
  marginBottom: "14px",  // now no conflict
  border: "3px solid cyan",
  boxShadow: "0 0 18px cyan",
},
  name: {
    fontSize: "22px",
    textShadow: "0 0 10px cyan",
    marginBottom: "10px",
  },
  desc: {
    whiteSpace: "pre-line",
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "18px",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    fontSize: "30px",
  },
};
