import { apiFetch } from "./client";

export interface Profile {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export interface UpdateProfilePayload {
    first_name: string;
    last_name: string;
}

export const getProfile = (token: string) => {
    return apiFetch<Profile>("/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProfile = (token: string, payload: UpdateProfilePayload) => {
    return apiFetch<Profile>("/profile/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
};

export const updateProfileAvatar = (token: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<Profile>("/profile/image", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
};
