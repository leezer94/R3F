// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';

import MatCap_1 from '../../public/images/matcap_1.png';
import MatCap_2 from '../../public/images/matcap_2.png';

// scene ( WORLD 좌표 단위 ) / group ( LOCAL 좌표 단위 ) / mesh ( LOCAL 좌표 단위 ) 단위 별로 변경이 가능하다 ( 계층 구조 )

export default function MaterialTest() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const matcap_1 = useTexture(MatCap_1);
  const matcap_2 = useTexture(MatCap_2);

  // useFrame((state, delta) => {});

  useEffect(() => {
    const groupChildren = groupRef.current!.children;
    const groupMeshLength = groupChildren.length;

    for (let i = 0; i < groupMeshLength; i++) {
      const mesh = groupChildren[i] as THREE.Mesh;

      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i % (groupMeshLength / 2)) * 2 - 4;
      mesh.position.z = 0;

      if (i >= groupMeshLength / 2) {
        mesh.position.z = 2;
      }
    }
  }, []);

  return (
    <>
      {/* 빛의 각도를 주어야 색이 바뀜 */}
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* <fog attach={'fog'} args={['transparent', 3, 10]} /> */}

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial visible={false} color='green' />
      </mesh>
      <group ref={groupRef} position={[0, 0, 0]}>
        <mesh>
          <meshBasicMaterial wireframe color='green' />
        </mesh>

        <mesh>
          <meshBasicMaterial
            color='red'
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.DoubleSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={false}
            fog={false}
          />
        </mesh>

        <mesh>
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

        <mesh>
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
        <mesh>
          <meshNormalMaterial />
        </mesh>
        <mesh>
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
        {/* <mesh>
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
        <mesh>
          <meshDepthMaterial />
        </mesh>
        <mesh>
          <meshMatcapMaterial matcap={matcap_1} flatShading />
        </mesh>
        <mesh>
          <meshMatcapMaterial matcap={matcap_2} />
        </mesh>
        <mesh>
          <meshToonMaterial />
        </mesh>
      </group>
    </>
  );
}
