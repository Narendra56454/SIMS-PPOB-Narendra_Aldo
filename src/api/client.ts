const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const result = await response.json();
  return result;
}
