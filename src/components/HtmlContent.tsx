import React, { useEffect, useState } from 'react';

interface HtmlContentProps {
  filePath: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ filePath }) => {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        // Construct proper path with base URL if needed
        const fullPath = import.meta.env.BASE_URL.endsWith('/') && filePath.startsWith('/') 
          ? `${import.meta.env.BASE_URL}${filePath.substring(1)}`
          : `${import.meta.env.BASE_URL}${filePath}`;
        
        console.log(`Fetching HTML from: ${fullPath}`);
        const response = await fetch(fullPath);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch HTML: ${response.status} ${response.statusText}`);
        }
        
        const text = await response.text();
        setHtml(text);
        setError(null);
      } catch (error) {
        console.error('Error loading HTML:', error);
        setError(`Failed to load content: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, [filePath]);

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading content...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 my-4">
      <h3 className="text-lg font-semibold mb-2">Error Loading Content</h3>
      <p>{error}</p>
      <p className="mt-2 text-sm">Path attempted: {filePath}</p>
      <p className="mt-2 text-sm">
        Make sure the HTML file exists in the content directory and has been copied to the build output.
      </p>
    </div>
  );

  return (
    <div className="html-content-wrapper">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default HtmlContent;
