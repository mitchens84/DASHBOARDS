import React from 'react';

const PKMWorkflowDashboard = () => {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 100px)', overflow: 'hidden' }}> {/* Adjust height as needed */}
      <iframe
        src="/content/0A-PM/pkm_workflow_visualization.html" // Path relative to the public directory
        title="PKM Workflow Visualization"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default PKMWorkflowDashboard;
