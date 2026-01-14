"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const [token, set_token] = useState("");
  const [password, set_password] = useState("");
  const [success, set_success] = useState(false);
  const [error, set_error] = useState("");

  const handleResetPassword = async () => {
    if (!token) {
      set_error("Invalid or missing token");
      return;
    }

    if (password.length === 0) {
      set_error("Password cannot be empty");
      return;
    }

    try {
      set_error("");

      await axios.post("/api/users/reset-password", {
        token,
        password,
      });

      set_success(true);
    } catch (err: any) {
      set_error(err?.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    set_token((params.get("token") || "").trim());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>

      {!success ? (
        <div className="flex flex-col gap-3 w-80">
          {!token && (
            <p className="text-red-600 font-semibold text-center">
              Invalid or expired link
            </p>
          )}

          <input
            className="p-2 border rounded text-black"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => set_password(e.target.value)}
            disabled={!token}
          />

          <button
            onClick={handleResetPassword}
            className="bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
            disabled={!token}
          >
            Submit
          </button>

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-green-500 font-bold">
            Password Reset Successful 🎉
          </h2>
          <Link href="/login" className="underline text-blue-600">
            Login Now
          </Link>
        </div>
      )}
    </div>
  );
}
