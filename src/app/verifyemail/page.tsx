"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, set_token] = useState("");
  const [verified, set_verified] = useState(false);
  const [error, set_error] = useState(false);

  const verifyUserEmail = async () => {
    try {
      //await axios.post("/api/users/verifyemail", { token });
      //await axios.get(`/api/users/verifyemail?token=${token}`);
      await axios.get(
        `${window.location.origin}/api/users/verifyemail?token=${token}`
      );
      set_verified(true);
    } catch (error: any) {
      set_error(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    //const urlToken = window.location.search.split("=")[1];
    //set_token(urlToken || "");
    const params = new URLSearchParams(window.location.search);
    set_token((params.get("token") || "").trim());
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">
            Verification Failed
          </h2>
        </div>
      )}
    </div>
  );
}
