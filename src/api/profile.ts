import { apiFetch } from "./client";

export interface Profile {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export const getProfile = (token: string) => {
    return apiFetch<Profile>("/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
