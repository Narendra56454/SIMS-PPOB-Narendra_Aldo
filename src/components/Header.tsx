import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

export const Header = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    const isDashboard = pathname === "/" || pathname === "/dashboard";

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block py-2 transition ${!isDashboard && isActive
            ? "text-red-600"
            : "text-gray-800 hover:text-red-600"
        }`;

    return (
        <header className="border-b border-gray-200 px-4 md:px-20 py-4">
            <div className="flex items-center justify-between">
                <Link to="/dashboard">
                    <Logo />
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    <MenuOutlined className="text-xl" />
                </button>

                {/* Desktop menu */}
                <nav className="hidden md:block">
                    <ul className="flex gap-10 text-sm font-medium">
                        <li><NavLink to="/topup" className={linkClass}>Top Up</NavLink></li>
                        <li><NavLink to="/transaction" className={linkClass}>Transaction</NavLink></li>
                        <li><NavLink to="/account" className={linkClass}>Akun</NavLink></li>
                    </ul>
                </nav>
            </div>

            {/* Mobile menu */}
            {open && (
                <nav className="md:hidden mt-4">
                    <ul className="flex flex-col gap-3 text-sm font-medium">
                        <li><NavLink to="/topup" className={linkClass}>Top Up</NavLink></li>
                        <li><NavLink to="/transaction" className={linkClass}>Transaction</NavLink></li>
                        <li><NavLink to="/account" className={linkClass}>Akun</NavLink></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};
