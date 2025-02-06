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
  activeItem: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, activeItem }) => {
  return (
    <nav className="toc-container" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <h2 className="toc-heading">Contents</h2>
      <ul className="toc-list">
        {items.map((item) => {
          const isActive = location.pathname === `/${item.id}`;
          return (
            <li
              key={item.id}
              className="toc-item"
              style={{
                paddingLeft: `${item.level * 1.25}rem`,
                marginBottom: '8px'
              }}
            >
              <Link
                to={`/${item.id}`}
                className={`toc-link ${isActive ? 'active' : ''}`}
                style={{ cursor: 'pointer', display: 'block' }}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
