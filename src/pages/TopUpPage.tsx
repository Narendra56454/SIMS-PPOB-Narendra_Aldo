import { Header } from "../components/Header"
import { WelcomeAndBalance } from "../components/WelcomeAndBalance"
import { Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PopUp } from "../components/PopUp";
import { Button } from "../components/Button";

const PRESET_AMOUNTS = [
    "Rp10.000",
    "Rp20.000",
    "Rp50.000",
    "Rp100.000",
    "Rp250.000",
    "Rp500.000",
];

export const TopUpPage = () => {
    const [openPopUp, setOpenPopUp] = useState(false);

    return (
        <main>
            <Header />

            <section>
                <WelcomeAndBalance />
            </section>

            <section className="py-10">
                <p>Silahkan Masukkan</p>
                <h1>Nominal Top Up</h1>

                <div className="mt-6 flex gap-6">
                    <div className="w-[60%] space-y-4">
                        <Input
                            prefix={<WalletOutlined />}
                            size="large"
                            placeholder="masukan nominal Top Up"
                            className="h-12"
                        />

                        <Button variant="primary" className="w-full" onClick={() => setOpenPopUp(true)}>Top up</Button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-65">
                        {PRESET_AMOUNTS.map((amount) => (
                            <button
                                key={amount}
                                className="h-12 rounded-md border border-gray-300 text-sm font-medium hover:border-red-500 hover:text-red-500 transition"
                            >
                                {amount}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {openPopUp && (
                <PopUp
                    header="Beli Listrik Prabayar"
                    content="10.000"
                    onConfirm={() => {
                        console.log("Confirmed");
                        setOpenPopUp(false);
                    }}
                    onClose={() => setOpenPopUp(false)} />
            )}
        </main>
    )
}