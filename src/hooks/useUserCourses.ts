import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getLessonsWithProgressByUserCourseId,
  getUserCourseByCourseId,
  getUserCoursesByUserId,
} from "@/api/userCourses";
import type {
  UserCourse,
  Lesson,
  CourseCategory,
  CourseObjectivesResponse,
  Quiz,
} from "@/types/types";
import { getCompletedCoursesByUserId } from "@/api/userCourseLesson";
import { getLessonById } from "@/api/courseLessons";
import { getCourseObjectivesByCourseId } from "@/api/courseObjectives";
import { getCourseCategoryById } from "@/api/courseCategories";
import { getQuizzesByCourseId } from "@/api/quizzes";

type UserCoursesResponse = { userCourses: UserCourse[] };
type LessonsResponse = { lessons: Lesson[] };
type CompletedCoursesResponse = { completedCourses: UserCourse[] };
type LessonResponse = { lesson: Lesson };
type UserCourseResponse = { userCourse: UserCourse };
type QuizResponse = {
  quizzes: Quiz[];
};

export function useUserCourseByCourseId(userId: string, courseId: string) {
  return useQuery<UserCourseResponse>({
    queryKey: ["userCourse", userId, courseId],
    queryFn: () => getUserCourseByCourseId(userId, courseId),
    enabled: !!userId && !!courseId,
  });
}

export function useLessonById(lessonId: string) {
  return useQuery<LessonResponse>({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId),
    enabled: !!lessonId,
  });
}

export function useLessonsWithProgress(userCourseId: string) {
  return useQuery<LessonsResponse>({
    queryKey: ["lessonsWithProgress", userCourseId],
    queryFn: () => getLessonsWithProgressByUserCourseId(userCourseId),
    enabled: !!userCourseId,
  });
}

export function useUserCourses(userId: string) {
  const query = useQuery<UserCoursesResponse>({
    queryKey: ["userCourses", userId],
    queryFn: () => getUserCoursesByUserId(userId),
    enabled: !!userId,
  });
  return query;
}

export function useUserCourseLessons(userCourses: UserCourse[]) {
  // useQueries returns UseQueryResult[]
  const queries = useQueries({
    queries: userCourses.map((uc: UserCourse) => ({
      queryKey: ["userCourseLessons", uc.id],
      queryFn: () => getLessonsWithProgressByUserCourseId(uc.id),
      enabled: !!uc.id,
    })),
  }) as UseQueryResult<LessonsResponse>[];
  return queries;
}

export function useCompletedCourses(userId: string) {
  const query = useQuery<CompletedCoursesResponse>({
    queryKey: ["completedCourses", userId],
    queryFn: () => getCompletedCoursesByUserId(userId),
    enabled: !!userId,
  });
  return query;
}

export function useCourseCategory(categoryId: string | undefined) {
  return useQuery<CourseCategory>({
    queryKey: ["courseCategory", categoryId],
    queryFn: () => getCourseCategoryById(categoryId!),
    enabled: !!categoryId,
  });
}

export function useCourseObjectives(courseId: string | undefined) {
  return useQuery<CourseObjectivesResponse>({
    queryKey: ["objectives", courseId],
    queryFn: () => getCourseObjectivesByCourseId(courseId!),
    enabled: !!courseId,
  });
}

export function useQuizByCourseId(courseId: string | undefined) {
  const { data, isLoading, error } = useQuery<QuizResponse>({
    queryKey: ["quiz", courseId],
    queryFn: () => getQuizzesByCourseId(courseId!),
    enabled: !!courseId,
  });

  // Return the first quiz or null
  const quiz = data?.quizzes?.[0] ?? null;

  return { quiz, isLoading, error };
}
