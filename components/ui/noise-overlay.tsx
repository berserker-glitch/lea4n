"use client";

import { useEffect, useRef } from "react";

/**
 * Noise overlay using canvas - reliable across all browsers
 */
export function NoiseOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to cover viewport
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateNoise();
        };

        // Generate noise pattern
        const generateNoise = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 15;    // Alpha (very subtle)
            }

            ctx.putImageData(imageData, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        // Optional: animate noise
        let animationId: number;
        const animate = () => {
            generateNoise();
            animationId = requestAnimationFrame(animate);
        };
        // Uncomment for animated noise:
        // animate();

        return () => {
            window.removeEventListener("resize", resize);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{ mixBlendMode: "overlay" }}
            aria-hidden="true"
        />
    );
}
