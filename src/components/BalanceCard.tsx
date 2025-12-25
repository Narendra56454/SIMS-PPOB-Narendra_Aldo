import { EyeOutlined } from "@ant-design/icons";
import background from "../assets/background-saldo.png";
import { useState } from "react";

export const BalanceCard = () => {
    const [isHidden, setIsHidden] = useState(true);
    const handleClick = () => {
        setIsHidden(!isHidden);
    }

    return (
        <div className="relative w-full min-w-150 rounded-2xl p-6 text-white bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="relative z-10">
                <p className="text-sm opacity-90">Saldo anda</p>

                <h2 className="mt-2 text-2xl font-bold tracking-widest">
                    {isHidden ? "Rp ••••••" : "Rp 1.234.567"}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm" >
                    Lihat Saldo <EyeOutlined onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};
