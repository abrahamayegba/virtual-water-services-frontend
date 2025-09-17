import { API_BASE_URL } from "./config";

// Companies
export async function getCompanies() {
  const res = await fetch(`${API_BASE_URL}/companies`);
  if (!res.ok) throw new Error("Failed to fetch companies");
  return res.json();
}

export async function createCompany(data: {
  companyName: string;
  companyEmail: string;
  industry: string;
}) {
  const res = await fetch(`${API_BASE_URL}/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create company");
  return res.json();
}

export async function updateCompany(
  id: string,
  data: Partial<{ companyName: string; companyEmail: string; industry: string }>
) {
  const res = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update company");
  return res.json();
}

export async function deleteCompany(id: string) {
  const res = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete company");
  return res.json();
}
