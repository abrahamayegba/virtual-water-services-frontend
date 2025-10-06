import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  Search,
  GraduationCap,
} from "lucide-react";
import { useMemo, useState } from "react";
import StatCard from "@/components/StatCard";
import { Certificate, Lesson } from "@/types/types";
import EmptyState from "@/components/EmptyState";
import ContinueLearning from "@/components/ContinueLearning";
import RecentCertificatesAndProgress from "@/components/RecentCertificatesAndProgress";
import { getContentIcon } from "@/components/ContentHelpers";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserCourses, useUserCourseLessons } from "../hooks/useUserCourses";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const [searchTerm, setSearchTerm] = useState("");

  const userCoursesQuery = useUserCourses(user.id);
  const userCourses = userCoursesQuery.data?.userCourses ?? [];

  const lessonsResponses = useUserCourseLessons(userCourses);
  const userProgressByCourse = useMemo(() => {
    const progress: Record<string, Lesson[]> = {};
    lessonsResponses.forEach((res, i) => {
      const courseId = userCourses[i]?.id;
      if (courseId) progress[courseId] = res.data?.lessons ?? [];
    });
    return progress;
  }, [lessonsResponses, userCourses]);

  const lessonsData: Record<string, Lesson[]> = {};
  userCourses.forEach((uc) => {
    lessonsData[uc.id] = userProgressByCourse[uc.id] ?? [];
  });

  const completedCourses = userCourses.filter((uc) => uc.completed);

  const certificates: Certificate[] = completedCourses.map((course) => ({
    id: course.courseId,
    courseName: course.course.title,
    completedAt: new Date(),
    score: course?.score,
  }));

  const availableCourses = userCourses.filter((uc) => !uc.completed);

  const inProgressCourses = userCourses.filter((uc) => {
    if (uc.completed) return false;
    const lessons = userProgressByCourse[uc.id] ?? [];
    const hasStarted = lessons.some(
      (lesson) => lesson.progress?.completed === true
    );
    return hasStarted;
  });

  const filteredCourses = availableCourses.filter(
    (uc) =>
      uc.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uc.course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoading =
    userCoursesQuery.isLoading || lessonsResponses.some((res) => res.isLoading);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[725px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your safety training journey
          </p>
          <button>NEW BUTTON</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="h-8 w-8 text-blue-500" />}
            label="Total Courses"
            value={userCourses.length}
          />
          <StatCard
            icon={<CheckCircle className="h-8 w-8 text-green-500" />}
            label="Completed"
            value={completedCourses.length}
          />
          <StatCard
            icon={<Clock className="h-8 w-8 text-orange-500" />}
            label="In Progress"
            value={inProgressCourses.length}
          />
          <StatCard
            icon={<Award className="h-8 w-8 text-purple-500" />}
            label="Certificates"
            value={certificates.length}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <ContinueLearning
              inProgressCourses={inProgressCourses}
              userProgressByCourse={userProgressByCourse}
            />
            {/* Available Courses */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Courses
                </h2>
                {availableCourses.length > 0 && (
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-2 md:mt-0 border rounded-md px-3 py-2 text-sm w-full md:w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {availableCourses.length === 0 ? (
                <EmptyState
                  icon={GraduationCap}
                  title="No Courses Available"
                  description="There are currently no training courses available. New courses will appear here when they're assigned to you."
                  action={{
                    label: "Contact Support",
                    onClick: () => (window.location.href = "/support"),
                  }}
                />
              ) : filteredCourses.length === 0 && searchTerm ? (
                <EmptyState
                  icon={Search}
                  title="No Courses Found"
                  description={`No courses match "${searchTerm}". Try adjusting your search terms or browse all available courses.`}
                  action={{
                    label: "Clear Search",
                    onClick: () => setSearchTerm(""),
                    variant: "secondary",
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => {
                    const lessons = lessonsData[course.id] ?? [];
                    const completedLessonsCount = lessons.filter(
                      (l) => l.progress?.completed
                    ).length;
                    const progressPercent =
                      lessons.length > 0
                        ? completedLessonsCount / lessons.length
                        : 0;
                    return (
                      <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow flex flex-col"
                      >
                        <div className="mb-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {course.course.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {course.course.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.course.duration} min</span>
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {course.course.category?.categoryName ??
                                "General"}
                            </span>
                          </div>
                        </div>
                        {lessons.length > 0 && (
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
                                  {getContentIcon(lesson?.type?.type!)}
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
                            to={`/course/${course.course.id}`}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-center block"
                          >
                            {progressPercent > 0
                              ? "Continue Course"
                              : "Start Course"}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
          {/* Sidebar */}
          <RecentCertificatesAndProgress
            certificates={certificates}
            completedCoursesCount={completedCourses.length}
            userCoursesCount={userCourses.length}
            userId={user.id}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
