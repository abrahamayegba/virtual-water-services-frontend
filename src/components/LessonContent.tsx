import VideoPlayer, { VideoPlayerRef } from "./VideoPlayer";
import PDFViewer from "./PDFViewer";
import { FileText } from "lucide-react";
import { forwardRef } from "react";

interface LessonContentProps {
  lesson: {
    title: string;
    file: string | null;
    type: {
      type: string;
    };
  };
  onPlay?: () => void;
}

const LessonContent = forwardRef<VideoPlayerRef, LessonContentProps>(
  ({ lesson, onPlay }, ref) => {
    if (!lesson) return null;

    switch (lesson.type.type) {
      case "Video":
        return (
          <VideoPlayer
            ref={ref}
            src={lesson.file ?? lesson.title}
            title={lesson.title}
            onPlay={onPlay}
          />
        );
      case "ppt":
        return (
          <PDFViewer
            file={lesson.file ?? "/legionella-awareness-revised.pdf"}
            title={lesson.title}
          />
        );
      case "PDF":
        if (lesson.file) {
          return <PDFViewer file={lesson.file} title={lesson.title} />;
        }
        return (
          <PDFViewer
            file={"/legionella-awareness-revised.pdf"}
            title={lesson.title}
          />
        );
      default:
        return (
          <div className="bg-gray-100 rounded-lg p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Content not available</p>
            </div>
          </div>
        );
    }
  }
);

LessonContent.displayName = "LessonContent";

export default LessonContent;
