import { useAuth } from '../../contexts/AuthContext'
import { useContactMessages } from '../../hooks/useContactMessages'
import { useNews } from '../../hooks/useNews'
import {
  MessageSquare,
  Newspaper,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const { messages, unreadCount } = useContactMessages()
  const { news } = useNews()

  const recentMessages = messages.slice(0, 5)
  const recentNews = news.slice(0, 5)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">控制台</h1>
        <p className="text-gray-500 mt-1">欢迎回来，{user?.name}</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">未读留言</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">总留言数</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{messages.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">新闻数量</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{news.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已发布</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {news.filter(n => n.is_published).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最新留言 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">最新留言</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentMessages.length === 0 ? (
              <div className="p-6 text-center text-gray-500">暂无留言</div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{msg.name}</span>
                        {!msg.is_read && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                            新
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{msg.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(msg.created_at).toLocaleDateString('zh-CN')}
                        </span>
                        <span>{msg.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 最新新闻 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">最新新闻</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentNews.length === 0 ? (
              <div className="p-6 text-center text-gray-500">暂无新闻</div>
            ) : (
              recentNews.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        {item.is_published ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                            已发布
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            草稿
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.summary}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}