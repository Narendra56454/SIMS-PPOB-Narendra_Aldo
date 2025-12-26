import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { WelcomeAndBalance } from "../components/WelcomeAndBalance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchServices } from "../store/serviceSlice";
import { fetchBanners } from "../store/bannerSlice";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const token = useSelector((state: RootState) => state.auth.token);

    const {
        data: services,
        loading: servicesLoading,
    } = useSelector((state: RootState) => state.services);

    const {
        data: banners,
        loading: bannersLoading,
    } = useSelector((state: RootState) => state.banners);

    // Fetch data
    useEffect(() => {
        if (!token) return;

        dispatch(fetchServices(token));
        dispatch(fetchBanners(token));
    }, [dispatch, token]);

    // Handle unauthorized
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleServiceClick = (service: any) => {
        navigate("/service", { state: service });
    };

    return (
        <main className="min-h-screen">
            <Header />

            <section className="px-4 md:px-20">
                <WelcomeAndBalance />

                {/* SERVICES */}
                <section className="mt-10 flex gap-4 overflow-x-auto">
                    {servicesLoading && <p>Loading services...</p>}

                    {!servicesLoading &&
                        services?.map((service) => (
                            <div
                                key={service.service_code}
                                className="min-w-15 flex flex-col items-center cursor-pointer"
                                onClick={() => handleServiceClick(service)}
                            >
                                <img
                                    src={service.service_icon}
                                    alt={service.service_name}
                                    className="w-12 h-12 object-contain"
                                />
                                <p className="text-xs text-center mt-1">
                                    {service.service_name}
                                </p>
                            </div>
                        ))}
                </section>

                {/* BANNERS */}
                <section className="mt-10 mb-10">
                    <h2 className="mb-4 font-semibold text-lg">
                        Temukan promo menarik
                    </h2>

                    {bannersLoading && <p>Loading banners...</p>}

                    <div className="flex gap-4 overflow-x-auto">
                        {!bannersLoading &&
                            banners?.map((banner) => (
                                <div
                                    key={banner.banner_name}
                                    className="min-w-70 md:min-w-[320px] h-36 rounded-xl overflow-hidden"
                                >
                                    <img
                                        src={banner.banner_image}
                                        alt={banner.banner_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                    </div>
                </section>
            </section>
        </main>
    );
};

export default DashboardPage;
