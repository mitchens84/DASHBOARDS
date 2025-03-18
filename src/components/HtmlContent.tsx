import React, { useEffect, useState } from 'react';

interface HtmlContentProps {
  filePath: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ filePath }) => {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        setHtml(text);
      } catch (error) {
        console.error('Error loading HTML:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, [filePath]);

  if (loading) return <div>Loading content...</div>;

  return (
    <div className="html-content-wrapper">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default HtmlContent;
