import { useState, useRef, useEffect, useCallback } from "react";

export function usePdfViewer(file: string, title?: string) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);

  // Called when pdf doc loaded to set number of pages and reset current page
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setCurrentPage(1);
    },
    []
  );

  // Navigation controls
  const goToPrevPage = useCallback(
    () => setCurrentPage((p) => Math.max(1, p - 1)),
    []
  );

  const goToNextPage = useCallback(
    () => setCurrentPage((p) => Math.min(numPages, p + 1)),
    [numPages]
  );

  // Download PDF helper
  const downloadPDF = useCallback(() => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title || "document.pdf";
    link.click();
  }, [file, title]);

  // Fullscreen handling
  const enterFullscreen = useCallback(() => {
    if (containerRef.current) {
      const el = containerRef.current as any;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    const doc = document as any;
    if (document.exitFullscreen) document.exitFullscreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) exitFullscreen();
    else enterFullscreen();
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Check fullscreen element matches container
  const inFullscreen = useCallback(() => {
    const doc = document as any;
    return (
      document.fullscreenElement === containerRef.current ||
      doc.webkitFullscreenElement === containerRef.current ||
      doc.mozFullScreenElement === containerRef.current ||
      doc.msFullscreenElement === containerRef.current
    );
  }, []);

  // Keep pageWidth updated on resize or container changes
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setPageWidth(containerRef.current.clientWidth);
      }
    }
    updateWidth();

    window.addEventListener("resize", updateWidth);

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevPage();
      else if (e.key === "ArrowRight") goToNextPage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goToNextPage, goToPrevPage]);

  return {
    numPages,
    currentPage,
    setCurrentPage,
    containerRef,
    isFullscreen,
    setIsFullscreen,
    pageWidth,
    onDocumentLoadSuccess,
    goToPrevPage,
    goToNextPage,
    downloadPDF,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    inFullscreen,
  };
}
