import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function ThreeElement() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const box = useControls({
    rotationX: { value: 0, min: -360, max: 360, step: 1 },
    rotationY: { value: 0, min: -360, max: 360, step: 1 },
    rotationZ: { value: 0, min: -360, max: 360, step: 1 },
  });

  useFrame((state, delta) => {
    // 매 프레임마다 불리게 된다.
    // 동적인 동작이 필요한 경우에는 useFrame 에 정의가 필요하다.
    // delta 값은 프레임마다 변하므로 x 값이 누적되면서 돌아가는것 처럼 동작
    // meshRef.current!.rotation.x += delta;
    // meshRef.current!.position.y -= 0.01;
    // meshRef.current!.scale.x += 0.01;
    // console.log('state : ', state);
    // console.log('delta : ', delta);
  });

  return (
    <>
      {/* 빛의 각도를 주어야 색이 바뀜 */}
      <directionalLight position={[5, 5, 5]} />
      <mesh
        ref={meshRef}
        // [x, y, z] 축 three js 에서는 Rad 로 변환해서 표시
        rotation={[
          THREE.MathUtils.degToRad(box.rotationX),
          THREE.MathUtils.degToRad(box.rotationY),
          THREE.MathUtils.degToRad(box.rotationZ),
        ]}
      >
        {/* 항상 mesh의 자식요소로 존재해야한다. geometry / material */}
        <boxGeometry />
        {/* <sphereGeometry /> */}
        <meshStandardMaterial color='red' />
      </mesh>
    </>
  );
}
