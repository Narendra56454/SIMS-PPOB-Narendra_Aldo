import { apiFetch } from "./client";

export interface Banner {
    banner_name: string;
    banner_image: string;
    description: string;
}

export const getBanners = (token: string) => {
    return apiFetch<Banner[]>("/banner", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
