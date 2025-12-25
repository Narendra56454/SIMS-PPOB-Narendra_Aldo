import { EyeOutlined } from "@ant-design/icons";
import background from "../assets/background-saldo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBalance } from "../store/balanceSlice";
import { formatRupiah } from "./Utils";

export const BalanceCard = () => {
    const [isHidden, setIsHidden] = useState(true);
    const handleClick = () => {
        setIsHidden(!isHidden);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const token = useSelector((state: RootState) => state.auth.token);

    const {
        data: balance,
        loading: balanceLoading,
    } = useSelector((state: RootState) => state.balance);

    // Fetch data
    useEffect(() => {
        if (!token) return;

        dispatch(fetchBalance(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const balanceValue = balance?.balance ?? 0;

    return (
        <div className="relative w-full min-w-150 rounded-2xl p-6 text-white bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="relative z-10">
                <p className="text-sm opacity-90">Saldo anda</p>

                <h2 className="mt-2 text-2xl font-bold tracking-widest">
                    {balanceLoading
                        ? "Loading..."
                        : isHidden
                            ? "Rp ••••••"
                            : formatRupiah(balanceValue)}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm" >
                    Lihat Saldo <EyeOutlined onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};
