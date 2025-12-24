import logo from "../assets/logo.png";

export const Logo = ({ size = 32 }) => {
    return (
        <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" style={{ width: size, height: size }} />
            <p className="font-semibold">SIMS PPOB</p>
        </div>
    );
};
