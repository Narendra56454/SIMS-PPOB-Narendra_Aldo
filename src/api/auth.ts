import { apiFetch } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// ENDPOINTS
export const login = (payload: LoginPayload) => {
  return apiFetch<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const register = (payload: RegisterPayload) => {
  return apiFetch<null>("/registration", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
