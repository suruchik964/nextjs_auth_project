"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { sendEmail } from "@/src/helpers/mailer";

export default function Forgot_password() {
  const router = useRouter();

  const [email, set_email] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [email_sent, set_email_sent] = React.useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot_password", {
        email,
      });
      console.log("Successful", response.data);
      toast.success("reset pass successful");
      set_email_sent(true);
      //router.push("/Login");
    } catch (error: any) {
      console.log("failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /*useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);*/

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Enter you email</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  bg-white"
        id="email"
        type="email"
        value={email}
        onChange={(e) => set_email(e.target.value)}
        placeholder="email"
      />
      <button
        onClick={onSubmit}
        className="p-2 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  bg-orange-400"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
      {email_sent && (
        <div>
          <h2 className="text-2xl">Password reset email sent</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
