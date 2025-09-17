
import { API_BASE_URL } from "./config";
// Courses
export async function getCourses() {
  const res = await fetch(`${API_BASE_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function getCourseById(id: string) {
  const res = await fetch(`${API_BASE_URL}/courses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
}

export async function createCourse(data: {
  title: string;
  description: string;
  categoryId: string;
  duration: number;
}) {
  const res = await fetch(`${API_BASE_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}

export async function updateCourse(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    categoryId: string;
    duration: number;
  }>
) {
  const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update course");
  return res.json();
}

export async function deleteCourse(id: string) {
  const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete course");
  return res.json();
}
