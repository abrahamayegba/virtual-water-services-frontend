import { API_BASE_URL } from "./config";

// Question Options
export async function getQuestionOptions() {
  const res = await fetch(`${API_BASE_URL}/question-options`);
  if (!res.ok) throw new Error("Failed to fetch question options");
  return res.json();
}

export async function createQuestionOption(data: { option: string; isCorrect: boolean; questionId: string }) {
  const res = await fetch(`${API_BASE_URL}/question-options`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create question option");
  return res.json();
}

export async function updateQuestionOption(id: string, data: Partial<{ option: string; isCorrect: boolean; questionId: string }>) {
  const res = await fetch(`${API_BASE_URL}/question-options/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update question option");
  return res.json();
}

export async function deleteQuestionOption(id: string) {
  const res = await fetch(`${API_BASE_URL}/question-options/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete question option");
  return res.json();
}

