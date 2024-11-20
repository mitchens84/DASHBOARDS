import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableOfContents from "./src/components/TableOfContents";

// Get the filename from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const defaultFile = urlParams.get("file") || "plants-co2-analysis";

const App: React.FC = () => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [file, setFile] = useState(defaultFile);

  useEffect(() => {
    const loadDashboard = async (file: string) => {
      try {
        const module = await import(`./content/${file}.tsx`);
        setComponent(() => module.default);
      } catch (error) {
        console.error(`Failed to load dashboard: ${file}`, error);
        // Fallback to default dashboard if loading fails
        const defaultModule = await import(`./content/plants-co2-analysis.tsx`);
        setComponent(() => defaultModule.default);
      }
    };

    loadDashboard(file);
  }, [file]);

  return (
    <Router>
      <TableOfContents setFile={setFile} />
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
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
