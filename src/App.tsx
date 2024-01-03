import './App.css';
import { Canvas } from '@react-three/fiber';
import { ThreeElement } from './components';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

/**
 * Camera의 orthographic 값에는 fov 값이 존재하지 않고
 * zoom으로 크기 확대 / 축소 가능하다
 *
 *
 * Math.PI = 180
 * Math.PI * 2 = 360
 */
function App() {
  const color = useControls({
    values: 'white',
  });

  const grid = useControls({
    segment: { value: 10, min: 2, max: 100, step: 1 },
  });

  return (
    <Canvas
      // orthographic
      camera={{
        // zoom: 100,
        near: 1,
        far: 100,
        fov: 75,
        position: [3, 3, 0],
      }}
    >
      <color attach='background' args={[color.values]} />
      {/* 구조체의 마우스를 통한 컨트롤이 가능 */}
      <OrbitControls
        // x 축에 대한 마우스 컨틀롤 제한
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        // y 축에 대한 마우스 컨트롤 제한
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
      {/* 기본적 단위는 m 단위 */}
      <axesHelper args={[6]} />
      <gridHelper args={[10, grid.segment]} />
      <ThreeElement />
    </Canvas>
  );
}

export default App;
