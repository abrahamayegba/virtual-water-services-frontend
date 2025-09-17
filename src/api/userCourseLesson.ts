import { API_BASE_URL } from "./config";

// Get all lessons for a user course
export async function getUserCourseLessons() {
  const res = await fetch(
    `${API_BASE_URL}/user-course-lessons`
  );
  if (!res.ok) throw new Error("Failed to fetch user course lessons");
  return res.json();
}

export async function getUserCourseLessonsByUserCourseId(userCourseId: string) {
  const res = await fetch(`${API_BASE_URL}/user-course-lessons/user-course/${userCourseId}`);
  if (!res.ok) throw new Error("Failed to fetch user course lessons");
  return res.json();
}

export async function getUserCourseLessonsByUserId(userId: string) {
  const res = await fetch(`${API_BASE_URL}/user-course-lessons/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user course lessons");
  return res.json();
}

export async function getCompletedCoursesByUserId(userId: string) {
  const res = await fetch(
    `${API_BASE_URL}/user-course-lessons/user/${userId}/completed-courses`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch completed courses");
  return res.json();
}


export async function getUserCourseLessonByUserCourseAndLesson(
  userCourseId: string,
  lessonId: string
) {
  const res = await fetch(
    `${API_BASE_URL}/user-course-lessons/user-course/${userCourseId}/lesson/${lessonId}`
  );
  if (!res.ok) throw new Error("Failed to fetch user course lesson");
  return res.json(); // { success: true, userCourseLesson: {...} } or { success: true, userCourseLesson: null }
}

// Create user course lesson (when user starts a lesson)
export async function createUserCourseLesson(data: {
  userCourseId: string;
  lessonId: string;
  completed?: boolean;
  startedAt?: Date;
  completedAt?: Date;
  spentTime?: number;
}) {
  const res = await fetch(`${API_BASE_URL}/user-course-lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user course lesson");
  return res.json();
}

// Update lesson progress (mark completed, update spent time, etc.)
export async function updateUserCourseLesson(
  id: string,
  data: Partial<{
    startedAt: Date;
    spentTime: number;
    completed: boolean;
    completedAt: Date;
  }>
) {
  const res = await fetch(`${API_BASE_URL}/user-course-lessons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user course lesson");
  return res.json();
}

// Delete a lesson progress record
export async function deleteUserCourseLesson(id: string) {
  const res = await fetch(`${API_BASE_URL}/user-course-lessons/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user course lesson");
  return res.json();
}
