/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/terrain.glb -S -T -t 
Files: ./public/models/terrain.glb [5.79KB] > /Users/briankim/Documents/GitHub/stylize-water/terrain-transformed.glb [4.98KB] (14%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    plane: THREE.Mesh;
  };
  materials: {};
  animations: GLTFAction[];
};

const Terrain = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes } = useGLTF("/models/terrain.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.plane.geometry} />
    </group>
  );
};

export default Terrain;

useGLTF.preload("/models/terrain.glb");
