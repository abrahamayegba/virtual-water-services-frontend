import { API_BASE_URL } from "./config";


// Quizzes
export async function getQuizzes() {
  const res = await fetch(`${API_BASE_URL}/quizzes`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

export async function getQuizzesByCourseId(courseId: string) {
  const res = await fetch(`${API_BASE_URL}/quizzes/course/${courseId}`);
  if (!res.ok) throw new Error("Failed to fetch quizzes by courseId");
  return res.json();
}


export async function createQuiz(data: { title: string; courseId: string; passingScore: number }) {
  const res = await fetch(`${API_BASE_URL}/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create quiz");
  return res.json();
}

export async function updateQuiz(id: string, data: Partial<{ title: string; courseId: string; passingScore: number }>) {
  const res = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update quiz");
  return res.json();
}

export async function deleteQuiz(id: string) {
  const res = await fetch(`${API_BASE_URL}/quizzes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete quiz");
  return res.json();
}


