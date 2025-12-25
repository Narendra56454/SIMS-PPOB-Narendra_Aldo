import React, { useEffect } from "react";
import { Header } from "../components/Header";
import baner from "../assets/banner-1.png";
import { WelcomeAndBalance } from "../components/WelcomeAndBalance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchServices } from "../store/serviceSlice";

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
    const dispatch = useDispatch<AppDispatch>();

    const servicesState = useSelector(
        (state: RootState) => state.services
    );

    const {
        data: services = [],
        loading = false,
        error = null,
    } = servicesState || {};

    const authState = useSelector((state: RootState) => state.auth);

    const token = authState?.token ?? null;

    useEffect(() => {
        if (token) {
            dispatch(fetchServices(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (authState.token === null || error === "UNAUTHORIZED") {
            navigate("/login");
        }
    }, [error, navigate]);

    const handleServiceClick = (service: any) => {
        navigate("/service", { state: service });
    };

    return (
        <main>
            <Header />

            <section>
                <WelcomeAndBalance />
            </section>

            {/* SERVICE */}
            <section className="mt-8 flex items-center gap-4">
                {loading && <p>Loading services...</p>}

                {services.map((service) => (
                    <div
                        key={service.service_code}
                        className="w-24 h-24 flex flex-col items-center cursor-pointer"
                        onClick={() => handleServiceClick(service)}
                    >
                        <img
                            src={service.service_icon}
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
