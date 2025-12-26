import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import ilustrasi from "../assets/ilustrasi-login.png";
import { Button } from "../components/Button";
import { register } from "../api/auth";

interface RegisterFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      setLoading(true);

      const result = await register({
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
      });

      if (result.status !== 0) {
        throw new Error(result.message);
      }

      message.success("Registrasi berhasil, silakan login");
      navigate("/login");
    } catch (error: any) {
      message.error(error.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SECTION */}
      <section className="w-full md:w-1/2 flex flex-col justify-center my-10 md:my-4">
        <div className="mb-6 self-center">
          <Logo size={24} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Lengkapi data untuk <br className="hidden sm:block" /> membuat akun
        </h1>

        <Form
          layout="vertical"
          size="large"
          className="w-full max-w-md self-center"
          onFinish={handleRegister}
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
            name="firstName"
            rules={[{ required: true, message: "Nama depan wajib diisi" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="nama depan" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Nama belakang wajib diisi" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="nama belakang" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password wajib diisi" },
              { min: 8, message: "Password minimal 8 karakter" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="buat password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Konfirmasi password wajib diisi" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Password tidak sama")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="konfirmasi password"
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
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </Form.Item>
        </Form>

        <p className="text-sm text-gray-500 text-center mt-4">
          sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-red-600 font-medium hover:underline"
          >
            login di sini
          </Link>
        </p>
      </section>

      {/* RIGHT SECTION (hidden on mobile) */}
      <section className="hidden md:flex w-1/2 bg-red-50 items-center justify-center">
        <img
          src={ilustrasi}
          alt="Ilustrasi Register"
          className="max-w-md w-full px-6"
        />
      </section>
    </main>
  );
};

export default RegisterPage;
