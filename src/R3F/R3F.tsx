import { CameraControls } from "@react-three/drei";
import Lights from "./Lights/Lights";
import Rocks from "./Mesh/Rocks/Rocks";
import Terrain from "./Mesh/Terrain/Terrain";
import { useControls } from "leva";
import { Fragment } from "react/jsx-runtime";
import Water from "./Water/Water";

const R3F = () => {
  const { BACKGROUND } = useControls("Sky", {
    BACKGROUND: {
      value: "#41c6ff",
      lable: "Background",
    },
  });

  return (
    <Fragment>
      <Lights />
      <group>
        <Rocks position={[8, 0.5, -5]} />
        <Terrain />
        <Water />
      </group>
      <CameraControls
        maxPolarAngle={Math.PI / 2.2}
        maxDistance={80}
        minDistance={15}
      />

      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 120, 150]} />
    </Fragment>
  );
};

export default R3F;
