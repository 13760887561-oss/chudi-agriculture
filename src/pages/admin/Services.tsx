import { useState } from 'react'
import { useServices } from '../../hooks/useServices'
import { toast } from 'sonner'
import { Plus, Edit2, Trash2, GripVertical, X, RefreshCw } from 'lucide-react'
import { Service } from '../../lib/supabase'

export default function ServicesPage() {
  const { services, loading, addService, updateService, deleteService, refresh } = useServices()
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Package',
    sort_order: 0,
    is_active: true
  })

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        sort_order: service.sort_order,
        is_active: service.is_active
      })
    } else {
      setEditingService(null)
      setFormData({
        title: '',
        description: '',
        icon: 'Package',
        sort_order: services.length,
        is_active: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingService(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description) {
      toast.error('请填写完整信息')
      return
    }

    let success
    if (editingService) {
      success = await updateService(editingService.id, formData)
    } else {
      success = await addService(formData)
    }

    if (success) {
      toast.success(editingService ? '更新成功' : '添加成功')
      handleCloseModal()
    } else {
      toast.error('操作失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除此项吗？')) {
      const success = await deleteService(id)
      if (success) {
        toast.success('删除成功')
      } else {
        toast.error('删除失败')
      }
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
          <h1 className="text-2xl font-bold text-gray-900">核心业务</h1>
          <p className="text-gray-500 mt-1">管理公司核心业务板块</p>
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
            添加业务
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
              !service.is_active && 'opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">C</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenModal(service)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">排序: {service.sort_order}</span>
              {service.is_active ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">启用</span>
              ) : (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">禁用</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无业务数据，点击"添加业务"开始
        </div>
      )}

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingService ? '编辑业务' : '添加业务'}
              </h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">业务标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">业务描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select
                    value={formData.is_active ? '1' : '0'}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === '1' }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="1">启用</option>
                    <option value="0">禁用</option>
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