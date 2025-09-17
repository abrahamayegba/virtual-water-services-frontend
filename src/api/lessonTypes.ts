import { API_BASE_URL } from "./config";

// Lesson Types
export async function getLessonTypes() {
  const res = await fetch(`${API_BASE_URL}/lesson-types`);
  if (!res.ok) throw new Error("Failed to fetch lesson types");
  return res.json();
}

export async function createLessonType(data: { type: string }) {
  const res = await fetch(`${API_BASE_URL}/lesson-types`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create lesson type");
  return res.json();
}

export async function updateLessonType(
  id: number,
  data: Partial<{ type: string }>
) {
  const res = await fetch(`${API_BASE_URL}/lesson-types/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update lesson type");
  return res.json();
}

export async function deleteLessonType(id: number) {
  const res = await fetch(`${API_BASE_URL}/lesson-types/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete lesson type");
  return res.json();
}
