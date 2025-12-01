// src/Admin.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError("");

      try {
        // Get documents from "feedbacks" collection, newest first
        const q = query(
          collection(db, "feedbacks"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const rows = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            email: data.email || "",
            rating: data.rating || "",
            feedback: data.feedback || "",
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleString()
              : "",
          };
        });

        setFeedbacks(rows);
      } catch (err) {
        console.error(err);
        setError("Failed to load feedback. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const downloadCSV = () => {
    if (!feedbacks.length) {
      alert("No feedback to export.");
      return;
    }

    const headers = ["id", "name", "email", "rating", "feedback", "createdAt"];

    const escapeValue = (value) => {
      if (value === null || value === undefined) return "";
      const stringValue = String(value).replace(/"/g, '""');
      // Wrap in quotes if it contains comma, quote, or newline
      if (/[",\n]/.test(stringValue)) {
        return `"${stringValue}"`;
      }
      return stringValue;
    };

    const rows = feedbacks.map((row) =>
      headers.map((h) => escapeValue(row[h])).join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "feedbacks.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin – Feedback List</h1>
        <p style={styles.subtitle}>
          View all submitted feedback and download as CSV.
        </p>

        <div style={styles.topBar}>
          <button style={styles.button} onClick={downloadCSV}>
            ⬇️ Download CSV
          </button>
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Total feedbacks: {feedbacks.length}
          </span>
        </div>

        {loading && <p>Loading feedback...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !feedbacks.length && (
          <p>No feedback found yet. Ask someone to submit the form 🙂</p>
        )}

        {!loading && feedbacks.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Feedback</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td>{fb.name}</td>
                    <td>{fb.email}</td>
                    <td>{fb.rating}</td>
                    <td>{fb.feedback}</td>
                    <td>{fb.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(236,72,153,0.2))",
    padding: "20px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
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
    marginBottom: "16px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  button: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, rgb(59,130,246), rgb(79,70,229))",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  tableWrapper: {
    maxHeight: "400px",
    overflow: "auto",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
};

export default Admin;
