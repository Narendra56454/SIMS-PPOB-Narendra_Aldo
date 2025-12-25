import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/Header"
import { WelcomeAndBalance } from "../components/WelcomeAndBalance"
import { Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import pbb from "../assets/pbb.png";
import { Button } from "../components/Button";
import { useState } from "react";
import { PopUp } from "../components/PopUp";

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

export const ServicePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [openPopUp, setOpenPopUp] = useState(false);

    const service = state as Service;

    // Safety check (refresh protection)
    if (!service) {
        navigate("/");
        return null;
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
                    <div className="flex items-center gap-2">
                        <img src={pbb} alt="Service Icon" className="w-8 h-8" />
                        <h1>{service.service_name}</h1>
                    </div>
                </div>

                <Input
                    prefix={<WalletOutlined />}
                    size="large"
                    placeholder="masukan nominal Top Up"
                    className="h-12"
                />

                <Button
                    className="w-full"
                    variant="primary"
                    size="sm"
                    type="submit"
                    onClick={() => setOpenPopUp(true)}
                >
                    Bayar
                </Button>
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