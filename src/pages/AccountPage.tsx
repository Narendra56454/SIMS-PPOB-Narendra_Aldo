import React, { useState, useRef, useEffect } from "react";
import { Header } from "../components/Header";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import avatarPlaceholder from "../assets/profile-photo.png";
import { Button } from "../components/Button";
import { Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { fetchProfile, putProfile } from "../store/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { putAvatar } from "../store/profileSlice";
import { logout } from "../store/authSlice";

interface ProfileForm {
  email: string;
  firstName: string;
  lastName: string;
}

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<ProfileForm>();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>(avatarPlaceholder);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);

  const {
    data: profile,
    loading: profileLoading,
  } = useSelector((state: RootState) => state.profile);

  // Fetch data
  useEffect(() => {
    if (!token) return;

    dispatch(fetchProfile(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
      });
      setAvatar(profile.profile_image || avatarPlaceholder);
    }
  }, [profile, form]);

  const handleEditAvatar = () => {
    fileInputRef.current?.click(); // Open file picker
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      message.error("Hanya file JPG atau PNG yang diperbolehkan.");
      return;
    }

    // Validate file size (max 100 KB)
    const maxSizeKB = 100;
    if (file.size / 1024 > maxSizeKB) {
      message.error(`Ukuran file maksimal ${maxSizeKB} KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (token) {
      dispatch(putAvatar({ token, file }));
    }
  };

  const handleBatal = () => {
    if (profile) {
      form.setFieldsValue({
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
      });
      setAvatar(profile.profile_image || avatarPlaceholder);
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!token) return;

    dispatch(putProfile({
      token,
      payload: {
        first_name: form.getFieldValue("firstName"),
        last_name: form.getFieldValue("lastName"),
      },
    }));

    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-4 md:px-20">
        <section className="max-w-md md:max-w-lg mx-auto my-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
                <Avatar image={avatar} size={10} className="w-full h-full object-cover" />
              </div>

              <button
                className="absolute w-8 h-8 bottom-0 right-0 bg-white border rounded-full
                         flex items-center justify-center cursor-pointer"
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
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <h1 className="mt-4 text-lg md:text-xl font-semibold text-gray-900 text-center">
              {form.getFieldValue("firstName")}{" "}
              {form.getFieldValue("lastName")}
            </h1>
          </div>

          {/* Profile Form */}
          <Form
            form={form}
            layout="vertical"
            size="large"
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
              <Input prefix="@" disabled placeholder="masukkan email" />
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
            <div className="space-y-3 mt-6">
              {isEditing ? (
                <>
                  <Button
                    className="w-full"
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleSave}
                  >
                    Simpan
                  </Button>

                  <Button
                    className="w-full"
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleBatal}
                  >
                    Batalkan
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full"
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setIsEditing(true)}
                    disabled={profileLoading}
                  >
                    Edit
                  </Button>

                  <Button
                    className="w-full"
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Form>
        </section>
      </section>
    </main>
  );
};

export default AccountPage;
