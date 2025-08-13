import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";

interface PDFViewerProps {
  file: string | File;
  title?: string;
}

export default function PDFViewer({ file, title }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);

  // For demo purposes, we'll use the existing slide images
  // In production, you'd convert PDF to images or use a proper PDF viewer
  const totalPages = 90; // Based on the slide images available

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(2.0, prev + 0.2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.2));
  };

  const downloadPDF = () => {
    // In production, this would download the actual PDF
    alert("Download functionality would be implemented here");
  };

  // Get the slide image path
  const getSlideImage = (pageNum: number) => {
    return `/src/assets/ppt-slides/slide${pageNum}.png`;
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
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
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

      {/* PDF/PowerPoint Content */}
      <div className="border rounded-lg shadow-lg bg-white p-4 max-w-4xl w-full">
        <div className="flex justify-center">
          <img
            src={getSlideImage(currentPage)}
            alt={`Slide ${currentPage}`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center top",
              maxWidth: "100%",
              height: "auto",
            }}
            className="rounded shadow-sm"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = "/src/assets/ppt-slides/slide1.png";
            }}
          />
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center space-x-2 flex-wrap justify-center">
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(
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
        {totalPages > 10 && (
          <>
            <span className="text-gray-500">...</span>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`w-8 h-8 rounded text-sm font-medium ${
                totalPages === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {totalPages}
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
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
        >
          Last
        </button>
      </div>
    </div>
  );
}
