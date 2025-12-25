const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const formatNumber = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

const parseNumber = (value: string) =>
    Number(value.replace(/[^0-9]/g, ""));

const isTokenExpired = () => {
    const expiry = localStorage.getItem("token_expiry");
    return !expiry || Date.now() > Number(expiry);
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} ${hours}.${minutes} WIB`;
};

const getDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

const getTimeOnly = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}.${minutes}`;
};

export { formatRupiah, formatNumber, parseNumber, isTokenExpired, formatDate, getDateOnly, getTimeOnly };