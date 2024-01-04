import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
// import { useControls } from 'leva';

// scene ( WORLD 좌표 단위 ) / group ( LOCAL 좌표 단위 ) / mesh ( LOCAL 좌표 단위 ) 단위 별로 변경이 가능하다 ( 계층 구조 )

export default function ThreeElement() {
  const groupRef = useRef<THREE.Group>(null);
  const greenMeshRef = useRef<THREE.Mesh>(null);
  const blueMeshRef = useRef<THREE.Mesh>(null);
  const redMeshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // const box = useControls({
  //   rotationX: { value: 0, min: -360, max: 360, step: 1 },
  //   rotationY: { value: 0, min: -360, max: 360, step: 1 },
  //   rotationZ: { value: 0, min: -360, max: 360, step: 1 },
  // });

  // useFrame 으로 변경 가능한 값들은 Object3D 객체를 상속받은 것
  useFrame((_, delta) => {
    // 매 프레임마다 불리게 된다.
    // 동적인 동작이 필요한 경우에는 useFrame 에 정의가 필요하다.
    // delta 값은 프레임마다 변하므로 x 값이 누적되면서 돌아가는것 처럼 동작
    // meshRef.current!.rotation.x += delta;
    // meshRef.current!.position.y -= 0.01;
    // meshRef.current!.scale.x += 0.01;

    // console.log('state : ', state);
    // console.log('delta : ', delta);

    groupRef.current!.rotation.x += delta;
    blueMeshRef.current!.rotation.y += 0.03;
    redMeshRef.current!.rotation.z += 0.03;
    greenMeshRef.current!.rotation.x += 0.03;

    scene.rotation.y += delta;

    // scene.position.x += delta;
  });

  return (
    <>
      {/* 빛의 각도를 주어야 색이 바뀜 */}
      <directionalLight position={[5, 5, 5]} />
      {/* mesh 엘리먼트가 Object3D 객체를 상속받았기 때문에 position, scale, rotation 변경이 가능하다
      
      geometry / material 은 Object3D 를 상속받지 않았기 때문에 position, scale, rotation 변경이 불가능

      ps : threejs.org
      */}
      <group ref={groupRef} position={[0, 0, 0]}>
        <mesh
          ref={greenMeshRef}
          position={[2, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
          ]}
          // [x, y, z] 축 three js 에서는 Rad 로 변환해서 표시
          // rotation={[
          //   THREE.MathUtils.degToRad(box.rotationX),
          //   THREE.MathUtils.degToRad(box.rotationY),
          //   THREE.MathUtils.degToRad(box.rotationZ),
          // ]}
        >
          {/* 항상 mesh의 자식요소로 존재해야한다. geometry / material */}
          <boxGeometry />
          {/* <sphereGeometry /> */}
          <meshStandardMaterial color='lightgreen' />
        </mesh>
        <mesh
          ref={redMeshRef}
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
          ]}
          // [x, y, z] 축 three js 에서는 Rad 로 변환해서 표시
          // rotation={[
          //   THREE.MathUtils.degToRad(box.rotationX),
          //   THREE.MathUtils.degToRad(box.rotationY),
          //   THREE.MathUtils.degToRad(box.rotationZ),
          // ]}
        >
          {/* 항상 mesh의 자식요소로 존재해야한다. geometry / material */}
          <boxGeometry />
          {/* <sphereGeometry /> */}
          <meshStandardMaterial color='red' />
        </mesh>
        <mesh
          ref={blueMeshRef}
          position={[0, 2, 0]}
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
          ]}
          // [x, y, z] 축 three js 에서는 Rad 로 변환해서 표시
          // rotation={[
          //   THREE.MathUtils.degToRad(box.rotationX),
          //   THREE.MathUtils.degToRad(box.rotationY),
          //   THREE.MathUtils.degToRad(box.rotationZ),
          // ]}
        >
          {/* 항상 mesh의 자식요소로 존재해야한다. geometry / material */}
          <axesHelper args={[3]} />
          <boxGeometry />
          {/* <sphereGeometry /> */}
          <meshStandardMaterial color='blue' />
        </mesh>
      </group>
    </>
  );
}
