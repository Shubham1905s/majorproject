// src/Developers.jsx
import React from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./animated-bg.css"; // dynamic background

const developers = [
  {
    name: "Shubham Mirashi",
    img: "/dev1.jpg",
    desc: "FullStack developer with a passion for creating seamless digital experiences.\nBelieves in the power of code to transform ideas into reality.",
    whatsapp: "https://wa.me/917259544987",
    instagram: "https://instagram.com/shubham_mirashi",
    linkedin: "https://www.linkedin.com/in/shubham-mirashi/",
    email: "mailto:shubhammirashi303@gmail.com",
  },
  {
    name: "Amit Deshmukh",
    img: "/dev2.jpg",
    desc: "Backend magician turning data into powerful solutions.\nPassionate about scalable systems and clean architecture.",
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:someone@example.com",
  },
  {
    name: "Priya Kulkarni",
    img: "/dev3.jpg",
    desc: "UI/UX designer creating visually stunning digital journeys.\nHer designs merge art and logic effortlessly.",
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:someone@example.com",
  },
  {
    name: "Rohan Patil",
    img: "/dev4.jpg",
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
      <p style={styles.subtitle}>The futuristic minds behind this project.</p>

      <div style={styles.grid}>
        {developers.map((dev, idx) => (
          <div key={idx} style={styles.card} className="dev-card">
            <img src={dev.img} alt={dev.name} style={styles.img} />
            <h2 style={styles.name}>{dev.name}</h2>
            <p style={styles.desc}>{dev.desc}</p>

            <div style={styles.socials}>
              <a href={dev.whatsapp} target="_blank"><FaWhatsapp color="#25D366" /></a>
              <a href={dev.instagram} target="_blank"><FaInstagram color="#E4405F" /></a>
              <a href={dev.linkedin} target="_blank"><FaLinkedin color="#0A66C2" /></a>
              <a href={dev.email} target="_blank"><FaEnvelope color="#ffffff" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    padding: "50px 20px",
    color: "white",
    textAlign: "center",
    fontFamily: "Orbitron, sans-serif",
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
  },
  title: {
    fontSize: "46px",
    marginBottom: "10px",
    textShadow: "0 0 18px cyan",
  },
  subtitle: {
    opacity: 0.8,
    fontSize: "16px",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "28px",
    maxWidth: "1100px",
    margin: "auto",
  },
  card: {
    padding: "22px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0px 0px 20px rgba(0,255,255,0.35)",
    transition: "0.3s",
  },
  img: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid cyan",
    boxShadow: "0 0 15px cyan",
    marginBottom: "14px",
  },
  name: {
    fontSize: "20px",
    textShadow: "0 0 10px cyan",
    marginBottom: "10px",
  },
  desc: {
    whiteSpace: "pre-line",
    fontSize: "13px",
    opacity: 0.8,
    marginBottom: "16px",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    fontSize: "28px",
  },
};
