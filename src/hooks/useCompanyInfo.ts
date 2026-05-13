import { useState, useEffect } from 'react'
import { supabase, CompanyInfo, SiteStats } from '../lib/supabase'

export function useCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [stats, setStats] = useState<SiteStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)

      // 获取公司信息
      const { data: companyData, error: companyError } = await supabase
        .from('company_info')
        .select('*')
        .single()

      if (companyError && companyError.code !== 'PGRST116') {
        throw companyError
      }

      // 获取网站统计
      const { data: statsData, error: statsError } = await supabase
        .from('site_stats')
        .select('*')
        .single()

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError
      }

      setCompanyInfo(companyData)
      setStats(statsData)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching data:', err)
      setError(err.message || '获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  const updateCompanyInfo = async (data: Partial<CompanyInfo>) => {
    try {
      const { error } = await supabase
        .from('company_info')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', 1)

      if (error) throw error
      await fetchData()
      return true
    } catch (err: any) {
      setError(err.message || '更新失败')
      return false
    }
  }

  const updateStats = async (data: Partial<SiteStats>) => {
    try {
      const { error } = await supabase
        .from('site_stats')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', 1)

      if (error) throw error
      await fetchData()
      return true
    } catch (err: any) {
      setError(err.message || '更新失败')
      return false
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    companyInfo,
    stats,
    loading,
    error,
    updateCompanyInfo,
    updateStats,
    refresh: fetchData
  }
}