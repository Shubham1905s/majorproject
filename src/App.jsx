import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Admin from "./admin";
import AdminLogin from "./adminlogin";

function App() {
  // form | login | admin
  const [view, setView] = useState("form");

  const goToLogin = () => setView("login");     // when clicking Admin button
  const loginSuccess = () => setView("admin");  // after correct login

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

  // 2️⃣ ADMIN PAGE (ONLY AFTER LOGIN)
  if (view === "admin") {
    return (
      <>
        <button
          onClick={() => setView("form")}
          style={styles.backBtn}
        >
          ← Back to Form
        </button>
        <Admin />
      </>
    );
  }

  // 3️⃣ DEFAULT VIEW — FEEDBACK FORM
  return (
    <div style={styles.page}>
      <button
        onClick={goToLogin}
        style={styles.adminBtn}
      >
        Admin
      </button>

      <div style={styles.card}>
        <h1 style={styles.title}>Feedback Form</h1>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(236,72,153,0.2))",
    padding: "20px",
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
    background: "#fff",
    borderRadius: "16px",
    padding: "24px 24px 28px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "4px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
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
    color: "#0f172a",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  input: {
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
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
  },
  status: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#0f172a",
  },
};

export default App;
