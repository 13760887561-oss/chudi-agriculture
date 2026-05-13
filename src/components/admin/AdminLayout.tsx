import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useContactMessages } from '../../hooks/useContactMessages'
import {
  LayoutDashboard,
  Building2,
  Package,
  Users,
  Newspaper,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: '控制台' },
  { path: '/admin/company', icon: Building2, label: '公司信息' },
  { path: '/admin/services', icon: Package, label: '核心业务' },
  { path: '/admin/products', icon: Package, label: '产品管理' },
  { path: '/admin/partners', icon: Users, label: '合作伙伴' },
  { path: '/admin/news', icon: Newspaper, label: '新闻动态' },
  { path: '/admin/messages', icon: MessageSquare, label: '留言管理' },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const { unreadCount } = useContactMessages()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // 移动端自动关闭菜单
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 移动端顶部导航 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <span className="font-bold text-green-800">锄地农业管理后台</span>
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <LogOut className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* 移动端侧边栏 */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-green-800">锄地农业管理</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.path === '/admin/messages' && unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-2">{user?.email}</div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 桌面端侧边栏 */}
      <div
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-green-800 whitespace-nowrap">锄地农业</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className={`w-5 h-5 text-gray-600 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.path === '/admin/messages' && unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="text-sm text-gray-500 mb-2">{user?.email}</div>
          ) : null}
          <button
            onClick={logout}
            className={`flex items-center gap-2 text-red-600 hover:text-red-700 ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && '退出登录'}
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div
        className={`transition-all duration-300 pt-16 lg:pt-0 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}