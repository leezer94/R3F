/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function InteractionTest() {
  const { camera, raycaster, pointer } = useThree();

  const handleOnClickGroupMesh = (e: any) => {
    // 이벤트 전파 방지 ( 카메라 시점으로 클릭 이벤트를 쏘는 각도 영향을 줌)
    // e.stopPropagation();

    raycaster.setFromCamera(pointer, camera);

    // raycaster
    // Object3D 값에 어느값이 들어가냐에따라 결과값이 달라진다.
    const intersects = raycaster.intersectObject(e.eventObject, true);

    console.log(intersects, 'intersects');

    if (intersects.length > 0) {
      const mesh = intersects[0].object as any;
      mesh.material.color = new THREE.Color('red');
    }
  };

  return (
    <>
      <ambientLight />
      <directionalLight intensity={5} />
      <group onClick={handleOnClickGroupMesh}>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
    </>
  );
}
