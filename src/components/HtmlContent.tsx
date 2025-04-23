import React from 'react';

interface HtmlContentProps {
  filePath: string;
}

/**
 * A component to render HTML content from a file using an iframe.
 * This approach avoids many issues with script execution and styling conflicts.
 */
const HtmlContent: React.FC<HtmlContentProps> = ({ filePath }) => {
  // Get the base URL (either from import.meta or default to '/')
  const base = (import.meta as any).env?.BASE_URL || '/';
  
  // Normalize the file path
  const normalizedPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
  
  // Construct the full path
  const fullPath = base.endsWith('/') 
    ? `${base}${normalizedPath}`
    : `${base}/${normalizedPath}`;
  
  console.log(`Loading HTML content from: ${fullPath}`);

  return (
    <div className="html-content-wrapper w-full h-full">
      <iframe
        src={fullPath}
        title="HTML Content"
        className="w-full border-0"
        style={{
          height: 'calc(100vh - 120px)',
          overflow: 'auto',
          backgroundColor: 'white'
        }}
        sandbox="allow-same-origin allow-scripts allow-forms"
        loading="lazy"
      />
    </div>
  );
};

export default HtmlContent;
