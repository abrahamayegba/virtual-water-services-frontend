import * as authApi from "../api/auth";
import { API_BASE_URL } from "../api/config"

let accessToken: string | null = localStorage.getItem("accessToken");

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  companyId: string;
  roleId: string;
}) {
  return authApi.register(data);
}

export async function loginUser(email: string, password: string) {
  const res = await authApi.login({ email, password });
  setAccessToken(res.accessToken); // persist token
  return res;
}

export async function refreshToken() {
  const res = await authApi.refresh();
  setAccessToken(res.accessToken); // persist token
  return res;
}

export async function logoutUser() {
  await authApi.logout();
  setAccessToken(null); // persist token
}

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  if (!accessToken) {
    await refreshToken();
  }

  const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to change password");
  }

  return res.json();
}


// Optional: helper to fetch with auto-refresh
export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  if (!accessToken) {
    await refreshToken(); // try get a new one if missing
  }

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If token expired, try refreshing once
  if (res.status === 401) {
    try {
      await refreshToken();
      return fetch(input, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      await logoutUser();
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}

export default {
  getAccessToken,
  setAccessToken,
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  logoutUser,
  fetchWithAuth,
};
