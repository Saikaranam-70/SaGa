import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token"); // Get token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8080/user/reset-password?token=${token}&newPassword=${newPassword}`,
        {
          method: "POST",
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white rounded-xl font-semibold transition ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
