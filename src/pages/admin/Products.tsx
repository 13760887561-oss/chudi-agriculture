import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { toast } from 'sonner'
import { Plus, Edit2, Trash2, Image as ImageIcon, X, RefreshCw } from 'lucide-react'
import { Product } from '../../lib/supabase'

export default function ProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct, refresh } = useProducts()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    category: '',
    sort_order: 0,
    is_active: true
  })

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        image_url: product.image_url,
        category: product.category,
        sort_order: product.sort_order,
        is_active: product.is_active
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        description: '',
        image_url: '',
        category: '',
        sort_order: products.length,
        is_active: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description) {
      toast.error('请填写完整信息')
      return
    }

    let success
    if (editingProduct) {
      success = await updateProduct(editingProduct.id, formData)
    } else {
      success = await addProduct(formData)
    }

    if (success) {
      toast.success(editingProduct ? '更新成功' : '添加成功')
      handleCloseModal()
    } else {
      toast.error('操作失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除此产品吗？')) {
      const success = await deleteProduct(id)
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
          <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
          <p className="text-gray-500 mt-1">管理公司产品展示</p>
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
            添加产品
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
              !product.is_active && 'opacity-60'
            }`}
          >
            <div className="aspect-[4/3] bg-gray-100 relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">排序: {product.sort_order}</span>
                {product.is_active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">上架</span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">下架</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无产品数据，点击"添加产品"开始
        </div>
      )}

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct ? '编辑产品' : '添加产品'}
              </h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="如：育苗基质、水稻育秧基质"
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
                    <option value="1">上架</option>
                    <option value="0">下架</option>
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