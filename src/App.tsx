import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useState } from "react";
import { getDevicePixelRatio } from "./utils/useDeviceUtils";
import R3F from "./R3F/R3F";

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
      camera={{ position: [30, 10, -30], fov: 35 }}
      shadows
    >
      <PerformanceMonitor
        bounds={() => [30, 500]}
        flipflops={1}
        onDecline={() => {
          setDpr(dpr * 0.8);
        }}
      />
      <OrbitControls />
      <R3F />
    </Canvas>
  );
}

export default App;
