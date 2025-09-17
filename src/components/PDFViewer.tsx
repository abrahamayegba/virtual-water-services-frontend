import { Document, Page } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { PDFViewerProps } from "@/types/types";
import { usePdfViewer } from "@/hooks/usePdfViewer";

export default function PDFViewer({ file, title }: PDFViewerProps) {
  const {
    numPages,
    currentPage,
    containerRef,
    onDocumentLoadSuccess,
    goToNextPage,
    inFullscreen,
    isFullscreen,
    pageWidth,
    setCurrentPage,
    downloadPDF,
    goToPrevPage,
    toggleFullscreen,
  } = usePdfViewer(file, title);

  return (
    <div className="flex flex-col items-center space-y-4">
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

        <div className="flex items-center space-x-4">
          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>

          <button
            onClick={downloadPDF}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="border rounded-lg shadow-lg bg-white p-4 max-w-4xl w-full flex justify-center relative"
        style={{ height: isFullscreen ? "100vh" : undefined, overflow: "auto" }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<LoadingScreen />}
        >
          <Page
            pageNumber={currentPage}
            width={pageWidth}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="relative z-0" // explicitly make canvas lower
          />
        </Document>

        {/* Fullscreen prev/next buttons */}
        {inFullscreen() && (
          <>
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50 w-14 h-14 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Previous page"
            >
              &lt;
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 w-14 h-14 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Next page"
            >
              &gt;
            </button>
          </>
        )}
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
