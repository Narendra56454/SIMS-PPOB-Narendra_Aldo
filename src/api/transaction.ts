import { apiFetch } from "./client";

export interface TransactionRequest {
    service_code: string;
}

export interface TransactionResponse {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
}

export const postTransaction = (token: string, code: string) => {
    return apiFetch<TransactionResponse>("/transaction", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_code: code,
        }),
    });
};
