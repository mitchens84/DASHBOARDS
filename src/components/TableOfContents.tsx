import React from 'react';
import { Link } from 'react-router-dom';
import './TableOfContents.css'; // Importing CSS for styling

interface TableOfContentsProps {
  setFile: (file: string) => void; // Define the prop type
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ setFile }) => {
  const dashboards = [
    { name: 'Sports Nutrition Dashboard', file: '241118-sports-nutrition-dashboard' },
    { name: 'Bean Risk Assessment V2 Revised', file: 'bean-risk-assessment-v2_revised' },
    { name: 'Bean Risk Assessment V2', file: 'bean-risk-assessment-v2' },
    { name: 'Environmental Dashboard', file: 'env-dashboard' },
    { name: 'Music Dashboard', file: 'music-dashboard' },
    { name: 'Plants CO2 Analysis', file: 'plants-co2-analysis' },
  ];

  return (
    <div className="toc-container">
      <h1>Table of Contents</h1>
      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.file}>
            <Link to={`?file=${dashboard.file}`} onClick={() => setFile(dashboard.file)}>
              {dashboard.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
