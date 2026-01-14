import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 dark:bg-black font-sans">
      <main className="flex flex-col items-center gap-10 bg-black shadow-gray-800 p-16 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center">
          Welcome to AuthApp
        </h1>
        <p className="text-center text-gray-300">
          Please login or sign up to continue
        </p>

        <div className="flex flex-col gap-4 w-full">
          <Link href="/login">
            <button
              className="
      w-full py-3 
      bg-linear-to-r from-orange-600 to-orange-800 
      text-white font-semibold rounded-lg 
      shadow-lg hover:shadow-2xl 
      hover:scale-105 transform transition-all duration-300 
      text-lg tracking-wide
      hover:from-orange-500 hover:to-orange-700
    "
            >
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button
              className="
      w-full py-3 
      bg-linear-to-r from-yellow-500 to-yellow-700 
      text-white font-semibold rounded-lg 
      shadow-lg hover:shadow-2xl 
      hover:scale-105 transform transition-all duration-300
      text-lg tracking-wide
      hover:from-yellow-400 hover:to-yellow-600
    "
            >
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
