import { useState } from 'react'
import { useContactMessages } from '../../hooks/useContactMessages'
import { toast } from 'sonner'
import { Check, Trash2, Mail, Phone, MessageSquare, Clock, Eye, RefreshCw } from 'lucide-react'

export default function MessagesPage() {
  const { messages, unreadCount, loading, markAsRead, deleteMessage, refresh } = useContactMessages()
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)

  const handleMarkAsRead = async (id: number) => {
    const success = await markAsRead(id)
    if (success) {
      toast.success('已标记为已读')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除此留言吗？')) {
      const success = await deleteMessage(id)
      if (success) {
        toast.success('删除成功')
        if (selectedMessage === id) {
          setSelectedMessage(null)
        }
      } else {
        toast.error('删除失败')
      }
    }
  }

  const handleMarkAllRead = async () => {
    const unreadMessages = messages.filter(m => !m.is_read)
    for (const msg of unreadMessages) {
      await markAsRead(msg.id)
    }
    toast.success('已全部标记为已读')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    )
  }

  const selectedMsg = messages.find(m => m.id === selectedMessage)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">留言管理</h1>
          <p className="text-gray-500 mt-1">
            共 {messages.length} 条留言，{unreadCount} 条未读
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            刷新
          </button>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 px-4 py-2 text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"
            >
              <Check className="w-4 h-4" />
              全部已读
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 留言列表 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">留言列表</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                暂无留言
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage === msg.id ? 'bg-green-50' : ''
                  } ${!msg.is_read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{msg.name}</span>
                        {!msg.is_read && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                            新
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{msg.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(msg.created_at).toLocaleString('zh-CN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 留言详情 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">留言详情</h2>
          </div>
          {selectedMsg ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{selectedMsg.name}</h3>
                <div className="flex items-center gap-2">
                  {!selectedMsg.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMsg.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 text-sm"
                    >
                      <Check className="w-4 h-4" />
                      标记已读
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    删除
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">联系电话</p>
                    <p className="font-medium text-gray-900">{selectedMsg.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">电子邮箱</p>
                    <p className="font-medium text-gray-900">{selectedMsg.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">留言时间</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedMsg.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">留言内容</p>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMsg.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <MessageSquare className="w-12 h-12 mb-4" />
              <p>请选择一条留言查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}