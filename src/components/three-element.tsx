import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

// scene ( WORLD 좌표 단위 ) / group ( LOCAL 좌표 단위 ) / mesh ( LOCAL 좌표 단위 ) 단위 별로 변경이 가능하다 ( 계층 구조 )

export default function ThreeElement() {
  const redMeshRef = useRef<THREE.Mesh>(null);
  const redCopyMeshRef = useRef<THREE.Mesh>(null);
  const greenMeshRef = useRef<THREE.Mesh>(null);
  const greenCopyMeshRef = useRef<THREE.Mesh>(null);

  const boxControl = useControls({
    width: { value: 1, min: 0.1, max: 10, step: 0.1 },
    height: { value: 1, min: 0.1, max: 10, step: 0.1 },
    depth: { value: 1, min: 0.1, max: 10, step: 0.1 },
    width_segment: { value: 1, min: 1, max: 10, step: 1 },
    height_segment: { value: 1, min: 1, max: 10, step: 1 },
    depth_segment: { value: 1, min: 1, max: 10, step: 1 },
  });

  const circleControl = useControls({
    radius: { value: 1, min: 0.1, max: 10, step: 0.1 },
    segment: { value: 32, min: 1, max: 100, step: 1 },
    theta_start: { value: 32, min: 0, max: 360, step: 0.1 },
    theta_length: { value: 360, min: 0, max: 360, step: 0.1 },
  });

  // useFrame 으로 변경 가능한 값들은 Object3D 객체를 상속받은 것
  useFrame((_, __) => {
    _;
    __;
    // 매 프레임마다 불리게 된다.
    // 동적인 동작이 필요한 경우에는 useFrame 에 정의가 필요하다.
    // delta 값은 프레임마다 변하므로 x 값이 누적되면서 돌아가는것 처럼 동작
    // meshRef.current!.rotation.x += delta;
    // meshRef.current!.position.y -= 0.01;
    // meshRef.current!.scale.x += 0.01;
    // console.log('state : ', state);
    // console.log('delta : ', delta);
    // scene.position.x += delta;
  });

  useEffect(() => {
    // 복사된 객체가 원 객체의 geometry 를 참조
    greenCopyMeshRef.current!.geometry = greenMeshRef.current!.geometry;
  }, [boxControl]);

  useEffect(() => {
    // 복사된 객체가 원 객체의 geometry 를 참조
    redCopyMeshRef.current!.geometry = redMeshRef.current!.geometry;
  }, [circleControl]);

  return (
    <>
      {/* 빛의 각도를 주어야 색이 바뀜 */}
      <directionalLight position={[5, 5, 5]} />
      {/* mesh 엘리먼트가 Object3D 객체를 상속받았기 때문에 position, scale, rotation 변경이 가능하다
      
      geometry / material 은 Object3D 를 상속받지 않았기 때문에 position, scale, rotation 변경이 불가능

      ps : threejs.org
      */}

      <mesh
        ref={redMeshRef}
        position={[2, 0, 0]}
        // [x, y, z] 축 three js 에서는 Rad 로 변환해서 표시
        // rotation={[
        //   THREE.MathUtils.degToRad(box.rotationX),
        //   THREE.MathUtils.degToRad(box.rotationY),
        //   THREE.MathUtils.degToRad(box.rotationZ),
        // ]}
      >
        {/* 항상 mesh의 자식요소로 존재해야한다. geometry / material */}
        {/* <boxGeometry
          args={[
            boxControl.width,
            boxControl.height,
            boxControl.depth,
            boxControl.width_segment,
            boxControl.height_segment,
            boxControl.depth_segment,
          ]}
        /> */}
        <circleGeometry
          args={[
            circleControl.radius,
            circleControl.segment,
            circleControl.theta_start,
            THREE.MathUtils.degToRad(circleControl.theta_length),
          ]}
        />
        {/* <sphereGeometry /> */}
        <meshStandardMaterial wireframe />
      </mesh>
      <mesh ref={redCopyMeshRef} position={[2, 0, 0]}>
        <meshStandardMaterial color='red' />
      </mesh>

      <mesh
        ref={greenMeshRef}
        position={[-2, 0, 0]}
        // [x, y, z] 축 three js 에서는 Rad 로 변환해서 표시
        // rotation={[
        //   THREE.MathUtils.degToRad(box.rotationX),
        //   THREE.MathUtils.degToRad(box.rotationY),
        //   THREE.MathUtils.degToRad(box.rotationZ),
        // ]}
      >
        {/* 항상 mesh의 자식요소로 존재해야한다. geometry / material */}
        <boxGeometry
          args={[
            boxControl.width,
            boxControl.height,
            boxControl.depth,
            boxControl.width_segment,
            boxControl.height_segment,
            boxControl.depth_segment,
          ]}
        />

        <meshStandardMaterial wireframe />
      </mesh>
      <mesh ref={greenCopyMeshRef} position={[-2, 0, 0]}>
        <meshStandardMaterial color='green' />
      </mesh>
    </>
  );
}
