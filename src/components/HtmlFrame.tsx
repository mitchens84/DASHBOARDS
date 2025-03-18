import React, { useState } from 'react';

interface HtmlFrameProps {
  src: string;
  title: string;
  height?: string;
}

const HtmlFrame: React.FC<HtmlFrameProps> = ({ src, title, height = '800px' }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="html-frame-container relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading {title}...</p>
          </div>
        </div>
      )}
      <iframe 
        src={`${import.meta.env.BASE_URL}${src}`}
        title={title}
        style={{ 
          width: '100%', 
          height, 
          border: 'none',
          overflow: 'auto',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s'
        }}
        onLoad={handleLoad}
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups"
      />
    </div>
  );
};

export default HtmlFrame;
