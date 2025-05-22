// components/RobotModel.jsx
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function RobotModel(props) {
  const { scene } = useGLTF('/robot.glb');
  const ref = useRef();

  // Rotate animation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={ref} scale={1.5} {...props} />;
}
