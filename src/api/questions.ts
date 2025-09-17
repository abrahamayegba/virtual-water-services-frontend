
import { API_BASE_URL } from "./config";

// Questions
export async function getQuestions() {
  const res = await fetch(`${API_BASE_URL}/questions`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export async function createQuestion(data: { question: string; quizId: string }) {
  const res = await fetch(`${API_BASE_URL}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create question");
  return res.json();
}

export async function updateQuestion(id: string, data: Partial<{ question: string; quizId: string }>) {
  const res = await fetch(`${API_BASE_URL}/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update question");
  return res.json();
}

export async function deleteQuestion(id: string) {
  const res = await fetch(`${API_BASE_URL}/questions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete question");
  return res.json();
}
