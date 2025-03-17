import Rocks from "./Mesh/Rocks";
import Terrain from "./Mesh/Terrain";

const R3F = () => {
  return (
    <group>
      <Rocks />
      <Terrain />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};

export default R3F;
