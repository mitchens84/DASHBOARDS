import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder, Html } from '@react-three/drei';
import * as THREE from 'three';

// Import color and data constants
const BRAND_COLORS = {
  gemini: { primary: '#4285F4', light: 'rgba(66, 133, 244, 0.1)' },
  openai: { primary: '#10a37f', light: 'rgba(16, 163, 127, 0.1)' },
  perplexity: { primary: '#5536da', light: 'rgba(85, 54, 218, 0.1)' },
  claude: { primary: '#b159e9', light: 'rgba(177, 89, 233, 0.1)' },
  xai: { primary: '#1DA1F2', light: 'rgba(29, 161, 242, 0.1)' }
};

// Benchmark data for HLE scores
const benchmarkData = [
  { name: 'Gemini 2.5 Pro DR', value: 18.8, color: BRAND_COLORS.gemini.primary, key: 'gemini' },
  { name: 'OpenAI DR', value: 26.6, color: BRAND_COLORS.openai.primary, key: 'openai' },
  { name: 'Perplexity DR', value: 21.1, color: BRAND_COLORS.perplexity.primary, key: 'perplexity' },
  { name: 'Claude Research', value: 4.3, color: BRAND_COLORS.claude.primary, key: 'claude' },
  { name: 'X AI Grok', value: 3.8, color: BRAND_COLORS.xai.primary, key: 'xai' }
];

// Performance data for radar chart
const radarData = [
  { subject: 'Reasoning', gemini: 85, openai: 98, perplexity: 85, claude: 70, xai: 65 },
  { subject: 'Speed', gemini: 75, openai: 50, perplexity: 95, claude: 65, xai: 90 },
  { subject: 'Citation Quality', gemini: 80, openai: 94, perplexity: 89, claude: 91, xai: 75 },
  { subject: 'User Experience', gemini: 85, openai: 75, perplexity: 85, claude: 70, xai: 85 },
  { subject: 'Integration', gemini: 90, openai: 70, perplexity: 65, claude: 85, xai: 85 },
  { subject: 'Visualization', gemini: 95, openai: 75, perplexity: 70, claude: 65, xai: 80 },
  { subject: 'Low Hallucination', gemini: 75, openai: 90, perplexity: 70, claude: 90, xai: 60 },
  { subject: 'Recency', gemini: 80, openai: 75, perplexity: 95, claude: 70, xai: 95 }
];

// Component for animated 3D bar
const AnimatedBar = ({ position, maxHeight, color, label, score, delay = 0 }) => {
  const [height, setHeight] = useState(0.1);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (clock.elapsedTime > delay) {
      setHeight(Math.min(height + 0.05, maxHeight));
    }
  });

  return (
    <group 
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <Box 
        args={[1, height, 1]} 
        position={[0, height/2, 0]}
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.4}
          roughness={0.5}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Box>
      
      {/* Label for the bar */}
      <Text
        position={[0, height + 0.4, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {label}
      </Text>
      
      {/* Score display */}
      <Text
        position={[0, height + 0.8, 0]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {score}%
      </Text>
      
      {/* Base platform */}
      <Cylinder 
        args={[0.6, 0.6, 0.1, 32]} 
        position={[0, -0.05, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={color}
          opacity={0.7}
          transparent
        />
      </Cylinder>
    </group>
  );
};

// Component for 3D radar visualization
const RadarMesh = ({ toolKey, toolColor, points, position = [0, 0, 0], hoveredTool, setHoveredTool }) => {
  const isHovered = hoveredTool === toolKey;
  
  // Create vertices for each radar point with height
  const vertices = points.map((point, i) => {
    const angle = (Math.PI * 2 * i) / points.length;
    const radius = point * 0.05; // Scale down the values
    return new THREE.Vector3(
      radius * Math.sin(angle) + position[0],
      position[1],
      radius * Math.cos(angle) + position[2]
    );
  });

  // Close the shape by repeating the first point
  vertices.push(vertices[0].clone());
  
  // Create the line geometry
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  
  return (
    <>
      {/* Radar line */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial 
          attach="material" 
          color={toolColor} 
          linewidth={2} 
          opacity={isHovered ? 1 : 0.8} 
          transparent 
        />
      </line>
      
      {/* Radar points */}
      {vertices.slice(0, -1).map((vertex, i) => (
        <Sphere 
          key={i} 
          args={[0.1, 16, 16]} 
          position={vertex}
        >
          <meshStandardMaterial 
            color={toolColor} 
            emissive={isHovered ? toolColor : "#000000"}
            emissiveIntensity={isHovered ? 0.5 : 0}
          />
        </Sphere>
      ))}
      
      {/* Radar filled area (semi-transparent) */}
      <mesh
        onPointerOver={() => setHoveredTool(toolKey)}
        onPointerOut={() => setHoveredTool(null)}
      >
        <bufferGeometry>
          {(() => {
            const shape = new THREE.Shape();
            shape.moveTo(position[0], position[2]);
            points.forEach((point, i) => {
              const angle = (Math.PI * 2 * i) / points.length;
              const radius = point * 0.05;
              shape.lineTo(
                radius * Math.sin(angle) + position[0],
                radius * Math.cos(angle) + position[2]
              );
            });
            shape.closePath();
            
            const shapeGeometry = new THREE.ShapeGeometry(shape);
            shapeGeometry.rotateX(-Math.PI / 2);
            
            return shapeGeometry;
          })()}
        </bufferGeometry>
        <meshStandardMaterial 
          color={toolColor} 
          transparent 
          opacity={isHovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

// Component for axis labels in the radar chart
const RadarAxes = ({ position = [0, 0, 0], radius }) => {
  const subjects = radarData.map(item => item.subject);

  return (
    <>
      {subjects.map((subject, i) => {
        const angle = (Math.PI * 2 * i) / subjects.length;
        const x = (radius + 1) * Math.sin(angle) + position[0];
        const z = (radius + 1) * Math.cos(angle) + position[2];

        return (
          <Text
            key={subject}
            position={[x, position[1], z]}
            fontSize={0.35}
            color="black"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.5}
            textAlign="center"
          >
            {subject}
          </Text>
        );
      })}
    </>
  );
};

// Main 3D visualization component with tabs for different views
const AIResearchTools3DVisualization = () => {
  const [activeView, setActiveView] = useState('bars');
  const [hoveredTool, setHoveredTool] = useState(null);
  
  // Space between bars
  const spacing = 2.5; 
  const maxBarHeight = 8;
  
  // Calculate points for each tool in radar chart
  const getToolRadarPoints = (toolKey) => {
    return radarData.map(item => item[toolKey]);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Visualization Title */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">AI Research Tools 3D Visualization</h1>
          <p className="text-sm opacity-90">Interactive 3D comparison of leading AI deep research tools (2025)</p>
        </div>
      </div>
      
      {/* View Selector Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeView === 'bars' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveView('bars')}
        >
          3D Bar Chart
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeView === 'radar' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveView('radar')}
        >
          3D Radar Chart
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeView === 'scene' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveView('scene')}
        >
          Abstract Scene
        </button>
      </div>
      
      {/* 3D Canvas */}
      <div className="h-[80vh] w-full">
        <Canvas
          camera={{ position: [0, 6, 15], fov: 50 }}
          shadows
          gl={{ antialias: true }}
        >
          {/* Common elements */}
          <color attach="background" args={['#f8f9fa']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow />
          <directionalLight position={[-5, 8, -7]} intensity={0.3} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
          
          {/* 3D Bar Chart View */}
          {activeView === 'bars' && (
            <>
              {/* Title */}
              <Text
                position={[0, maxBarHeight + 1, 0]}
                fontSize={0.8}
                color="#1e40af"
                anchorX="center"
                anchorY="middle"
                maxWidth={30}
              >
                HLE Benchmark Scores (3D)
              </Text>
              
              {/* Bars */}
              {benchmarkData.map((item, index) => {
                const barHeight = (item.value / 30) * maxBarHeight; // Scale to max height
                const position = [
                  (index * spacing) - ((benchmarkData.length - 1) * spacing / 2),
                  0,
                  0
                ];
                
                return (
                  <AnimatedBar
                    key={item.key}
                    position={position}
                    maxHeight={barHeight}
                    color={item.color}
                    label={item.name}
                    score={item.value}
                    delay={index * 0.2} // Stagger animation
                  />
                );
              })}
              
              {/* Floor */}
              <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[30, 20]} />
                <shadowMaterial transparent opacity={0.2} />
              </mesh>
              
              {/* X-axis */}
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[benchmarkData.length * spacing + 4, 0.05, 0.05]} />
                <meshStandardMaterial color="#333333" />
              </mesh>
              
              {/* Y-axis */}
              <mesh position={[-((benchmarkData.length * spacing) / 2 + 2), maxBarHeight / 2, 0]}>
                <boxGeometry args={[0.05, maxBarHeight, 0.05]} />
                <meshStandardMaterial color="#333333" />
              </mesh>
              
              {/* Y-axis labels */}
              {[0, 5, 10, 15, 20, 25, 30].map((value) => {
                const y = (value / 30) * maxBarHeight;
                if (y <= maxBarHeight) {
                  return (
                    <Text
                      key={value}
                      position={[-((benchmarkData.length * spacing) / 2 + 2.3), y, 0]}
                      fontSize={0.3}
                      color="#666666"
                      anchorX="right"
                      anchorY="middle"
                    >
                      {value}%
                    </Text>
                  );
                }
                return null;
              })}
            </>
          )}
          
          {/* 3D Radar Chart View */}
          {activeView === 'radar' && (
            <>
              {/* Title */}
              <Text
                position={[0, 7, 0]}
                fontSize={0.8}
                color="#1e40af"
                anchorX="center"
                anchorY="middle"
              >
                Performance Metrics Radar (3D)
              </Text>
              
              {/* Instruction */}
              <Text
                position={[0, 6.2, 0]}
                fontSize={0.4}
                color="#666666"
                anchorX="center"
                anchorY="middle"
              >
                Hover over a shape to highlight a specific tool
              </Text>
              
              {/* Radar platform */}
              <Cylinder
                args={[7, 7, 0.2, 64]}
                position={[0, -0.1, 0]}
                rotation={[0, 0, 0]}
              >
                <meshStandardMaterial color="#e5e7eb" />
              </Cylinder>
              
              {/* Radar axis lines */}
              {radarData.map((item, i) => {
                const angle = (Math.PI * 2 * i) / radarData.length;
                const x = 6 * Math.sin(angle);
                const z = 6 * Math.cos(angle);
                
                return (
                  <line key={i}>
                    <bufferGeometry
                      attach="geometry"
                      setFromPoints={[
                        new THREE.Vector3(0, 0, 0), 
                        new THREE.Vector3(x, 0, z)
                      ]}
                    />
                    <lineBasicMaterial attach="material" color="#cbd5e1" linewidth={1} />
                  </line>
                );
              })}
              
              {/* Radar circles */}
              {[20, 40, 60, 80, 100].map((percent) => {
                const radius = percent * 0.05;
                const points = [];
                const segments = 64;
                
                for (let i = 0; i <= segments; i++) {
                  const angle = (Math.PI * 2 * i) / segments;
                  points.push(
                    new THREE.Vector3(
                      radius * Math.sin(angle),
                      0,
                      radius * Math.cos(angle)
                    )
                  );
                }
                
                return (
                  <group key={percent}>
                    {/* Circle line */}
                    <line>
                      <bufferGeometry attach="geometry" setFromPoints={points} />
                      <lineBasicMaterial 
                        attach="material" 
                        color="#cbd5e1" 
                        opacity={0.7} 
                        transparent 
                      />
                    </line>
                    
                    {/* Label for circle */}
                    <Text
                      position={[0, 0.1, -radius]}
                      fontSize={0.25}
                      color="#94a3b8"
                      anchorX="center"
                      anchorY="middle"
                    >
                      {percent}%
                    </Text>
                  </group>
                );
              })}
              
              {/* Tool radar visualizations */}
              {benchmarkData.map((item) => (
                <RadarMesh
                  key={item.key}
                  toolKey={item.key}
                  toolColor={item.color}
                  points={getToolRadarPoints(item.key)}
                  hoveredTool={hoveredTool}
                  setHoveredTool={setHoveredTool}
                />
              ))}
              
              {/* Add axis labels */}
              <RadarAxes position={[0, 0, 0]} radius={6.5} />
              
              {/* Tool legend */}
              <group position={[0, 0.5, 0]}>
                {benchmarkData.map((item, i) => (
                  <group 
                    key={item.key} 
                    position={[0, (benchmarkData.length - 1 - i) * 0.8, 0]} 
                    onPointerOver={() => setHoveredTool(item.key)}
                    onPointerOut={() => setHoveredTool(null)}
                  >
                    <Text
                      position={[0, 3, 0]}
                      fontSize={0.4}
                      color={hoveredTool === item.key ? item.color : '#64748b'}
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={5}
                    >
                      {item.name}
                    </Text>
                  </group>
                ))}
              </group>
            </>
          )}
          
          {/* Abstract 3D Scene */}
          {activeView === 'scene' && (
            <>
              {/* Title */}
              <Text
                position={[0, 8, 0]}
                fontSize={0.8}
                color="#1e40af"
                anchorX="center"
                anchorY="middle"
              >
                Abstract AI Research Tool Representation
              </Text>
              
              {/* Abstract geometries representing the tools */}
              {benchmarkData.map((item, index) => {
                // Different position for each tool in a semi-circle
                const angle = (Math.PI * index) / (benchmarkData.length - 1);
                const radius = 6;
                const x = radius * Math.sin(angle);
                const z = -radius * Math.cos(angle) + radius;
                
                // Height based on HLE score - make sure it's a positive number
                const itemHeight = Math.max(item.value / 10, 0.5);
                
                // Different shapes for different tools
                const shapes = [
                  // Gemini - Cylinder
                  <group key="gemini" position={[x, itemHeight, z]}>
                    <Cylinder 
                      args={[1, 1.3, itemHeight * 2, 32]} 
                      position={[0, 0, 0]}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color} 
                        metalness={0.5}
                        roughness={0.3}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Cylinder>
                  </group>,
                  
                  // OpenAI - Box with rounded edges
                  <group key="openai" position={[x, itemHeight, z]}>
                    <Box
                      args={[2, itemHeight * 2, 2]}
                      radius={0.2}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color} 
                        metalness={0.6}
                        roughness={0.2}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Box>
                  </group>,
                  
                  // Perplexity - Sphere
                  <group key="perplexity" position={[x, itemHeight + 1, z]}>
                    <Sphere
                      args={[1.2, 32, 32]}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color} 
                        metalness={0.4}
                        roughness={0.4}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Sphere>
                  </group>,
                  
                  // Claude - Compound shape (cylinder + sphere)
                  <group key="claude" position={[x, itemHeight, z]}>
                    <Cylinder
                      args={[0.7, 0.7, itemHeight * 2, 32]}
                      position={[0, 0, 0]}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color}
                        metalness={0.3}
                        roughness={0.6}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Cylinder>
                    <Sphere
                      args={[0.9, 32, 32]}
                      position={[0, itemHeight, 0]}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color}
                        metalness={0.3}
                        roughness={0.6}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Sphere>
                  </group>,
                  
                  // X AI - Torus (using Box for now)
                  <group key="xai" position={[x, itemHeight, z]}>
                    <Box
                      args={[2, itemHeight * 2, 0.5]}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color}
                        metalness={0.7}
                        roughness={0.2}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Box>
                    <Box
                      args={[0.5, itemHeight * 2, 2]}
                      castShadow
                      position={[0, 0, 0]}
                    >
                      <meshStandardMaterial 
                        color={item.color}
                        metalness={0.7}
                        roughness={0.2}
                        emissive={item.color}
                        emissiveIntensity={0.2}
                      />
                    </Box>
                  </group>
                ];

                return (
                  <group key={item.key}>
                    {/* Shape */}
                    {shapes[index]}
                    
                    {/* Tool name */}
                    <Text
                      position={[x, itemHeight * 2 + 1.5, z]}
                      fontSize={0.5}
                      color={item.color}
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={3}
                    >
                      {item.name}
                    </Text>
                    
                    {/* HLE score */}
                    <Text
                      position={[x, itemHeight * 2 + 0.8, z]}
                      fontSize={0.6}
                      color={item.color}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {item.value}%
                    </Text>
                    
                    {/* Connection to ground */}
                    <Cylinder
                      args={[0.1, 0.1, itemHeight * 2, 8]}
                      position={[x, itemHeight, z]}
                      castShadow
                    >
                      <meshStandardMaterial color="#cbd5e1" />
                    </Cylinder>
                    
                    {/* Base platform */}
                    <Cylinder
                      args={[1.5, 1.5, 0.2, 32]}
                      position={[x, -0.1, z]}
                      castShadow
                    >
                      <meshStandardMaterial 
                        color={item.color} 
                        opacity={0.3} 
                        transparent 
                      />
                    </Cylinder>
                  </group>
                );
              })}
              
              {/* Floor with shadow catcher */}
              <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                <planeGeometry args={[30, 30]} />
                <shadowMaterial transparent opacity={0.2} />
              </mesh>
              
              {/* Decorative grid on floor */}
              <gridHelper args={[30, 30, '#e2e8f0', '#e2e8f0']} position={[0, -0.15, 0]} />
            </>
          )}
        </Canvas>
      </div>
      
      {/* Instructions */}
      <div className="p-4 bg-blue-50 text-sm text-blue-800">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold">Interactive Controls:</span>
        </div>
        <ul className="list-disc pl-8">
          <li>Click and drag to rotate the view</li>
          <li>Scroll to zoom in/out</li>
          <li>Right-click and drag to pan</li>
          <li>Hover over elements for additional information</li>
          <li>Switch between visualization types using the tabs above</li>
        </ul>
      </div>
      
      {/* Data attribution */}
      <div className="p-4 text-xs text-gray-500 text-center">
        Based on AI Research Tools HLE benchmark data (April 2025)
      </div>
    </div>
  );
};

export default AIResearchTools3DVisualization;
