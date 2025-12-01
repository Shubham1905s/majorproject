// src/Admin.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import "./admin.css";

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const rows = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.name,
            email: d.email,
            rating: d.rating,
            feedback: d.feedback,
            createdAt: d.createdAt?.toDate
              ? d.createdAt.toDate().toLocaleString()
              : "",
          };
        });

        setFeedbacks(rows);
      } catch (err) {
        setError("Could not fetch feedback data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const exportCSV = () => {
    if (!feedbacks.length) return alert("No records found.");
    const headers = ["name", "email", "rating", "feedback", "createdAt"];
    const csv = [headers.join(","), ...feedbacks.map(f =>
      headers.map(h => `"${(f[h] || "").replace(/"/g, '""')}"`).join(",")
    )].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedbacks.csv";
    a.click();
    a.remove();
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1 className="admin-title">📊 Admin Dashboard</h1>
        <p className="admin-subtitle">
          View, manage and export user feedback records.
        </p>

        <div className="admin-topbar">
          <button className="admin-button" onClick={exportCSV}>⬇️ Export CSV</button>
          <span className="admin-count">Total Feedbacks: {feedbacks.length}</span>
        </div>

        {loading && <p className="admin-loading">⏳ Loading feedback...</p>}
        {error && <p className="admin-error">{error}</p>}
        {!loading && !feedbacks.length && (
          <p className="admin-nodata">No feedback yet. Encourage users to submit!</p>
        )}

        {!loading && feedbacks.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
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
                {feedbacks.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{f.email}</td>
                    <td>{f.rating}</td>
                    <td>{f.feedback}</td>
                    <td>{f.createdAt}</td>
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

export default Admin;
