import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useState } from "react";
import { getDevicePixelRatio } from "./utils/useDeviceUtils";

function App() {
  const [dpr, setDpr] = useState(getDevicePixelRatio());

  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const handleVisibilityChange = () =>
      setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <Canvas
      id={"root"}
      dpr={dpr}
      frameloop={frameloop}
      gl={{ powerPreference: "high-performance", antialias: true }}
    >
      <PerformanceMonitor
        bounds={() => [30, 500]}
        flipflops={1}
        onDecline={() => {
          setDpr(dpr * 0.8);
        }}
      />
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  );
}

export default App;
