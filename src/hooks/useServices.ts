import { useState, useEffect, useCallback } from 'react'
import { supabase, Service } from '../lib/supabase'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setServices(data || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching services:', err)
      setError(err.message || '获取服务失败')
    } finally {
      setLoading(false)
    }
  }, [])

  const addService = async (service: Omit<Service, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('services')
        .insert(service)

      if (error) throw error
      await fetchServices()
      return true
    } catch (err: any) {
      setError(err.message || '添加失败')
      return false
    }
  }

  const updateService = async (id: number, service: Partial<Service>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(service)
        .eq('id', id)

      if (error) throw error
      await fetchServices()
      return true
    } catch (err: any) {
      setError(err.message || '更新失败')
      return false
    }
  }

  const deleteService = async (id: number) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchServices()
      return true
    } catch (err: any) {
      setError(err.message || '删除失败')
      return false
    }
  }

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refresh: fetchServices
  }
}