import React from 'react';
import { Link } from 'react-router-dom';
import './TableOfContents.css'; // Importing CSS for styling

interface TableOfContentsProps {
  setFile: (file: string) => void; // Define the prop type
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ setFile }) => {
  const dashboards = [
    { name: 'Sports Nutrition Dashboard', file: '241118-sports-nutrition-dashboard' },
    { name: 'APOB Reference', file: 'apob-reference' }, // New entry added
    { name: 'Bean Risk Assessment V2 Revised', file: 'bean-risk-assessment-v2_revised' },
    { name: 'Bean Risk Assessment V2', file: 'bean-risk-assessment-v2' },
    { name: 'Environmental Dashboard', file: 'env-dashboard' },
    { name: 'Music Dashboard', file: 'music-dashboard' },
    { name: 'Nutrition Processing Dashboard', file: 'nutrition-processing-dashboard' }, // New entry added
    { name: 'Reading Dashboard', file: 'reading-dashboard' }, // Added Reading Dashboard
    { name: 'Music Dashboard R1', file: 'music-dashboard-r1' }, // New entry added
    { name: 'Scatter3D', file: 'scatter3d' }, // New entry added
    { name: 'Hiking Playlist', file: 'hiking-playlist' }, // New entry added
    { name: 'Life Smoothie Visual', file: 'life-smoothie-visual' }, // New entry added
    { name: 'Environmental Dashboard', file: 'environmental-dashboard' }, // New entry added
    { name: 'Neutering Effects', file: 'neutering-effects' }, // New entry added
    { name: 'Plants CO2 Analysis', file: 'plants-co2-analysis' } // New entry added
  ];

  return (
    <div className="toc-container">
      <h1>Table of Contents</h1>
      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.file}>
            <Link 
              to={`?file=${dashboard.file}`} 
              onClick={() => {
                setFile(dashboard.file);
                // Update URL without page reload
                window.history.pushState(
                  null, 
                  '', 
                  `?file=${dashboard.file}`
                );
              }}
            >
              {dashboard.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
