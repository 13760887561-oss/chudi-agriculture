import { useState, useEffect, useCallback } from 'react'
import { supabase, Product } from '../lib/supabase'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setProducts(data || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching products:', err)
      setError(err.message || '获取产品失败')
    } finally {
      setLoading(false)
    }
  }, [])

  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert(product)

      if (error) throw error
      await fetchProducts()
      return true
    } catch (err: any) {
      setError(err.message || '添加失败')
      return false
    }
  }

  const updateProduct = async (id: number, product: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)

      if (error) throw error
      await fetchProducts()
      return true
    } catch (err: any) {
      setError(err.message || '更新失败')
      return false
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchProducts()
      return true
    } catch (err: any) {
      setError(err.message || '删除失败')
      return false
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refresh: fetchProducts
  }
}