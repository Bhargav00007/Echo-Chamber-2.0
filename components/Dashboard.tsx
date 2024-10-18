"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="px-5 ">
      {session ? (
        <>
          <img
            src={session.user?.image as string}
            className="rounded-full h-20 w-20 border-2 border-black"
          ></img>
          <h1 className="lg:text-3xl text-2xl text-green-500 font-bold">
            Welcome back, {session.user?.name}
          </h1>
          <p className="lg:text-2xl text-xl font-semibold">
            {session.user?.email}
          </p>
          <button
            onClick={() => signOut()}
            className="border border-black rounded-lg bg-red-400 px-5 py-1 my-2 hover:bg-transparent transition-all duration-300"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="lg:text-3xl text-2xl text-red-500  font-bold m-5">
            You&apos;re not logged in
          </h1>
          <div className="flex space-x-5">
            <button
              onClick={() => signIn("google")}
              className="border border-black rounded-lg px-5 py-1 hover:bg-gray-100 transition-all duration-300"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="border border-black rounded-lg bg-green-500 px-5 py-1 hover:bg-transparent transition-all duration-300"
            >
              Sign in with GitHub
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
