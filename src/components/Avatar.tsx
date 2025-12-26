import avatarPlaceholder from "../assets/profile-photo.png";

export const Avatar = ({ image = avatarPlaceholder, size = 24, className = "" }) => {
    return (
        <img
            src={image ?? avatarPlaceholder}
            alt="Avatar"
            className={`w-${size} h-${size} rounded-full ${className}`}
        />
    );
};
