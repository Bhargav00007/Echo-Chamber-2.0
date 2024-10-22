"use client";
import React, { useState, useEffect, useRef } from "react";

const DinoGame = () => {
  const [dinoJumping, setDinoJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100); // Initial obstacle position
  const dinoRef = useRef<HTMLDivElement>(null);

  // Handle Dino jump logic
  const handleJump = () => {
    if (!dinoJumping && !gameOver) {
      setDinoJumping(true);
      setTimeout(() => setDinoJumping(false), 500); // Dino jump duration
    }
  };

  // Obstacle movement and collision detection
  useEffect(() => {
    if (gameOver) return; // Stop the game if it's over

    const obstacleMovement = setInterval(() => {
      setObstaclePosition((prev) => (prev > -10 ? prev - 5 : 100)); // Move the obstacle left, reset when off-screen

      // Check for collision
      if (obstaclePosition < 20 && obstaclePosition > 0 && !dinoJumping) {
        setGameOver(true);
      } else if (obstaclePosition === 0) {
        // Increment score when the obstacle is jumped over
        setScore((prevScore) => prevScore + 1);
      }
    }, 70); // Adjust this value for the speed of the obstacle

    return () => clearInterval(obstacleMovement);
  }, [obstaclePosition, dinoJumping, gameOver]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setObstaclePosition(100);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Game Chamber</h1>
        <p className="text-xl">Score: {score}</p>
      </div>

      {/* Game Area */}
      <div className="relative lg:w-[1000px] w-96 h-48 bg-green-300 overflow-hidden">
        {/* Dino */}
        <div
          ref={dinoRef}
          className={`absolute bottom-0 left-10 w-12 h-12 bg-black transition-transform ${
            dinoJumping ? "transform -translate-y-20" : ""
          }`}
        />

        {/* Obstacle */}
        <div
          className="absolute bottom-0 w-10 h-10 bg-red-500 rounded-full"
          style={{ left: `${obstaclePosition}%` }}
        />
      </div>

      {gameOver ? (
        <button
          onClick={restartGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Restart Game
        </button>
      ) : (
        <button
          onClick={handleJump}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Jump
        </button>
      )}
    </div>
  );
};

export default DinoGame;
