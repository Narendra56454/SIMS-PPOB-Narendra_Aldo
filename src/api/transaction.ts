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
    description: string;
}

export interface TransactionHistoriesApiResponse {
    offset: number;
    limit: number;
    records: TransactionResponse[];
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

export const getTransactionHistories = (token: string, offset = 0, limit = 5) => {
    return apiFetch<TransactionHistoriesApiResponse>(`/transaction/history?offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
