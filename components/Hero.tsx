"use client";
import React from "react";
import { WavyBackground } from "../components/ui/wavy-background";

export function Hero() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-36 overflow-hidden">
      <p className="text-4xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center font-poppins">
        EchoChamber 2.0
      </p>
      <p className="text-xl md:text-xl mt-4 text-white font-normal inter-var text-center">
        Amplify Connections, Elevate Conversations with New and Enhanced
        Features.{" "}
      </p>
    </WavyBackground>
  );
}
