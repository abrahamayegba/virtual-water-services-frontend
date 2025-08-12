import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import Navbar from '../components/Navbar';
import { Clock, BookOpen, CheckCircle, PlayCircle, FileText, Video, Presentation, Award } from 'lucide-react';

export default function CourseOverview() {
  const { courseId } = useParams();
  const { getCourse } = useCourses();
  
  const course = getCourse(courseId!);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completedLessons = course.lessons.filter(lesson => lesson.completed);
  const nextLesson = course.lessons.find(lesson => !lesson.completed);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'pdf': return <FileText className="h-5 w-5" />;
      case 'powerpoint': return <Presentation className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Video';
      case 'pdf': return 'PDF Document';
      case 'powerpoint': return 'PowerPoint';
      default: return 'Content';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Link to="/dashboard" className="hover:text-gray-700">
                    Dashboard
                  </Link>
                  <span className="mx-2">•</span>
                  <span>{course.category}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm text-gray-600">
                    {Math.round(course.progress)}% complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {completedLessons.length} of {course.lessons.length} lessons
                  completed
                </p>
              </div>

              {/* Continue/Start Button */}
              {nextLesson && (
                <div className="mb-8">
                  <Link
                    to={`/course/${course.id}/lesson/${nextLesson.id}`}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center space-x-2"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>
                      {course.progress > 0 ? "Continue Course" : "Start Course"}
                    </span>
                  </Link>
                </div>
              )}

              {/* Course completed state */}
              {course.completed && (
                <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Course Completed!</span>
                  </div>
                  <p className="text-green-700 mt-1">
                    Congratulations! You have successfully completed this
                    course.
                  </p>
                  {course.certificateId && (
                    <Link
                      to={`/certificate/${course.certificateId}`}
                      className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Certificate
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Curriculum
              </h2>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      lesson.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            lesson.completed
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              {getContentIcon(lesson.type)}
                              <span>{getContentTypeLabel(lesson.type)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.duration} min</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {!course.completed && (
                        <Link
                          to={`/course/${course.id}/lesson/${lesson.id}`}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            lesson.completed
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {lesson.completed ? "Review" : "Start"}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quiz Section */}
              {course.quiz && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">
                      Final Assessment
                    </h3>
                  </div>
                  <p className="text-blue-800 text-sm mb-3">
                    Complete all lessons to unlock the final quiz. You need{" "}
                    {course.quiz.passingScore}% to pass and earn your
                    certificate.
                  </p>
                  {completedLessons.length === course.lessons.length &&
                    !course.completed && (
                      <Link
                        to={`/course/${course.id}/quiz`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Take Final Quiz
                      </Link>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Course Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">{course.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Learning Objectives
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Explain what Legionella is and how it can affect health
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Understand legal responsibilities and compliance
                    requirements.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Identify and control risks in water systems.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Apply monitoring, maintenance, and record-keeping best
                    practices.
                  </span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3 text-sm">
                <Link
                  to="/support"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  Contact Support
                </Link>
                <Link
                  to="/support"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  Technical Issues
                </Link>
                <Link
                  to="/support"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  Course Content Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}