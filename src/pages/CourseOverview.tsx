import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Clock, BookOpen, CheckCircle, PlayCircle, Award } from "lucide-react";
import { Lesson } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import {
  getContentIcon,
  getContentTypeLabel,
} from "@/components/ContentHelpers";
import Support from "@/components/Support";
import LearningObjectives from "@/components/LearningObjectives";
import CourseDetails from "@/components/CourseDetails";
import LoadingScreen from "@/components/LoadingScreen";
import {
  useCourseCategory,
  useCourseObjectives,
  useLessonsWithProgress,
  useUserCourseByCourseId,
} from "@/hooks/useUserCourses";

export default function CourseOverview() {
  const { user } = useAuth();
  const { courseId } = useParams();

  const { data: userCourseResponse, isLoading: userCourseLoading } =
    useUserCourseByCourseId(user?.id!, courseId!);

  const userCourse = userCourseResponse?.userCourse;

  const course = userCourse?.course;

  const { data: lessonsResponse, isLoading: lessonsLoading } =
    useLessonsWithProgress(userCourse?.id!);

  const lessons: Lesson[] = lessonsResponse?.lessons ?? [];

  const { data: category, isLoading: categoryLoading } = useCourseCategory(
    course?.categoryId
  );

  const { data: objectivesResponse, isLoading: objectivesLoading } =
    useCourseObjectives(course?.id);

  const objectives = objectivesResponse?.objectives;

  const categoryName = category?.category?.categoryName

  const isLoading =
    userCourseLoading || lessonsLoading || categoryLoading || objectivesLoading;

  if (isLoading) return <LoadingScreen />;
  if (!userCourse || !course) return <p>Course not found.</p>;

  const completedLessons = lessons?.filter(
    (lesson) => lesson.progress?.completed === true
  );
  const nextLesson = lessons?.find((l) => !l.progress?.completed);

  const completed = userCourse.completed ?? false;
  const totalLessons = lessons?.length!;
  const progress =
    totalLessons > 0 ? (completedLessons?.length! / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Link to="/dashboard" className="hover:text-gray-700">
                    Dashboard
                  </Link>
                  <span className="mx-2">•</span>
                  <span>{categoryName}</span>
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
                    <span>{lessons?.length} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm text-gray-600">
                    {Math.round(progress)}% complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {completedLessons?.length} of {lessons?.length} lessons
                  completed
                </p>
              </div>

              {/* Continue / Start */}
              {nextLesson && !completed && (
                <Link
                  to={`/course/${course.id}/lesson/${nextLesson.id}`}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center space-x-2"
                >
                  <PlayCircle className="h-5 w-5" />
                  <span>
                    {progress > 0 ? "Continue Course" : "Start Course"}
                  </span>
                </Link>
              )}

              {/* Completed */}
              {completed && (
                <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Course Completed!</span>
                  </div>
                  <p className="text-green-700 mt-1">
                    Congratulations! You have completed this course.
                  </p>
                  {userCourse.courseId && (
                    <Link
                      to={`/certificate/${userCourse.courseId}`}
                      className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Certificate
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Curriculum
              </h2>
              <div className="space-y-4">
                {lessons?.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      lesson.progress.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            lesson.progress.completed
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {lesson.progress.completed ? (
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
                              {getContentIcon(lesson.type.type)}{" "}
                              <span>
                                {getContentTypeLabel(lesson.type.type)}
                              </span>
                            </div>
                            {lesson.duration && (
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{lesson.duration} min</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {!completed && (
                        <Link
                          to={`/course/${course.id}/lesson/${lesson.id}`}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            lesson.progress.completed
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {lesson.progress.completed ? "Review" : "Start"}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {course.Quizzes && course.Quizzes.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">
                      Final Assessment
                    </h3>
                  </div>
                  <p className="text-blue-800 text-sm mb-3">
                    Complete all lessons to unlock the final quiz. You need{" "}
                    {course.Quizzes[0].passingScore}% to pass and earn your
                    certificate.
                  </p>
                  {completedLessons?.length === lessons?.length &&
                    !course.completed && (
                      <Link
                        to={`/course/${courseId}/quiz/${userCourse?.id}`}
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
            <CourseDetails
              duration={course.duration}
              lessonsCount={lessons?.length!}
              category={categoryName!}
              certificate={true} // or dynamic value
            />
            <LearningObjectives objectives={objectives!} />
            <Support />
          </div>
        </div>
      </main>
    </div>
  );
}
