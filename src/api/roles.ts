import { API_BASE_URL } from "./config";

// Roles
export async function getRoles() {
  const res = await fetch(`${API_BASE_URL}/roles`);
  if (!res.ok) throw new Error("Failed to fetch roles");
  return res.json();
}

export async function createRole(data: { roleName: string; roleDescription?: string }) {
  const res = await fetch(`${API_BASE_URL}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create role");
  return res.json();
}

export async function updateRole(id: string, data: Partial<{ roleName: string; roleDescription?: string }>) {
  const res = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update role");
  return res.json();
}

export async function deleteRole(id: string) {
  const res = await fetch(`${API_BASE_URL}/roles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete role");
  return res.json();
}
