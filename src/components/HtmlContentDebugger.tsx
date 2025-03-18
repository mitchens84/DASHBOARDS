import React, { useEffect, useState } from 'react';

const HtmlContentDebugger: React.FC = () => {
  const [contentFiles, setContentFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkCommonPaths = async () => {
      const basePaths = [
        'content',
        '/content',
        './content',
        '../content',
        'DASHBOARDS/content',
        '/DASHBOARDS/content'
      ];
      
      const testFile = 'test-path-access.txt';
      const results = [];
      
      for (const basePath of basePaths) {
        try {
          const response = await fetch(`${basePath}/${testFile}`);
          const status = response.status;
          results.push({ path: `${basePath}/${testFile}`, status, exists: response.ok });
        } catch (error) {
          results.push({ path: `${basePath}/${testFile}`, error: (error as Error).message, exists: false });
        }
      }
      
      setContentFiles(results.map(r => `${r.path}: ${r.exists ? 'Accessible' : 'Not accessible'} (${r.status || r.error})`));
      setIsLoading(false);
    };
    
    checkCommonPaths();
  }, []);
  
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">HTML Content Debugger</h2>
      {isLoading ? (
        <p>Testing path accessibility...</p>
      ) : (
        <div>
          <p className="mb-2">Path accessibility test results:</p>
          <ul className="list-disc pl-5">
            {contentFiles.map((file, index) => (
              <li key={index} className="mb-1">{file}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Base URL: {import.meta.env.BASE_URL}<br/>
            Current URL: {window.location.href}
          </p>
        </div>
      )}
    </div>
  );
};

export default HtmlContentDebugger;
