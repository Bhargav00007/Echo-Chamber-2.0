import React from "react";

const About = () => {
  return (
    <div className="lg:my-10 lg:mx-36 mx-5 my-5">
      <h1 className="lg:text-4xl text-2xl font-bold underline decoration-sky-500">
        Introducing EchoChamber 2.0
      </h1>
      <p className="lg:text-xl text-lg mt-5 first-letter:text-4xl">
        EchoChamber is a cutting-edge online chat platform designed to help you
        stay connected with your friends, family, and communities in real-time.
        Whether you&apos;re looking to share moments, collaborate on projects,
        or engage in meaningful conversations, EchoChamber provides a seamless
        and immersive chatting experience.
      </p>
      <h1 className="lg:text-4xl text-2xl font-bold underline decoration-sky-500 mt-10 lg:mt-20">
        Tech Used (Packages/Libraries)
      </h1>
      <ul
        role="list"
        className="marker:text-sky-400 list-disc pl-5 space-y-3 lg:text-xl text-lg mt-5"
      >
        <li>Next.js</li>
        <li>Tailwind CSS</li>
        <li>MongoDB</li>
        <li>TypeScript</li>
        <li>Flowbite</li>
        <li>Aeternity UI</li>
        <li>Framer Motion</li>
        <li>Mongoose</li>
        <li>NextAuth</li>
        <li>Next.js Toploader</li>
        <li>React Icons</li>
      </ul>

      <h1 className="lg:text-4xl text-2xl font-bold underline decoration-sky-500 mt-10 lg:mt-20">
        EchoChamber (The first)
      </h1>
      <p className="lg:text-xl text-lg mt-5">
        EchoChamber initially faced an unfortunate setback when it had to be
        taken offline due to financial constraints and hosting limitations.
        Despite its early success, the platform was removed by the hosting
        provider due to unforeseen circumstances.
      </p>

      <h1 className="lg:text-4xl text-2xl font-bold underline decoration-sky-500 mt-10 lg:mt-20">
        About Me
      </h1>
      <p className="lg:text-xl text-lg mt-5">
        Hello there! I am Bhargav Pattanayak (B.Tech). This project is part of
        my work on Next.js and TypeScript.
      </p>
    </div>
  );
};

export default About;
