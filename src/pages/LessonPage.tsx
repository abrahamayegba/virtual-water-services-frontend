import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeft, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateUserCourse } from "@/api/userCourses";
import { getContentIcon } from "@/components/ContentHelpers";
import {
  createUserCourseLesson,
  getUserCourseLessonByUserCourseAndLesson,
  updateUserCourseLesson,
} from "@/api/userCourseLesson";
import { useEffect, useState, useRef } from "react";
import Support from "@/components/Support";
import { Lesson } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import LessonContent from "@/components/LessonContent";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import LoadingScreen from "@/components/LoadingScreen";
import {
  useLessonById,
  useLessonsWithProgress,
  useUserCourseByCourseId,
} from "@/hooks/useUserCourses";
import { VideoPlayerRef } from "@/components/VideoPlayer";

export default function LessonPage() {
  const { user } = useAuth();
  const [markAsCompleteLoading, setMarkAsCompleteLoading] = useState(false);
  const { courseId, lessonId } = useParams();
  const { toast: OldToast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [spentTime, setSpentTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const videoPlayerRef = useRef<VideoPlayerRef>(null);

  useEffect(() => {
    if (!lessonId || !user?.id) return;

    const savedStart = localStorage.getItem(
      `lesson-${lessonId}-${user.id}-start`
    );
    const savedSpent = localStorage.getItem(
      `lesson-${lessonId}-${user.id}-time`
    );

    if (savedStart) {
      const start = Number(savedStart);
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSpentTime(elapsed);
      setTimerActive(true);
    } else if (savedSpent) {
      setSpentTime(Number(savedSpent));
    }
  }, [lessonId, user?.id]);

  useEffect(() => {
    if (!timerActive || !lessonId || !user?.id) return;

    if (!localStorage.getItem(`lesson-${lessonId}-${user.id}-start`)) {
      localStorage.setItem(
        `lesson-${lessonId}-${user.id}-start`,
        Date.now().toString()
      );
    }

    const interval = setInterval(() => {
      const start = Number(
        localStorage.getItem(`lesson-${lessonId}-${user.id}-start`)
      );
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSpentTime(elapsed);
      localStorage.setItem(
        `lesson-${lessonId}-${user.id}-time`,
        elapsed.toString()
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, lessonId, user?.id]);

  const { data: userCourseResponse, isLoading: userCourseLoading } =
    useUserCourseByCourseId(user?.id!, courseId!);

  const userCourse = userCourseResponse?.userCourse;
  const userCourseId = userCourse?.id;
  const course = userCourse?.course;

  const { data: lessonsResponse, isLoading: lessonsLoading } =
    useLessonsWithProgress(userCourseId!);

  const lessons: Lesson[] = lessonsResponse?.lessons ?? [];

  const { data: lessonResponse, isLoading: lessonLoading } = useLessonById(
    lessonId!
  );

  const lesson = lessonResponse?.lesson;

  const quizzes = course?.Quizzes ?? [];

  if (userCourseLoading || lessonsLoading || lessonLoading) {
    return <LoadingScreen />;
  }
  const currentLessonProgress = lessons.find(
    (l) => l.id === lessonId
  )?.progress;
  const currentLessonIndex = lessons.findIndex((l) => l.id === lessonId);
  const previousLesson = lessons[currentLessonIndex - 1];
  const nextLesson = lessons[currentLessonIndex + 1];
  const completedLessons = lessons.filter(
    (lesson) => lesson.progress?.completed === true
  );
  const totalLessons = lessons.length;
  const progress =
    totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  const isUserCourseCompleted = userCourse?.completed;

  const canMarkComplete =
    timerActive && spentTime >= (lesson?.duration ?? 5) * 60;

  const handleStartVideo = () => {
    setTimerActive(true);
    if (lesson?.type?.type === "Video") {
      videoPlayerRef.current?.play();
    }
  };

  const handleCompleteLesson = async () => {
    try {
      setMarkAsCompleteLoading(true);
      const { userCourseLesson } =
        await getUserCourseLessonByUserCourseAndLesson(
          userCourse?.id!,
          lesson?.id!
        );

      if (!userCourseLesson) {
        await createUserCourseLesson({
          userCourseId: userCourse?.id!,
          lessonId: lesson?.id!,
          completed: true,
          completedAt: new Date(),
          spentTime: spentTime,
          startedAt: new Date(Date.now() - spentTime * 1000),
        });
      } else {
        await updateUserCourseLesson(userCourseLesson.id, {
          completed: true,
          spentTime: spentTime,
          completedAt: new Date(),
        });
      }

      if (isUserCourseCompleted) {
        await updateUserCourse(userCourse.id, { completed: true });
      }
      await queryClient.invalidateQueries({
        queryKey: ["lessonsWithProgress", userCourse?.id],
      });

      localStorage.removeItem(`lesson-${lessonId}-${user?.id}-start`);
      localStorage.removeItem(`lesson-${lessonId}-${user?.id}-time`);

      toast("Lesson completed successfully!", {
        description:
          "You have finished the lesson and your progress has been saved.",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });

      if (nextLesson) {
        navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
      }
    } catch (err) {
      console.error("Error completing lesson:", err);
      OldToast({
        title: "Uh oh! Something went wrong.",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setSpentTime(0);
      setTimerActive(false);
      setMarkAsCompleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/dashboard" className="hover:text-gray-700">
              Dashboard
            </Link>
            <span className="mx-2">•</span>
            <Link to={`/course/${courseId}`} className="hover:text-gray-700">
              {course?.title}
            </Link>
            <span className="mx-2">•</span>
            <span>{lesson?.title}</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {lesson?.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                <div className="flex items-center space-x-1">
                  {getContentIcon(lesson?.type?.type!)}
                  <span className="uppercase">{lesson?.type.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{lesson?.duration} minutes</span>
                </div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Lesson {currentLessonIndex + 1} of {lessons.length}
                </div>
              </div>
            </div>

            {(currentLessonProgress?.completed || isUserCourseCompleted) && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedLessons.length} of {lessons.length} lessons completed
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <LessonContent
                ref={videoPlayerRef}
                lesson={lesson!}
                onPlay={() => setTimerActive(true)}
              />
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center justify-between">
              <div className="flex-1">
                {previousLesson && (
                  <Link
                    to={`/course/${courseId}/lesson/${previousLesson.id}`}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <div>
                      <p className="text-xs text-gray-500">Previous</p>
                      <p className="font-medium">{previousLesson.title}</p>
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex-1 flex justify-center">
                {!currentLessonProgress?.completed &&
                  !isUserCourseCompleted && (
                    <button
                      disabled={
                        markAsCompleteLoading ||
                        (timerActive && !canMarkComplete)
                      }
                      onClick={
                        !timerActive ? handleStartVideo : handleCompleteLesson
                      }
                      className={`bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 ${
                        markAsCompleteLoading ||
                        (timerActive && !canMarkComplete)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>
                        {markAsCompleteLoading
                          ? "Marking..."
                          : !timerActive
                          ? "Start Video"
                          : !canMarkComplete
                          ? (() => {
                              const remaining =
                                lesson?.duration! * 60 - spentTime;
                              const minutes = Math.floor(remaining / 60);
                              const seconds = remaining % 60;
                              return `Wait ${minutes}:${seconds
                                .toString()
                                .padStart(2, "0")}`;
                            })()
                          : "Mark as Complete"}
                      </span>
                    </button>
                  )}
              </div>
              <div className="flex-1 flex justify-end">
                {nextLesson ? (
                  <Link
                    to={
                      currentLessonProgress?.completed
                        ? `/course/${courseId}/lesson/${nextLesson.id}`
                        : "#" // disabled
                    }
                    className={`px-6 py-2 rounded-lg text-white transition-colors ${
                      currentLessonProgress?.completed
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Next Lesson
                  </Link>
                ) : quizzes.length > 0 &&
                  lessons.every((l) => l.progress.completed) ? (
                  <Link
                    to={`/course/${courseId}/quiz/${userCourseId}`}
                    className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors`}
                  >
                    Take Course Test
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Course Progress
              </h3>
              <div className="space-y-3">
                {lessons.map((l, i) => (
                  <div key={l.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 flex-none rounded-full flex items-center justify-center text-xs font-medium ${
                          l.progress.completed
                            ? "bg-green-500 text-white"
                            : l.id === lessonId
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {l.progress.completed ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          i + 1
                        )}
                      </div>

                      <span
                        className={`text-sm ${
                          l.id === lessonId
                            ? "font-medium text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {l.title}
                      </span>
                    </div>

                    {l.duration && (
                      <span className="text-xs text-gray-500">
                        {l.duration}m
                      </span>
                    )}
                  </div>
                ))}

                {quizzes && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 flex-none rounded-full bg-purple-500 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>

                      <span className="text-sm text-gray-600">Course Test</span>
                    </div>

                    <span className="text-xs text-gray-500">10m</span>
                  </div>
                )}
              </div>
            </div>
            <Support />
          </div>
        </div>
      </main>
    </div>
  );
}
