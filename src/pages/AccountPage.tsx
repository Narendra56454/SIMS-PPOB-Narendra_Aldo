import React, { useState, useRef } from "react";
import { Header } from "../components/Header";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import avatarPlaceholder from "../assets/profile-photo.png";
import { Button } from "../components/Button";
import { Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";

interface ProfileForm {
  email: string;
  firstName: string;
  lastName: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<ProfileForm>();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>(avatarPlaceholder);

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialProfile: ProfileForm = {
    email: "wallet@nutech.com",
    firstName: "Kristanto",
    lastName: "Wibowo",
  };

  const handleEditAvatar = () => {
    fileInputRef.current?.click(); // Open file picker
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string); // Update avatar preview
      };
      reader.readAsDataURL(file);
      // TODO: upload file to server if needed
    }
  };

  const handleBatal = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    console.log("Saving profile:", values);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <main>
      <Header />

      <section className="w-[50%] mx-auto my-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar image={avatar} />

            <button
              className="absolute bottom-0 right-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
              title="Edit Avatar"
              onClick={handleEditAvatar}
            >
              <EditOutlined />
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            {form.getFieldValue("firstName")} {form.getFieldValue("lastName")}
          </h1>
        </div>

        {/* Profile Form */}
        <Form
          form={form}
          layout="vertical"
          size="large"
          initialValues={initialProfile}
          className="w-full"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email wajib diisi" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input
              prefix="@"
              disabled={!isEditing}
              placeholder="masukkan email"
            />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="Nama Depan"
            rules={[{ required: true, message: "Nama depan wajib diisi" }]}
          >
            <Input
              prefix={<UserOutlined />}
              disabled={!isEditing}
              placeholder="nama depan"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Nama Belakang"
            rules={[{ required: true, message: "Nama belakang wajib diisi" }]}
          >
            <Input
              prefix={<UserOutlined />}
              disabled={!isEditing}
              placeholder="nama belakang"
            />
          </Form.Item>

          {/* Buttons */}
          {isEditing ? (
            <>
              <Form.Item>
                <Button
                  className="w-full mt-4"
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={handleSave}
                >
                  Simpan
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full"
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={handleBatal}
                >
                  Batalkan
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item>
                <Button
                  className="w-full mt-4"
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full"
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </section>
    </main>
  );
};

export default DashboardPage;
