
import { API_BASE_URL } from "./config";

// Course Categories
export async function getCourseCategories() {
  const res = await fetch(`${API_BASE_URL}/course-categories`);
  if (!res.ok) throw new Error("Failed to fetch course categories");
  return res.json();
}

export async function getCourseCategoryById(id: string) {
  const res = await fetch(`${API_BASE_URL}/course-categories/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course categories");
  return res.json();
}

export async function createCourseCategory(data: { categoryName: string }) {
  const res = await fetch(`${API_BASE_URL}/course-categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create course category");
  return res.json();
}

export async function updateCourseCategory(
  id: string,
  data: Partial<{ categoryName: string }>
) {
  const res = await fetch(`${API_BASE_URL}/course-categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update course category");
  return res.json();
}

export async function deleteCourseCategory(id: string) {
  const res = await fetch(`${API_BASE_URL}/course-categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete course category");
  return res.json();
}