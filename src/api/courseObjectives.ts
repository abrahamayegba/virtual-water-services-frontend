import { API_BASE_URL } from "./config";

// Course Objectives
export async function getCourseObjectives() {
  const res = await fetch(`${API_BASE_URL}/course-objectives`);
  if (!res.ok) throw new Error("Failed to fetch course objectives");
  return res.json();
}

export async function createCourseObjective(data: {
  objective: string;
  courseId: string;
}) {
  const res = await fetch(`${API_BASE_URL}/course-objectives`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create course objective");
  return res.json();
}

export async function getCourseObjectivesByCourseId(courseId: string) {
  const res = await fetch(
    `${API_BASE_URL}/course-objectives/course/${courseId}`
  );
  if (!res.ok) throw new Error("Failed to fetch course objectives");
  return res.json();
}


export async function updateCourseObjective(
  id: string,
  data: Partial<{ objective: string; courseId: string }>
) {
  const res = await fetch(`${API_BASE_URL}/course-objectives/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update course objective");
  return res.json();
}

export async function deleteCourseObjective(id: string) {
  const res = await fetch(`${API_BASE_URL}/course-objectives/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete course objective");
  return res.json();
}
