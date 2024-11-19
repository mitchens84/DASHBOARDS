import React from "react";
import ReactDOM from "react-dom/client";

// Get the filename from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const file = urlParams.get("file") || "plants-co2-analysis";

// Base URL for production or development
const baseUrl = import.meta.env.DEV ? "/" : "/DASHBOARDS/";

// Dynamic import with correct base path
import(`${baseUrl}tsx-files/${file}.tsx`).then((module) => {
  const Component = module.default;
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>,
  );
});
