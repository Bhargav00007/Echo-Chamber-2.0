"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props // Spread operator for additional props
}: {
  children?: React.ReactNode; // Specify children type
  className?: string; // Specify className type
  containerClassName?: string; // Specify container className type
  colors?: string[]; // Specify colors as an array of strings
  waveWidth?: number; // Specify waveWidth type
  backgroundFill?: string; // Specify backgroundFill type
  blur?: number; // Specify blur type
  speed?: "slow" | "fast"; // Specify speed as a union type
  waveOpacity?: number; // Specify waveOpacity type
} & React.HTMLAttributes<HTMLDivElement>) => {
  // Extend props with div attributes
  const noise = createNoise3D();
  let w: number, h: number, nt: number, i: number, x: number;
  let ctx: CanvasRenderingContext2D | null = null;
  let canvas: HTMLCanvasElement | null = null;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = (): number => {
    switch (speed) {
      case "fast":
        return 0.01;
      case "slow":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = (): void => {
    canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx!.canvas.width = window.innerWidth;
      h = ctx!.canvas.height = window.innerHeight;
      ctx!.filter = `blur(${blur}px)`;
    };
    render();
  };

  const waveColors = colors ?? [
    "#0000FF",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n: number): void => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx?.beginPath();
      ctx!.lineWidth = waveWidth || 50;
      ctx!.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx!.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx?.stroke();
      ctx?.closePath();
    }
  };

  let animationId: number;
  const render = (): void => {
    if (!ctx) return;
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // Safari detection
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center bg-black",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
