// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useHelper } from '@react-three/drei';

// import MatCap_1 from '../../public/images/matcap_1.png';
// import MatCap_2 from '../../public/images/matcap_2.png';

// scene ( WORLD 좌표 단위 ) / group ( LOCAL 좌표 단위 ) / mesh ( LOCAL 좌표 단위 ) 단위 별로 변경이 가능하다 ( 계층 구조 )

export default function LightTest() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // const matcap_1 = useTexture(MatCap_1);
  // const matcap_2 = useTexture(MatCap_2);

  // useFrame((state, delta) => {});

  useEffect(() => {
    const groupChildren = groupRef.current!.children;
    const groupMeshLength = groupChildren.length;

    for (let i = 0; i < groupMeshLength; i++) {
      const mesh = groupChildren[i] as THREE.Mesh;

      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i % (groupMeshLength / 2)) * 2;
      mesh.position.z = 0;

      if (i >= groupMeshLength / 2) {
        mesh.position.z = 2;
      }
    }
  }, []);

  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper);

  const spotLightRef = useRef<THREE.SpotLight>(null!);
  useHelper(spotLightRef, THREE.SpotLightHelper);

  return (
    <>
      {/* 빛의 각도를 주어야 색이 바뀜 */}

      {/* <ambientLight color='#fff' intensity={1} /> */}

      {/* <hemisphereLight args={['blue', 'yellow', 5]} /> */}

      {/* <directionalLight
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
        ref={directionalLightRef}
        color='#fff'
        position={[0, 5, 0]}
        intensity={5}
        target-position={[0, 0, 2]}
      /> */}
      {/* 
      <pointLight
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
        color='#fff'
        position={[0, 0, 2]}
        intensity={50}
        distance={5}
      /> */}

      <spotLight
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
        ref={spotLightRef}
        color='#fff'
        position={[0, 5, 0]}
        intensity={300}
        distance={10}
        angle={THREE.MathUtils.degToRad(40)}
        target-position={[0, 0, 0]}
        penumbra={0.5}
      />

      {/* <Environment
        files='../../public/images/paris-eiffel.hdr'
        background
        blur={0}
      /> */}

      <mesh
        rotation-x={THREE.MathUtils.degToRad(-90)}
        position-y={-1}
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color='#020059' side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial visible={false} color='green' />
      </mesh>

      <group ref={groupRef} position={[0, 0, 0]}>
        <mesh castShadow receiveShadow>
          <meshLambertMaterial
            color='red'
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.DoubleSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={false}
            fog={false}
            emissive={'black'}
          />
        </mesh>

        <mesh castShadow receiveShadow>
          <meshPhongMaterial
            color='red'
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.DoubleSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={false}
            fog={false}
            emissive={'black'}
            specular={'#fff'}
            shininess={40}
            flatShading={true}
          />
        </mesh>

        <mesh castShadow receiveShadow>
          <meshStandardMaterial
            color='red'
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.DoubleSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={false}
            fog={false}
            emissive={'black'}
            roughness={1}
            metalness={0}
          />
        </mesh>
        {/* <mesh castShadow receiveShadow>
          <meshPhysicalMaterial
            color='#fff'
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.DoubleSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={false}
            fog={false}
            emissive={'black'}
            roughness={1}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1}
            thickness={1}
            ior={2.33}
          />
        </mesh> */}
        <mesh castShadow receiveShadow>
          <meshToonMaterial />
        </mesh>
      </group>
    </>
  );
}
