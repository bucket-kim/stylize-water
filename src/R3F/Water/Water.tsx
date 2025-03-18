import { useControls } from "leva";
import { waterStore } from "../../States/waterStore";
import CustomShaderMaterial from "three-custom-shader-material";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./Shader/vertex.glsl?raw";
import fragmentShader from "./Shader/fragment.glsl?raw";
import { useFrame } from "@react-three/fiber";

const Water = () => {
  const materialRef = useRef<any>(null);

  const waterLevel = waterStore((state) => state.waterLevel);
  const waveSpeed = waterStore((state) => state.waveSpeed);
  const waveAmplitude = waterStore((state) => state.waveAmplitude);
  const foamDepth = waterStore((state) => state.foamDepth);

  const {
    COLOR_BASE_NEAR,
    COLOR_BASE_FAR,
    WATER_LEVEL,
    WAVE_SPEED,
    WAVE_AMPLITUDE,
    TEXTURE_SIZE,
    FOAM_DEPTH,
  } = useControls("Water", {
    COLOR_BASE_NEAR: { value: "#00fccd", label: "Near" },
    COLOR_BASE_FAR: { value: "#1ceeff", label: "Far" },
    WATER_LEVEL: {
      value: waterLevel,
      min: 0.5,
      max: 5.0,
      step: 0.1,
      label: "Water Level",
    },
    WAVE_SPEED: {
      value: waveSpeed,
      min: 0.5,
      max: 2.0,
      step: 0.1,
      label: "Wave Speed",
    },
    WAVE_AMPLITUDE: {
      value: waveAmplitude,
      min: 0.05,
      max: 0.5,
      step: 0.05,
      label: "Wave Amplitude",
    },
    TEXTURE_SIZE: {
      value: 45,
      min: 1,
      max: 80,
      step: 1,
      label: "Texture Size",
    },
    FOAM_DEPTH: {
      value: foamDepth,
      min: 0.01,
      max: 0.5,
      step: 0.01,
      label: "Foam",
    },
  });

  const COLOR_FAR = useMemo(() => {
    return new THREE.Color(COLOR_BASE_FAR);
  }, []);

  useEffect(() => {
    waterStore.setState(() => ({
      waterLevel: WATER_LEVEL,
      waveSpeed: WAVE_SPEED,
      waveAmplitude: WAVE_AMPLITUDE,
      foamDepth: FOAM_DEPTH,
    }));
  }, [WAVE_SPEED, WAVE_AMPLITUDE, WATER_LEVEL, FOAM_DEPTH]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uColorFar.value = COLOR_FAR;
    materialRef.current.uniforms.uWaveSpeed.value = WAVE_SPEED;
    materialRef.current.uniforms.uWaveAmplitude.value = WAVE_AMPLITUDE;
    materialRef.current.uniforms.uTextureSize.value = TEXTURE_SIZE;
  }, [COLOR_FAR, WAVE_SPEED, WAVE_AMPLITUDE, TEXTURE_SIZE]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const elapedTime = state.clock.getElapsedTime();

    materialRef.current.uniforms.uTime.value = elapedTime;
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={waterLevel}>
      <planeGeometry args={[256, 256]} />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColorFar: { value: COLOR_FAR },
          uWaveSpeed: { value: WAVE_SPEED },
          uWaveAmplitude: { value: WAVE_AMPLITUDE },
          uTextureSize: { value: TEXTURE_SIZE },
        }}
        color={COLOR_BASE_NEAR}
        transparent
      />
    </mesh>
  );
};

export default Water;
