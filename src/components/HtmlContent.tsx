import React, { useEffect, useState, useRef } from 'react';

interface HtmlContentProps {
  filePath: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ filePath }) => {
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeHeight, setIframeHeight] = useState<string>('calc(100vh - 120px)');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    try {
      // Get the base URL from Vite's environment
      const base = import.meta.env.BASE_URL || '/';
      
      // Normalize the file path (remove leading slash if base already has it)
      const normalizedPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
      
      // Construct the full path with proper handling of slashes
      const fullPath = base.endsWith('/') 
        ? `${base}${normalizedPath}`
        : `${base}/${normalizedPath}`;
      
      console.log(`Loading HTML via iframe from: ${fullPath}`);
      
      // Set the URL for the iframe
      setIframeUrl(fullPath);
      setError(null);
      
      // Set up message listener for potential height adjustments from iframe content
      const handleMessage = (event: MessageEvent) => {
        // Check if message is from our iframe and contains height information
        if (event.data && event.data.type === 'iframe-height') {
          setIframeHeight(`${event.data.height}px`);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    } catch (error) {
      console.error('Error setting up iframe:', error);
      setError(`Failed to load content: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
      }
    };

    fetchHtml();
  }, [filePath]);

  // Special hook to handle interactive elements
  useEffect(() => {
    if (!html || !contentRef.current) return;
    
    const executeScripts = () => {
      // Find all script tags in the content and execute them
      const scriptTags = contentRef.current!.querySelectorAll('script');
      scriptTags.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // Handle both inline and src scripts
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        
        // Replace the old script with the new one to execute it
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
      
      // Fix any Bootstrap/jQuery interactive elements that need initialization
      if (typeof window !== 'undefined') {
        // Wait a moment for scripts to load
        setTimeout(() => {
          // Activate any Bootstrap tabs
          const tabEls = contentRef.current?.querySelectorAll('[data-bs-toggle="tab"], [data-toggle="tab"]');
          if (tabEls) {
            tabEls.forEach(el => {
              if (window.bootstrap && window.bootstrap.Tab) {
                new window.bootstrap.Tab(el);
              }
              
              // For older Bootstrap versions using jQuery
              if (window.$ || window.jQuery) {
                try {
                  const $ = window.$ || window.jQuery;
                  $(el).tab();
                } catch (e) {
                  console.warn('Error initializing tab with jQuery:', e);
                }
              }
            });
          }
          
          // Initialize any other interactive elements if needed
          if (window.$ || window.jQuery) {
            const $ = window.$ || window.jQuery;
            try {
              $('[data-toggle="tooltip"]').tooltip();
              $('[data-toggle="popover"]').popover();
              $('.collapse').collapse();
              $('.dropdown-toggle').dropdown();
            } catch (e) {
              console.warn('Error initializing Bootstrap components:', e);
            }
          }
        }, 500);
      }
    };
    
    // Run script execution after render
    setTimeout(executeScripts, 100);
    
    // Clean up any global event listeners when component unmounts
    return () => {
      // Add any cleanup code here if needed
    };
  }, [html]);

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
    <div className="html-content-wrapper w-full">
      <div 
        ref={contentRef}
        className="html-content" 
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  );
};

export default HtmlContent;
