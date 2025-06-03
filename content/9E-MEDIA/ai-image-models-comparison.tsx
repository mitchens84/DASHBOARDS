import React, { useState, useEffect } from 'react';

const AIImageModelsComparison: React.FC = () => {
  const [modelFilter, setModelFilter] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');

  // Model data
  const models = [
    {
      name: "DALL-E 3",
      type: "OpenAI",
      textQuality: "excellent-plus",
      imageQuality: "excellent",
      speed: "medium",
      access: "full",
      price: "$0.040/image (1024x1024)",
      strengths: ["Outstanding text rendering", "Follows prompts precisely", "High consistency"],
      limitations: ["Slower generation", "Higher cost per image"],
      features: ["1024x1024, 1024x1792, 1792x1024", "Built-in safety filters", "API integration"]
    },
    {
      name: "Midjourney v6",
      type: "Midjourney",
      textQuality: "good",
      imageQuality: "excellent-plus",
      speed: "medium",
      access: "limited",
      price: "$10/month (Basic)",
      strengths: ["Exceptional artistic quality", "Great for creative work", "Strong community"],
      limitations: ["Discord-only interface", "Limited text capabilities"],
      features: ["Multiple aspect ratios", "Style parameters", "Remix mode"]
    },
    {
      name: "Stable Diffusion XL",
      type: "Open Source",
      textQuality: "average",
      imageQuality: "good",
      speed: "fast",
      access: "full",
      price: "Free (self-hosted)",
      strengths: ["Free and open source", "Highly customizable", "Local generation"],
      limitations: ["Requires technical setup", "Inconsistent text"],
      features: ["1024x1024 base", "ControlNet support", "LoRA fine-tuning"]
    },
    {
      name: "Adobe Firefly",
      type: "Adobe",
      textQuality: "good",
      imageQuality: "good",
      speed: "fast",
      access: "full",
      price: "$22.99/month (Creative Cloud)",
      strengths: ["Commercial-safe training", "Photoshop integration", "Easy to use"],
      limitations: ["Limited artistic styles", "Subscription required"],
      features: ["Multiple formats", "Generative fill", "Text effects"]
    },
    {
      name: "Leonardo AI",
      type: "Leonardo",
      textQuality: "average",
      imageQuality: "good",
      speed: "fast",
      access: "full",
      price: "$10/month (Apprentice)",
      strengths: ["Game/character focus", "Multiple models", "Fine-tuning"],
      limitations: ["Niche specialization", "Complex interface"],
      features: ["Character consistency", "Motion generation", "Canvas editor"]
    },
    {
      name: "Flux.1 Pro",
      type: "Black Forest Labs",
      textQuality: "excellent",
      imageQuality: "excellent",
      speed: "medium",
      access: "limited",
      price: "$0.055/image",
      strengths: ["Excellent text rendering", "High quality output", "Good prompt following"],
      limitations: ["API access only", "Limited availability"],
      features: ["High resolution", "Fast inference", "Commercial license"]
    }
  ];

  const filterModels = () => {
    return models.filter(model => {
      const matchesType = modelFilter === 'all' || model.type.toLowerCase().includes(modelFilter.toLowerCase());
      const matchesQuality = qualityFilter === 'all' || model.imageQuality === qualityFilter;
      return matchesType && matchesQuality;
    });
  };

  const getRatingClass = (rating: string) => {
    switch (rating) {
      case 'excellent-plus': return 'rating excellent-plus';
      case 'excellent': return 'rating excellent';
      case 'good': return 'rating good';
      case 'average': return 'rating average';
      case 'medium': return 'rating medium';
      case 'low': return 'rating low';
      default: return 'rating average';
    }
  };

  const getSpeedClass = (speed: string) => {
    switch (speed) {
      case 'fast': return 'speed-badge speed-fast';
      case 'medium': return 'speed-badge speed-medium';
      case 'slow': return 'speed-badge speed-slow';
      default: return 'speed-badge speed-medium';
    }
  };

  const getAccessClass = (access: string) => {
    switch (access) {
      case 'full': return 'access-indicator access-full';
      case 'limited': return 'access-indicator access-limited';
      case 'none': return 'access-indicator access-none';
      default: return 'access-indicator access-limited';
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <style>
        {`
          .container {
            max-width: 1600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            backdrop-filter: blur(10px);
          }

          .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }

          .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .header p {
            font-size: 1.1rem;
            opacity: 0.9;
          }

          .filter-controls {
            padding: 20px 30px;
            background: rgba(79, 172, 254, 0.1);
            border-bottom: 1px solid rgba(79, 172, 254, 0.2);
          }

          .filter-group {
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
          }

          .filter-group label {
            font-weight: 600;
            color: #333;
          }

          .filter-select {
            padding: 8px 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            background: white;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .filter-select:focus {
            outline: none;
            border-color: #4facfe;
            box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
          }

          .table-container {
            overflow-x: auto;
            padding: 0;
          }

          .comparison-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }

          .comparison-table th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 10px;
            text-align: left;
            font-weight: 600;
            position: sticky;
            top: 0;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .comparison-table th:first-child {
            position: sticky;
            left: 0;
            z-index: 11;
            min-width: 180px;
          }

          .comparison-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #e1e5e9;
            vertical-align: top;
            transition: all 0.3s ease;
          }

          .comparison-table tbody tr:hover {
            background-color: rgba(79, 172, 254, 0.05);
          }

          .comparison-table td:first-child {
            position: sticky;
            left: 0;
            background: white;
            font-weight: 600;
            color: #333;
            border-right: 2px solid #e1e5e9;
            min-width: 180px;
            z-index: 5;
          }

          .comparison-table tbody tr:hover td:first-child {
            background-color: rgba(79, 172, 254, 0.05);
          }

          .model-name {
            font-weight: 700;
            color: #333;
            margin-bottom: 4px;
          }

          .model-type {
            font-size: 11px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .rating {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .rating.excellent-plus {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
          }

          .rating.excellent {
            background: linear-gradient(135deg, #00d2d3, #54a0ff);
            color: white;
          }

          .rating.good {
            background: linear-gradient(135deg, #5f27cd, #341f97);
            color: white;
          }

          .rating.average {
            background: linear-gradient(135deg, #ff9f43, #feca57);
            color: white;
          }

          .rating.medium {
            background: linear-gradient(135deg, #a55eea, #8c7ae6);
            color: white;
          }

          .rating.low {
            background: linear-gradient(135deg, #fd79a8, #fdcb6e);
            color: white;
          }

          .speed-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            color: white;
          }

          .speed-fast {
            background: linear-gradient(135deg, #00b894, #00cec9);
          }

          .speed-medium {
            background: linear-gradient(135deg, #fdcb6e, #f39c12);
          }

          .speed-slow {
            background: linear-gradient(135deg, #fd79a8, #e84393);
          }

          .access-indicator {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
          }

          .access-full::before {
            content: "✅";
          }

          .access-limited::before {
            content: "⚠️";
            color: #f39c12;
          }

          .access-none::before {
            content: "❌";
          }

          .price-tag {
            display: inline-block;
            padding: 4px 8px;
            background: linear-gradient(135deg, #a29bfe, #6c5ce7);
            color: white;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
          }

          .highlight-strength {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            margin: 2px;
            display: inline-block;
          }

          .highlight-limitation {
            background: linear-gradient(135deg, #fd79a8, #e84393);
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            margin: 2px;
            display: inline-block;
          }

          .key-features {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .feature-item {
            font-size: 12px;
            color: #555;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .feature-item::before {
            content: "•";
            color: #4facfe;
            font-weight: bold;
          }

          .legend {
            padding: 20px 30px;
            background: rgba(79, 172, 254, 0.05);
            border-top: 1px solid rgba(79, 172, 254, 0.2);
          }

          .legend h3 {
            margin-bottom: 15px;
            color: #333;
            font-size: 1.1rem;
          }

          .legend-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
          }

          .update-badge {
            display: inline-block;
            background: linear-gradient(135deg, #00b894, #55a3ff);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-left: 8px;
          }

          .scroll-hint {
            text-align: center;
            padding: 15px;
            background: rgba(79, 172, 254, 0.1);
            color: #666;
            font-size: 14px;
            border-bottom: 1px solid rgba(79, 172, 254, 0.2);
          }

          .scroll-hint::before {
            content: "📱";
            margin-right: 8px;
          }

          @media (max-width: 768px) {
            .header h1 {
              font-size: 1.8rem;
            }
            
            .filter-group {
              flex-direction: column;
              align-items: stretch;
            }
            
            .comparison-table {
              font-size: 12px;
            }
            
            .comparison-table th,
            .comparison-table td {
              padding: 10px 8px;
            }
          }
        `}
      </style>

      <div className="container">
        <div className="header">
          <h1>AI Image Generation Models Comparison 2025</h1>
          <p>Latest specifications and performance metrics for leading AI image generation platforms</p>
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="modelFilter">Filter by Model Type:</label>
            <select
              id="modelFilter"
              className="filter-select"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
            >
              <option value="all">All Models</option>
              <option value="openai">OpenAI</option>
              <option value="midjourney">Midjourney</option>
              <option value="open source">Open Source</option>
              <option value="adobe">Adobe</option>
              <option value="leonardo">Leonardo</option>
              <option value="black forest">Black Forest Labs</option>
            </select>

            <label htmlFor="qualityFilter">Filter by Quality:</label>
            <select
              id="qualityFilter"
              className="filter-select"
              value={qualityFilter}
              onChange={(e) => setQualityFilter(e.target.value)}
            >
              <option value="all">All Quality Levels</option>
              <option value="excellent-plus">Excellent+</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
            </select>
          </div>
        </div>

        <div className="scroll-hint">
          Scroll horizontally to view all model specifications and features
        </div>

        <div className="table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Text Quality</th>
                <th>Image Quality</th>
                <th>Speed</th>
                <th>Access</th>
                <th>Pricing</th>
                <th>Key Strengths</th>
                <th>Limitations</th>
                <th>Features</th>
              </tr>
            </thead>
            <tbody>
              {filterModels().map((model, index) => (
                <tr key={index}>
                  <td>
                    <div className="model-name">{model.name}</div>
                    <div className="model-type">{model.type}</div>
                  </td>
                  <td>
                    <span className={getRatingClass(model.textQuality)}>
                      {model.textQuality.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={getRatingClass(model.imageQuality)}>
                      {model.imageQuality.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={getSpeedClass(model.speed)}>
                      {model.speed}
                    </span>
                  </td>
                  <td>
                    <span className={getAccessClass(model.access)}>
                      {model.access}
                    </span>
                  </td>
                  <td>
                    <span className="price-tag">{model.price}</span>
                  </td>
                  <td>
                    {model.strengths.map((strength, idx) => (
                      <span key={idx} className="highlight-strength">
                        {strength}
                      </span>
                    ))}
                  </td>
                  <td>
                    {model.limitations.map((limitation, idx) => (
                      <span key={idx} className="highlight-limitation">
                        {limitation}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="key-features">
                      {model.features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="legend">
          <h3>Rating System & Legend</h3>
          <div className="legend-grid">
            <div className="legend-item">
              <span className="rating excellent-plus">Excellent+</span>
              <span>Industry leading performance</span>
            </div>
            <div className="legend-item">
              <span className="rating excellent">Excellent</span>
              <span>Outstanding quality</span>
            </div>
            <div className="legend-item">
              <span className="rating good">Good</span>
              <span>Solid performance</span>
            </div>
            <div className="legend-item">
              <span className="rating average">Average</span>
              <span>Adequate for most uses</span>
            </div>
            <div className="legend-item">
              <span className="speed-badge speed-fast">Fast</span>
              <span>&lt; 10 seconds</span>
            </div>
            <div className="legend-item">
              <span className="speed-badge speed-medium">Medium</span>
              <span>10-30 seconds</span>
            </div>
            <div className="legend-item">
              <span className="speed-badge speed-slow">Slow</span>
              <span>&gt; 30 seconds</span>
            </div>
            <div className="legend-item">
              <span className="access-indicator access-full">✅ Full Access</span>
              <span>Widely available</span>
            </div>
            <div className="legend-item">
              <span className="access-indicator access-limited">⚠️ Limited</span>
              <span>Waitlist or restrictions</span>
            </div>
            <div className="legend-item">
              <span className="access-indicator access-none">❌ No Access</span>
              <span>Not publicly available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageModelsComparison;
