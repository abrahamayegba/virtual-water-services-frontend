import { API_BASE_URL } from "./config";

export async function register(data: {
  name: string;
  email: string;
  password: string;
  companyId: string;
  roleId: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // important so cookies (refreshToken) are sent back
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // refreshToken cookie
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function refresh() {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // cookie is automatically sent
  });
  if (!res.ok) throw new Error("Failed to refresh token");
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to logout");
  return res.json();
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/password-reset/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Failed to request password reset");
  return res.json();
}

export async function confirmPasswordReset(
  userId: string,
  token: string,
  newPassword: string
) {
  const res = await fetch(`${API_BASE_URL}/auth/password-reset/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, token, newPassword }),
  });
  if (!res.ok) throw new Error("Failed to confirm password reset");
  return res.json();
}
