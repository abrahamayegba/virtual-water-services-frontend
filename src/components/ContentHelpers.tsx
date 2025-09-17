import { BookOpen, FileText, Presentation, Video } from "lucide-react";

export const getContentIcon = (type: string) => {
  switch (type) {
    case "Video":
      return <Video className="h-5 w-5" />;
    case "PDF":
      return <FileText className="h-5 w-5" />;
    case "ppt":
      return <Presentation className="h-5 w-5" />;
    default:
      return <BookOpen className="h-5 w-5" />;
  }
};

export const getContentTypeLabel = (type: string) => {
  switch (type) {
    case "Video":
      return "Video";
    case "PDF":
      return "PDF Document";
    case "ppt":
      return "PowerPoint";
    default:
      return "Content";
  }
};
