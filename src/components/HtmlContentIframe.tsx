import React, { useEffect, useState } from 'react';

interface HtmlContentIframeProps {
  filePath: string;
  height?: string;
}

/**
 * Component to display HTML content in an iframe, properly handling associated CSS and JavaScript.
 * This allows the HTML content to have its own scope for styles and scripts.
 */
const HtmlContentIframe: React.FC<HtmlContentIframeProps> = ({ 
  filePath,
  height = '100vh'
}) => {
  const [contentUrl, setContentUrl] = useState<string>("");

  useEffect(() => {
    // We use the file path directly as the src for the iframe
    // This ensures all relative paths in the HTML file work correctly
    setContentUrl(filePath);
  }, [filePath]);

  return (
    <div className="html-content-iframe-container">
      {contentUrl && (
        <iframe
          src={contentUrl}
          title="HTML Content"
          style={{ 
            width: '100%', 
            height, 
            border: 'none',
            overflow: 'auto'
          }}
          allowFullScreen
        />
      )}
    </div>
  );
};

export default HtmlContentIframe;
