export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
      </p>
    </div>
  );
}

// bahar wala page.tsx is inside profile so it  will run for => http://localhost:3000/profile
// and this [id] wala page.tsx will run for => http://localhost:3000/profile/[id] ex -> http://localhost:3000/profile/11

/*
### 📌 What this file is

A **dynamic route page** in **Next.js App Router** that handles URLs like:

/profile/11


### 📁 File structure

src/app/profile/[id]/page.tsx

* `profile` → route
* `[id]` → dynamic URL value
* `page.tsx` → page renderer


### ⚙️ How it works

* Next.js extracts `id` from the URL
* It provides it as `params` (**Promise** in Next.js 15)
* You **must unwrap it**

```ts
const { id } = await params;


### 🧠 Why `await` is needed

`params` is async → accessing it directly causes an error.

---

### 🖥️ What it does

* Runs on the **server**
* Renders profile page with the dynamic `id`
* Sends **HTML only** to the browser


### 🔑 One-line rule

> **Dynamic routes → `[id]` → `params` → `await params`**


If you want an even **1-liner ultra-short**, tell me 😄

*/
