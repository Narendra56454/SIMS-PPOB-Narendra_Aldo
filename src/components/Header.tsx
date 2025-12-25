import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export const Header = () => {
    const { pathname } = useLocation();

    const isDashboard = pathname === "/" || pathname === "/dashboard";

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `cursor-pointer transition ${!isDashboard && isActive ? "text-red-600" : "text-gray-800 hover:text-red-600"
        }`;

    return (
        <header className="flex items-center justify-between px-20 py-4 border-b border-gray-200">
            <Link to="/dashboard">
                <Logo />
            </Link>

            <nav>
                <ul className="flex items-center gap-10 text-sm font-medium">
                    <li>
                        <NavLink to="/topup" className={linkClass}>
                            Top Up
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/transaction" className={linkClass}>
                            Transaction
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/account" className={linkClass}>
                            Akun
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
