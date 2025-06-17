// src/api/apiRequest.js

import API_BASE_URL from "../config/api";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("access_token"); // или sessionStorage
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
