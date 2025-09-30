import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { pdfjs } from "react-pdf";
import { Toaster as SonnerToaster } from "./components/ui/sonner.tsx";
import { Toaster as Toaster } from "@/components/ui/toaster";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SonnerToaster />
    <Toaster />
  </StrictMode>
);
