import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter } from 'recharts';
import Papa from 'papaparse';
import _ from 'lodash';

// Extend the Track interface to include Loudness
interface Track {
  'Track ID': string;
  Name: string;
  Artist: string;
  Popularity: string;
  Danceability: string;
  Energy: string;
  Valence: string;
  Acousticness: string;
  Instrumentalness: string;
  Loudness: string; // Added Loudness property
  genre?: string; // Optional genre property
}

// Define the GenreStats interface
interface GenreStats {
  genre: string;
  count: number;
  avgPopularity: number;
}

// Define the AudioFeature interface
interface AudioFeature {
  feature: string;
  average: number;
  fullMark: number;
}

// Define the GenreFeature interface
interface GenreFeature {
  genre: string;
  Danceability: number;
  Energy: number;
  Valence: number;
  Acousticness: number;
  Instrumentalness: number;
}

declare global {
  interface Window {
    fs: any; // Declare fs property on the window object
  }
}

const inferGenre = (features: Track) => {
  // Simple genre inference based on audio features
  if (parseFloat(features.Energy) > 0.8 && parseFloat(features.Loudness) > -8) return "Rock/Metal";
  if (parseFloat(features.Danceability) > 0.7 && parseFloat(features.Energy) > 0.6) return "Pop/Dance";
  if (parseFloat(features.Acousticness) > 0.7) return "Acoustic/Folk";
  if (parseFloat(features.Instrumentalness) > 0.5) return "Classical/Instrumental";
  if (parseFloat(features.Energy) < 0.4 && parseFloat(features.Valence) < 0.4) return "Ambient/Chill";
  return "Other";
};

const MusicDashboard = () => {
  const [audioFeatures, setAudioFeatures] = useState<Track[]>([]);
  const [popularTracks, setPopularTracks] = useState<any[]>([]);
  const [genreStats, setGenreStats] = useState<GenreStats[]>([]);
  const [genreFeatures, setGenreFeatures] = useState<GenreFeature[]>([]);
  const [danceabilityVsEnergy, setDanceabilityVsEnergy] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const features = await window.fs.readFile('241121-track_audio_features.csv', { encoding: 'utf8' });
        const tracks = await window.fs.readFile('241121-user_saved_tracks.csv', { encoding: 'utf8' });

        const parsedFeatures: Track[] = Papa.parse(features, { header: true, skipEmptyLines: true }).data as Track[];
        const parsedTracks: Track[] = Papa.parse(tracks, { header: true, skipEmptyLines: true }).data as Track[];

        // Create lookup for track info
        const trackInfo: { [key: string]: { name: string; artist: string; popularity: number } } = {};
        parsedTracks.forEach(track => {
          trackInfo[track['Track ID']] = {
            name: track.Name,
            artist: track.Artist,
            popularity: parseInt(track.Popularity) || 0
          };
        });

        // Process genre statistics
        const tracksWithGenre = parsedFeatures.map(track => ({
          ...track,
          genre: inferGenre(track)
        }));

        const genreGroups = _.groupBy(tracksWithGenre, 'genre');
        const genreStats: GenreStats[] = Object.entries(genreGroups).map(([genre, tracks]) => ({
          genre,
          count: tracks.length,
          avgPopularity: _.meanBy(tracks, track => trackInfo[track['Track ID']]?.popularity || 0)
        }));

        // Calculate average features by genre
        const featureNames = ['Danceability', 'Energy', 'Valence', 'Acousticness', 'Instrumentalness'];
        const featureList = ['Danceability', 'Energy', 'Valence', 'Acousticness', 'Instrumentalness'];
        const genreFeatures: GenreFeature[] = Object.entries(genreGroups).map(([genre, tracks]) => {
          const means = featureList.reduce((acc, feature) => ({
            ...acc,
            [feature]: _.meanBy(tracks, track => parseFloat(track[feature]))
          }), {});
          
          return featureList.reduce((acc, feature) => ({
            ...acc,
            [feature]: means[feature],
            genre
          }), {} as GenreFeature);
        });

        // Calculate average features
        const avgFeatures: AudioFeature[] = featureNames.map(feature => ({
          feature,
          average: _.meanBy(parsedFeatures, row => parseFloat(row[feature])),
          fullMark: 1.0
        }));

        // Create scatter plot data with genre coloring
        const scatterData = tracksWithGenre.map(track => ({
          danceability: parseFloat(track.Danceability),
          energy: parseFloat(track.Energy),
          genre: track.genre
        }));

        // Get popular tracks
        const populars = _.chain(parsedTracks)
          .filter(track => track.Popularity && track.Popularity !== '')
          .map(track => ({
            name: track.Name,
            artist: track.Artist,
            popularity: parseInt(track.Popularity)
          }))
          .orderBy(['popularity'], ['desc'])
          .take(10)
          .value();

        setAudioFeatures(parsedFeatures);
        setGenreStats(genreStats);
        setGenreFeatures(genreFeatures);
        setPopularTracks(populars);
        setDanceabilityVsEnergy(scatterData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const genreColors = {
    "Rock/Metal": "#ff7f7f",
    "Pop/Dance": "#7fbfff",
    "Acoustic/Folk": "#7fff7f",
    "Classical/Instrumental": "#ff7fff",
    "Ambient/Chill": "#ffff7f",
    "Other": "#7f7f7f"
  };

  return (
    <div className="p-4 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Music Library Analysis</h1>

      {/* 3D Scatter Plot */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">3D Audio Feature Explorer</h2>
        <div className="h-[600px]">
          {/* ScatterPlot3D component should be defined or imported here */}
        </div>
      </div>

      {/* Genre Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Genre Distribution (Based on Audio Features)</h2>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={genreStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="genre" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Number of Tracks" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="avgPopularity" name="Average Popularity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Genre Feature Comparison */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Audio Features by Genre</h2>
        <div className="h-96">
          <ResponsiveContainer>
            <RadarChart data={[
                { feature: 'Danceability' },
                { feature: 'Energy' },
                { feature: 'Valence' },
                { feature: 'Acousticness' },
                { feature: 'Instrumentalness' }
              ]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="feature" />
              <PolarRadiusAxis angle={30} domain={[0, 1]} />
              {genreFeatures.map((genre) => (
                <Radar
                  key={genre.genre}
                  name={genre.genre}
                  dataKey={genre.genre.toLowerCase().replace(/[^a-z]/g, '')}
                  stroke={genreColors[genre.genre]}
                  fill={genreColors[genre.genre]}
                  fillOpacity={0.3}
                />
              ))}
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Genre Scatter Plot */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Danceability vs Energy by Genre</h2>
        <div className="h-96">
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="danceability" name="Danceability" domain={[0, 1]} />
              <YAxis type="number" dataKey="energy" name="Energy" domain={[0, 1]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              {Object.keys(genreColors).map(genre => (
                <Scatter
                  key={genre}
                  name={genre}
                  data={danceabilityVsEnergy.filter(track => track.genre === genre)}
                  fill={genreColors[genre]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Tracks */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top 10 Most Popular Tracks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Track</th>
                <th className="px-4 py-2 text-left">Artist</th>
                <th className="px-4 py-2 text-left">Popularity</th>
              </tr>
            </thead>
            <tbody>
              {popularTracks.map((track, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{track.name}</td>
                  <td className="px-4 py-2">{track.artist}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{width: `${track.popularity}%`}}
                        ></div>
                      </div>
                      <span className="ml-2">{track.popularity}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MusicDashboard;
