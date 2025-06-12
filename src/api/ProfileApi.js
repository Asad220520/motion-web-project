import { apiRequest } from "./apiRequest";
import { jwtDecode } from "jwt-decode";

export async function getUserProfile(accessToken) {
  const decoded = jwtDecode(accessToken);
  const userId = decoded.user_id || decoded.id; // зависит от бэкенда

  return await apiRequest(`/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}