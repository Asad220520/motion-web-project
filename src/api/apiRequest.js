import API_BASE_URL from "../config/api";

export async function apiRequest(endpoint, options = {}) {
  // Извлекаем токен из redux-persist
  const persistRoot = localStorage.getItem("persist:root");
  let token = null;

  if (persistRoot) {
    try {
      const authData = JSON.parse(JSON.parse(persistRoot).auth);
      token = authData.tokens?.access || null;
    } catch (e) {
      console.error("Failed to parse persisted token:", e);
    }
  }

  const headers = {
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API error");
  }

  return await response.json();
}
