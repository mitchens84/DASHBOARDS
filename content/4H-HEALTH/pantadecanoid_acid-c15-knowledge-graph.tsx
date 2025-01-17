import React from 'react';
import { Graph } from 'react-d3-graph';

const C15KnowledgeGraph = () => {
  const data = {
    nodes: [
      { id: 'c15', label: 'Pentadecanoic Acid (C15:0)', type: 'compound' },
      // Health Effects
      { id: 'metabolism', label: 'Metabolic Health', type: 'effect' },
      { id: 'inflammation', label: 'Inflammation', type: 'effect' },
      { id: 'cellular', label: 'Cellular Health', type: 'effect' },
      // Mechanisms
      { id: 'ppar', label: 'PPAR Activation', type: 'mechanism' },
      { id: 'mitochondria', label: 'Mitochondrial Function', type: 'mechanism' },
      { id: 'membrane', label: 'Cell Membrane Stability', type: 'mechanism' },
      // Sources
      { id: 'dairy', label: 'Dairy Products', type: 'source' },
      { id: 'supplements', label: 'FA15™ Supplements', type: 'source' },
      // Biomarkers
      { id: 'glucose', label: 'Blood Glucose', type: 'biomarker' },
      { id: 'lipids', label: 'Blood Lipids', type: 'biomarker' },
      { id: 'crp', label: 'C-Reactive Protein', type: 'biomarker' }
    ],
    links: [
      // Mechanism connections
      { source: 'c15', target: 'ppar', label: 'activates' },
      { source: 'c15', target: 'mitochondria', label: 'improves' },
      { source: 'c15', target: 'membrane', label: 'stabilizes' },
      // Health effect connections
      { source: 'ppar', target: 'metabolism', label: 'regulates' },
      { source: 'mitochondria', target: 'cellular', label: 'enhances' },
      { source: 'membrane', target: 'inflammation', label: 'reduces' },
      // Source connections
      { source: 'dairy', target: 'c15', label: 'contains' },
      { source: 'supplements', target: 'c15', label: 'provides' },
      // Biomarker impacts
      { source: 'metabolism', target: 'glucose', label: 'improves' },
      { source: 'metabolism', target: 'lipids', label: 'optimizes' },
      { source: 'inflammation', target: 'crp', label: 'reduces' }
    ]
  };

  const config = {
    nodeHighlightBehavior: true,
    directed: true,
    d3: {
      gravity: -300,
      linkLength: 180
    },
    node: {
      color: node => {
        switch(node.type) {
          case 'compound': return '#4CAF50';
          case 'effect': return '#2196F3';
          case 'mechanism': return '#FF9800';
          case 'source': return '#9C27B0';
          case 'biomarker': return '#F44336';
          default: return '#78909C';
        }
      },
      size: 800,
      fontSize: 14
    },
    link: {
      strokeWidth: 2,
      labelProperty: 'label'
    }
  };

  return (
    <div className="w-full h-screen">
      <Graph
        id="c15-knowledge-graph"
        data={data}
        config={config}
      />
    </div>
  );
};

export default C15KnowledgeGraph;
