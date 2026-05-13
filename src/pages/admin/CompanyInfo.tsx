import { useState, useEffect } from 'react'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'
import { toast } from 'sonner'
import { Save, RefreshCw, Building2, Phone, Mail, MapPin, Users, Award, Target } from 'lucide-react'

export default function CompanyInfoPage() {
  const { companyInfo, stats, loading, updateCompanyInfo, updateStats } = useCompanyInfo()

  const [formData, setFormData] = useState({
    company_name: '',
    company_name_en: '',
    slogan: '',
    description: '',
    established_year: 2013,
    address: '',
    phone: '',
    email: '',
    wechat: ''
  })

  const [statsData, setStatsData] = useState({
    years_experience: 10,
    team_size: 21,
    doctor_team: 4,
    service_area: 10000
  })

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (companyInfo) {
      setFormData({
        company_name: companyInfo.company_name || '',
        company_name_en: companyInfo.company_name_en || '',
        slogan: companyInfo.slogan || '',
        description: companyInfo.description || '',
        established_year: companyInfo.established_year || 2013,
        address: companyInfo.address || '',
        phone: companyInfo.phone || '',
        email: companyInfo.email || '',
        wechat: companyInfo.wechat || ''
      })
    }
    if (stats) {
      setStatsData({
        years_experience: stats.years_experience || 10,
        team_size: stats.team_size || 21,
        doctor_team: stats.doctor_team || 4,
        service_area: stats.service_area || 10000
      })
    }
  }, [companyInfo, stats])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStatsData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateCompanyInfo(formData)
      await updateStats(statsData)
      toast.success('保存成功')
    } catch (error) {
      toast.error('保存失败')
    } finally {
      setSaving(false)
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
          <h1 className="text-2xl font-bold text-gray-900">公司信息</h1>
          <p className="text-gray-500 mt-1">管理公司基本信息和联系方式</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? '保存中...' : '保存修改'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">基本信息</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">英文名称</label>
              <input
                type="text"
                name="company_name_en"
                value={formData.company_name_en}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">公司标语</label>
              <input
                type="text"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">公司简介</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">成立年份</label>
              <input
                type="number"
                name="established_year"
                value={formData.established_year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">联系方式</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">微信</label>
              <input
                type="text"
                name="wechat"
                value={formData.wechat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">数据统计</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">行业经验</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="years_experience"
                  value={statsData.years_experience}
                  onChange={handleStatsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <span className="text-gray-500">年+</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">技术团队</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="team_size"
                  value={statsData.team_size}
                  onChange={handleStatsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <span className="text-gray-500">人</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">博士团队</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="doctor_team"
                  value={statsData.doctor_team}
                  onChange={handleStatsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <span className="text-gray-500">人</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">服务面积</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="service_area"
                  value={statsData.service_area}
                  onChange={handleStatsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <span className="text-gray-500">亩</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}