"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const route = useRouter();

  const [user, set_user] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  //now making a button which will tell westher the signup button is disabled or not
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  // so whenever there will be a change in user, then if email, password and username's length is 0 then button will be disabled otherwise not

  //basically we want when the data of user is being stored in db ther should be a text saying processing and no signup can be done during this, so we will set loading on basis of it
  const [loading, set_loading] = React.useState(false);

  const onSignup = async () => {
    try {
      set_loading(true);
      const response = await axios.post("/api/users/signup", user); //Down
      console.log("Signup success", response.data);
      route.push("/login"); //so this line will take us to login page as soon as the signup complelete
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      set_loading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => set_user({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignup}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  bg-orange-400 ${
          buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

/*
1️⃣ “We did not import anything from signup/page.tsx so how is backend POST running?”

Because you are not calling backend code directly.
You are sending an HTTP request to this URL:

/api/users/signup


In Next.js App Router, any file like:

app/api/users/signup/route.ts


automatically becomes a backend API route.

So when you do:

axios.post("/api/users/signup", user)


Next.js receives that request → runs the export async function POST() from your API route → saves user to DB → returns response.

✔️ No import needed
✔️ It works like calling a real backend server endpoint

2️⃣ What is axios (in short)?

Axios is a HTTP client library for making API calls.

axios.post() → sends POST request

axios.get() → sends GET request

returns response.data

Same as fetch() but easier and cleaner.

If you want I can also explain how the route file actually gets triggered internally, but for now this is the simple mental model:

Frontend button → axios → /api/users/signup → Next.js backend runs → DB save → response → frontend continues
*/

/*
In this line:
axios.post("/api/users/signup", user)

the 'user' object is sent as the request body.

How it works

First argument = URL of API

Second argument = body data

So axios sends:

{
  "email": "...",
  "password": "...",
  "username": "..."
}


to /api/users/signup.

On the backend (Next.js API route)

Your POST function receives it like:

export async function POST(request: Request) {
  const body = await request.json();   // 👈 this is the `user`
}
*/
