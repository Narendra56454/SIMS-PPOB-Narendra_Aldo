import { apiFetch } from "./client";

export interface TopUpRequest {
    top_up_amount: number;
}

export interface TopUpResponse {
    balance: number;
}

export const postTopUp = (token: string, amount: number) => {
    return apiFetch<TopUpResponse>("/topup", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            top_up_amount: amount,
        }),
    });
};
