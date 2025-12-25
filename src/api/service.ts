import { apiFetch } from "./client";

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export const getServices = (token: string) => {
  return apiFetch<Service[]>("/services", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
