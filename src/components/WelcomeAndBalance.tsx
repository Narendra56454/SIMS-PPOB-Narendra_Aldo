import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "./Avatar";
import { BalanceCard } from "./BalanceCard";
import { AppDispatch, RootState } from "../store";
import { fetchProfile } from "../store/profileSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WelcomeAndBalance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const token = useSelector((state: RootState) => state.auth.token);

    const {
        data: profile,
        loading: profileLoading,
    } = useSelector((state: RootState) => state.profile);

    // Fetch data
    useEffect(() => {
        if (!token) return;

        dispatch(fetchProfile(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <div className="mt-4 flex justify-between items-center">
            {profileLoading && <p>Loading profile...</p>}

            <div>
                <Avatar size={12} />
                <p className="mt-2">Selamat Datang,</p>
                <p className="font-semibold text-3xl">{profile?.first_name} {profile?.last_name}</p>
            </div>
            <div>
                <BalanceCard />
            </div>
        </div>
    );
}