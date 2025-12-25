import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/Header"
import { WelcomeAndBalance } from "../components/WelcomeAndBalance"
import { Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { Button } from "../components/Button";
import { useState } from "react";
import { ConfirmPopUp, PopUp } from "../components/PopUp";
import { formatNumber } from "../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { resetTransaction, transaction } from "../store/transactionSlice";

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

export const ServicePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const service = state as Service;
    if (!service) {
        navigate("/");
        return null;
    }

    const [amount] = useState<number>(service.service_tariff ?? 0);
    const [openPopUp, setOpenPopUp] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);

    const { data, error } = useSelector((state: RootState) => state.transaction);
    const { data: balanceData } = useSelector((state: RootState) => state.balance);
    
    const balance = balanceData?.balance ?? 0;
    const invalidAmount = typeof amount === "number" && amount > balance;

    const handleConfirm = () => {
        if (!token || !amount) return;

        dispatch(transaction({ token, code: service.service_code }));
        setOpenPopUp(false);
    }

    const handleClose = () => {
        dispatch(resetTransaction()); // clear data & error
        navigate("/");
    }

    return (
        <main>
            <Header />

            <section>
                <WelcomeAndBalance />
            </section>

            <section className="py-10 space-y-4">
                <div>
                    <p>Pembayaran</p>
                    <div className="mt-2 flex items-center gap-2">
                        <img src={service.service_icon} alt="Service Icon" className="w-8 h-8" />
                        <h1>{service.service_name}</h1>
                    </div>
                </div>

                <Input
                    prefix={<WalletOutlined className="mr-2" />}
                    size="large"
                    placeholder="masukan nominal"
                    className="h-12"
                    value={amount ? formatNumber(amount) : ""}
                    // onChange={(e) => {
                    //     const numericValue = parseNumber(e.target.value);
                    //     setAmount(numericValue);
                    // }}
                    disabled
                />

                <Button
                    className="w-full"
                    variant="primary"
                    size="sm"
                    type="submit"
                    onClick={() => setOpenPopUp(true)}
                    disabled={invalidAmount}
                >
                    Bayar
                </Button>
            </section>

            {openPopUp && (
                <ConfirmPopUp
                    header={`Bayar ${service.service_name} senilai`}
                    content={`${formatNumber(amount)} ?`}
                    onConfirm={handleConfirm}
                    onClose={() => setOpenPopUp(false)} />
            )}

            {/* RESULT POPUP */}
            {(data || error) && (
                <PopUp
                    header={`Pembayaran ${service.service_name} sebesar`}
                    content={`${formatNumber(amount ?? 0)}`}
                    result={Boolean(data)}
                    onClose={handleClose}
                />
            )}
        </main>
    )
}