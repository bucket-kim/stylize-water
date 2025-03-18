import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { JSX, useEffect, useMemo, useRef } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";
import { waterStore } from "../../../States/waterStore";
import vertexShader from "../Terrain/Shader/vertex.glsl?raw";
import fragmentShader from "../Terrain/Shader/fragment.glsl?raw";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    plane: THREE.Mesh;
  };
  materials: {};
};

const Terrain = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes } = useGLTF("/models/terrain.glb") as unknown as GLTFResult;

  const materialRef = useRef<any>(null);

  const waterLevel = waterStore((state) => state.waterLevel);
  const waveSpeed = waterStore((state) => state.waveSpeed);
  const waveAmplitude = waterStore((state) => state.waveAmplitude);
  const foamDepth = waterStore((state) => state.foamDepth);

  const { SAND_BASE_COLOR, GRASS_BASE_COLOR, UNDERWATER_BASE_COLOR } =
    useControls("Terrain", {
      SAND_BASE_COLOR: { value: "#ff9900", label: "Sand" },
      GRASS_BASE_COLOR: { value: "#85a02b", label: "Grass" },
      UNDERWATER_BASE_COLOR: { value: "#118a4f", label: "Underwater" },
    });

  const GRASS_COLOR = useMemo(
    () => new THREE.Color(GRASS_BASE_COLOR),
    [GRASS_BASE_COLOR],
  );
  const UNDERWATER_COLOR = useMemo(
    () => new THREE.Color(UNDERWATER_BASE_COLOR),
    [UNDERWATER_BASE_COLOR],
  );

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uGrassColor.value = GRASS_COLOR;
    materialRef.current.uniforms.uUnderwaterColor.value = UNDERWATER_COLOR;
    materialRef.current.uniforms.uWaterLevel.value = waterLevel;
    materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
    materialRef.current.uniforms.uWaveAmplitude.value = waveAmplitude;
    materialRef.current.uniforms.uFoamDepth.value = foamDepth;
  }, [
    GRASS_COLOR,
    UNDERWATER_COLOR,
    waterLevel,
    waveSpeed,
    waveAmplitude,
    foamDepth,
  ]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    const elapsedTime = clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = elapsedTime;
  });

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.plane.geometry} receiveShadow>
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          color={SAND_BASE_COLOR}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uGrassColor: { value: GRASS_COLOR },
            uUnderwaterColor: { value: UNDERWATER_COLOR },
            uWaterLevel: { value: waterLevel },
            uWaveSpeed: { value: waveSpeed },
            uFoamDepth: { value: foamDepth },
            uWaveAmplitude: { value: waveAmplitude },
          }}
        />
      </mesh>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -0.01, 0]} // Moved it down to prevent the visual glitch from plane collision
        receiveShadow
      >
        <planeGeometry args={[256, 256]} />
        <meshStandardMaterial color={UNDERWATER_BASE_COLOR} />
      </mesh>
    </group>
  );
};

export default Terrain;

useGLTF.preload("/models/terrain.glb");
