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

export { formatRupiah, formatNumber, parseNumber, isTokenExpired };