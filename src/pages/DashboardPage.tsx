import React from "react";
import { Header } from "../components/Header";
import baner from "../assets/banner-1.png";
import pbb from "../assets/pbb.png";
import { WelcomeAndBalance } from "../components/WelcomeAndBalance";
import { useNavigate } from "react-router-dom";

const services = [
    {
        service_code: "PAJAK",
        service_name: "Pajak PBB",
        service_icon: "https://nutech-integrasi.app/dummy.jpg",
        service_tariff: 40000,
    },
    {
        service_code: "PLN",
        service_name: "Listrik",
        service_icon: "https://nutech-integrasi.app/dummy.jpg",
        service_tariff: 10000,
    },
];

const banners = [
    {
        banner_name: "Banner 1",
        banner_image: "https://nutech-integrasi.app/dummy.jpg",
        description: "Lerem Ipsum Dolor sit amet",
    },
    {
        banner_name: "Banner 2",
        banner_image: "https://nutech-integrasi.app/dummy.jpg",
        description: "Lerem Ipsum Dolor sit amet",
    },
];

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const handleServiceClick = (service: typeof services[number]) => {
        navigate("/service", {
            state: service,
        });
    };

    return (
        <main>
            <Header />

            <section>
                <WelcomeAndBalance />
            </section>

            {/* SERVICE ICONS */}
            <section className="mt-8 flex items-center gap-4">
                {services.map((service) => (
                    <div
                        key={service.service_code}
                        className="w-14 h-14 flex flex-col items-center cursor-pointer"
                        onClick={() => handleServiceClick(service)}
                    >
                        <img
                            src={pbb}
                            alt={service.service_name}
                            className="w-12 h-12 object-contain"
                        />
                        <p className="text-sm text-center">
                            {service.service_name}
                        </p>
                    </div>
                ))}
            </section>

            {/* BANNERS */}
            <section className="mt-20 mb-10">
                <h2 className="mb-4 font-semibold text-lg">Temukan promo menarik</h2>

                <div className="flex gap-6 overflow-x-auto">
                    {banners.map((banner) => (
                        <div
                            key={banner.banner_name}
                            className="min-w-[320px] h-30 rounded-xl overflow-hidden bg-white flex flex-col"
                        >
                            <div className="h-30 w-full bg-gray-100">
                                <img
                                    src={baner}
                                    alt={banner.banner_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default DashboardPage;
