import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// certificateUtils.ts
export function handleDownload(
  certificate: any,
  userName: string,
  companyName: string | null
) {
  const element = document.createElement("a");
  const file = new Blob(
    [
      `CERTIFICATE OF COMPLETION\n\n` +
        `Course: ${certificate.courseName}\n` +
        `Awarded to: ${userName}\n` +
        `Company: ${companyName || "N/A"}\n` +
        `User ID: ${certificate.userId || "N/A"}\n` +
        `Date: ${certificate.completedAt.toLocaleDateString()}\n` +
        `Score: ${certificate.score || "N/A"}%\n` +
        `Certificate ID: ${certificate.id}\n\n` +
        `This certificate verifies successful completion of the course.`,
    ],
    { type: "text/plain" }
  );
  element.href = URL.createObjectURL(file);
  element.download = `certificate-${certificate.courseName
    .replace(/\s+/g, "-")
    .toLowerCase()}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export async function handleShare(certificate: any) {
  const shareData = {
    title: `Training Certificate - ${certificate.courseName}`,
    text: `I've completed the ${certificate.courseName} course!`,
    url: `${window.location.origin}/certificate/${certificate.id}`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Error sharing:", err);
    }
  } else {
    navigator.clipboard.writeText(shareData.url);
    alert("Certificate link copied to clipboard!");
  }
}
