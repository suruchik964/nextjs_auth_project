"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, set_user] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  bg-white"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => set_user({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  bg-white"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => set_user({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  bg-orange-400"
      >
        Login
      </button>
      <Link href="/signup">Visit signup page</Link>
      <Link href="/forgot_password">Forgot password</Link>
    </div>
  );
}

/*
✅ When to use useRouter()

Use it when you need programmatic / conditional navigation, for example:

Redirect after login / signup / logout

Redirect after form submit

Navigate based on conditions (e.g., if user not authenticated → send to login)

Navigate inside a button click handler or function

Get route params / pathname in code

Example:

const router = useRouter();
router.push("/profile");

❌ When NOT to use useRouter()

You don’t need it when:

You’re just navigating with a normal link

No condition or logic required

Use:

<Link href="/profile">Go to Profile</Link>
*/
