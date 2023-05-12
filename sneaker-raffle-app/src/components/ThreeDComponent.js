import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Box } from '@react-three/drei';

const ThreeDComponent = () => {
    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]}>
                <meshStandardMaterial color={'orange'} />
            </Box>
            <Box position={[1.2, 0, 0]}>
                <meshStandardMaterial color={'blue'} />
            </Box>
            <OrbitControls />
        </Canvas>
    );
};

export default ThreeDComponent;
