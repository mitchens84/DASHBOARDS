import React from 'react';
import { Link } from 'react-router-dom';
import './TableOfContents.css'; // Importing CSS for styling

interface TableOfContentsProps {
  setFile: (file: string) => void; // Define the prop type
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ setFile }) => {
  const dashboards = [
    { name: 'APOB Reference', file: 'apob-reference' },
    { name: 'Bean Risk Assessment V2', file: 'bean-risk-assessment-v2' },
    { name: 'Bean Risk Assessment V2 Revised', file: 'bean-risk-assessment-v2_revised' },
    { name: 'Environmental Dashboard', file: 'environmental-dashboard' },
    { name: 'Hiking Playlist', file: 'hiking-playlist' },
    { name: 'Life Smoothie Visual', file: 'life-smoothie-visual' },
    { name: 'Legume Cooking Guide', file: '241230-legumes cooking guide' },
    { name: 'Music Dashboard', file: 'music-dashboard' },
    { name: 'Music Dashboard R1', file: 'music-dashboard-r1' },
    { name: 'Neutering Effects', file: 'neutering-effects' },
    { name: 'Nutrition Processing Dashboard', file: 'nutrition-processing-dashboard' },
    { name: 'Plants CO2 Analysis', file: 'plants-co2-analysis' },
    { name: 'Reading Dashboard', file: 'reading-dashboard' },
    { name: 'Scatter3D Visualization', file: 'scatter3d' },
    { name: 'Sound Therapy Guide', file: 'sound-therapy-guide' },
    { name: 'Dental Care Strategy', file: 'dental-care-strategy' }
    
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
