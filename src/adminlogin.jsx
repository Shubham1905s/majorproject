// src/AdminLogin.jsx
import { useState } from "react";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "Shubh1905s" && password === "Shubh1905s") {
      onLogin();
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>

          {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(236,72,153,0.2))",
  },
  card: {
    width: "100%",
    maxWidth: "360px",
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "16px",
    fontSize: "22px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  },
  button: {
    padding: "10px",
    background: "linear-gradient(135deg, rgb(59,130,246), rgb(79,70,229))",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminLogin;
