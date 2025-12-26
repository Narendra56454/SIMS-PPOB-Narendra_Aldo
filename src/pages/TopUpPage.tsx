import { Header } from "../components/Header"
import { WelcomeAndBalance } from "../components/WelcomeAndBalance"
import { Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ConfirmPopUp, PopUp } from "../components/PopUp";
import { Button } from "../components/Button";
import { formatNumber, parseNumber } from "../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { resetTopUp, topUp } from "../store/topUpSlice";
import { useNavigate } from "react-router-dom";

const PRESET_AMOUNTS = [
    "Rp10.000",
    "Rp20.000",
    "Rp50.000",
    "Rp100.000",
    "Rp250.000",
    "Rp500.000",
];

export const TopUpPage = () => {
    const navigate = useNavigate();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [amount, setAmount] = useState<number>();
    const [activePreset, setActivePreset] = useState<number | null>(null);

    const isValidAmount = typeof amount === "number" && amount >= 10000 && amount <= 1000000;

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);

    const { data, error } = useSelector((state: RootState) => state.topUp);
    const handleConfirm = () => {
        if (!token || !amount) return;

        dispatch(topUp({ token, amount }));
        setOpenPopUp(false);
    }

    const handleClose = () => {
        dispatch(resetTopUp()); // clear data & error
        navigate("/");
    }

    return (
        <main className="min-h-screen">
            <Header />

            <section className="px-4 md:px-20">
                <WelcomeAndBalance />

                <section className="py-10">
                    <p className="text-sm text-gray-600">Silahkan Masukkan</p>
                    <h1 className="text-xl md:text-2xl font-semibold">
                        Nominal Top Up
                    </h1>

                    <div className="mt-6 flex flex-col md:flex-row gap-6">
                        {/* INPUT + BUTTON */}
                        <div className="w-full md:w-[60%] space-y-4">
                            <Input
                                prefix={<WalletOutlined className="mr-2" />}
                                size="large"
                                placeholder="masukan nominal Top Up"
                                className="h-12"
                                value={amount ? formatNumber(amount) : ""}
                                onChange={(e) => {
                                    const numericValue = parseNumber(e.target.value);
                                    setAmount(numericValue);
                                    setActivePreset(null);
                                }}
                            />

                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => {
                                    if (!isValidAmount) return;
                                    setOpenPopUp(true);
                                }}
                                disabled={!isValidAmount}
                            >
                                Top up
                            </Button>
                        </div>

                        {/* PRESET BUTTONS */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-[40%]">
                            {PRESET_AMOUNTS.map((preset) => {
                                const numericValue = parseNumber(preset);
                                const isActive = activePreset === numericValue;

                                return (
                                    <Button
                                        key={preset}
                                        variant={isActive ? "primary" : "grayTransparent"}
                                        className={`h-12 rounded-md border text-sm font-medium transition
                    ${isActive
                                                ? "border-red-600"
                                                : "border-gray-300 hover:border-red-500 hover:text-red-500"
                                            }`}
                                        onClick={() => {
                                            setAmount(numericValue);
                                            setActivePreset(numericValue);
                                        }}
                                    >
                                        {preset}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </section>

            {/* CONFIRM POPUP */}
            {openPopUp && (
                <ConfirmPopUp
                    header="Top Up sebesar"
                    content={`${formatNumber(amount ?? 0)}`}
                    onConfirm={handleConfirm}
                    onClose={() => setOpenPopUp(false)}
                />
            )}

            {/* RESULT POPUP */}
            {(data || error) && (
                <PopUp
                    header="Top Up sebesar"
                    content={`${formatNumber(amount ?? 0)}`}
                    result={Boolean(data)}
                    onClose={handleClose}
                />
            )}
        </main>
    );
}