import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import ilustrasi from "../assets/ilustrasi-login.png";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginUser } from "../store/authSlice";

interface LoginPayload {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = (values: LoginPayload) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (token) {
      message.success("Login berhasil");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SECTION */}
      <section className="w-full md:w-1/2 mt-10 flex flex-col justify-center px-6">
        <div className="mb-6 self-center">
          <Logo size={24} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Masuk atau buat akun <br className="hidden sm:block" /> untuk memulai
        </h1>

        <Form
          layout="vertical"
          size="large"
          className="w-full max-w-md self-center"
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email wajib diisi" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input prefix="@" placeholder="masukan email anda" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password wajib diisi" },
              { min: 8, message: "Password minimal 8 karakter" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="masukan password anda"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full"
              variant="primary"
              size="sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </Form.Item>
        </Form>

        <p className="text-sm text-gray-500 text-center mt-4">
          belum punya akun?{" "}
          <Link
            to="/register"
            className="text-red-600 font-medium hover:underline"
          >
            registrasi di sini
          </Link>
        </p>
      </section>

      {/* RIGHT SECTION (hidden on mobile) */}
      <section className="hidden md:flex w-1/2 bg-red-50 items-center justify-center">
        <img
          src={ilustrasi}
          alt="Ilustrasi Login"
          className="max-w-md w-full px-6"
        />
      </section>
    </main>
  );
};

export default LoginPage;
