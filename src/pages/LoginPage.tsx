import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import ilustrasi from "../assets/ilustrasi-login.png";
import { Button } from "../components/Button";
import { login } from "../api/auth";

interface LoginPayload {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginPayload) => {
    try {
      setLoading(true);

      const result = await login(values);
      console.log(result);

      if (result.status !== 0) {
        throw new Error(result.message);
      }

      message.success(result.message);

      // const token = result.data.token;
      // localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error: any) {
      message.error(error.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* LEFT SECTION */}
      <section className="w-1/2 flex flex-col justify-center">
        <div className="mb-4 self-center">
          <Logo size={24} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Masuk atau buat akun <br /> untuk memulai
        </h1>

        <Form
          layout="vertical"
          size="large"
          className="w-[80%] self-center"
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

      {/* RIGHT SECTION */}
      <section className="w-1/2 bg-red-50 flex items-center justify-center">
        <img
          src={ilustrasi}
          alt="Ilustrasi Login"
          className="max-w-105"
        />
      </section>
    </main>
  );
};

export default LoginPage;
