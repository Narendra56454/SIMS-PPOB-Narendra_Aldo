import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { WelcomeAndBalance } from "../components/WelcomeAndBalance";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getHistories } from "../store/transactionHistoriesSlice";
import { TransactionResponse } from "../api/transaction";
import { getDateOnly, getTimeOnly } from "../components/Utils";
import { Button } from "../components/Button";

interface AmountProps {
    type: string;
    value: number;
}

const Amount = ({ type, value }: AmountProps) => {
    const isPositive = type === "TOPUP";
    return (
        <p className={isPositive ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {isPositive ? "+" : "-"} Rp.{value.toLocaleString("id-ID")}
        </p>
    );
};

export const TransactionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const token = useSelector((state: RootState) => state.auth.token);
    const { data, loading, offset, hasMore } = useSelector((state: RootState) => state.transactionHistory);

    useEffect(() => {
        if (!token) return;

        dispatch(getHistories({ token, offset: 0, limit: 5 }));
    }, [dispatch, token]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const loadMore = () => {
        if (!token || loading || !hasMore) return;
        dispatch(getHistories({ token, offset, limit: 5 }));
    };

    return (
        <main>
            <Header />
            <section>
                <WelcomeAndBalance />
            </section>

            <section className="my-10">
                <h1>Semua transaksi</h1>

                <div className="flex flex-col gap-4 mt-4">
                    {data?.map((item: TransactionResponse, index) => (
                        <div
                            key={`${item.invoice_number}-${index}`}
                            className="flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg"
                        >
                            <div className="space-y-1">
                                <Amount type={item.transaction_type} value={item.total_amount} />
                                <p className="text-xs text-gray-500">
                                    {getDateOnly(item.created_on)} &nbsp; {getTimeOnly(item.created_on)} WIB
                                </p>
                            </div>
                            <div>
                                <p className="text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-4 text-center">
                        <Button variant="transparent" onClick={loadMore} disabled={loading}>
                            {loading ? "Loading..." : "Show more"}
                        </Button>
                    </div>
                )}
            </section>
        </main>
    );
};
