import React, { useState } from "react";

function AttendanceNew() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success", "error", "loading"

  const handleAttendance = () => {
    if (!username.trim()) {
      setMessage("❗ Please enter your username.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("📍 Getting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        try {
          const res = await fetch("http://localhost:6500/mark-attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, location }),
          });

          const data = await res.json();

          if (res.ok) {
            setMessage(data.message || "✅ Attendance marked successfully.");
            setStatus("success");
          } else {
            setMessage(data.message || "❌ Failed to mark attendance.");
            setStatus("error");
          }
        } catch (err) {
          console.error(err);
          setMessage("❌ Server error. Please try again later.");
          setStatus("error");
        }
      },
      (err) => {
        console.error(err);
        setMessage("❌ Location access denied. Please allow location access.");
        setStatus("error");
      }
    );
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: "60px auto",
      padding: "30px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      borderRadius: "10px",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>📅 Mark Your Attendance</h2>

      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "15px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleAttendance}
        style={{
          padding: "12px",
          width: "100%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ✅ Mark Attendance
      </button>

      {message && (
        <p style={{
          marginTop: "20px",
          color:
            status === "success" ? "green" :
            status === "error" ? "red" : "#555",
          fontWeight: "bold",
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AttendanceNew;

