import { API_BASE_URL } from "./config";

// User Courses
export async function getUserCourses() {
  const res = await fetch(`${API_BASE_URL}/user-courses`);
  if (!res.ok) throw new Error("Failed to fetch user courses");
  return res.json();
}

export async function getUserCoursesByUserId(userId: string) {
  const res = await fetch(`${API_BASE_URL}/user-courses/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user courses");
  return res.json();
}

export async function getUserCourseByCourseId(
  userId: string,
  courseId: string
) {
  const res = await fetch(
    `${API_BASE_URL}/user-courses/user/${userId}/course/${courseId}`
  );
  if (!res.ok) throw new Error("Failed to fetch user course");
  return res.json();
}

export async function getLessonsWithProgressByUserCourseId(
  userCourseId: string
) {
  const res = await fetch(
    `${API_BASE_URL}/user-courses/${userCourseId}/lessons-with-progress`
  );
  if (!res.ok) throw new Error("Failed to fetch lessons with progress");
  return res.json();
}

export async function createUserCourse(data: {
  userId: string;
  courseId: string;
  score?: number;
  completed?: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/user-courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user course");
  return res.json();
}

export async function updateUserCourse(
  id: string,
  data: Partial<{
    userId: string;
    courseId: string;
    score?: number;
    completed?: boolean;
  }>
) {
  const res = await fetch(`${API_BASE_URL}/user-courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user course");
  return res.json();
}

export async function updateUserCourseByUserId(
  userId: string,
  userCourseId: string,
  data: Partial<{
    courseId: string;
    newCourseId: string;
    score?: number;
    completed?: boolean;
  }>
) {
  const res = await fetch(
    `${API_BASE_URL}/user-courses/user/${userId}/${userCourseId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to update user courses");
  return res.json();
}


export async function deleteUserCourse(id: string) {
  const res = await fetch(`${API_BASE_URL}/user-courses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user course");
  return res.json();
}
