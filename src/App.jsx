import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Admin from "./admin";
import AdminLogin from "./adminlogin";
import Developers from "./Developers";
import "./animated-bg.css";

function App() {
  // form | login | admin
  const [view, setView] = useState("form");

  const goToLogin = () => setView("login");
  const loginSuccess = () => setView("admin");

  // NEW STATE FOR DEVELOPERS PAGE
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await addDoc(collection(db, "feedbacks"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setStatus("✅ Feedback submitted successfully. Thank you!");
      setFormData({
        name: "",
        email: "",
        rating: "",
        feedback: "",
      });

      // 👇 SHOW DEVELOPERS PAGE AFTER SUBMISSION
      setSubmitted(true);

    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 1️⃣ LOGIN SCREEN
  if (view === "login") {
    return <AdminLogin onLogin={loginSuccess} />;
  }

  // 2️⃣ SHOW DEVELOPERS PAGE IF SUBMITTED
  if (submitted) {
    return <Developers backToForm={() => setSubmitted(false)} />;
  }

  // 3️⃣ ADMIN PAGE
  if (view === "admin") {
    return (
      <>
        <button onClick={() => setView("form")} style={styles.backBtn}>
          ← Back to Form
        </button>
        <Admin />
      </>
    );
  }

  // 4️⃣ DEFAULT FEEDBACK FORM
  return (
    <div style={styles.page}>
      <div className="dynamic-bg"></div>
      <button onClick={goToLogin} style={styles.adminBtn}>Admin</button>

      <div style={styles.card}>
        <h1 style={styles.title}>Feedback Form-Batch 03</h1>
        <p style={styles.subtitle}>We’d love to hear your thoughts!</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Your name"
              required
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="you@example.com"
              required
            />
          </label>

          <label style={styles.label}>
            Rating (1–5)
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select rating</option>
              <option value="1">1 - Very Bad</option>
              <option value="2">2 - Bad</option>
              <option value="3">3 - Okay</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </label>

          <label style={styles.label}>
            Feedback
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              style={{ ...styles.input, height: "100px", resize: "vertical" }}
              placeholder="Write your feedback here..."
              required
            />
          </label>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

          {status && <p style={styles.status}>{status}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1f003d, #0e192d, #000)",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  adminBtn: {
    position: "fixed",
    top: 12,
    right: 12,
    padding: "6px 10px",
    borderRadius: "999px",
    border: "none",
    background: "#e5e7eb",
    fontSize: "12px",
    cursor: "pointer",
    zIndex: 10,
  },

  backBtn: {
    position: "fixed",
    top: 12,
    left: 12,
    padding: "6px 10px",
    borderRadius: "999px",
    border: "none",
    background: "#e5e7eb",
    fontSize: "12px",
    cursor: "pointer",
    zIndex: 10,
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "24px 24px 28px",
    boxShadow: "0 0 25px rgba(0, 238, 255, 0.4)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
  },

  // ⭐ CENTERED HEADING + WHITE TEXT
  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "white",
    textShadow: "0 0 10px #00eaff",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "15px",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  // ⭐ INPUT TEXT WHITE
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.1)",
    color: "#0e0e0e", // <-- TEXT WHITE
    fontSize: "14px",
    outline: "none",
    backdropFilter: "blur(6px)",
  },

  button: {
    marginTop: "8px",
    padding: "10px 14px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, rgb(59,130,246), rgb(79,70,229))",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 0 12px rgba(59,130,246,0.6)",
  },

  status: {
    marginTop: "10px",
    fontSize: "14px",
    color: "white",
    textAlign: "center",
  },
};


export default App;
