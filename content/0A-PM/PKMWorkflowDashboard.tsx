import React from 'react';

const PKMWorkflowDashboard = () => {
  // Vite's import.meta.env.BASE_URL should provide the correct base path (e.g., /DASHBOARDS/)
  const baseUrl = import.meta.env.BASE_URL;
  // Ensure baseUrl ends with a slash if it's not just "/" and is not empty
  const normalizedBaseUrl = baseUrl && baseUrl !== '/' ? (baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`) : '/';
  
  // The path to the HTML file relative to the public directory root after the base path
  const iframeSrc = `${normalizedBaseUrl}content/0A-PM/pkm_workflow_visualization.html`;
  console.log("PKMWorkflowDashboard iframe src:", iframeSrc); // For debugging

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 100px)', overflow: 'hidden' }}> {/* Adjust height as needed */}
      <iframe
        src={iframeSrc}
        title="PKM Workflow Visualization"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default PKMWorkflowDashboard;
