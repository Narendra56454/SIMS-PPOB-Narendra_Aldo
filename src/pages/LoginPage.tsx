import React from "react";
import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Logo } from "../components/Logo";
import ilustrasi from "../assets/ilustrasi-login.png";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <main className="min-h-screen flex">
      {/* LEFT SECTION */}
      <section className="w-1/2 flex flex-col justify-center px-20">
        <div className="mb-4 self-center">
          <Logo size={24} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Masuk atau buat akun <br /> untuk memulai
        </h1>

        <Form layout="vertical" size="large" className="w-[80%] self-center">
          <Form.Item name="email">
            <Input
              prefix="@"
              placeholder="masukan email anda"
            />
          </Form.Item>

          <Form.Item name="password">
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="masukan password anda"
            />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" variant="primary" size="sm">Masuk</Button>
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
