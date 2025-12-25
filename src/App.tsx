import { Route, Routes } from "react-router-dom"
import "./App.css"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import DashboardPage from "./pages/DashboardPage"
import AccountPage from "./pages/AccountPage"
import { TopUpPage } from "./pages/TopUpPage"
import { TransactionPage } from "./pages/TransactionPage"
import { ServicePage } from "./pages/ServicePage"

export const App = () => (
  <>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/topUp" element={<TopUpPage />} />
      <Route path="/transaction" element={<TransactionPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
)
