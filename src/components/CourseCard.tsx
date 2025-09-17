import { Course, Lesson } from "@/types/types";
import { BookOpen, Clock, FileText, Presentation, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { getContentIcon } from "./ContentHelpers";

interface CourseCardProps {
  course: Course;
  lessons: Lesson[]; // pass lessons separately
}

const CourseCard = ({ course, lessons }: CourseCardProps) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow flex flex-col"
      style={{ height: "100%" }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration} min</span>
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {course.category?.categoryName ?? "General"}
          </span>
        </div>
      </div>

      {lessons && lessons.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Course Content:
          </h4>
          <div className="space-y-1">
            {lessons.slice(0, 3).map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center text-sm text-gray-600"
              >
                {getContentIcon(lesson.type.type)}
                <span className="ml-2">{lesson.title}</span>
              </div>
            ))}
            {lessons.length > 3 && (
              <p className="text-sm text-gray-500 ml-6">
                +{lessons.length - 3} more lessons
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Link
          to={`/course/${course.id}`}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-center block"
        >
          {course.progress && course.progress > 0
            ? "Continue Course"
            : "Start Course"}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
