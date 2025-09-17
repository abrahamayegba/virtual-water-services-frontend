import { API_BASE_URL } from "./config";

// Admins
export async function getAdmins() {
  const res = await fetch(`${API_BASE_URL}/admins`);
  if (!res.ok) throw new Error("Failed to fetch admins");
  return res.json();
}

export async function createAdmin(data: { name: string; email: string; roleId: string }) {
  const res = await fetch(`${API_BASE_URL}/admins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create admin");
  return res.json();
}

export async function updateAdmin(id: string, data: Partial<{ name: string; email: string; roleId: string }>) {
  const res = await fetch(`${API_BASE_URL}/admins/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update admin");
  return res.json();
}

export async function deleteAdmin(id: string) {
  const res = await fetch(`${API_BASE_URL}/admins/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete admin");
  return res.json();
}