import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-red-600 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Halaman tidak ditemukan
      </h2>

      <p className="text-gray-500 mb-8">
        Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan
      </p>

      <Link
        to="/dashboard"
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Kembali ke Dashboard
      </Link>
    </main>
  );
};

export default NotFoundPage;
