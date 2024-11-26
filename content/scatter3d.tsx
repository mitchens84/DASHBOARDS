import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

// Point component for individual songs
const Point = ({ position, color, songData, setSelected }) => {
  return (
    <mesh
      position={position}
      onPointerOver={() => setSelected(songData)}
      onPointerOut={() => setSelected(null)}
    >
      <sphereGeometry args={[0.01, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Axes component
const Axes = () => {
  return (
    <group>
      {/* X axis */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 1, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="red" />
      </line>
      <Text position={[1.1, 0, 0]} fontSize={0.05} color="red">
        Danceability
      </Text>

      {/* Y axis */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 0, 1, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="green" />
      </line>
      <Text position={[0, 1.1, 0]} fontSize={0.05} color="green">
        Energy
      </Text>

      {/* Z axis */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 0, 0, 1])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="blue" />
      </line>
      <Text position={[0, 0, 1.1]} fontSize={0.05} color="blue">
        Valence
      </Text>
    </group>
  );
};

const ScatterPlot3D = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const features = await window.fs.readFile('241121-track_audio_features.csv', { encoding: 'utf8' });
        const tracks = await window.fs.readFile('241121-user_saved_tracks.csv', { encoding: 'utf8' });

        const parsedFeatures = Papa.parse(features, { header: true, skipEmptyLines: true }).data;
        const parsedTracks = Papa.parse(tracks, { header: true, skipEmptyLines: true }).data;

        // Create lookup for track info
        const trackInfo = {};
        parsedTracks.forEach(track => {
          trackInfo[track['Track ID']] = {
            name: track.Name,
            artist: track.Artist,
            popularity: parseInt(track.Popularity) || 0
          };
        });

        // Combine track info with features
        const combinedData = parsedFeatures.map(track => ({
          id: track['Track ID'],
          danceability: parseFloat(track.Danceability),
          energy: parseFloat(track.Energy),
          valence: parseFloat(track.Valence),
          ...trackInfo[track['Track ID']]
        })).filter(track => 
          !isNaN(track.danceability) && 
          !isNaN(track.energy) && 
          !isNaN(track.valence)
        );

        setData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
        <ambientLight />
        <OrbitControls />
        <Axes />
        
        {data.map((song, index) => (
          <Point
            key={song.id || index}
            position={[song.danceability, song.energy, song.valence]}
            color={new THREE.Color(
              0.5 + song.danceability * 0.5,
              0.5 + song.energy * 0.5,
              0.5 + song.valence * 0.5
            )}
            songData={song}
            setSelected={setSelected}
          />
        ))}
      </Canvas>

      {/* Song info overlay */}
      {selected && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg">
          <h3 className="font-bold">{selected.name}</h3>
          <p className="text-gray-600">{selected.artist}</p>
          <div className="mt-2 text-sm">
            <p>Danceability: {selected.danceability.toFixed(2)}</p>
            <p>Energy: {selected.energy.toFixed(2)}</p>
            <p>Valence: {selected.valence.toFixed(2)}</p>
            <p>Popularity: {selected.popularity}</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow-lg">
        <h3 className="font-bold mb-2">Controls:</h3>
        <ul className="text-sm">
          <li>• Left click + drag to rotate</li>
          <li>• Right click + drag to pan</li>
          <li>• Scroll to zoom</li>
          <li>• Hover over points to see song details</li>
        </ul>
      </div>
    </div>
  );
};

export default ScatterPlot3D;