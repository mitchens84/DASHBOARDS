import React from "react";
import ReactDOM from "react-dom/client";

// Get the filename from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const file = urlParams.get("file") || "plants-co2-analysis";

// Dynamic import
import(`./tsx-files/${file}.tsx`).then((module) => {
  const Component = module.default;
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>,
  );
});
