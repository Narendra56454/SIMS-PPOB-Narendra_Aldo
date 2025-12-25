import { apiFetch } from "./client";

export interface Balance {
    balance: number
}

export const getBalance = (token: string) => {
    return apiFetch<Balance>("/balance", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
