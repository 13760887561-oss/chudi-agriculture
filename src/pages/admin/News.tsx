import { useState } from 'react'
import { useNews } from '../../hooks/useNews'
import { toast } from 'sonner'
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon, X, RefreshCw, Calendar, User } from 'lucide-react'
import { News } from '../../lib/supabase'

export default function NewsPage() {
  const { news, loading, addNews, updateNews, deleteNews, togglePublish, refresh } = useNews()
  const [showModal, setShowModal] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    image_url: '',
    author: '管理员',
    is_published: false
  })

  const handleOpenModal = (newsItem?: News) => {
    if (newsItem) {
      setEditingNews(newsItem)
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        summary: newsItem.summary,
        image_url: newsItem.image_url,
        author: newsItem.author,
        is_published: newsItem.is_published
      })
    } else {
      setEditingNews(null)
      setFormData({
        title: '',
        content: '',
        summary: '',
        image_url: '',
        author: '管理员',
        is_published: false
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingNews(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.summary) {
      toast.error('请填写标题和摘要')
      return
    }

    let success
    if (editingNews) {
      success = await updateNews(editingNews.id, formData)
    } else {
      success = await addNews(formData)
    }

    if (success) {
      toast.success(editingNews ? '更新成功' : '添加成功')
      handleCloseModal()
    } else {
      toast.error('操作失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除此新闻吗？')) {
      const success = await deleteNews(id)
      if (success) {
        toast.success('删除成功')
      } else {
        toast.error('删除失败')
      }
    }
  }

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    const success = await togglePublish(id, !currentStatus)
    if (success) {
      toast.success(currentStatus ? '已取消发布' : '已发布')
    } else {
      toast.error('操作失败')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新闻动态</h1>
          <p className="text-gray-500 mt-1">管理公司新闻资讯</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            刷新
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            添加新闻
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">标题</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">摘要</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">作者</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">发布时间</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    {item.image_url && (
                      <div className="mt-1">
                        <ImageIcon className="w-4 h-4 text-green-600 inline mr-1" />
                        <span className="text-xs text-gray-400">有图片</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600 line-clamp-2">{item.summary}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="w-3 h-3" />
                      {item.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublish(item.id, item.is_published)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.is_published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {item.is_published ? '已发布' : '草稿'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                        title="编辑"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {news.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            暂无新闻数据，点击"添加新闻"开始
          </div>
        )}
      </div>

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingNews ? '编辑新闻' : '添加新闻'}
              </h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">作者</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">发布状态</label>
                  <select
                    value={formData.is_published ? '1' : '0'}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.value === '1' }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="1">发布</option>
                    <option value="0">草稿</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}