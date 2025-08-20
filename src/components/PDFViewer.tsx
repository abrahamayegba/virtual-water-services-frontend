import { useState } from "react";
import { Document, Page } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";


interface PDFViewerProps {
  file: string; // Path or URL to PDF
  title: string;
}

export default function PDFViewer({ file, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const goToPrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(2.0, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.2));

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title || "document.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-4xl bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {numPages || "…"}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
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
          <button
            onClick={downloadPDF}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="border rounded-lg shadow-lg bg-white p-4 max-w-4xl w-full flex justify-center">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Loading PDF…</p>}
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center space-x-2 flex-wrap justify-center">
        {Array.from({ length: Math.min(numPages, 10) }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded text-sm font-medium ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
        {numPages > 10 && (
          <>
            <span className="text-gray-500">…</span>
            <button
              onClick={() => setCurrentPage(numPages)}
              className={`w-8 h-8 rounded text-sm font-medium ${
                numPages === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {numPages}
            </button>
          </>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(numPages)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
        >
          Last
        </button>
      </div>
    </div>
  );
}
