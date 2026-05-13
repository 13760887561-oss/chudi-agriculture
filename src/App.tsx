import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Toaster } from 'sonner'
import { AdminLayout } from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/Login'
import HomePage from './pages/Home'
import Dashboard from './pages/admin/Dashboard'
import CompanyInfoPage from './pages/admin/CompanyInfo'
import ServicesPage from './pages/admin/Services'
import ProductsPage from './pages/admin/Products'
import PartnersPage from './pages/admin/Partners'
import NewsPage from './pages/admin/News'
import MessagesPage from './pages/admin/Messages'

// 受保护的路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <AdminLayout>{children}</AdminLayout>
}

function AppRoutes() {
  return (
    <Routes>
      {/* 前台网站路由 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />

      {/* 管理后台路由 */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/company" element={
        <ProtectedRoute>
          <CompanyInfoPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/services" element={
        <ProtectedRoute>
          <ServicesPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/products" element={
        <ProtectedRoute>
          <ProductsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/partners" element={
        <ProtectedRoute>
          <PartnersPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/news" element={
        <ProtectedRoute>
          <NewsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/messages" element={
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}