import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import Navbar from "../components/Navbar";
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
  Video,
  Presentation,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const { courses, certificates } = useCourses();

  const completedCourses = courses.filter((course) => course.completed);
  const inProgressCourses = courses.filter(
    (course) => course.progress > 0 && !course.completed
  );
  const availableCourses = courses.filter((course) => course.progress === 0);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "powerpoint":
        return <Presentation className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your safety training journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.length}
                </h3>
                <p className="text-sm text-gray-600">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {completedCourses.length}
                </h3>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {inProgressCourses.length}
                </h3>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {certificates.length}
                </h3>
                <p className="text-sm text-gray-600">Certificates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {inProgressCourses.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Continue Learning
                </h2>
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {course.category} • {course.duration} minutes
                          </p>
                        </div>
                        <Link
                          to={`/course/${course.id}`}
                          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center space-x-2"
                        >
                          <PlayCircle className="h-4 w-4" />
                          <span>Continue</span>
                        </Link>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {Math.round(course.progress)}% complete
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Available Courses */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Courses
                </h2>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-2 md:mt-0 border rounded-md px-3 py-2 text-sm w-full md:w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {course.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration} min</span>
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {course.category}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Course Content:
                      </h4>
                      <div className="space-y-1">
                        {course.lessons.slice(0, 3).map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center text-sm text-gray-600"
                          >
                            {getContentIcon(lesson.type)}
                            <span className="ml-2">{lesson.title}</span>
                          </div>
                        ))}
                        {course.lessons.length > 3 && (
                          <p className="text-sm text-gray-500 ml-6">
                            +{course.lessons.length - 3} more lessons
                          </p>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/course/${course.id}`}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-center block"
                    >
                      Start Course
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Certificates */}
            {certificates.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Certificates
                </h3>
                <div className="space-y-3">
                  {certificates.slice(-3).map((cert) => (
                    <Link
                      key={cert.id}
                      to={`/certificate/${cert.id}`}
                      className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {cert.courseName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {cert.completedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/profile"
                  className="block w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Update Profile
                </Link>
                <Link
                  to="/support"
                  className="block w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Get Support
                </Link>
                {certificates.length > 0 && (
                  <Link
                    to="/certificates"
                    className="block w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    View All Certificates
                  </Link>
                )}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Completion</span>
                    <span>
                      {Math.round(
                        (completedCourses.length / courses.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (completedCourses.length / courses.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
