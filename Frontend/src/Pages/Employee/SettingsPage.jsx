import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (


    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        ⚙️ Settings
      </h1>

      {/* ✅ Tabs */}
      <div className="flex gap-4 mb-6">
        {["profile", "security", "appearance", "notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* ✅ Section Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-md"
      >
        {renderSection()}
      </motion.div>
    </div>

  );
}

/* ------------------ SUB COMPONENTS ------------------ */

function ProfileSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        👤 Profile Settings
      </h2>
      <p className="text-gray-600 mb-4">
        Update your personal information and profile picture.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  // 🔐 State Management
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Password Change Handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // ✅ 1. Validation Checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ 2. Get JWT Token from LocalStorage
      const token = localStorage.getItem("token");

      // ✅ Debugging
      console.log("🌐 API URL:", "https://attendance-and-payroll-management.onrender.com/api/change-password");
      console.log("🔑 Token being sent:", token);

      // ✅ 3. Send API Request to Backend
      const res = await axios.post(
        "https://attendance-and-payroll-management.onrender.com/api/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 JWT Authentication
          },
        }
      );

      console.log("✅ API Response:", res.data);

      // ✅ 4. Show success message & reset fields
      setMessage(res.data.message || "✅ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("❌ Axios Error:", err.response || err);
      setMessage(err.response?.data?.message || "❌ Error changing password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        🔑 Security Settings
      </h2>

      {/* ✅ Password Change Form */}
      <form className="space-y-4" onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-lg transition w-full ${
            loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? "⏳ Updating..." : "Update Password"}
        </button>
      </form>

      {/* ✅ Response Message */}
      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}


function AppearanceSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        🎨 Appearance Settings
      </h2>
      <p className="text-gray-600">
        This version is locked to Light Theme only. No dark mode toggle.
      </p>
    </div>
  );
}

function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        🔔 Notification Settings
      </h2>
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
          <span>Email Notifications</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={smsNotif}
            onChange={() => setSmsNotif(!smsNotif)}
          />
          <span>SMS Notifications</span>
        </label>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
