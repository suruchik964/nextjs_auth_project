"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { link, linkSync } from "fs";

export default function Profilepage() {
  const router = useRouter();
  const [username, set_username] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    set_username(res.data.user_data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <h2 className="p-1 rounded bg-green-500">
        {username === "" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${username}`}>{username}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-purple-500 hover:bg-purple-700 mt-4 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={getUserDetails}
      >
        Get user name
      </button>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
//this page.tsx is inside profile so it  will run for => http://localhost:3000/profile
// and the [id] wala page.tsx will run for => http://localhost:3000/profile/[id] ex -> http://localhost:3000/profile/11
