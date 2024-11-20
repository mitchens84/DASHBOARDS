import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TableOfContents from "./src/components/TableOfContents";
import "./style.css"; // Explicitly import global styles

// Get the filename from URL hash or use default
const getInitialFile = () => {
  const hash = window.location.hash.replace('#/file=', '');
  return hash || "plants-co2-analysis";
};

const App: React.FC = () => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [file, setFile] = useState(getInitialFile());

  useEffect(() => {
    const loadDashboard = async (file: string) => {
      try {
        // Dynamic import with error handling
        const module = await import(`./content/${file}.tsx`);
        setComponent(() => module.default);
      } catch (error) {
        console.error(`Failed to load dashboard: ${file}`, error);
        
        // Fallback to default dashboard
        try {
          const defaultModule = await import(`./content/plants-co2-analysis.tsx`);
          setComponent(() => defaultModule.default);
        } catch (fallbackError) {
          console.error('Failed to load fallback dashboard', fallbackError);
          setComponent(() => () => <div>Error loading dashboard</div>);
        }
      }
    };

    loadDashboard(file);
  }, [file]);

  return (
    <Router>
      <div className="app-container">
        <TableOfContents 
          setFile={(newFile) => {
            setFile(newFile);
            window.location.hash = `file=${newFile}`;
          }} 
        />
        <div className="dashboard-content">
          <Routes>
            <Route
              path="*"
              element={
                Component ? (
                  <Component />
                ) : (
                  <div>Loading...</div>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
