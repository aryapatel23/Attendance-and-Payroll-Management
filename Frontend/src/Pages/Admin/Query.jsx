import React, { useEffect, useState } from "react";
import { FaPaperclip, FaExclamationCircle } from "react-icons/fa";
import { apiUrl } from "../../utils/api";

const HRRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(apiUrl("/api/contact-hr"));
        const data = await response.json();
        console.log("📩 HR requests fetched:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to load requests");
        }

        setRequests(data.requests || []);
      } catch (err) {
        console.error("Error fetching HR requests:", err);
        setError("Unable to load HR requests right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📩 Employee HR Requests</h1>

      {loading && <p className="mb-4 text-sm text-gray-600">Loading requests...</p>}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="bg-white shadow-md rounded-xl p-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Category</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Date</th>
              <th className="p-3">Attachment</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-6 text-center text-gray-500">
                  No HR requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
              <tr key={req._id || req.id} className="border-t border-gray-200 hover:bg-gray-50">
                {/* Employee Name */}
                <td className="px-6 py-4">
                  <p className="font-semibold">{req.employeeName}</p>
                  <p className="text-xs text-gray-500">{req.employeeId}</p>
                </td>

                {/* Subject */}
                <td className="px-6 py-4">{req.subject}</td>

                {/* Category */}
                <td className="px-6 py-4">{req.category}</td>

                {/* Priority Badge */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : req.priority === "Low"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {req.priority}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4">{(req.createdAt || req.date || "").toString().slice(0, 10)}</td>

                {/* Attachment */}
                <td className="px-6 py-4">
                  {req.attachment ? (
                    <a
                      href={req.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaPaperclip /> View
                    </a>
                  ) : (
                    <span className="text-gray-400">No File</span>
                  )}
                </td>

                {/* Action Button */}
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-600">{req.message}</span>
                </td>
              </tr>
            ))) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRRequests;
