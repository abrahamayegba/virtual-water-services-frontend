import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

interface Course {
  id: string;
  course: {
    id: string;
    title: string;
    category?: { categoryName?: string };
    duration: number;
  };
}

interface UserProgress {
  progress: { completed: boolean };
}

interface ContinueLearningProps {
  inProgressCourses: Course[];
  userProgressByCourse: Record<string, UserProgress[]>;
}

export default function ContinueLearning({
  inProgressCourses,
  userProgressByCourse,
}: ContinueLearningProps) {
  if (inProgressCourses.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Continue Learning
      </h2>
      <div className="space-y-4">
        {inProgressCourses.map((course) => {
          const lessons = userProgressByCourse[course.id] ?? [];
          const completedLessons = lessons.filter(
            (l) => l.progress.completed
          ).length;
          const progressPercent = lessons.length
            ? (completedLessons / lessons.length) * 100
            : 0;

          return (
            <div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.course.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.course.category?.categoryName ?? "General"} •{" "}
                    {course.course.duration} minutes
                  </p>
                </div>
                <Link
                  to={`/course/${course.course.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Continue</span>
                </Link>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {Math.round(progressPercent)}% complete
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
