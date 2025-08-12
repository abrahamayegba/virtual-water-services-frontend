import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: string | File;
  title?: string;
}

export default function PDFViewer({ file, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(2.0, prev + 0.2));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.2));
  };

  const downloadPDF = () => {
    if (typeof file === 'string') {
      const link = document.createElement('a');
      link.href = file;
      link.download = title || 'document.pdf';
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-4xl bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <span className="text-sm font-medium">
            Page {pageNumber} of {numPages}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          
          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          {typeof file === 'string' && (
            <button
              onClick={downloadPDF}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* PDF Document */}
      <div className="border rounded-lg shadow-lg bg-white p-4 max-w-4xl w-full overflow-auto">
        {loading && (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          error={
            <div className="text-center p-8">
              <p className="text-red-600">Failed to load PDF. Please try again.</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: Math.min(numPages, 10) }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setPageNumber(page)}
            className={`w-8 h-8 rounded text-sm font-medium ${
              page === pageNumber
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
        {numPages > 10 && (
          <span className="text-gray-500">... +{numPages - 10} more</span>
        )}
      </div>
    </div>
  );
}