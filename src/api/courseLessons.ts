import { Lesson } from "@/types/types";
import { API_BASE_URL } from "./config";

// Course Lessons
export async function getLessons() {
  const res = await fetch(`${API_BASE_URL}/course-lessons`);
  if (!res.ok) throw new Error("Failed to fetch lessons");
  return res.json();
}

export async function getLessonById(id: string) {
  const res = await fetch(`${API_BASE_URL}/course-lessons/${id}`);
  if (!res.ok) throw new Error("Failed to fetch lesson");
  return res.json();
}

export async function getLessonsByCourseId(
  courseId: string
): Promise<{ lessons: Lesson[] }> {
  const res = await fetch(
    `${API_BASE_URL}/course-lessons?courseId=${courseId}`
  );
  if (!res.ok) throw new Error("Failed to fetch lessons");
  return res.json();
}

export async function getLessonsByUserCourseId(userCourseId: string) {
  const res = await fetch(
    `${API_BASE_URL}/course-lessons/${userCourseId}/lessons`
  );
  if (!res.ok) throw new Error("Failed to fetch lessons");
  const json = await res.json();
  return json.lessons; // Return lessons array directly
}

export async function createLesson(data: {
  title: string;
  content: string;
  typeId: number;
  duration: number;
  file?: string;
  courseId: string;
}) {
  const res = await fetch(`${API_BASE_URL}/course-lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create lesson");
  return res.json();
}

export async function updateLesson(
  id: string,
  data: Partial<{
    title: string;
    content: string;
    typeId: number;
    duration: number;
    file?: string;
    courseId: string;
  }>
) {
  const res = await fetch(`${API_BASE_URL}/course-lessons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update lesson");
  return res.json();
}

export async function deleteLesson(id: string) {
  const res = await fetch(`${API_BASE_URL}/course-lessons/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete lesson");
  return res.json();
}