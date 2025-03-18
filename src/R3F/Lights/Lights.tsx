import { Environment } from "@react-three/drei";
import { Fragment } from "react";

const Lights = () => {
  return (
    <Fragment>
      <Environment preset="forest" environmentIntensity={0.5} />
      <ambientLight intensity={1.0} />

      <directionalLight
        position={[13, 5, 5]}
        castShadow
        intensity={2.5}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-30}
          right={30}
          top={30}
          bottom={-30}
        />
      </directionalLight>
    </Fragment>
  );
};

export default Lights;
