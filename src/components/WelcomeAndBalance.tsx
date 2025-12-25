import { Avatar } from "./Avatar";
import { BalanceCard } from "./BalanceCard";

export const WelcomeAndBalance = () => {
    return (
        <div className="mt-4 flex justify-between items-center">
            <div>
                <Avatar size={12} />
                <p>Selamat Datang,</p>
                <p className="font-bold text-3xl">Kristanto Wibowo</p>
            </div>
            <div>
                <BalanceCard />
            </div>
        </div>
    );
}