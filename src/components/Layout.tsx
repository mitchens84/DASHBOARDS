import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  tableOfContents?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, tableOfContents }) => {
  return (
    <div className="layout-container">
      <main className="main-content">
        {children}
      </main>
      {tableOfContents}
    </div>
  );
};

export default Layout;
