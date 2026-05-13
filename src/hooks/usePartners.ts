import { useState, useEffect, useCallback } from 'react'
import { supabase, Partner } from '../lib/supabase'

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setPartners(data || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching partners:', err)
      setError(err.message || '获取合作伙伴失败')
    } finally {
      setLoading(false)
    }
  }, [])

  const addPartner = async (partner: Omit<Partner, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('partners')
        .insert(partner)

      if (error) throw error
      await fetchPartners()
      return true
    } catch (err: any) {
      setError(err.message || '添加失败')
      return false
    }
  }

  const updatePartner = async (id: number, partner: Partial<Partner>) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update(partner)
        .eq('id', id)

      if (error) throw error
      await fetchPartners()
      return true
    } catch (err: any) {
      setError(err.message || '更新失败')
      return false
    }
  }

  const deletePartner = async (id: number) => {
    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchPartners()
      return true
    } catch (err: any) {
      setError(err.message || '删除失败')
      return false
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

  return {
    partners,
    loading,
    error,
    addPartner,
    updatePartner,
    deletePartner,
    refresh: fetchPartners
  }
}