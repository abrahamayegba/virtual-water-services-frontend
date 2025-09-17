import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { pdfjs } from "react-pdf";
import { Toaster as SonnerToaster } from './components/ui/sonner.tsx';
import { Toaster as Toaster } from "@/components/ui/toaster";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SonnerToaster />
    <Toaster />
  </StrictMode>
);
