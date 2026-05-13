import { useState } from 'react'
import { usePartners } from '../../hooks/usePartners'
import { toast } from 'sonner'
import { Plus, Edit2, Trash2, Building, X, RefreshCw } from 'lucide-react'
import { Partner } from '../../lib/supabase'

export default function PartnersPage() {
  const { partners, loading, addPartner, updatePartner, deletePartner, refresh } = usePartners()
  const [showModal, setShowModal] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'university',
    sort_order: 0,
    is_active: true
  })

  const partnerTypes = [
    { value: 'university', label: '高等院校' },
    { value: 'research', label: '科研机构' },
    { value: 'enterprise', label: '企业合作' },
    { value: 'government', label: '政府机构' }
  ]

  const handleOpenModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner)
      setFormData({
        name: partner.name,
        description: partner.description,
        type: partner.type,
        sort_order: partner.sort_order,
        is_active: partner.is_active
      })
    } else {
      setEditingPartner(null)
      setFormData({
        name: '',
        description: '',
        type: 'university',
        sort_order: partners.length,
        is_active: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingPartner(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) {
      toast.error('请填写合作伙伴名称')
      return
    }

    let success
    if (editingPartner) {
      success = await updatePartner(editingPartner.id, formData)
    } else {
      success = await addPartner(formData)
    }

    if (success) {
      toast.success(editingPartner ? '更新成功' : '添加成功')
      handleCloseModal()
    } else {
      toast.error('操作失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除此合作伙伴吗？')) {
      const success = await deletePartner(id)
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
          <h1 className="text-2xl font-bold text-gray-900">合作伙伴</h1>
          <p className="text-gray-500 mt-1">管理公司战略合作伙伴</p>
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
            添加伙伴
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
              !partner.is_active && 'opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Building className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenModal(partner)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{partner.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">排序: {partner.sort_order}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {partnerTypes.find(t => t.value === partner.type)?.label || partner.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {partners.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无合作伙伴数据，点击"添加伙伴"开始
        </div>
      )}

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPartner ? '编辑合作伙伴' : '添加合作伙伴'}
              </h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">伙伴名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="如：教学实习基地、人才实训基地"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {partnerTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
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
                    <option value="1">显示</option>
                    <option value="0">隐藏</option>
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