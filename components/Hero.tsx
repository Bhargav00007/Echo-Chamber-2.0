"use client";
import React from "react";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import { WavyBackground } from "../components/ui/wavy-background";

export function Hero() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-36 overflow-hidden flex flex-col items-center">
      <p className="text-5xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center font-poppins">
        EchoChamber 2.0
      </p>
      <p className="text-base md:text-xl mt-4 text-white font-normal inter-var text-center px-5">
        Amplify Connections, Elevate Conversations with New and Enhanced
        Features.
      </p>
      <Link
        href="/Home"
        className="mt-5 px-5 py-2 text-white rounded-full  bg-rose-700 hover:bg-rose-500 flex items-center justify-center font-semibold transition-all duration-200"
      >
        Lets Get Started
        <FaArrowCircleRight className="mx-2" />
      </Link>
    </WavyBackground>
  );
}
