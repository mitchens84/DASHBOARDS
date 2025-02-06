'use client';

'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TableOfContents.css';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  onSelect: (id: string) => void;
  activeItem: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, onSelect, activeItem }) => {
  const handleClick = (id: string) => {
    onSelect(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="toc-container" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <h2 className="toc-heading">Contents</h2>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className="toc-item"
            style={{ 
              paddingLeft: `${item.level * 1.25}rem`,
              marginBottom: '8px'
            }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={`toc-link ${activeItem === item.id ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
