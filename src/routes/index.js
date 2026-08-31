import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "../components/pages/home"
import AllProducts from "../components/pages/products"
import LoginPage from "../components/pages/login"
import SignupPage from "../components/pages/signup"
import CartPage from "../components/pages/cart"
import ProductDetailsPage from "../components/pages/productdetails"
import AccountPage from "../components/pages/account"
import AdminLayout from "../components/pages/admin"
import ProfilePage from "../components/pages/admin/profile"
import SettingsPage from "../components/pages/admin/settings"
import OrdersPage from "../components/pages/admin/orders"
import UsersPage from "../components/pages/admin/users"
import AddNewProductPage from "../components/pages/addproduct"
import ProductsListPage from "../components/pages/admin/products"
import EditProductPage from "../components/pages/admin/products/edit"
import ProtectedRoute from "./ProtectedRoute"

function RoutePage() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/product/:productId" element={<ProductDetailsPage />} />

        <Route path="/account" element={<AccountPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="products" element={<ProductsListPage />} />
          <Route path="products/add" element={<AddNewProductPage />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
    </Routes>
  )
}

export default RoutePage
